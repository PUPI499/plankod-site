import { ArrowIcon } from "./arrow-icon";
/* eslint-disable @next/next/no-html-link-for-pages -- plain anchors keep the downloadable static preview navigable */
import services from "./design/services.json";
import { ContactForm } from "./contact-form";

type SectionName = "home" | "design" | "smart" | "projects" | "products" | "about" | "legal";

const navigation = [
  ["Главная", "/", "home"],
  ["Умный дом", "/smart-home", "smart"],
  ["Проектирование", "/design", "design"],
  ["Продукция", "/products", "products"],
  ["О нас", "/about", "about"],
] as const;

export function SiteHeader({ active = "home" }: { active?: SectionName }) {
  const items = navigation;
  const contactHref = active === "legal" ? "/#contact" : "#contact";
  return (
    <header className="header shell">
      <a className="logo" href="/" aria-label="ПЛАНКОД — главная">
        <span>ПЛАН</span><i /><span>КОД</span>
      </a>
      <nav className="desktop-navigation" aria-label="Основная навигация">
        {items.map(([label, href, key]) => (
          key === "design" ? <div className="design-navigation" key={key}><a className={active === "design" || active === "projects" ? "active-link" : ""} href="/design">Проектирование</a><details className="design-dropdown"><summary aria-label="Направления проектирования"><ArrowIcon direction="chevron-down" /></summary><div className="design-menu"><div><strong>Инженерные системы</strong>{services.slice(0,6).map(s=><a key={s.slug} href={`/design/${s.slug}/`}>{s.name}</a>)}</div><div><strong>Комплексные задачи</strong>{services.slice(6).map(s=><a key={s.slug} href={`/design/${s.slug}/`}>{s.name}</a>)}<a href="/design#directions">Все направления <ArrowIcon direction="right" /></a><a href="/design#portfolio">Примеры проектов <ArrowIcon direction="right" /></a></div></div></details></div> : <a key={key} className={active === key ? "active-link" : ""} aria-current={active === key ? "page" : undefined} href={href}>{label}</a>
        ))}
      </nav>
      <a className="header-button" href={contactHref}>Обсудить проект <span><ArrowIcon direction="up-right" /></span></a>
      <details className="site-menu">
        <summary aria-label="Открыть меню"><i /><i /></summary>
        <nav aria-label="Мобильная навигация">
          {items.map(([label, href, key]) => key === "design" ? <div key={key} className="mobile-design"><a href="/design">Проектирование</a><details><summary>Направления <ArrowIcon direction="chevron-down" /></summary>{services.map(s=><a key={s.slug} href={`/design/${s.slug}/`}>{s.name}</a>)}<a href="/design#portfolio">Примеры проектов</a></details></div> : <a key={href} className={active === key ? "active-link" : ""} aria-current={active === key ? "page" : undefined} href={href}>{label}</a>)}
          <a href={contactHref}>Контакты</a>
        </nav>
      </details>
    </header>
  );
}

export function ContactBand({ eyebrow = "Начать с проекта", title = "Покажите объект.\nМы предложим систему.", engineering = false, context = "" }: { eyebrow?: string; title?: string; engineering?: boolean; context?: string }) {
  const lines = title.split("\n");
  return (
    <section className="contact-section" id="contact">
      <div className="shell contact-layout">
        <div className="contact-copy">
          <span className="micro-label">{eyebrow}</span>
          <h2>{lines.map((line, index) => <span key={line}>{line}{index < lines.length - 1 && <br />}</span>)}</h2>
          <p>{engineering ? "Получим исходные данные, разберём задачу и определим следующий шаг." : "Заполните форму или отправьте планировку в Telegram. Вернёмся с вопросами по существу и предложим следующий шаг."}</p>
          <a href="https://t.me/plancod" target="_blank" rel="noopener noreferrer">Отправить план в Telegram <span><ArrowIcon direction="up-right" /></span></a>
        </div>
        <div className="contact-card panel">
          <div><small>Email</small><strong><a href="mailto:info@plancod.ru">info@plancod.ru</a></strong></div>
          <div><small>Телефон</small><strong><a href="tel:+79518285872">+7 951 828-58-72</a></strong></div>
          <div><small>Мессенджер</small><strong><a href="https://t.me/plancod" target="_blank" rel="noopener noreferrer">Telegram <ArrowIcon direction="up-right" /></a></strong></div>
          {!engineering && <div><small>География</small><strong>Европейская часть России и Урал</strong></div>}
          <ContactForm engineering={engineering} context={context} />
        </div>
      </div>
    </section>
  );
}

export function SiteFooter({ contactHref = "#contact" }: { contactHref?: string }) {
  return (
    <footer className="shell">
      <a className="logo" href="/"><span>ПЛАН</span><i /><span>КОД</span></a>
      <p>Проектирование · координация инженерных систем · умный дом</p>
      <nav aria-label="Навигация в подвале">
        <a href="/">Главная</a>
        <a href="/smart-home">Умный дом</a>
        <a href="/design">Проектирование</a>
        <a href="/design#portfolio">Примеры проектов</a>
        <a href="/products">Продукция</a>
        <a href={contactHref}>Контакты</a>
        <a href="/about">О нас</a>
        <a href="/privacy">Политика конфиденциальности</a>
      </nav>
      <div className="footer-legal">
        <span>ООО «Приоритет»</span>
        <span>ИНН 6150063674</span>
        <span>ОГРН 1106183001980</span>
        <a href="tel:+79518285872">+7 951 828-58-72</a>
        <a href="mailto:info@plancod.ru">info@plancod.ru</a>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} ПЛАНКОД</span><a href="#top">Наверх <ArrowIcon direction="up" /></a></div>
    </footer>
  );
}

/* The interior pages share the homepage's engineering palette and drawing language. */
export function EngineeringPanel({ variant }: { variant: "design" | "projects" | "about" }) {
  const content = {
    design: { label: "ИНЖЕНЕРНАЯ МОДЕЛЬ", title: "Одна система. Все связи.", image: "/images/hero-building-clean.webp", alt: "Аксонометрия инженерных систем здания", tags: ["01 / Расчёты", "02 / Чертежи", "03 / Спецификации"] },
    projects: { label: "РАБОЧАЯ ДОКУМЕНТАЦИЯ", title: "Решения в деталях.", image: "/images/projects/details/food-block-3d-main.png", alt: "Аксонометрическая схема вентиляции из рабочего проекта", tags: ["Задача", "Решение", "Документация"] },
    about: { label: "ПОДХОД ПЛАНКОД", title: "Считаем. Согласовываем. Проектируем.", image: "/images/hero-building-clean.webp", alt: "Инженерные системы здания в единой модели", tags: ["Объект", "Инженерия", "Взаимосвязи"] },
  }[variant];
  return <div className={`interior-visual panel interior-visual-${variant}`}>
    <div className="interior-visual-label"><span>ПЛАНКОД / {content.label}</span><span><ArrowIcon direction="up-right" /></span></div>
    {/* eslint-disable-next-line @next/next/no-img-element -- shared static export */}
    <img src={content.image} alt={content.alt} />
    <div className="interior-visual-bottom"><strong>{content.title}</strong><div>{content.tags.map(tag => <span key={tag}>{tag}</span>)}</div></div>
  </div>;
}
