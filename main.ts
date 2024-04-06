import { Context, Markup, Scenes, session, Telegraf } from "telegraf";
import { message } from "telegraf/filters";
import { InlineKeyboardButton } from "telegraf/typings/core/types/typegram";
import {
  normalizedGraph,
  afterPayment,
  payAction,
  feedbackAction,
  afterFeedbackAction,
  beforePayment,
  promoCodeAction,
  failedPromoCode,
} from "./normalizedGraph";

type ButtonRaw = {
  text: string;
  to: string;
};

type DB = Record<
  string,
  {
    feedback?: boolean;
    inPromoCode?: boolean;
    isPayed?: boolean;
    usedPromoCode?: boolean;
  }
>;
const fakeSession: DB = {
  sadkova_law: { feedback: false },
  svetskyi: { feedback: false },
  ankkadamsell: { feedback: false },
  Neuroleg: { feedback: false },
  AlexandraFrolova2905: { feedback: false },
  Med1020: { feedback: false, isPayed: true },
  elenavasiakina: { feedback: false, isPayed: true },
  nadya9999: {},
};

export type MessageRaw = {
  message: string;
  buttons?: ButtonRaw[];
  action?: typeof payAction | typeof feedbackAction | typeof promoCodeAction;
};
const token = process.env.token as string;

interface MyContext extends Context {
  session: {
    feedback: boolean;
  };
}

const parse_mode = "HTML";
const bot = new Telegraf<MyContext>(token);
bot.use(session({ defaultSession: () => ({ feedback: false }) }));

const amountInRub = 199;
const getInvoice = (id: string) => {
  const invoice = {
    chat_id: id, // Уникальный идентификатор целевого чата или имя пользователя целевого канала
    provider_token: process.env.providerToken!, // токен выданный через бот @SberbankPaymentBot
    start_parameter: "get_access", //Уникальный параметр глубинных ссылок\. Если оставить поле пустым, переадресованные копии отправленного сообщения будут иметь кнопку «Оплатить», позволяющую нескольким пользователям производить оплату непосредственно из пересылаемого сообщения, используя один и тот же счет\. Если не пусто, перенаправленные копии отправленного сообщения будут иметь кнопку URL с глубокой ссылкой на бота (вместо кнопки оплаты) со значением, используемым в качестве начального параметра\.
    title: "Консультация MyPriority_bot", // Название продукта, 1-32 символа
    description:
      "Постоянный доступ к чат-боту по защите интеллектуальной собственности", // Описание продукта, 1-255 знаков
    currency: "RUB", // Трехбуквенный код валюты ISO 4217
    prices: [
      { label: "Консультация MyPriority_bot", amount: amountInRub * 100 },
    ], // Разбивка цен, сериализованный список компонентов в формате JSON 100 копеек * 100 = 100 рублей
    payload: "payload",
  };

  return invoice;
};

async function renderMessage({
  index,
  ctx,
  isNew,
}: {
  index: number | string;
  ctx: Context;
  isNew?: boolean;
}) {
  const value = normalizedGraph[index];
  const params = {
    parse_mode,
    reply_markup: getReplyMarkupForAction(value),
  } as const;

  if (isNew) {
    return ctx.reply(value.message, params);
  }

  return ctx.editMessageText(value.message, params);
}

function getReplyMarkupForAction(value: MessageRaw) {
  if (value.action === payAction) {
    return {
      inline_keyboard: [
        [
          {
            text: "Оплатить",
            callback_data: payAction,
          },
        ],
        [
          {
            text: "Ввести промокод",
            callback_data: promoCodeAction,
          },
        ],
      ],
    };
  }

  if (value.action === promoCodeAction) {
    return undefined;
  }

  return {
    inline_keyboard: prepareButtons(value.buttons),
  };
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
  if (ctx.from.username && !fakeSession[ctx.from.username]) {
    fakeSession[ctx.from.username] = {};
  }
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

bot.on("pre_checkout_query", (ctx) => ctx.answerPreCheckoutQuery(true));

bot.on("successful_payment", async (ctx) => {
  if (ctx.from.username) {
    fakeSession[ctx.from.username].isPayed = true;
  }
  const value = normalizedGraph[afterPayment];
  const buttons = value.buttons
    ? Markup.inlineKeyboard(
        value.buttons.map((button) =>
          Markup.button.callback(button.text, button.to)
        )
      )
    : Markup.inlineKeyboard([Markup.button.callback("К началу", "0")]);

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
  } else if (value.action === promoCodeAction) {
    bot.action(promoCodeAction, async (ctx) => {
      await renderMessage({ index: promoCodeAction, ctx });

      if (ctx.from?.username) {
        fakeSession[ctx.from.username].inPromoCode = true;
      }
    });
  } else if (value.action === feedbackAction) {
    bot.action(feedbackAction, async (ctx) => {
      await renderMessage({ index: feedbackAction, ctx });
    });
  } else if (value.buttons) {
    value.buttons.forEach((button) => {
      bot.action(button.to, async (ctx) => {
        const to = button.to.toString();
        console.log("to", to);
        console.log("fakeSession", fakeSession);
        console.log("ctx.from?.username", ctx.from?.username);
        if (
          ctx.from?.username &&
          to === beforePayment.toString() &&
          fakeSession[ctx.from.username].isPayed
        ) {
          await renderMessage({ index: afterPayment, ctx });
          return;
        }

        if (ctx.from?.username) {
          if (to === feedbackAction.toString()) {
            fakeSession[ctx.from.username].feedback = true;
          } else {
            fakeSession[ctx.from.username].feedback = false;
            fakeSession[ctx.from.username].inPromoCode = false;
          }
        }

        console.log("session", JSON.stringify(fakeSession));
        await renderMessage({ index: button.to, ctx });
      });
    });
  } else {
    bot.action("0", async (ctx) => {
      await renderMessage({ index: 0, ctx });
    });
  }
});

bot.on(message("text"), async (ctx) => {
  if (ctx.from.username && fakeSession[ctx.from.username]?.feedback) {
    fakeSession[ctx.from.username].feedback = false;
    bot.telegram.sendMessage(
      "@reviews_from_bot",
      `Отзыв от @${ctx.from.username}: ${ctx.message.text}`
    );
    await renderMessage({ index: afterFeedbackAction, ctx, isNew: true });
  }

  if (ctx.from.username && fakeSession[ctx.from.username]?.inPromoCode) {
    fakeSession[ctx.from.username].inPromoCode = false;
    if (ctx.message.text.toLocaleLowerCase() === process.env.promocodeWord) {
      fakeSession[ctx.from.username].usedPromoCode = true;
      fakeSession[ctx.from.username].isPayed = true;
      await renderMessage({ index: afterPayment, ctx, isNew: true });
    } else {
      await renderMessage({ index: failedPromoCode, ctx, isNew: true });
    }
  }
});
