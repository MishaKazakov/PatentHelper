import { Context, Markup, Scenes, session, Telegraf } from "telegraf";

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
    message:
      "Здравствуйте! Я бот PatentHelper, я помогаю молодым учёным зарегистрировать результаты своей интеллектуальной деятельности. А также обучаю основам интеллектуального права",
    buttons: [
      {
        text: "Давай начнем!",
        to: "1",
      },
    ],
  },
  1: {
    message:
      "Я с удовольствием расскажу вам об интересующем вас функционале. Что именно вас интересует?",
    buttons: [
      {
        text: "О нашей команде",
        to: "2",
      },
      {
        text: "Начать консультацию",
        to: "3",
      },
    ],
  },
  2: {
    message:
      "Мы инициативная группа, которая хочет помочь молодым специалистам стать грамотнее в области интеллектуальной собственности!",
  },
  3: {
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
  },
  33: {
    message: `Ваш объект имеет один из трех необходимых критериев ("изобретательский уровень") для получения патента на Ваш объект. Рекомендуем подумать над критериями "новизна" и "промышленная применимость". Для получения патента на изобретение необходимо, чтобы Ваш объект соответствовал критериям "изобретательский уровень", "новизна" и "промышленная применимость". Для полезной модели необходимо соответствие критериям "новизна" и "промышленная применимость".`,
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
  },
  36: {
    message: `Под изобретением понимается способ или продукт (а именно к устройство, комплексы, комплекты, вещества, штаммы микроорганизмы, культуры клеток растений или животных, генетическим и белковым конструкциям)

    Ваш объект больше подходит под изобретение, но для получения патента необходимо, чтобы Ваш объект соответствовал критерию "новизна".`,
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
  },
  40: {
    message: `Ваш объект имеет два из трех необходимых критериев ("изобретательский уровень" и "новизна") для получения патента на Ваш объект. Рекомендуем подумать над критерием "промышленная применимость". Для получения патента на изобретение необходимо, чтобы Ваш объект соответствовал критериям "изобретательский уровень", "новизна" и "промышленная применимость". Для полезной модели необходимо соответствие критериям "новизна" и "промышленная применимость".`,
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
  },
  44: {
    message: `Вероятнее всего Ваш объект подходит под изобретение или полезную модель. Но для точного определения объекта необходимо уточнить его характеристики. Для получения патента на изобретение необходимо, чтобы Ваш объект соответствовал критериям "изобретательский уровень", "новизна" и "промышленная применимость". Для полезной модели необходимо соответствие критериям "новизна" и "промышленная применимость". Рекомендуем пройти опрос еще раз.`,
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
  },
  
  n: {
    message: ``,
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

const token = process.env.token as string;

const bot = new Telegraf<Scenes.WizardContext>(token);
Object.entries(normalizedGraph).forEach(([, value]) => {
  if (value.buttons) {
    value.buttons.forEach((button) => {
      bot.action(button.to, (ctx) => {
        renderMessage(Number(button.to), ctx);
      });
    });
  } else {
    bot.action("0", (ctx) => {
      renderMessage(0, ctx);
    });
  }
});

async function renderMessage(i: number, ctx: Context) {
  const value = normalizedGraph[i];
  await ctx.editMessageText(value.message, {
    reply_markup: {
      inline_keyboard: [
        value.buttons
          ? value.buttons.map((button) => ({
              text: button.text,
              callback_data: button.to,
            }))
          : [
              {
                text: "К началу",
                callback_data: "0",
              },
            ],
      ],
    },
  });
}

bot.command("start", (ctx) => {
  const value = normalizedGraph[0];
  ctx.reply(
    value.message,
    value.buttons
      ? Markup.inlineKeyboard(
          value.buttons.map((button) =>
            Markup.button.callback(button.text, button.to)
          )
        )
      : Markup.inlineKeyboard([Markup.button.callback("К началу", "0")])
  );
});

bot.use(session());
bot.launch({
  webhook: {
    domain: process.env.domain!,
    port: Number(process.env.port),
  },
});
console.log("bot has started");
