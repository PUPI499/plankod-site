import records from "./items.json";
export type Product = {slug:string;brand:string;manufacturer?:string;supplierSource?:string;name:string;description:string;image:string;gallery?:string[];purpose:string[];protocols:string[];platforms:string[];specs:Record<string,string>;compatibility:string[];scenarios:string[];documents?:{title:string;url:string}[];video?:string;price:number|null;introduced?:string;source:string};
export const products = records as Product[];
export const brands = [
 {slug:"rubetek",name:"Rubetek",kind:"Производитель",description:"Rubetek выпускает оборудование для умного дома: датчики безопасности, устройства управления электропитанием и видеонаблюдения. Решения подбираются под задачи квартиры или частного дома. В каталоге представлены датчики RF 868 МГц и совместимый блок управления. Для работы датчиков нужен хаб; одинаковое название экосистемы не означает совместимость любых поколений устройств.",audience:"Квартиры и частные дома",source:"https://shop.rubetek.com/catalog/"},
 {slug:"wiren-board",name:"Wiren Board",kind:"Производитель",description:"Wiren Board разрабатывает контроллеры на Linux и модули для автоматизации и мониторинга. В основе проводной системы — контроллер и периферия Modbus RTU. Открытое программное обеспечение позволяет настраивать логику под объект. Подключение Zigbee, Z-Wave и KNX зависит от дополнительных интерфейсов, шлюзов и программной настройки; это не встроенная возможность каждой модели.",audience:"Интеграторы, владельцы частных домов, коммерческие объекты",source:"https://wirenboard.com/ru/"},
 {slug:"knx24",name:"KNX24",kind:"Поставщик",description:"KNX24 — поставщик оборудования разных производителей и образовательная платформа по умным системам. В каталоге представлены устройства KNX, панели управления, исполнительные модули и другие компоненты. KNX24 не является производителем всех этих устройств: в карточке важно учитывать конкретную марку и модель. Комплектацию KNX-системы подбирают по функциям, интерфейсам и проектным требованиям.",audience:"Интеграторы, владельцы больших домов, коммерческие объекты",source:"https://knx24.com/offers/about-us/"},
 {slug:"cleverhome",name:"CleverHome",kind:"Раздел в подготовке",description:"Ассортимент будет опубликован после подтверждения производителя и документации.",audience:"Уточняется",source:""}
];
export const priceText=(p:Product)=>p.price===null?"Стоимость по запросу":new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB",maximumFractionDigits:0}).format(p.price);
export const productHref=(p:Product)=>"/products/"+p.slug+"/";
export const brandHref=(slug:string)=>"/brands/"+slug+"/";
export const purposes=["Безопасность","Климат","Освещение","Контроллеры и модули"];
export const protocols=["Wi-Fi","Zigbee","Z-Wave","KNX","Modbus RTU","RF 868 МГц"];
export const platforms=["Алиса","HomeKit","MQTT","KNX-шина"];
