/** Concept art is separate from real project documentation. */
export const engineeringArt = (slug: string) => ({
 image: "/images/design/" + slug + "-v1.webp",
 mobileImage: "/images/design/" + slug + "-mobile-v1.webp",
 cardImage: "/images/design/" + slug + "-card-v1.webp",
});
export const disciplineNotes: Record<string, {code:string;focus:string;drawing?:string;drawingLabel?:string;project?:string}> = {
 heating:{code:"ТЕПЛО",focus:"Теплопотери → приборы → гидравлика",drawing:"culture-heating-axon-main.png",drawingLabel:"Дом культуры · схема отопления",project:"culture-house-climate"},
 ventilation:{code:"ВОЗДУХ",focus:"Воздухообмен → оборудование → трассы",drawing:"laundry-axon-supply-network.png",drawingLabel:"Прачечная · схема приточной вентиляции",project:"laundry-ventilation"},
 "air-conditioning":{code:"ХОЛОД",focus:"Теплопоступления → система → размещение",drawing:"culture-ac-axon-k1-k7.png",drawingLabel:"Дом культуры · схемы кондиционирования",project:"culture-house-climate"},
 hvac:{code:"ОВиК",focus:"Отопление · вентиляция · кондиционирование",drawing:"food-block-floor1-combined.png",drawingLabel:"Пищеблок · фрагмент раздела вентиляции",project:"food-block-ventilation"},
 "water-supply":{code:"ВОДА",focus:"Расходы → подключения → сети",drawing:"sanatorium-water-scheme.png",drawingLabel:"Комплекс зданий · схема наружного водоснабжения",project:"sanatorium-utilities"},
 "power-supply":{code:"ЭНЕРГИЯ",focus:"Нагрузки → распределение → подключения",drawing:"laundry-equipment-control.png",drawingLabel:"Прачечная · элементы управления инженерным оборудованием",project:"laundry-ventilation"},
 integrated:{code:"КООРДИНАЦИЯ",focus:"Разделы → связи → единый комплект",drawing:"food-block-floor1-supply.png",drawingLabel:"Пищеблок · план приточной системы из комплекта проекта",project:"food-block-ventilation"},
 reconstruction:{code:"ОБНОВЛЕНИЕ",focus:"Существующее здание → новые решения",drawing:"rcnn-ventilation-openings.png",drawingLabel:"Медицинские помещения · план отверстий для вентиляции",project:"rcnn-renovation"},
 "heat-points":{code:"ИТП",focus:"Тепловая схема → оборудование → документация"}
};

/** Deliverables restate the existing service scope, subject to the agreed assignment. */
export const engineeringDeliverables: Record<string,string[]> = {
 heating:["Расчётные теплопотери и параметры системы","Планы и схемы отопления","Спецификация приборов, оборудования и материалов"],
 ventilation:["Расчётные расходы воздуха по помещениям","Планы воздуховодов и аксонометрические схемы","Спецификация оборудования и задания смежным разделам"],
 "air-conditioning":["Расчёт теплопоступлений и требуемой мощности","Планы блоков, магистралей и дренажа","Спецификация и задания по электропитанию"],
 hvac:["Расчёты систем отопления, вентиляции и кондиционирования","Согласованные планы, схемы и узлы","Спецификации и задания смежным специалистам"],
 "water-supply":["Расчётные расходы воды и параметры сетей","Планы и схемы; профили наружных сетей — по заданию","Спецификации оборудования и материалов"],
 "power-supply":["Расчёт электрических нагрузок","Схемы распределения, планы освещения и кабельных трасс","Спецификации по согласованному составу"],
 integrated:["Комплект согласованных инженерных разделов","Расчёты, планы и схемы по техническому заданию","Спецификации и задания смежным разделам"],
 reconstruction:["Решения по сохраняемым и заменяемым участкам","Расчёты, планы и схемы новых систем","Согласованные спецификации по разделам"],
 "heat-points":["Тепловой и гидравлический расчёт","Комплект проектной и рабочей документации по заданию","КИПиА, электроснабжение и узел учёта — в согласованном составе"]
};
