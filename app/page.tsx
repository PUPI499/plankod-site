/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages -- the static and hosted builds share direct paths */
import { ContactBand, SiteFooter, SiteHeader } from "./components";

const systems = [
  ["Вентиляция", "Приточные, вытяжные и комбинированные системы для жилых, коммерческих и производственных объектов."],
  ["Отопление", "Расчёт и проектирование системы отопления с учётом характеристик объекта и других инженерных решений."],
  ["Кондиционирование", "Проектирование климатических систем и размещение оборудования с учётом архитектуры объекта."],
  ["Электроснабжение", "Инженерные решения для электропитания и связанного оборудования объекта."],
  ["Автоматизация", "Управление инженерными системами и сценариями — там, где автоматизация действительно нужна."],
];
const objects = [
  ["Частные дома", "Инженерные системы и автоматизация жилого пространства."],
  ["Коммерческие объекты", "Инженерия помещений и зданий для бизнеса."],
  ["Общественные объекты", "Проектирование инженерных систем общественных зданий."],
  ["Производственные объекты", "Вентиляция, отопление, климат и связанные инженерные решения."],
];
// Use existing drawings and project routes, without importing unverified metrics or deadlines.
const featured = [
  { slug: "laundry-ventilation", title: "Прачечная", image: "laundry-3d-main.png", scope: "Вентиляция", description: "Аксонометрии, планы приточных и вытяжных систем, элементы управления." },
  { slug: "food-block-ventilation", title: "Пищеблок", image: "food-block-3d-main.png", scope: "Вентиляция", description: "Планы вентиляции по этажам и аксонометрия инженерных систем." },
  { slug: "culture-house-climate", title: "Дом культуры", image: "culture-heating-axon-main.png", scope: "Отопление · Кондиционирование", description: "Планы отопления, размещение оборудования и схемы кондиционирования." },
];
const steps = [
  ["Получаем исходные данные", "План объекта, размеры, назначение помещений, пожелания и имеющиеся данные об оборудовании."],
  ["Определяем состав проекта", "Разбираемся в задаче и формируем предложение по необходимым инженерным разделам."],
  ["Проектируем", "Расчёты, планы, схемы, спецификации и координация инженерных решений."],
  ["Передаём документацию", "Заказчик получает подготовленный проект для дальнейшей реализации."],
];
const questions = [
  ["Можно заказать только проект?", "Да. Проектирование — самостоятельная услуга и не требует обязательного заказа монтажа."],
  ["Что нужно для начала?", "В первую очередь план объекта, размеры, пожелания и имеющиеся данные об оборудовании. Остальные исходные данные уточним по задаче."],
  ["Вы проектируете только частные дома?", "Нет. Работаем также с коммерческими, общественными и производственными объектами."],
  ["Можно включить умный дом в инженерный проект?", "Да. Состав автоматизации определяется по задачам конкретного объекта."],
  ["От чего зависит стоимость?", "От типа объекта, состава инженерных разделов и объёма проектирования. Стоимость определяется после получения исходных данных."],
];

