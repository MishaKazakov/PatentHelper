import { MessageRaw } from "./main";

export const beforePayment = -3;
export const afterPayment = 3;
export const failedPromoCode = -31;
const touHref =
  "https://docs.google.com/document/d/12HHIYafMzj_BW-TDYT5onap69mNN7HTwaJdoaDPKXU4/";

export const payAction = "pay";
export const feedbackAction = "feedback";
export const promoCodeAction = "promoCode";
export const afterFeedbackAction = "afterFeedback";
export const menu = 50;
export const normalizedGraph: Record<string, MessageRaw> = {
  [promoCodeAction]: {
    message: `Введите промокод`,
    action: promoCodeAction,
  },
  [failedPromoCode]: {
    message: `Промокод не найден`,
  },
  0: {
    message: `Я с удовольствием расскажу вам об интересующем вас функционале. Что именно вас интересует?
Выберите нужный раздел 👇`,
    buttons: [
      {
        text: "О нашей команде",
        to: "2",
      },
      {
        text: "Начать консультацию",
        to: beforePayment.toString(),
      },
    ],
  },
  // missing. first message right now is description
  2: {
    message:
      "Мы инициативная группа, которая хочет помочь молодым специалистам стать грамотнее в области интеллектуальной собственности!",
  },
  [beforePayment]: {
    message: `Продолжая, Вы соглашаетесь с <a href="${touHref}">политикой обработки персональных данных</a>`,
    action: payAction,
  },
  [afterPayment]: {
    message: `Сейчас я буду задавать вам вопросы касающиеся вашей интеллектуальной собственности.
Вам необходимо ответить Да или Нет на каждый вопрос`,
    buttons: [
      {
        text: "Далее",
        to: "4",
      },
    ],
  },
  4: {
    message: `Что такое патент? 
охранный документ, подтверждающий Ваши права на объект, выданный уполномоченным государственным органом Роспатентом.
Его суть установить монополию на производство и использование определенного объекта. Вы как владелец патента обладаете эксклюзивным правом, позволяющим ограничивать использование объекта остальными участниками рынка. Нельзя использовать разработку без Вашего согласия или разрешения и без выплаты вознаграждения за использование.
    `,
    buttons: [
      {
        text: "Далее",
        to: "5",
      },
    ],
  },
  5: {
    message: `Ответы на следующие вопросы помогут разобраться, возможно ли запатентовать Ваш результат интеллектуальной деятельности.`,
    buttons: [
      {
        text: "Далее",
        to: "6",
      },
    ],
  },
  6: {
    message: `Относится ли Ваш объект к открытию, а именно описанию явлений, свойств, закономерностей объективно существующих, но ранее не известных?`,
    buttons: [
      {
        text: "Да",
        to: "7",
      },
      {
        text: "Нет",
        to: "8",
      },
    ],
  },
  7: {
    message: `Данный объект не является охраняемым, и выдача патента невозможна. Поскольку указанные результаты интеллектуальной деятельности имеют колоссальное значение для всего общества, установление монополии, в виде получения патента, затруднят развитие научной и исследовательской деятельности.
Например, заявленное в качестве изобретения объективно существующее свойство вируса папилломы человека провоцировать развитие рака шейки матки. В качестве изобретения могли быть заявлены вещество, предотвращающее развитие рака шейки матки при воздействии открытого свойства; фармакологическая композиция, предотвращающая развитие рака шейки матки, при воздействии открытое свойства; способ лечения рака шейки матки, возникшего при воздействии открытого свойства.`,
  },
  8: {
    message: `Относится ли Ваш объект к научной теории, а именно системе взглядов, научному предположению, объясняющему закономерности и существенные связи предметной области?`,
    buttons: [
      {
        text: "Да",
        to: "9",
      },
      {
        text: "Нет",
        to: "10",
      },
    ],
  },

  9: {
    message: `Данный объект не является охраняемым, и выдача патента невозможна. Поскольку указанные результаты интеллектуальной деятельности имеют колоссальное значение для всего общества, установление монополии, в виде получения патента, затруднят развитие научной и исследовательской деятельности.
Например, преобладание жирной пищи в рационе питания приводит к развитию ишемической болезни сердца (ИБС) за счет образования атеросклеротических бляшек, которые уменьшают просвет сосудов, вызывая тем самым развитие ишемии миокарда. В качестве изобретения могли быть заявлены ранорасширитель для хирургических операций при лечении ишемической болезни сердца; фармакологическая композиция, предотвращающая развитие ишемии миокарда и проч.`,
  },
  10: {
    message: ` Относится ли Ваш объект к математическому методу, а именно математическими решениями, характерными особенностями которых являются вычислительно-логические операции, осуществляемые над количественными данными, не требующими для их получения осуществления действий над материальными объектами с помощью материальных средств?`,
    buttons: [
      {
        text: "Да",
        to: "11",
      },
      {
        text: "Нет",
        to: "12",
      },
    ],
  },
  11: {
    message: `Данный объект не является охраняемым, и выдача патента невозможна. Поскольку указанные результаты интеллектуальной деятельности имеют колоссальное значение для всего общества, установление монополии, в виде получения патента, затруднят развитие научной и исследовательской деятельности.
Например, записанный в виде последовательности действий алгоритм Евклида 
Способ нахождения наибольшего общего делителя двух натуральных чисел представляет собой результат, который заключается только в получении информации благодаря применению математического метода. Такой результат не считается инновационным техническим решением. Даже использование программ ЭВМ в вычислительных алгоритмах будет расцениваться как вычислительный инструмент. Наравне с счетами, карандашом и бумагой, Объекту патентная  охрана не предоставится.
    `,
  },
  12: {
    message: `Относится ли Ваш объект к решению, касающемуся только внешнего вида изделия и направленному на удовлетворение эстетических потребностей, а именно дизайна, формы, очертания объекта, его цветового решения и декоративного оформления?`,
    buttons: [
      {
        text: "Да",
        to: "13",
      },
      {
        text: "Нет",
        to: "14",
      },
    ],
  },
  13: {
    message: `Данный объект – промышленный образец. Объект подлежит охране, выдача патента возможна.
К сожалению, данный блок находится еще в разработке. Спасибо за понимание, жду Вас после моего обновления! 😊
   `,
  },
  14: {
    message: `Относится ли Ваш объект к правилам и методам игр, а именно  объектам, характеризующимися предписаниями, устанавливающими порядок игры, а к методам игр - объектам, характеризующимися совокупностью действий (приемов и операций), осуществляемых игроками в соответствии с правилами игры?`,
    buttons: [
      {
        text: "Да",
        to: "15",
      },
      {
        text: "Нет",
        to: "16",
      },
    ],
  },
  15: {
    message: `Данный объект не является охраняемым, и выдача патента невозможна.
Например, Игра в шахматы, где каждый из противников действует из собственного стратегического плана, уведомляя противника документально. В качестве изобретения могла быть заявлена игра, содержащая доску с игровыми полями, содержащая особенности, обеспечивающими повышенную безопасность игроков.`,
  },
  16: {
    message: `Относится ли Ваш объект к правилам и методам хозяйственной деятельности, а именно предписаниям, устанавливающим порядок осуществления действий, направленных на пополнение запаса материальных благ или к методам- совокупности приемов и операций, осуществляемых субъектами хозяйственной деятельности в соответствии с установленными правилами?`,
    buttons: [
      {
        text: "Да",
        to: "17",
      },
      {
        text: "Нет",
        to: "18",
      },
    ],
  },
  17: {
    message: `Данный объект не является охраняемым, и выдача патента невозможна.
Например, способ рекламирования товаров и услуг, в котором систему визуально-звукового представления информации размещают в аптеке и воспроизводят информацию о товарах медицинского назначения и услугах медицинского характера во время работы аптеки. В качестве изобретения могла быть заявлена система, которая содержит особенности, обеспечивающие ускоренный автоматизированный подбор требуемых потребителю лекарств.`,
  },
  18: {
    message: `Относится ли Ваш объект к правилам и методам интеллектуальной деятельности, а именно объектам, характеризующимся предписаниями, устанавливающими порядок осуществления умственной деятельности, а к методам интеллектуальной деятельности - объектам, характеризующимся совокупностью приемов интеллектуальной деятельности, осуществляемых индивидуумом?`,
    buttons: [
      {
        text: "Да",
        to: "19",
      },
      {
        text: "Нет",
        to: "20",
      },
    ],
  },
  19: {
    message: `Данный объект не является охраняемым, и выдача патента невозможна.
Например, способ ускоренного изучения иностранного языка, включающий определение начального уровня владения иностранным языком, по результатам которого формируют базовый набор текстовых носителей на иностранном языке со средствами их демонстрации, изучаемый материал, представленный на текстовом носителе, на каждом занятии повторяют от 3 до 6 раз, при этом занятия проводят до достижения скорости чтения от 120 до 200 слов/мин. . В качестве изобретения могло быть заявлено устройство, обеспечивающее ускоренное и качественное усвоение иностранных слов учениками.`,
  },
  20: {
    message: `Относится ли Ваш объект к программе для ЭВМ, а именно представленной в объективной форме совокупности данных и команд, предназначенных для функционирования ЭВМ и других компьютерных устройств в целях получения определенного результата, включая подготовительные материалы, полученные в ходе разработки программы для ЭВМ, и порождаемые ею аудиовизуальные отображения?`,
    buttons: [
      {
        text: "Да",
        to: "21",
      },
      {
        text: "Нет",
        to: "22",
      },
    ],
  },
  21: {
    message: `Данный объект- программа для ЭВМ. Объект авторского права и подлежит охране как литературное произведение, выдается свидетельство Роспатентом.
К сожалению, данный блок находится еще в разработке. Спасибо за понимание, жду Вас после моего обновления! 😊
Однако, например, алгоритм лечения вредоносной программы в компьютере. В качестве изобретения могло быть заявлено следующее:
"Способ лечения вредоносной программы в компьютере, имеющем множество копий той же самой активированной вредоносной программы, причем множество копий контролирует существование каждой из них, при этом способ содержит этапы, на которых: идентифицируют наличие вредоносной программы в компьютере; затем блокируют любые действия, которые разрешают одной активной копии вредоносной программы активировать другую копию вредоносной программы, после чего удаляют с постоянного запоминающего устройства код вредоносной программы и ссылки на него и перезагружают компьютер"- представляет собой принципиально патентоспособный способ, который может получить правовую охрану как объект патентного права.
    `,
  },
  22: {
    message: `Относится ли Ваш объект к решениям, заключающимся только в представлении информации,  а именно к решениям,  воспроизводящими (преподносящими, презентующими) информацию в любом виде, в том числе на материальном носителе?`,
    buttons: [
      {
        text: "Да",
        to: "23",
      },
      {
        text: "Нет",
        to: "24",
      },
    ],
  },
  23: {
    message: `Данный объект не является охраняемым, и выдача патента невозможна.
Например, табло, информирующее население о вреде табакокурения, состоящий в том, что на баннерах города размещают тематические модули, при этом каждый тематический модуль содержит познавательный и практический материал, посвященный одному из аспектов профилактики табакокурения в повседневной жизни. В качестве изобретения могло быть заявлено табло, предназначенное для информирования о вреде табака, где совокупность признаков будет обеспечивать защиту носителя информации от разрушающего воздействия перепадов влажности воздуха.`,
  },
  24: {
    message: `Относится ли Ваш объект к топологии интегральных микросхем, а именно  к зафиксированному на материальном носителе пространственно-геометрическое расположению совокупности элементов интегральной микросхемы и связей между ними?`,
    buttons: [
      {
        text: "Да",
        to: "25",
      },
      {
        text: "Нет",
        to: "26",
      },
    ],
  },
  25: {
    message: `Данный объект- топология интегральной микросхемы. Объект подлежит охране, выдается свидетельство Роспатентом.
К сожалению, данный блок находится еще в разработке. Спасибо за понимание, жду Вас после моего обновления! 😊`,
    buttons: [
      {
        text: "Да",
        to: "7",
      },
      {
        text: "Нет",
        to: "8",
      },
    ],
  },
  26: {
    message: `Относится ли Ваш объект к селекционным достижениям, а именно к  сортам растений и породам животных?`,
    buttons: [
      {
        text: "Да",
        to: "27",
      },
      {
        text: "Нет",
        to: "28",
      },
    ],
  },
  27: {
    message: `Данный объект- селекционные достижения. Объект подлежит охране, выдается патент Министерством сельского хозяйства РФ.
К сожалению, данный блок находится еще в разработке. Спасибо за понимание, жду Вас после моего обновления! 😊
    `,
  },
  28: {
    message: `Отлично, мы на верном пути! 
И у меня еще вопросы, продолжаем?`,
    buttons: [
      {
        text: "Да",
        to: "29",
      },
    ],
  },

  29: {
    message: `Под новизной понимается, что объект содержит новый, неизвестный ранее признак, либо его эквивалент, в известном на дату подачи заявки уровне техники.
Требование новизны не означит, что запатентовать можно исключительно революционное и супертехнологичное, можно и простое в этом случае необходимо подстраховать себя и обратиться к опытному специалисту.
Существует массив знаний, которые находятся как в патентных источниках разных стран, так и в открытых источниках сети Интернет. Эксперт не должен обнаружить тот самый новый признак объекта среди уже известных аналогов, то есть среди устройств схожего назначения. И важным является то, что одновременно этот  признак должен влиять на достижение технического результата, а не присутствовать в заявке «для красоты», признак должен влиять на результат работы объекта, то есть делать его быстрее, сильнее, надежнее.

Ваш объект соотносится с критерием “новизны”? `,
    buttons: [
      {
        text: "Да",
        to: "37",
      },
      {
        text: "Нет",
        to: "30",
      },
    ],
  },
  30: {
    message: `Под промышленной применимостью понимается, что объект может применяться в промышленных, бытовых, деловых, социальных  и иных целях,  объект возможно воспроизвести; не штучный экземпляр, может быть поставлен на массовое производство
Ваш объект соотносится с критерием “промышленная применимость”?`,
    buttons: [
      {
        text: "Да",
        to: "34",
      },
      {
        text: "Нет",
        to: "31",
      },
    ],
  },
  31: {
    message: `Под изобретательским уровнем понимается “неочевидность”, то есть если объект очевиден для специалиста в данной области, в этом случае предоставить правовую охрану объекту нельзя, то есть Объект должен представлять собой существенный шаг, определенного уровня прогресс, по отношению к общеизвестным сведениям в исследуемой Вами области .
Ваш объект соотносится с критерием “изобретательский уровень”?`,
    buttons: [
      {
        text: "Да",
        to: "33",
      },
      {
        text: "Нет",
        to: "32",
      },
    ],
  },
  32: {
    message: `Ваш объект не имеет ни один из трех необходимых критериев для получения патента на Ваш объект.  Для получения патента на изобретение необходимо, чтобы Ваш объект соответствовал критериям "изобретательский уровень", "новизна" и "промышленная применимость". Для полезной модели необходимо соответствие критериям "новизна" и "промышленная применимость".`,
    buttons: [
      {
        text: "Далее",
        to: "49",
      },
    ],
  },
  33: {
    message: `Ваш объект имеет один из трех необходимых критериев ("изобретательский уровень") для получения патента на Ваш объект. Рекомендуем подумать над критериями "новизна" и "промышленная применимость". Для получения патента на изобретение необходимо, чтобы Ваш объект соответствовал критериям "изобретательский уровень", "новизна" и "промышленная применимость". Для полезной модели необходимо соответствие критериям "новизна" и "промышленная применимость".`,
    buttons: [
      {
        text: "Далее",
        to: "49",
      },
    ],
  },
  34: {
    message: `Под изобретательским уровнем понимается “неочевидность”, то есть если объект очевиден для специалиста в данной области, в этом случае предоставить правовую охрану объекту нельзя, то есть Объект должен представлять собой существенный шаг, определенного уровня прогресс, по отношению к общеизвестным сведениям в исследуемой Вами области .
Ваш объект соотносится с критерием “изобретательский уровень”`,
    buttons: [
      {
        text: "Да",
        to: "36",
      },
      {
        text: "Нет",
        to: "35",
      },
    ],
  },
  35: {
    message: `Ваш объект имеет один из трех необходимых критериев ("промышленная применимость") для получения патента на Ваш объект. Рекомендуем подумать над критериями "новизна" и "изобретательский уровень". Для получения патента на изобретение необходимо, чтобы Ваш объект соответствовал критериям "изобретательский уровень", "новизна" и "промышленная применимость". Для полезной модели необходимо соответствие критериям "новизна" и "промышленная применимость".`,
    buttons: [
      {
        text: "Далее",
        to: "49",
      },
    ],
  },
  36: {
    message: `Под изобретением понимается способ или продукт (а именно к устройство, комплексы, комплекты, вещества, штаммы микроорганизмы, культуры клеток растений или животных, генетическим и белковым конструкциям)

Ваш объект больше подходит под изобретение, но для получения патента необходимо, чтобы Ваш объект соответствовал критерию "новизна".`,
    buttons: [
      {
        text: "Далее",
        to: "49",
      },
    ],
  },
  37: {
    message: `Под промышленной применимостью понимается, что объект может применяться в промышленных, бытовых, деловых, социальных  и иных целях,  объект возможно воспроизвести; не штучный экземпляр, может быть поставлен на массовое производство
Ваш объект соотносится с критерием “промышленная применимость”?`,
    buttons: [
      {
        text: "Да",
        to: "41",
      },
      {
        text: "Нет",
        to: "38",
      },
    ],
  },
  38: {
    message: `Под изобретательским уровнем понимается “неочевидность”, то есть если объект очевиден для специалиста в данной области, в этом случае предоставить правовую охрану объекту нельзя, то есть Объект должен представлять собой существенный шаг, определенного уровня прогресс, по отношению к общеизвестным сведениям в исследуемой Вами области .
Ваш объект соотносится с критерием “изобретательский уровень”?`,
    buttons: [
      {
        text: "Да",
        to: "40",
      },
      {
        text: "Нет",
        to: "39",
      },
    ],
  },
  39: {
    message: `Ваш объект имеет один из трех необходимых критериев ("новизна") для получения патента на Ваш объект. Рекомендуем подумать над критериями "промышленная применимость" и "изобретательский уровень". Для получения патента на изобретение необходимо, чтобы Ваш объект соответствовал критериям "изобретательский уровень", "новизна" и "промышленная применимость". Для полезной модели необходимо соответствие критериям "новизна" и "промышленная применимость".`,
    buttons: [
      {
        text: "Далее",
        to: "49",
      },
    ],
  },
  40: {
    message: `Ваш объект имеет два из трех необходимых критериев ("изобретательский уровень" и "новизна") для получения патента на Ваш объект. Рекомендуем подумать над критерием "промышленная применимость". Для получения патента на изобретение необходимо, чтобы Ваш объект соответствовал критериям "изобретательский уровень", "новизна" и "промышленная применимость". Для полезной модели необходимо соответствие критериям "новизна" и "промышленная применимость".`,
    buttons: [
      {
        text: "Далее",
        to: "49",
      },
    ],
  },
  41: {
    message: `Под изобретательским уровнем понимается “неочевидность”, то есть если объект очевиден для специалиста в данной области, в этом случае предоставить правовую охрану объекту нельзя, то есть Объект должен представлять собой существенный шаг, определенного уровня прогресс, по отношению к общеизвестным сведениям в исследуемой Вами области .
Ваш объект соотносится с критерием “изобретательский уровень”?`,
    buttons: [
      {
        text: "Да",
        to: "45",
      },
      {
        text: "Нет",
        to: "42",
      },
    ],
  },
  42: {
    message: `Является ли Ваш объект аналогом уже существующего, но при этом включает собственные уникальные характеристики и дополняет технические свойства аналога, то есть  является усовершенствованием ранее существующего объекта?
Например, офисное кресло со складывающимся козырьком `,
    buttons: [
      {
        // Что-то странное. здесь поменялся порядок да, Нет
        text: "Да",
        to: "43",
      },
      {
        text: "Нет",
        to: "44",
      },
    ],
  },
  43: {
    message: `Поздравляю! 
На Ваш объект возможно получить патент на ПОЛЕЗНУЮ МОДЕЛЬ.`,
    buttons: [
      {
        text: "Далее",
        to: "49",
      },
    ],
  },
  44: {
    message: `Вероятнее всего Ваш объект подходит под изобретение или полезную модель. Но для точного определения объекта необходимо уточнить его характеристики. Для получения патента на изобретение необходимо, чтобы Ваш объект соответствовал критериям "изобретательский уровень", "новизна" и "промышленная применимость". Для полезной модели необходимо соответствие критериям "новизна" и "промышленная применимость". Рекомендуем пройти опрос еще раз.`,
    buttons: [
      {
        text: "Далее",
        to: "49",
      },
    ],
  },
  45: {
    message: `Относится ли Ваш объект  к продукту (а именно к устройствам, комплексам, комплектам, веществам, штаммам микроорганизмов, культурам клеток растений или животных, генетическим и белковым конструкциям)? Пример: В качестве изобретения могло быть заявлено устройство, обеспечивающее ускоренное и качественное усвоение иностранных слов учениками.`,
    buttons: [
      {
        text: "Да",
        to: "46",
      },
      {
        text: "Нет",
        to: "47",
      },
    ],
  },
  46: {
    message: `Поздравляю!
На Ваш объект возможно получить патент на ИЗОБРЕТЕНИЕ.
    `,
    buttons: [
      {
        text: "Далее",
        to: "49",
      },
    ],
  },
  47: {
    message: `Является ли ваш продукт способом применения? Пример: Способ психофизиологической коррекции психологического состояния с использованием виртуальной реальности персонализированной геометрической формы в виде конечной области открытого пространства (VR-прогулки для лечения депрессии)`,
    buttons: [
      {
        text: "Да",
        to: "48",
      },
      {
        text: "Нет",
        to: "42",
      },
    ],
  },
  48: {
    message: `Поздравляю!
    На Ваш объект возможно получить патент на ИЗОБРЕТЕНИЕ.`,
    buttons: [
      {
        text: "Далее",
        to: "49",
      },
    ],
  },
  49: {
    message:
      "Рекомендую продолжить и более подробно узнать об особенностях и  процедуре патентования!",
    buttons: [
      {
        text: "Далее",
        to: menu.toString(),
      },
    ],
  },

  [menu]: {
    message: "Выберите один из вариантов",
    buttons: [
      {
        text: "Отличия полезной модели и изобретения",
        to: "51",
      },
      {
        text: "Процедура патентования",
        to: "57",
      },
      {
        text: "Материалы заявки",
        to: "58",
      },
      {
        text: "Пошлины",
        to: "59",
      },
      {
        text: "Дополнительная информация",
        to: "64",
      },
      {
        text: "Обратная связь",
        to: feedbackAction,
      },
      {
        text: "К началу",
        to: "0",
      },
    ],
  },
  [feedbackAction]: {
    message: `1. Помогло ли Вам использование чат-бота?
2. Опередили ли к какому виду интеллектуальной собственности относится Ваш объект?
3. Ваши пожелания разработчикам`,
    action: feedbackAction,
    buttons: [
      {
        text: "назад",
        to: menu.toString(),
      },
    ],
  },
  [afterFeedbackAction]: {
    message: "Спасибо за Ваше мнение! Это помогает мне совершенствоваться.",
    buttons: [
      {
        text: "далее",
        to: menu.toString(),
      },
    ],
  },

  // start Отличия полезной модели и изобретения
  51: {
    message: "Выберите один из вариантов",
    buttons: [
      {
        text: "Срок патентования",
        to: "52",
      },
      {
        text: "Срок правовой охраны",
        to: "53",
      },
      {
        text: "Критерии патентоспособности",
        to: "54",
      },
      {
        text: "Сложность получения",
        to: "55",
      },
      {
        text: "Сложность оспаривания",
        to: "56",
      },
      {
        text: "назад",
        to: menu.toString(),
      },
    ],
  },
  52: {
    message: `Экспертиза в Роспатенте: изобретение- 8-12 месяцев, полезная модель – 6-10 месяцев, в зарубежных патентных ведомствах – от 6 месяцев до 3 лет.
Выдача патента: 1-2 месяца, и для изобретения, и для полезной модели.`,
    buttons: [
      {
        text: "назад",
        to: "51",
      },
    ],
  },
  53: {
    message: `Изобретение: 20 лет, в некоторых случаях еще + 5 лет (фармпрепараты, пестициды)
Полезная модель: 10 лет
По истечении срока правовой охраны Ваш объект переходит в общественное достояние, то есть разработкой могут пользоваться без Вашего согласия и разрешения и без выплаты Вам вознаграждения за использование.`,
    buttons: [
      {
        text: "назад",
        to: "51",
      },
    ],
  },
  54: {
    message: `Изобретение – новизна, изобретательский уровень, промышленная применимость.
Полезная модель – новизна, промышленная применимость.`,
    buttons: [
      {
        text: "назад",
        to: "51",
      },
    ],
  },
  55: {
    message: `Изобретение: требований к патентоспособности больше, обязателен критерий изобретательского уровня.
Полезная модель: критериев меньше, изобретательский уровень не требуется.`,
    buttons: [
      {
        text: "назад",
        to: "51",
      },
    ],
  },
  56: {
    message: `Изобретение: легче, проверяется изобретательский уровень. Соответственно, чтобы оспорить это условие оппонент может оперировать множеством источников и утверждать, что совокупность всех признаков из множества источников позволяет получить Ваш объект.
Полезная модель: сложнее, потому что при оспаривании оппоненту придется найти ссылку на информацию, которая содержит 100% признаков полезной модели в одном источнике.`,
    buttons: [
      {
        text: "назад",
        to: "51",
      },
    ],
  },
  // end Отличия полезной модели и изобретения
  57: {
    message: `Патентование можно разделить на 6 этапов:
1. Выбор формы правовой охраны. Определение, что конкретно хотите запатентовать: что, в каком объеме, каким доступным способом.
2. Перед подготовкой и подачей заявки необходимо провести предварительный патентный поиск для получения информации о ранее существующих патентах. Это действие поможет сформировать «сильную» заявку, найти и обозначить признаки Вашего объекта, отличающие его от других схожих объектов.
Поиск повышает вероятность получения правовой охраны и снижает риски оспаривания патента в дальнейшем.
3. Составление заявки на получение патента- формирование комплекта документов с максимально исчерпывающим описанием объекта (про комплектность узнаете ниже). Подача заявки в Роспатент. 
4. Проведение формальной экспертизы- проверка экспертом соблюдения заявителем формальных требований к оформлению и содержанию заявки.
5. Проведение экспертизы заявки по существу - проверка экспертом соответствия объекта критериям патентоспособности.
* на любом из этапов экспертизы патентное ведомство направляет запросы заявителю, это часть процесса, таким образом при взаимодействии с экспертом Вы составляете оптимальную формулу объекта. 
6. Получение патента. Вместе с регистрацией патента Вы получаете исключительное право на зарегистрированный результат интеллектуальной деятельности — изобретение/ полезную модель. 
Другими словами, Вы получаете право запрещать любое использование запатентованного объекта без Вашего согласия. При этом запрет действует по умолчанию, без дополнительных объявлений или разъяснений и касается всех, кто не получил Ваше согласие.`,
    buttons: [
      {
        text: "назад",
        to: menu.toString(),
      },
    ],
  },
  58: {
    message: `1. Заявление - должно быть представлено на соответствующем бланке Роспатента и должно содержать все формальные сведения: название объекта; авторы, правообладатели, их место жительства или место нахождения.
2. Описание - развернутое описание объекта с примерами, анализом аналогов.
3. Формула – в соответствии именно с этим документом определяется объем правовой охраны. Формула описывается с помощью признаков - характеристик патентуемого объекта. Для описания разных видов объектов (способ, устройство, вещество и т.д.) предусмотрены различные признаки. 
NB: Чем меньше признаков в независимом пункте, тем шире правовая охрана, что лучше для будущего патента. Следовательно, нужно стараться описать объект как можно более общими признаками (понятиями), чтобы Вы имели максимальный объем прав на объект. В независимом пункте формулы обязательно должны присутствовать признаки необходимые: - для реализации назначения Вашего объекта.
4. Реферат - краткая выжимка всех материалов заявки.
5. Чертежи – прилагаются дополнительно, если нужны пояснения сущности объекта в виде чертежей.`,
    buttons: [
      {
        text: "назад",
        to: menu.toString(),
      },
    ],
  },

  // start Пошлины за объекты и поддержание патента в силе
  59: {
    message: "Выберите один из вариантов",
    buttons: [
      {
        text: "Минимальный размер пошлин",
        to: "60",
      },
      {
        text: "Пошлины за поддержание в силе",
        to: "61",
      },
      {
        text: "Льготы",
        to: "62",
      },
      {
        text: "Полезные ссылки",
        to: "63",
      },
      {
        text: "назад",
        to: menu.toString(),
      },
    ],
  },
  60: {
    message: `Изобретение: при подаче заявки  -  3 300 руб. (+ 700 руб. за каждый пункт формулы изобретения свыше 10);
при выдаче патента - 12 500 руб. (+ 9 200  руб. за каждый независимый пункт формулы свыше 1).
Полезная модель: при подаче заявки  - 1 400 руб. ( + 700 руб.  за каждый пункт формулы полезной модели свыше 10);
при выдаче патента - 2 500 руб.`,
    buttons: [
      {
        text: "назад",
        to: "59",
      },
    ],
  },
  61: {
    message: `Изобретение: оплачивается с 3 года действия патента. За 3-ий год стоимость составляет 1 700 руб.
Полезная модель: оплачивается с 1 года действия патента. За 1-ый год стоимость составляет 800 руб.

Размер годовой пошлины растет в течение срока действия патента, Логика здесь простая: для внедрения изобретения нужно время, поэтому в первый год действия патента пошлины низкие, а когда патент начинает приносить прибыль, то и размеры пошлин начинают увеличиваться.`,
    buttons: [
      {
        text: "назад",
        to: "59",
      },
    ],
  },
  62: {
    message: `Скидка в размере 30% при подаче документов в электронном виде через сайт Роспатента или портал Госуслуг.
Установлен целый ряд льгот, позволяющих сократить расходы на оплату пошлин. 
К категории заявителей, которым предоставлено право на уплату ряда пошлин в уменьшенном размере относятся заявители- физические лица:
инвалид и (или) пенсионер, получающий трудовую пенсию по старости;
лицо, обучающееся в организации, осуществляющей образовательную деятельность, имеющей государственную аккредитацию по соответствующей образовательной программе;
научный работник в возрасте до 35 лет, для которого место работы в научной организации является основным;
научно-педагогический работник в возрасте до 35 лет, для которого место работы в образовательной организации высшего образования является основным.
единственный автор, испрашивающий патент на свое имя либо обладающий патентом.
Право на уплату ряда пошлин в уменьшенном размере могут воспользоваться также заявители являющиеся:
субъектом малого предпринимательства;
образовательной организацией, имеющей государственную аккредитацию;
научной организацией;
индивидуальным предпринимателем.


Так,например, если вы единственный автор, то патент обойдется вам всего в 4 250 рублей, 
а если студент — в 2 600. `,
    buttons: [
      {
        text: "назад",
        to: "59",
      },
    ],
  },
  63: {
    message: `Ссылка на полный перечень действий в отношении патентов. Актуальный размер пошлины  - https://rospatent.gov.ru/ru/activities/dues/table

    Калькулятор пошлин -
    https://www1.fips.ru/podacha-zayavki/kalkulyator-poshlin/ 
    `,
    buttons: [
      {
        text: "назад",
        to: "59",
      },
    ],
  },
  // end Пошлины за объекты и поддержание патента в силе
  // start Дополнительная информация
  64: {
    message: "Выберите один из вариантов",
    buttons: [
      {
        text: "Выставочный приоритет- льгота по новизне,",
        to: "65",
      },
      {
        text: "Служебное произведение",
        to: "66",
      },
      {
        text: "Конвенционный приоритет",
        to: "67",
      },
      {
        text: "Назад",
        to: menu.toString(),
      },
    ],
  },
  65: {
    message: `1.	В случае если Ваш объект был представлен на одной из официальных выставок до даты подачи заявки в Роспатент, Вы можете испрашивать предоставление правовой охраны с даты открытого показа такого объекта (выставочный приоритет). В таком случае, после регистрации Вашего объекта государственным органом правовая охрана будет отсчитываться с даты открытого показа, а не с даты подачи заявки.
2.	Для этого необходимо отметить соответствующий пункт об испрашивании выставочного приоритета в заявлении на изобретение/полезную модель/промышленный образец/товарный знак, а также приложить официальные документы, подтверждающие раскрытие информации о Вашем объекте на выставке.
3.	Важно помнить, что в случае испрашивания выставочного приоритета по заявке необходимо учитывать официальные сроки, в которые Заявитель вправе испрашивать приоритет, а также в принципе подать заявку на свой объект:
ИЗ – в течение 6 месяцев с даты открытого показа;
ПМ –  в течение 6 месяцев с даты открытого показа;
ПО – в течение 12 месяцев с даты открытого показа.

4.	В случае, если в указанные сроки заявка с испрашиванием приоритета не была подана, впоследствии это сделать будет невозможно, так как впоследствии объекту уже не не может быть предоставлена правовая охрана, ввиду его общеизвестности.`,
    buttons: [
      {
        text: "Назад",
        to: "64",
      },
    ],
  },
  66: {
    message: `1.	Произведение, созданное в рамках выполнения трудовых обязанностей, является служебным произведением. При этом создатель произведения будет считаться автором такого произведения, а работодатель – обладателем исключительных прав (правообладателем), в случае если гражданско-правовым договором между ними не предусмотрено иное.
2.	В случае если по истечении трех лет с момента создания произведения работодатель не примет решение по использованию (или передаче /предоставлению права использования третьему лицу) такого произведения, исключительные права на произведение в полном объеме перейдут автору произведения. В обратном случае, если работодатель начнет какое-либо использование произведения, он обязан выплатить  вознаграждение автору такого произведения в соответствии с договором между работником и работодателем или в крайнем случае в установленном судом размере.
3.	В случае, если в соответствии с договором исключительные права на произведение изначально принадлежат автору, автор может предоставить лицензию на использование произведения работодателю с учетом выплаты вознаграждения. При этом все условия такого использования необходимо фиксировать в договоре. В ином случае это будет установлено в судебном порядке.
4.	Важно понимать, что автором служебного произведения будет считаться лицо/лица осуществившее творческий вклад в создание такого произведения. При это не будут считаться авторами лица, оказавшие техническую помощь, которая не предполагает творческий характер (например, осуществление руководства над деятельностью автора, составление макетов, изготовление чертежей, выполнение расчетов и т.д.). `,
    buttons: [
      {
        text: "Назад",
        to: "64",
      },
    ],
  },
  67: {
    message: `1.	Конвенционный приоритет предполагает, что при подаче заявки на изобретение/полезную модель/промышленный образец в одной стране Заявитель также может испрашивать правовую охрану в другой стране и при этом испрашивать конвенционный приоритет. Также конвенционный приоритет предполагает, что дата, с которой будет исчисляться правовая охрана Вашего объекта будет отсчитываться с даты подачи первоначальной заявки (в первой стране).
2.	При этом необходимо учитывать официальные сроки возможности предоставления правовой охраны вашему объекту в другой стране, так как в обратном случае Ваш объект приобретет мировую новизну, а значит правовую охрану в другой стране испрашивать уже будет невозможно. Поэтому важно при подаче заявки в одной стране сразу понимать в каких странах также необходимо предоставление правовой охраны Вашему объекту.
ИЗ – в течение 12 месяцев с даты подачи первоначальной заявки;
ПМ – 12 месяцев;
ПО – 6 месяцев.
*При этом, в случае, если будет доказано, что по не зависящем от Заявителя обстоятельствам заявка не могла быть подана в срок, данный срок может быть продлен не более чем на 2 месяца.
3.	Для того, чтобы подать заявку с испрашиванием конвенционного приоритета необходимо указать данный пункт в заявлении, а также предоставить заверенную копию первоначальной заявки в первой стране. Заверенная копия первоначальной заявки на изобретение и полезную модель должна быть предоставлена в течение 16 месяцев с даты ее подачи; для промышленного образца – 6 месяцев.
    `,
    buttons: [
      {
        text: "Назад",
        to: "64",
      },
    ],
  },
  // end Дополнительная информация
  n: {
    message: "Выберите один из вариантов",
    buttons: [
      {
        text: "Да",
        to: "7",
      },
      {
        text: "Нет",
        to: "8",
      },
    ],
  },
};
