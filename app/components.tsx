/* eslint-disable @next/next/no-html-link-for-pages -- plain anchors keep the downloadable static preview navigable */
import { ContactForm } from "./contact-form";

type SectionName = "home" | "smart" | "projects" | "products" | "about" | "legal";

const navigation = [
  ["Главная", "/", "home"],
  ["Умный дом", "/smart-home", "smart"],
  ["Проектирование и объекты", "/projects", "projects"],
  ["Продукция", "/products", "products"],
  ["О компании", "/about", "about"],
] as const;

export function SiteHeader({ active = "home" }: { active?: SectionName }) {
  return (
    <header className="header shell">
      <a className="logo" href="/" aria-label="ПЛАНКОД — главная">
        <span>ПЛАН</span><i /><span>КОД</span>
      </a>
      <nav className="desktop-navigation" aria-label="Основная навигация">
        {navigation.map(([label, href, key]) => (
          <a key={key} className={active === key ? "active-link" : ""} aria-current={active === key ? "page" : undefined} href={href}>{label}</a>
        ))}
      </nav>
      <a className="header-button" href="#contact">Оставить заявку <span>↗</span></a>
      <details className="site-menu">
        <summary aria-label="Открыть меню"><i /><i /></summary>
        <nav aria-label="Мобильная навигация">
          {navigation.map(([label, href, key]) => <a key={href} className={active === key ? "active-link" : ""} aria-current={active === key ? "page" : undefined} href={href}>{label}</a>)}
          <a href="#contact">Контакты</a>
        </nav>
      </details>
    </header>
  );
}

export function ContactBand({ eyebrow = "Начать с проекта", title = "Покажите объект.\nМы предложим систему." }: { eyebrow?: string; title?: string }) {
  const lines = title.split("\n");
  return (
    <section className="contact-section" id="contact">
      <div className="shell contact-layout">
        <div className="contact-copy">
          <span className="micro-label">{eyebrow}</span>
          <h2>{lines.map((line, index) => <span key={line}>{line}{index < lines.length - 1 && <br />}</span>)}</h2>
          <p>Заполните форму или отправьте планировку в Telegram. Вернёмся с вопросами по существу и предложим следующий шаг.</p>
          <a href="https://t.me/plancod" target="_blank" rel="noopener noreferrer">Отправить план в Telegram <span>↗</span></a>
        </div>
        <div className="contact-card panel">
          <div><small>Email</small><strong>info@plancod.ru</strong></div>
          <div><small>Телефон</small><strong><a href="tel:+79518285872">+7 951 828-58-72</a></strong></div>
          <div><small>Мессенджер</small><strong>Telegram</strong></div>
          <div><small>География</small><strong>Европейская часть России и Урал</strong></div>
          <ContactForm />
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="shell">
      <a className="logo" href="/"><span>ПЛАН</span><i /><span>КОД</span></a>
      <p>Проектирование · инженерные системы · умный дом · оборудование · монтаж</p>
      <nav>
        <a href="/">Главная</a>
        <a href="/smart-home">Умный дом</a>
        <a href="/projects">Проектирование и объекты</a>
        <a href="/products">Продукция</a>
        <a href="#contact">Контакты</a>
        <a href="/about">О компании</a>
        <a href="/privacy">Политика конфиденциальности</a>
      </nav>
      <div className="footer-legal">
        <span>ООО «Приоритет»</span>
        <span>ИНН 6150063674</span>
        <span>ОГРН 1106183001980</span>
        <a href="tel:+79518285872">+7 951 828-58-72</a>
        <a href="mailto:info@plancod.ru">info@plancod.ru</a>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} ПЛАНКОД</span><a href="#top">Наверх ↑</a></div>
    </footer>
  );
}
