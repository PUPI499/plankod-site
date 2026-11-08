import {TaskKits} from "./products/kits";
import { HomeBrands } from "./products/brands";
import { SmartLink, SmartHeading, DirectionCards } from "./smart-systems/sections";
import { SmartInquiry } from "./smart-systems/inquiry";
import { HomeCarousel } from "./home-carousel";
import { ArrowIcon } from "./arrow-icon";
/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages -- the static and hosted builds share direct paths */
import type { Metadata } from "next";
import { SiteFooter, SiteHeader } from "./components";

export const metadata: Metadata = {
  title: "ПЛАНКОД — умные системы и инженерное проектирование",
  description: "Умные системы для гостиниц, бизнеса и частных домов. Подбор и поставка оборудования, проектирование автоматизации и инженерных систем зданий.",
  alternates: { canonical: "/" },
  openGraph: { title: "ПЛАНКОД — умные системы и инженерное проектирование", description: "Умные системы для гостиниц, бизнеса и частных домов. Подбор и поставка оборудования, проектирование автоматизации и инженерных систем зданий.", images: ["/og.png"] },
  twitter: { title: "ПЛАНКОД — умные системы и инженерное проектирование", description: "Умные системы для гостиниц, бизнеса и частных домов. Подбор и поставка оборудования, проектирование автоматизации и инженерных систем зданий.", images: ["/og.png"] },
};

const systems = [
  ["Вентиляция", "Приточные, вытяжные и комбинированные системы для жилых, коммерческих и производственных объектов."],
  ["Отопление", "Расчёт и проектирование системы отопления с учётом характеристик объекта и других инженерных решений."],
  ["Кондиционирование", "Проектирование климатических систем и размещение оборудования с учётом архитектуры объекта."],
  ["Электроснабжение", "Инженерные решения для электропитания и связанного оборудования объекта."],
  ["Водоснабжение и канализация", "Внутренние и наружные сети с учётом расходов, точек подключения и условий объекта."],
];
const systemPaths = ["ventilation", "heating", "air-conditioning", "power-supply", "water-supply"];
const objects = [
  ["Частные дома", "Инженерные системы жилого пространства."],
  ["Коммерческие объекты", "Инженерия помещений и зданий для бизнеса."],
  ["Общественные объекты", "Проектирование инженерных систем общественных зданий."],
  ["Производственные объекты", "Вентиляция, отопление, климат и связанные инженерные решения."],
];
// Use existing drawings and project routes, without importing unverified metrics or deadlines.
const featured = [
  { slug: "laundry-ventilation", title: "Прачечная", scope: "Вентиляция", description: "Аксонометрии, планы приточных и вытяжных систем, элементы управления." },
  { slug: "food-block-ventilation", title: "Пищеблок", scope: "Вентиляция", description: "Планы вентиляции по этажам и аксонометрия инженерных систем." },
  { slug: "culture-house-climate", title: "Дом культуры", scope: "Отопление · Кондиционирование", description: "Планы отопления, размещение оборудования и схемы кондиционирования." },
];
const steps = [
  ["Получаем исходные данные", "План объекта, размеры, назначение помещений, пожелания и имеющиеся данные об оборудовании."],
  ["Определяем состав проекта", "Разбираемся в задаче и формируем предложение по необходимым инженерным разделам."],
  ["Проектируем", "Расчёты, планы, схемы, спецификации и координация инженерных решений."],
  ["Передаём документацию", "Заказчик получает подготовленный проект для дальнейшей реализации."],
];
const questions = [
  ["Для каких объектов подходят умные системы?", "Подбираем решения для гостиниц, коммерческих пространств и частных домов. Функции и состав оборудования определяем по задачам и инфраструктуре объекта."],
  ["Можно заказать оборудование без проекта?", "Да. Подбор и поставка оборудования — отдельное направление. Пришлите список позиций или опишите нужные функции: уточним совместимость, комплектацию, стоимость и условия поставки."],
  ["Можно заказать только проект умного дома?", "Да. Проектирование интеллектуальных систем — самостоятельная услуга. Разрабатываем архитектуру управления, сценарии и документацию в согласованном составе."],
  ["Можно добавить управление в уже готовом здании?", "Возможность зависит от существующих систем, проводки, интерфейсов оборудования и ограничений помещений. Сначала изучим исходные данные и определим подходящие решения."],
  ["Что подготовить для обсуждения?", "План объекта, его назначение, площадь или количество номеров, этап строительства и желаемые функции. Для оборудования можно прислать перечень моделей и количество."],
  ["Вы продолжаете проектировать инженерию зданий?", "Да. Отопление, вентиляция, кондиционирование, водоснабжение, электроснабжение и ИТП остаются отдельными направлениями. Состав проекта определяем по техническому заданию."]
];

