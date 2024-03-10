import { Context, Markup, Scenes, session, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { InlineKeyboardButton } from "telegraf/typings/core/types/typegram";
import {
  normalizedGraph,
  afterPayment,
  payAction,
  feedbackAction,
  afterFeedbackAction,
} from "./normalizedGraph";

type ButtonRaw = {
  text: string;
  to: string;
};

export type MessageRaw = {
  message: string;
  buttons?: ButtonRaw[];
  action?: typeof payAction | typeof feedbackAction;
};
const token = process.env.token as string;

const parse_mode = "HTML";
const bot = new Telegraf<Scenes.WizardContext>(token);

const getInvoice = (id: string) => {
  const invoice = {
    chat_id: id, // Уникальный идентификатор целевого чата или имя пользователя целевого канала
    provider_token: process.env.providerToken!, // токен выданный через бот @SberbankPaymentBot
    start_parameter: "get_access", //Уникальный параметр глубинных ссылок\. Если оставить поле пустым, переадресованные копии отправленного сообщения будут иметь кнопку «Оплатить», позволяющую нескольким пользователям производить оплату непосредственно из пересылаемого сообщения, используя один и тот же счет\. Если не пусто, перенаправленные копии отправленного сообщения будут иметь кнопку URL с глубокой ссылкой на бота (вместо кнопки оплаты) со значением, используемым в качестве начального параметра\.
    title: "Консультация MyPriority_bot", // Название продукта, 1-32 символа
    description:
      "Консультация MyPriority_bot по интеллектуальному праву.\n Продолжая, Вы соглашаетесь с политикой обработки персональных данных", // Описание продукта, 1-255 знаков
    currency: "RUB", // Трехбуквенный код валюты ISO 4217
    prices: [{ label: "Консультация MyPriority_bot", amount: 500 * 100 }], // Разбивка цен, сериализованный список компонентов в формате JSON 100 копеек * 100 = 100 рублей
    payload: "payload",
  };

  return invoice;
};

async function renderMessage(i: number | string, ctx: Context) {
  const value = normalizedGraph[i];
  console.log("renderMessage", i, value);

  await ctx.editMessageText(value.message, {
    parse_mode,
    reply_markup: {
      inline_keyboard:
        value.action === "pay"
          ? [
              [
                {
                  text: "Оплатить",
                  callback_data: "pay",
                },
              ],
            ]
          : prepareButtons(value.buttons),
    },
  });
}

function prepareButtons(buttons?: ButtonRaw[]): InlineKeyboardButton[][] {
  if (!buttons) {
    return [
      [
        {
          text: "К началу",
          callback_data: "0",
        },
      ],
    ];
  }

  if (buttons.length < 3) {
    return [
      buttons.map((button) => ({
        text: button.text,
        callback_data: button.to,
      })),
    ];
  }

  return buttons.map((button) => [
    {
      text: button.text,
      callback_data: button.to,
    },
  ]);
}

bot.start((ctx) => {
  const value = normalizedGraph[0];
  const buttons = value.buttons
    ? Markup.inlineKeyboard(
        value.buttons.map((button) =>
          Markup.button.callback(button.text, button.to)
        )
      )
    : Markup.inlineKeyboard([Markup.button.callback("К началу", "0")]);

  const videoSource =
    "https://drive.usercontent.google.com/download?id=1gXfS8tNrTFloBbTwusWsg8SVqqg9k0Tq&export=view&authuser=0";
  ctx.replyWithVideo(videoSource).then(async () => {
    console.log("replyWithVideo", JSON.stringify(value));
    await ctx.reply(value.message, {
      parse_mode,
      reply_markup: {
        inline_keyboard: buttons.reply_markup.inline_keyboard,
      },
    });
  });
});

bot.launch({
  webhook: {
    domain: process.env.domain!,
    port: Number(process.env.port),
  },
});

console.log("bot has started");
bot.use(session());

bot.on("pre_checkout_query", (ctx) => ctx.answerPreCheckoutQuery(true));

bot.on("successful_payment", async (ctx) => {
  const value = normalizedGraph[afterPayment];
  const buttons = value.buttons
    ? Markup.inlineKeyboard(
        value.buttons.map((button) =>
          Markup.button.callback(button.text, button.to)
        )
      )
    : Markup.inlineKeyboard([Markup.button.callback("К началу", "0")]);

  console.log("successful_payment", JSON.stringify(value));
  await ctx.reply(value.message, {
    parse_mode,
    reply_markup: {
      inline_keyboard: buttons.reply_markup.inline_keyboard,
    },
  });
});

Object.entries(normalizedGraph).forEach(([, value]) => {
  if (value.action === payAction) {
    bot.action(payAction, async (ctx) => {
      const invoice = getInvoice(ctx.from?.id.toString()!);
      await ctx.replyWithInvoice(invoice);
    });
  } else if (value.action === feedbackAction) {
    bot.action(feedbackAction, (ctx) => {
      (ctx.session as any) = {
        feedback: true,
      };
      renderMessage(feedbackAction, ctx);
    });
  } else if (value.buttons) {
    value.buttons.forEach((button) => {
      bot.action(button.to, (ctx) => {
        renderMessage(button.to, ctx);
      });
    });
  } else {
    bot.action("0", (ctx) => {
      renderMessage(0, ctx);
    });
  }
});

bot.on(message("text"), (ctx) => {
  console.log("message", ctx.message.text);
  console.log(JSON.stringify(ctx.session));
  if (ctx.session && (ctx.session as any).feedback && ctx.message.text) {
    const userMessage = ctx.message.text;
    console.log(userMessage);
    renderMessage(afterFeedbackAction, ctx);
  }
});
