import records from "./items.json";
export type Product = {slug:string;brand:string;name:string;description:string;image:string;gallery?:string[];purpose:string[];protocols:string[];platforms:string[];specs:Record<string,string>;compatibility:string[];scenarios:string[];documents?:{title:string;url:string}[];video?:string;price:number|null;introduced?:string;source:string};
export const products = records as Product[];
export const brands = [
 {slug:"rubetek",name:"Rubetek",kind:"Производитель",description:"Устройства для умного дома.",audience:"Квартиры и частные дома",source:"https://shop.rubetek.com/catalog/"},
 {slug:"wiren-board",name:"Wiren Board",kind:"Производитель",description:"Контроллеры и модули автоматизации.",audience:"Интеграторы и владельцы объектов",source:"https://wirenboard.com/ru/"},
 {slug:"knx24",name:"KNX24",kind:"Поставщик",description:"Оборудование для систем KNX.",audience:"Частные и коммерческие объекты",source:"https://knx24.com/offers/about-us/"},
 {slug:"cleverhome",name:"CleverHome",kind:"Раздел в подготовке",description:"Ассортимент будет опубликован после подтверждения производителя и документации.",audience:"Уточняется",source:""}
];
export const priceText=(p:Product)=>p.price===null?"Стоимость по запросу":new Intl.NumberFormat("ru-RU",{style:"currency",currency:"RUB",maximumFractionDigits:0}).format(p.price);
export const productHref=(p:Product)=>"/products/"+p.slug+"/";
export const brandHref=(slug:string)=>"/brands/"+slug+"/";
export const purposes=["Безопасность","Климат","Освещение","Контроллеры и модули"];
export const protocols=["Wi-Fi","Zigbee","Z-Wave","KNX","Modbus RTU","RF 868 МГц"];
export const platforms=["Алиса","HomeKit","MQTT","KNX-шина"];
