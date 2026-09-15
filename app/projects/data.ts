export type ProjectMedia = {
  src: string;
  label: string;
  format?: "wide" | "portrait";
};

export type PortfolioProject = {
  slug: string;
  number: string;
  type: string;
  title: string;
  summary: string;
  facts: string[];
  scope: string;
  image: string;
  statement: string;
  challengeLead: string;
  challenge: string;
  solutionLead: string;
  solution: string;
  resultLead: string;
  result: string;
  metric: string;
  metricText: string;
  media: ProjectMedia[];
};

const details = "/images/projects/details";

export const projects: PortfolioProject[] = [
  {
    slug: "food-block-ventilation",
    number: "01",
    type: "Производственный объект",
    title: "Вентиляция пищевого блока",
    summary: "Комплексный проект для двухэтажного пищевого производства: от расчёта воздухообмена до питания оборудования и конструктивных узлов.",
    facts: ["410 м²", "2 этажа", "2 месяца"],
    scope: "ОВК · КР · ЭОМ",
    image: `${details}/food-block-3d-main.png`,
    statement: "Воздухообмен следует логике производства",
    challengeLead: "У каждого помещения — свой источник загрязнений.",
    challenge: "В горячем цехе образуются тепло и запахи, в моечной — влага, а кладовым нужен отдельный режим. Одна общая вытяжка не решила бы эту задачу.",
    solutionLead: "Приток и вытяжку разделили по функциональным зонам.",
    solution: "Для варочного и моечного цехов предусмотрели локальные отсосы. Воздуховоды согласовали с технологическим оборудованием и доступом для обслуживания.",
    resultLead: "Заказчик получил готовую основу для монтажа.",
    result: "В одном комплекте собраны расчёты воздухообмена, планы, сечения, оборудование и монтажные отметки.",
    metric: "7 зон",
    metricText: "с разными режимами воздухообмена",
    media: [
      { src: `${details}/food-block-3d-main.png`, label: "Аксонометрия инженерных систем" },
      { src: `${details}/food-block-basement-combined.png`, label: "Цокольный этаж · общий план вентиляции" },
      { src: `${details}/food-block-basement-supply.png`, label: "Цокольный этаж · приточная система" },
      { src: `${details}/food-block-basement-exhaust.png`, label: "Цокольный этаж · вытяжная система" },
      { src: `${details}/food-block-floor1-combined.png`, label: "Первый этаж · общий план вентиляции", format: "wide" },
      { src: `${details}/food-block-floor1-supply.png`, label: "Первый этаж · приточная система" },
      { src: `${details}/food-block-floor1-exhaust.png`, label: "Первый этаж · вытяжная система" },
    ],
  },
  {
    slug: "laundry-ventilation",
    number: "02",
    type: "Производственный объект",
    title: "Вентиляция прачечной",
    summary: "Разделили чистые и загрязнённые процессы, предусмотрели удаление влаги, тепла и испарений, автоматику и пожарную блокировку.",
    facts: ["202,8 м²", "3 раздела", "10,58 кВт"],
    scope: "ОВК · КР · ЭОМ",
    image: `${details}/laundry-3d-main.png`,
    statement: "Чистые и загрязнённые потоки не пересекаются",
    challengeLead: "Влажный воздух нельзя выпускать в соседние помещения.",
    challenge: "Работа оборудования создаёт избыток тепла и влаги. При неверном воздухообмене страдают люди, отделка и чистые зоны.",
    solutionLead: "Системы разделили по технологическим процессам.",
    solution: "Предусмотрели местные отсосы, автоматику, пожарную блокировку и отдельные режимы для рабочих и вспомогательных помещений.",
    resultLead: "Все инженерные разделы согласованы между собой.",
    result: "Вентиляцию, автоматику и электроснабжение можно комплектовать и монтировать без противоречий между чертежами.",
    metric: "3 раздела",
    metricText: "увязаны в одном комплекте документации",
    media: [
      { src: `${details}/laundry-3d-main.png`, label: "Аксонометрия систем прачечной" },
      { src: `${details}/laundry-basement-combined.png`, label: "Цокольный этаж · общий план вентиляции" },
      { src: `${details}/laundry-basement-supply.png`, label: "Цокольный этаж · приточная система" },
      { src: `${details}/laundry-basement-exhaust.png`, label: "Цокольный этаж · вытяжная система" },
      { src: `${details}/laundry-axon-supply-network.png`, label: "Приточная система · аксонометрическая схема", format: "wide" },
      { src: `${details}/laundry-axon-exhaust-b1.png`, label: "Вытяжная система В1 · аксонометрия", format: "portrait" },
      { src: `${details}/laundry-axon-exhaust-b2.png`, label: "Вытяжная система В2 · аксонометрия", format: "portrait" },
      { src: `${details}/laundry-axon-exhaust-b3.png`, label: "Вытяжная система В3 · аксонометрия", format: "portrait" },
      { src: `${details}/laundry-axon-supply-p1.png`, label: "Приточная система П1 · узлы", format: "wide" },
      { src: `${details}/laundry-roof-exhaust.png`, label: "Размещение вытяжных вентиляторов" },
      { src: `${details}/laundry-equipment-control.png`, label: "Оборудование и элементы управления" },
    ],
  },
  {
    slug: "culture-house-climate",
    number: "03",
    type: "Общественное здание",
    title: "Дом культуры на 350 мест",
    summary: "Отопление и кондиционирование двухэтажного общественного здания с помещениями разной загрузки.",
    facts: ["350 мест", "2 этажа", "30 раб. дней"],
    scope: "Отопление · кондиционирование",
    image: `${details}/culture-heating-axon-main.png`,
    statement: "Комфорт сохраняется при полном зрительном зале",
    challengeLead: "Нагрузка на здание меняется в течение дня.",
    challenge: "Пустой зал и мероприятие на 350 человек требуют разных режимов. Инженерное оборудование не должно мешать акустике, архитектуре и работе общественных помещений.",
    solutionLead: "Каждую зону рассчитали отдельно.",
    solution: "Рассчитали систему отопления, подобрали оборудование кондиционирования, разместили внутренние блоки и согласовали трассы с планировкой здания.",
    resultLead: "Система готова к разным сценариям эксплуатации.",
    result: "Температура остаётся стабильной и в обычный день, и при полном зрительном зале. Размещение приборов и подключений зафиксировано в документации.",
    metric: "350 мест",
    metricText: "учтены в расчётном режиме загрузки",
    media: [
      { src: `${details}/culture-heating-axon-main.png`, label: "Отопление · аксонометрическая схема" },
      { src: `${details}/culture-heating-plan-main.png`, label: "Отопление · общий план здания" },
      { src: `${details}/culture-heating-plan-upper.png`, label: "Отопление · план верхнего уровня" },
      { src: `${details}/culture-ac-lines-k1-k3-k4-k7.png`, label: "Кондиционирование · линии К1, К3, К4 и К7" },
      { src: `${details}/culture-ac-lines-k2-k5-k6.png`, label: "Кондиционирование · линии К2, К5 и К6" },
      { src: `${details}/culture-ac-axon-k1-k7.png`, label: "Кондиционирование · аксонометрические схемы К1–К7", format: "wide" },
    ],
  },
  {
    slug: "sanatorium-utilities",
    number: "04",
    type: "Комплекс зданий",
    title: "Инженерные сети санатория",
    summary: "Капитальный ремонт наружного водоснабжения и тепловых сетей комплекса зданий на территории со сложным рельефом.",
    facts: ["комплекс зданий", "2 вида сетей", "генплан + профили"],
    scope: "ТС · НВ",
    image: `${details}/sanatorium-combined-masterplan.png`,
    statement: "Сети проходят через весь комплекс без конфликтов",
    challengeLead: "Новые трассы нужно встроить в действующую территорию.",
    challenge: "Между корпусами уже проходят коммуникации, дороги и существующие каналы. Для каждой линии требовалось проверить отметки, пересечения и точки подключения.",
    solutionLead: "Водоснабжение и теплоснабжение свели на одном генеральном плане.",
    solution: "Разработали схемы сетей, продольные профили, тепловые камеры, колодцы и узлы подключения.",
    resultLead: "Монтаж можно вести по участкам и контролировать по отметкам.",
    result: "Документация связывает генеральный план, схемы, профили и узлы. Подрядчик видит маршрут, глубину заложения, уклоны, камеры и пересечения.",
    metric: "2 системы",
    metricText: "увязаны на одной территории",
    media: [
      { src: `${details}/sanatorium-combined-masterplan.png`, label: "Генеральный план инженерных сетей" },
      { src: `${details}/sanatorium-water-masterplan.png`, label: "Водоснабжение · генеральный план территории" },
      { src: `${details}/sanatorium-water-scheme.png`, label: "Водоснабжение · схема наружной сети" },
      { src: `${details}/sanatorium-water-nodes.png`, label: "Водоснабжение · узлы и характерные фрагменты" },
      { src: `${details}/sanatorium-water-profile-bc1-bc2.png`, label: "Водоснабжение · профиль линий ВС1 и ВС2", format: "wide" },
      { src: `${details}/sanatorium-water-profile-bc3-bc4.png`, label: "Водоснабжение · профиль линий ВС3 и ВС4", format: "wide" },
      { src: `${details}/sanatorium-water-profile-bc5-bc7.png`, label: "Водоснабжение · профили линий ВС5 и ВС7", format: "wide" },
      { src: `${details}/sanatorium-heating-scheme.png`, label: "Тепловые сети · схема комплекса" },
      { src: `${details}/sanatorium-heating-nodes.png`, label: "Тепловые сети · камера и характерные узлы" },
      { src: `${details}/sanatorium-heating-profile-ts3.png`, label: "Тепловые сети · профиль линии ТС3", format: "wide" },
      { src: `${details}/sanatorium-heating-profile-ts4-ts5.png`, label: "Тепловые сети · профили линий ТС4 и ТС5", format: "wide" },
      { src: `${details}/sanatorium-heating-profile-ts6-ts7.png`, label: "Тепловые сети · профили линий ТС6 и ТС7", format: "wide" },
    ],
  },
  {
    slug: "rcnn-renovation",
    number: "05",
    type: "Научно-исследовательский центр",
    title: "Капитальный ремонт помещений ФГБНУ РЦНН",
    summary: "Вентиляция помещений в существующем здании: оборудование, отверстия, трассы и монтажные решения.",
    facts: ["4 помещения", "П1 · В1", "5 листов"],
    scope: "ОВ · координация",
    image: `${details}/rcnn-ventilation-plan.png`,
    statement: "Вентиляция встроена в существующую планировку",
    challengeLead: "Новые воздуховоды нужно было провести в уже сложившихся помещениях.",
    challenge: "Планировка, наружные стены и существующие трубопроводы ограничивали размещение оборудования, проходов и точек подключения.",
    solutionLead: "Приточную и вытяжную системы разработали как единый комплект.",
    solution: "Разместили установку, воздуховоды и воздухораспределители, рассчитали расходы воздуха и диаметры. Отдельным планом зафиксировали отверстия и монтажные отметки.",
    resultLead: "Строительные и монтажные работы связаны между собой.",
    result: "На планах и аксонометрических схемах видны оборудование, трассы П1 и В1, диаметры, расходы воздуха, проходы через конструкции и подключения.",
    metric: "2 системы",
    metricText: "приточная П1 и вытяжная В1 разработаны совместно",
    media: [
      { src: `${details}/rcnn-ventilation-plan.png`, label: "План систем вентиляции П1 и В1" },
      { src: `${details}/rcnn-equipment-layout.png`, label: "План размещения отопительного оборудования" },
      { src: `${details}/rcnn-ventilation-openings.png`, label: "План отверстий для вентиляции" },
      { src: `${details}/rcnn-supply-axon.png`, label: "Приточная система П1 · аксонометрическая схема", format: "wide" },
      { src: `${details}/rcnn-exhaust-axon.png`, label: "Вытяжная система В1 · аксонометрическая схема", format: "wide" },
    ],
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