export default function Home() {
  return (
    <main className="engineering-home">
      <SiteHeader active="home" />
      <HomeCarousel />

      <section className="ss-page ss-section shell home-smart-directions" id="smart-home">
        <SmartHeading number="01" tag="Умные системы" title={<>Управление зданием<br /><em>по задачам объекта.</em></>} text="Оснащаем гостиницы, коммерческие пространства и частные дома интеллектуальными системами. Подбираем оборудование существующих производителей и разрабатываем проектные решения под задачи объекта." />
        <DirectionCards explicitDesign />
        <div className="home-smart-caption"><span>Иллюстрации направлений — концептуальные визуализации.</span><SmartLink href="/smart-systems/" quiet>Все возможности умных систем</SmartLink></div>
      </section>

      <section className="home-approach shell home-section" id="approach">
        <div className="section-head"><div><span className="section-number">02</span><p>Инженерный подход</p></div><h2>Инженерные системы<br /><em>не существуют отдельно.</em></h2></div>
        <div className="home-approach-grid">
          <div className="home-approach-copy"><p>Вентиляционной установке нужны место, питание и доступ для обслуживания. Эти требования отражаются сразу в нескольких разделах проекта.</p><p>Сопоставляем отметки воздуховодов с конструкциями и соседними трассами, передаём нагрузки проектировщику электроснабжения. Так расхождения можно обнаружить до выпуска чертежей.</p><a href="/design/integrated/">Как проектируем несколько разделов вместе →</a></div>
          <div className="home-system-map panel"><span className="micro-label">Состав проекта — по задачам объекта</span><div className="home-map-core">ПЛАН <i>◆</i> КОД</div><div className="home-map-systems">{systems.map(([title], index) => <a key={title} href={`#system-${index + 1}`}><span>0{index + 1}</span>{title}<b><ArrowIcon direction="up-right" /></b></a>)}</div></div>
        </div>
      </section>

      <section className="home-directions home-section" id="design"><div className="shell">
        <div className="section-head inverse-head"><div><span className="section-number">03</span><p>Проектирование</p></div><h2>Проектируем системы,<br />которые должны <em>работать вместе.</em></h2></div>
        <div className="home-system-list">{systems.map(([title, description], index) => <article id={`system-${index + 1}`} key={title}><span>0{index + 1}</span><h3><a href={`/design/${systemPaths[index]}/`}>{title} <ArrowIcon direction="up-right" /></a></h3><p>{description}</p></article>)}</div><div className="home-design-route"><a href="/design">Все направления проектирования <ArrowIcon direction="right" /></a><span>ОВиК · ВК · ЭОМ · ИТП · Комплексные решения</span></div>
      </div></section>

      <section className="home-section shell" id="objects">
        <div className="section-head"><div><span className="section-number">04</span><p>Объекты</p></div><h2>От частного дома<br /><em>до производственного объекта.</em></h2></div>
        <div className="home-object-grid">{objects.map(([title, description], index) => <article className={`proof-card panel ${index === 0 ? "dark-proof" : ""}`} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>

      <section className="home-portfolio home-section" id="projects"><div className="shell">
        <div className="section-head inverse-head"><div><span className="section-number">05</span><p>Проекты</p></div><h2>Проектные решения<br /><em>на рабочих чертежах.</em></h2></div>
        <p className="home-section-lead">Планы, аксонометрии и схемы из проектной документации ПЛАНКОД.</p>
        <div className="home-project-grid">{featured.map(project => <article className="home-project-card panel" key={project.slug}><div className="home-project-image"><img src={`/images/design/case-${project.slug}-v1.webp`} alt={`${project.title} — визуализация объекта`} loading="lazy" /><span className="home-project-disclaimer">Концептуальная визуализация объекта</span></div><div className="home-project-copy"><span className="micro-label">Инженерное проектирование</span><h3>{project.title}</h3><span className="home-project-scope">{project.scope}</span><p>{project.description}</p><a href={`/projects/${project.slug}/`}><strong>Смотреть проект <ArrowIcon direction="up-right" /></strong></a><a className="project-discuss" data-goal="discuss_project" href={`/projects/${project.slug}/#contact`}>Обсудить похожий объект <ArrowIcon direction="up-right" /></a></div></article>)}</div>
      </div></section>

      <HomeBrands /><TaskKits />
      <section className="home-section shell" id="result">
        <div className="section-head"><div><span className="section-number">06</span><p>Документация</p></div><h2>Что получает<br /><em>технический заказчик.</em></h2></div>
        <div className="home-result-grid">
          <article><span>01</span><h3>Согласованные решения</h3><p>На планах видны места установки оборудования, проходы и трассы коммуникаций.</p></article>
          <article><span>02</span><h3>Проектная документация</h3><p>Планы, схемы, расчёты, спецификации и необходимые материалы для конкретного проекта.</p></article>
          <article><span>03</span><h3>Задания смежным разделам</h3><p>Электрические нагрузки, проёмы и точки подключения фиксируем в согласованном составе проекта.</p></article>
        </div>
        <div className="home-document-grid">
          <a href="/projects/laundry-ventilation/"><img src="/images/projects/details/laundry-basement-combined.png" alt="Прачечная — общий план вентиляции" loading="lazy" /><span>01 / Прачечная · План вентиляции <ArrowIcon direction="up-right" /></span></a>
          <a href="/projects/food-block-ventilation/"><img src="/images/projects/details/food-block-floor1-combined.png" alt="Пищеблок — план вентиляции первого этажа" loading="lazy" /><span>02 / Пищеблок · План вентиляции <ArrowIcon direction="up-right" /></span></a>
          <a href="/projects/culture-house-climate/"><img src="/images/projects/details/culture-heating-plan-main.png" alt="Дом культуры — план отопления" loading="lazy" /><span>03 / Дом культуры · План отопления <ArrowIcon direction="up-right" /></span></a>
        </div>
      </section>

      <section className="steps-section shell" id="install"><div className="section-head"><div><span className="section-number">07</span><p>Процесс проектирования</p></div><h2>От плана объекта<br /><em>до готовой документации.</em></h2></div><div className="steps-grid">{steps.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>

      <section className="home-about shell" id="about"><div className="home-about-label panel"><span className="micro-label">08 / ПЛАНКОД</span><div className="plan-code-mark"><span>ПЛАН</span><i>◆</i><span>КОД</span></div><p>Умные системы<br />Оборудование<br />Инженерное проектирование</p></div><div className="company-story panel"><h2>Технологии понятнее,<br /><em>когда за ними — инженеры.</em></h2><p>ПЛАНКОД — инженерная компания. Проектируем системы зданий и интеллектуальное управление, подбираем и поставляем оборудование для гостиниц, бизнеса и частных домов. Каждое решение связываем с задачами объекта и требованиями к совместимости.</p><div className="company-links"><a href="/about">Подробнее о ПЛАНКОД <ArrowIcon direction="up-right" /></a></div></div></section>

      <section className="faq-section shell"><div className="faq-title"><span className="section-number">09</span><h2>Вопросы<br /><em>до начала работы.</em></h2></div><div className="faq-list">{questions.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<b>+</b></summary><p>{answer}</p></details>)}</div></section>
      <div className="home-contact-route shell"><span>Нужен проект отопления, вентиляции, воды или электроснабжения?</span><SmartLink href="/design#contact" quiet>Обсудить инженерный проект</SmartLink></div>
      <div className="ss-page home-smart-inquiry"><SmartInquiry hub /></div>
      <SiteFooter />
    </main>
  );
}
