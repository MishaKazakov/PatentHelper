import { Composer, Markup, Scenes, session, Telegraf } from "telegraf";

type ButtonRaw = {
  text: string;
  to: string;
};

type MessageRaw = {
  message: string;
  buttons?: ButtonRaw[];
};

const normalizedGraph: Record<string, MessageRaw> = {
  0: {
    message: "message0",
    buttons: [
      {
        text: "text0",
        to: "1",
      },
    ],
  },
  1: {
    message: "message1",
    buttons: [
      {
        text: "text1",
        to: "2",
      },
      {
        text: "text2",
        to: "3",
      },
    ],
  },
  2: {
    message: "message2",
  },
  3: {
    message: "message3",
    buttons: [
      {
        text: "text3",
        to: "4",
      },
    ],
  },
  4: {
    message: "message4",
  },
};

const steps = Object.entries(normalizedGraph).map(([, value]) => {
  const stepHandler = new Composer<Scenes.WizardContext>();
  if (value.buttons) {
    value.buttons.forEach((button) => {
      stepHandler.action(button.to, async (ctx) => {
        console.log("click to", button.to);
        ctx.wizard.selectStep(Number(button.to));
      });
    });
  } else {
    stepHandler.action("start_over", async (ctx) => {
      console.log("start_over");
      return ctx.wizard.selectStep(0);
    });
  }

  stepHandler.use(async (ctx) => {
    await ctx.reply(
      value.message,
      value.buttons
        ? Markup.inlineKeyboard(
            value.buttons.map((button) =>
              Markup.button.callback(button.text, button.to)
            )
          )
        : Markup.inlineKeyboard([
            Markup.button.callback("start over", "start_over"),
          ])
    );
  });

  return stepHandler;
});

const superWizard = new Scenes.WizardScene("super-wizard", ...steps);
const token = process.env.token;

const bot = new Telegraf<Scenes.WizardContext>(token);
const stage = new Scenes.Stage<Scenes.WizardContext>([superWizard], {
  default: "super-wizard",
});
bot.use(session());
bot.use(stage.middleware());
bot.launch({
  webhook: {
    domain: process.env.domain!,
    port: Number(process.env.port),
  },
});
console.log("bot has started");
