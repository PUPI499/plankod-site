import type { Metadata } from "next";

export const smartDirections = [
  {
    slug: "hotels", name: "Гостиницы и отели", kicker: "Гостиничная эксплуатация",
    title: "Управление инженерией действующей гостиницы",
    description: "Уточняем, как гость управляет климатом в номере и какие состояния нужны дежурному инженеру. На типовом номере определяем совместимые устройства и порядок работ в заселённом здании.",
    short: "Климат номера, освещение общих зон и доступные персоналу сигналы.",
    features: ["Номерной фонд", "Служба эксплуатации"],
    image: "/images/smart-systems/hotels-v2.webp", mobile: "/images/smart-systems/hotels-v2-mobile.webp", card: "/images/smart-systems/hotels-v2-card.webp",
    seoTitle: "Автоматизация инженерных систем действующих гостиниц и отелей | ПЛАНКОД",
    seoDescription: "Обследование номеров и общих зон гостиницы, подбор совместимых устройств, монтаж и настройка согласованных режимов климата и света."
  },
  {
    slug: "sanatoriums", name: "Санатории и пансионаты", kicker: "Инженерия комплекса",
    title: "Автоматизация инженерии санаториев и пансионатов",
    description: "Корпуса одного комплекса могут иметь разные тепловые узлы, графики работы и оборудование. Выясняем, какие параметры полезно видеть дежурной службе и где управление должно остаться местным.",
    short: "Согласуем работу инженерии спальных, административных и общественных корпусов.",
    features: ["Корпуса и зоны", "Режимы эксплуатации"],
    image: "/images/design/case-sanatorium-utilities-v1.webp", mobile: "/images/design/case-sanatorium-utilities-v1.webp", card: "/images/design/case-sanatorium-utilities-v1.webp",
    seoTitle: "Автоматизация инженерии санаториев и пансионатов | ПЛАНКОД",
    seoDescription: "Оценка возможности модернизации инженерных систем корпусов санатория или пансионата. Обследование узлов, согласование режимов и этапов внедрения."
  },
  {
    slug: "medical", name: "Медицинские учреждения", kicker: "Работающее учреждение",
    title: "Модернизация инженерного управления в медицинском учреждении",
    description: "Для больниц, медицинских центров, родильных домов и специализированных отделений сначала определяем допустимые границы вмешательства вместе с ответственными службами учреждения.",
    short: "Согласуем изменения с учётом назначения помещений, санитарного режима и непрерывности работы.",
    features: ["Допустимые функции", "Порядок доступа"],
    image: "/images/smart-systems/clinic-exterior.webp", mobile: "/images/smart-systems/clinic-exterior-mobile.webp", card: "/images/smart-systems/clinic-exterior-card.webp",
    seoTitle: "Автоматизация инженерных систем медицинских учреждений | ПЛАНКОД",
    seoDescription: "Оценка допустимых функций управления инженерией больниц, родильных домов и специализированных отделений. Исходные данные, ограничения и согласование работ."
  },
  { slug: 'equipment', name: 'Оборудование', kicker: '03 / Комплектация', title: 'Оборудование для интеллектуального управления зданиями', description: 'Подбор решений существующих производителей с учётом функций, совместимости и технических особенностей объекта.', short: 'Контроллеры, панели, датчики и устройства управления. Подбор под техническую задачу.', features: ['Подбор и поставка', 'Запрос по списку'], image: '/images/smart-systems/equipment-v2.webp', mobile: '/images/smart-systems/equipment-v2-mobile.webp', card: '/images/smart-systems/equipment-v2-card.webp', seoTitle: 'Оборудование для автоматизации зданий — подбор и поставка | ПЛАНКОД', seoDescription: 'Контроллеры, шлюзы, панели, термостаты и датчики для интеллектуального управления зданиями. Подбор по функциям и совместимости, запрос стоимости оборудования.' },
  { slug: 'design', name: 'Проект автоматизации', kicker: '04 / Инженерия', title: 'Проектирование интеллектуальных систем управления зданием', description: 'Для действующего здания организации разрабатываем сценарии, схему связей и требования к оборудованию. По согласованному заданию готовим документацию для дальнейшей реализации.', short: 'Самостоятельная инженерная услуга: от задачи объекта до технической документации.', features: ['Архитектура системы', 'Координация инженерии'], image: '/images/smart-systems/design-v2.webp', mobile: '/images/smart-systems/design-v2-mobile.webp', card: '/images/smart-systems/design-v2-card.webp', seoTitle: 'Проектирование автоматизации инженерных систем | ПЛАНКОД', seoDescription: 'Проект автоматизации коммерческого или общественного здания: архитектура управления, сценарии, размещение устройств и связи с инженерными системами.' },
] as const;
export type SmartSlug = typeof smartDirections[number]["slug"];
export type SmartService = "b2b_supply" | "equipment" | "smart_design";
export const serviceBySlug: Record<SmartSlug, SmartService> = {
  hotels: "b2b_supply", sanatoriums: "b2b_supply", medical: "b2b_supply",
  equipment: "equipment", design: "smart_design"
};
export const smartHub = {
  title: "Автоматизация инженерных систем действующих зданий | ПЛАНКОД",
  description: "Обследование, проектирование и внедрение систем управления в эксплуатируемых зданиях организаций. Совместимость оборудования, этапы модернизации и условия приёмки."
};
export function smartMetadata(slug?: SmartSlug): Metadata {
 const item=smartDirections.find(x=>x.slug===slug);
 const title=item?.seoTitle || smartHub.title, description=item?.seoDescription || smartHub.description;
 const url=`/smart-systems/${slug ? slug+'/' : ''}`;
 return {title,description,alternates:{canonical:url},openGraph:{title,description,url,type:'website',images:[{url:item?.image || '/images/smart-systems/hub-v2.webp',alt:'ПЛАНКОД — инженерная автоматизация; концептуальная визуализация'}]},twitter:{card:'summary_large_image',title,description,images:[item?.image || '/images/smart-systems/hub-v2.webp']}};
}
export const equipmentCategories = [
 ['controllers','Контроллеры и шлюзы','Логика управления и связь между совместимыми устройствами.','Число каналов, интерфейсы и архитектура сети'],
 ['climate','Термостаты и климатические контроллеры','Регулирование температуры и согласованные климатические режимы.','Тип отопления, кондиционирования и управляющих сигналов'],
 ['panels','Панели управления','Понятный интерфейс для гостя, владельца или управляющего.','Функции, монтаж и совместимость с платформой'],
 ['relays','Умные выключатели и реле','Управление освещением и электрическими нагрузками.','Нагрузка, питание и способ подключения'],
 ['sensors','Датчики','Данные о присутствии, температуре, открытии и протечках.','Назначение, размещение и связь с контроллером'],
 ['curtains','Электроприводы штор','Управление шторами с панели, по расписанию или сценарию.','Карниз, питание и интерфейс управления'],
 ['fancoils','Управление фанкойлами','Оборудование регулирования работы совместимых фанкойлов.','Схема клапанов, скорости вентилятора и сигналы'],
 ['rooms','Управление гостиничными номерами','Устройства для объединения функций отдельного номера.','Сценарии, архитектура номера и требования эксплуатации'],
 ['integration','Связь и интеграция систем','Интерфейсы и оборудование обмена данными между системами.','Протоколы, лицензии и ограничения платформ'],
] as const;
// Publication contract for future VERIFIED manufacturer records. No fictitious inventory.
export type ConfirmedEquipment = { manufacturer:string; model:string; photo:string; purpose:string; specifications:Record<string,string>; protocols:string[]; connectionRequirements:string; compatibility:string; documentationUrl:string; availability:string; sourceUrl:string; verifiedOn:string; mediaPermission:string };
export const confirmedEquipment: ConfirmedEquipment[] = [];
