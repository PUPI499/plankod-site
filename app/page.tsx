/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages -- static Hostland routes */
import { SiteFooter, SiteHeader } from "./components";
import { SmartInquiry } from "./smart-systems/inquiry";
import { HomeCarousel } from "./home-carousel";
import { ArrowIcon } from "./arrow-icon";

const title = "Автоматизация действующих зданий и проектирование ОВиК | ПЛАНКОД";
const description = "Автоматизация инженерных систем организаций от обследования до пусконаладки. Проектирование вентиляции, отопления и кондиционирования как отдельная услуга.";
export const metadata = { title, description, alternates: {canonical: "/"}, openGraph: {title, description, images:["/images/design/hub-v1.webp"]}, twitter: {title, description, images:["/images/design/hub-v1.webp"]} };

const segments = [
  ["hotels","Гостиницы и отели","Управление климатом и светом в номерах с учётом заселения, уборки и доступа службы эксплуатации.","/images/smart-systems/hotels-v2-card.webp"],
  ["sanatoriums","Санатории и пансионаты","Режимы по корпусам и зонам, контроль состояния оборудования и согласование работ с графиком учреждения.","/images/design/case-sanatorium-utilities-v1.webp"],
  ["medical","Медицинские учреждения","Допустимые функции автоматики, условия доступа и порядок испытаний в работающих отделениях.","/images/smart-systems/clinic-exterior-card.webp"]
];
const drawings = [
  ["food-block-ventilation","Пищеблок","План вентиляции первого этажа","food-block-floor1-combined.png"],
  ["laundry-ventilation","Прачечная","Аксонометрия приточной системы","laundry-axon-supply-p1.png"],
  ["culture-house-climate","Дом культуры","План системы отопления","culture-heating-plan-main.png"]
];
export default function Home() {
  return <main className="engineering-home b2b-home"><SiteHeader active="home" />
    <HomeCarousel />
    <section className="shell b2b-block"><h2>Как работает ваше здание?</h2><p className="b2b-intro">Начинаем с режима эксплуатации. В номере важно переключать климат при смене режима, в корпусе санатория — видеть состояние установок, в больнице — согласовать вмешательство с ответственными службами.</p>
      <div className="b2b-grid">{segments.map(([slug,name,copy,image])=><a key={slug} className="b2b-card" href={'/smart-systems/'+slug+'/'}><img loading="lazy" src={image} alt=""/><div><h3>{name} <ArrowIcon/></h3><p>{copy}</p></div></a>)}</div></section>
    <section className="b2b-dark"><div className="shell b2b-split"><div><p className="micro-label">Модернизация</p><h2>Что можно сохранить из действующей системы?</h2></div><div><p>Если у вентиляционной установки есть доступный интерфейс управления, инженер проверит, какие команды она принимает и какие сигналы возвращает. Это определяет, сможет ли дежурный видеть состояние установки и менять режим в согласованных пределах.</p><p>Для оценки пригодятся схема, модели оборудования и описание ручных операций. Если данных недостаточно, согласуем обследование. Затем предложим состав работ, порядок переключений и проверки вместе со службой эксплуатации.</p><a href="/smart-systems/">Возможности и этапы автоматизации <ArrowIcon direction="right"/></a></div></div></section>
    <section className="shell b2b-block"><p className="micro-label">Самостоятельная услуга</p><h2>Проектирование ОВиК</h2><p className="b2b-intro">Для строительства, реконструкции и капитального ремонта готовим расчёты и рабочие чертежи. Можно заказать один раздел или согласовать несколько систем в общем проекте.</p><div className="b2b-trades">{[["ventilation","Вентиляция","Воздухообмен, местные отсосы и трассы воздуховодов."],["heating","Отопление","Тепловые нагрузки, приборы и разводка трубопроводов."],["air-conditioning","Кондиционирование","Холодопроизводительность, размещение блоков и отвод конденсата."],["integrated","Координация разделов","Отметки трасс, отверстия в конструкциях и задания на питание."]].map(([slug,name,copy])=><a href={'/design/'+slug+'/'} key={slug}><h3>{name}</h3><p>{copy}</p><ArrowIcon/></a>)}</div></section>
    <section className="shell b2b-block"><h2>Из проектной документации</h2><div className="b2b-grid b2b-drawings">{drawings.map(([slug,name,caption,file])=><a className="b2b-card" key={slug} href={'/projects/'+slug+'/'}><img loading="lazy" src={'/images/projects/details/'+file} alt={caption}/><div><h3>{name} <ArrowIcon/></h3><p>{caption}</p></div></a>)}</div></section>
    <div className="ss-page home-smart-inquiry"><SmartInquiry hub /></div><SiteFooter/></main>;
}