export default function Home() {
  return (
    <main className="engineering-home">
      <SiteHeader active="home" />
      <section className="hero shell" id="top">
        <div className="hero-copy panel">
          <div className="eyebrow"><span>Инженерное проектирование</span></div>
          <h1>Проектируем<br />инженерию здания<br /><em>как единую систему.</em></h1>
          <p>Вентиляция, отопление, кондиционирование, электроснабжение и автоматизация — согласованные между собой ещё до реализации.</p>
          <div className="hero-actions">
            <a className="primary-button" href="#contact">Обсудить проект <span>↗</span></a>
            <a className="quiet-link" href="#contact">Отправить план объекта ↓</a>
          </div>
          <p className="home-object-strip">Частные дома · Коммерческие · Общественные · Производственные объекты</p>
        </div>
        <div className="hero-system panel" aria-label="Иллюстрация инженерных систем здания">
          <div className="hero-system-header"><span>PLANCOD / ENGINEERING MODEL</span><span>Аксонометрия</span></div>
          <img src="/images/hero-building-clean.webp" alt="Аксонометрическая иллюстрация здания с инженерными системами" className="hero-system-image" fetchPriority="high" />
          <div className="hero-system-footer">
            <div className="hero-system-legend">
              <b>Инженерные разделы</b>
              {["Вентиляция", "Отопление", "Электроснабжение", "Автоматизация"].map((label, index) => <div key={label}><i>0{index + 1}</i><span>{label}</span></div>)}
            </div>
            <div className="hero-system-caption">Один объект. Одна инженерная логика.</div>
          </div>
        </div>
      </section>

      <section className="home-approach shell home-section" id="approach">
        <div className="section-head"><div><span className="section-number">01</span><p>Подход</p></div><h2>Инженерные системы<br /><em>не существуют отдельно.</em></h2></div>
        <div className="home-approach-grid">
          <div className="home-approach-copy"><p>Вентиляция влияет на электроснабжение. Отопление — на автоматику. Кондиционирование — на планировку и размещение оборудования.</p><p>Поэтому мы рассматриваем инженерные системы во взаимосвязи и собираем решения в единый проект.</p><strong>Один объект.<br />Одна инженерная логика.</strong></div>
          <div className="home-system-map panel"><span className="micro-label">Состав проекта — по задачам объекта</span><div className="home-map-core">ПЛАН <i>◆</i> КОД</div><div className="home-map-systems">{systems.map(([title], index) => <a key={title} href={`#system-${index + 1}`}><span>0{index + 1}</span>{title}<b>↗</b></a>)}</div></div>
        </div>
      </section>

      <section className="home-directions home-section" id="design"><div className="shell">
        <div className="section-head inverse-head"><div><span className="section-number">02</span><p>Направления</p></div><h2>Проектируем системы,<br />которые должны <em>работать вместе.</em></h2></div>
        <div className="home-system-list">{systems.map(([title, description], index) => <article id={`system-${index + 1}`} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </div></section>

      <section className="home-section shell" id="objects">
        <div className="section-head"><div><span className="section-number">03</span><p>Объекты</p></div><h2>От частного дома<br /><em>до производственного объекта.</em></h2></div>
        <div className="home-object-grid">{objects.map(([title, description], index) => <article className={`proof-card panel ${index === 0 ? "dark-proof" : ""}`} key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div>
      </section>

      <section className="home-portfolio home-section" id="projects"><div className="shell">
        <div className="section-head inverse-head"><div><span className="section-number">04</span><p>Проекты</p></div><h2>Не галерея.<br /><em>Разбор инженерных решений.</em></h2></div>
        <p className="home-section-lead">Планы, аксонометрии и схемы из проектной документации ПЛАНКОД.</p>
        <div className="home-project-grid">{featured.map(project => <a className="home-project-card panel" href={`/projects/${project.slug}/`} key={project.slug}><div className="home-project-image"><img src={`/images/projects/details/${project.image}`} alt={`${project.title} — ${project.scope.toLowerCase()}, проектная документация`} loading="lazy" /></div><div className="home-project-copy"><span className="micro-label">Инженерное проектирование</span><h3>{project.title}</h3><span className="home-project-scope">{project.scope}</span><p>{project.description}</p><strong>Смотреть проект ↗</strong></div></a>)}</div>
      </div></section>

      <section className="home-section shell" id="result">
        <div className="section-head"><div><span className="section-number">05</span><p>Результат</p></div><h2>Проект — это не красивые схемы.<br /><em>Это основа для реализации.</em></h2></div>
        <div className="home-result-grid">
          <article><span>01</span><h3>Согласованные решения</h3><p>Инженерные системы рассматриваются не отдельно, а во взаимосвязи.</p></article>
          <article><span>02</span><h3>Проектная документация</h3><p>Планы, схемы, расчёты, спецификации и необходимые материалы для конкретного проекта.</p></article>
          <article><span>03</span><h3>Понятная инженерная логика</h3><p>Связи между разделами зафиксированы в документации для дальнейшей реализации.</p></article>
        </div>
        <div className="home-document-grid">
          <a href="/projects/laundry-ventilation/"><img src="/images/projects/details/laundry-basement-combined.png" alt="Прачечная — общий план вентиляции" loading="lazy" /><span>01 / Прачечная · План вентиляции ↗</span></a>
          <a href="/projects/food-block-ventilation/"><img src="/images/projects/details/food-block-floor1-combined.png" alt="Пищеблок — план вентиляции первого этажа" loading="lazy" /><span>02 / Пищеблок · План вентиляции ↗</span></a>
          <a href="/projects/culture-house-climate/"><img src="/images/projects/details/culture-heating-plan-main.png" alt="Дом культуры — план отопления" loading="lazy" /><span>03 / Дом культуры · План отопления ↗</span></a>
        </div>
      </section>

      <section className="scenarios-section shell" id="smart-home">
        <div className="scenario-copy panel"><span className="micro-label">06 / Умный дом</span><h2>Дом управляет инженерией<br /><em>без лишних действий.</em></h2><p>Проектируем объединённое управление климатом, освещением, шторами, защитой от протечек, доступом и видеонаблюдением.</p><p className="home-scenario-note">Состав системы и сценарии определяем по задачам объекта. Проектирование умного дома можно заказать отдельно.</p><a className="quiet-link" href="/smart-home">Подробнее об умном доме ↗</a></div>
        <div className="scenario-board panel"><div className="board-head"><span>Примеры сценариев</span><b>SMART HOME</b></div><div className="scenario-list">
          <article><i>01</i><div><h3>Я ушёл</h3><p>Свет выключен. Вода перекрыта. Безопасность активирована.</p></div><b>→</b></article>
          <article className="active-scenario"><i>02</i><div><h3>Я дома</h3><p>Комфортный свет и климат.</p></div><b>→</b></article>
          <article><i>03</i><div><h3>Спокойная ночь</h3><p>Дом переходит в ночной режим.</p></div><b>→</b></article>
          <article><i>04</i><div><h3>Протечка</h3><p>Вода перекрывается, уведомление отправляется владельцу.</p></div><b>→</b></article>
        </div><p className="home-scenario-disclaimer">Возможности зависят от выбранного оборудования и согласованного состава проекта.</p></div>
      </section>

      <section className="steps-section shell" id="install"><div className="section-head"><div><span className="section-number">07</span><p>Процесс</p></div><h2>От плана объекта<br /><em>до готовой документации.</em></h2></div><div className="steps-grid">{steps.map(([title, description], index) => <article key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{description}</p></article>)}</div></section>

      <section className="home-about shell" id="about"><div className="home-about-label panel"><span className="micro-label">08 / ПЛАНКОД</span><div className="plan-code-mark"><span>ПЛАН</span><i>◆</i><span>КОД</span></div><p>Инженерное проектирование<br />Комплексная координация<br />Умный дом</p></div><div className="company-story panel"><h2>Сначала проект.<br /><em>Потом реализация.</em></h2><p>ПЛАНКОД — инженерная компания. Мы проектируем системы здания и координируем их между собой, чтобы подготовить согласованные решения для реализации.</p><div className="company-links"><a href="/about">Подробнее о ПЛАНКОД ↗</a></div></div></section>

      <section className="faq-section shell"><div className="faq-title"><span className="section-number">09</span><h2>Нормальные<br /><em>сомнения.</em></h2></div><div className="faq-list">{questions.map(([question, answer], index) => <details key={question} open={index === 0}><summary>{question}<b>+</b></summary><p>{answer}</p></details>)}</div></section>
      <ContactBand engineering eyebrow="Начать проект" title={"Пришлите план объекта.\nПредложим состав проекта."} />
      <SiteFooter />
    </main>
  );
}
