/* eslint-disable @next/next/no-html-link-for-pages -- plain anchors keep the downloadable static preview navigable */
import type { Metadata } from "next";
import { ContactBand, SiteFooter, SiteHeader } from "../components";

export const metadata: Metadata = {
  title: "Проектирование и объекты — ПЛАНКОД",
  description: "Проектирование отопления, вентиляции, кондиционирования, инженерных систем частных домов и коммерческих помещений.",
  openGraph: { title: "Проектирование и объекты — ПЛАНКОД", description: "Инженерные проекты частных домов и коммерческих помещений.", images: [] },
  twitter: { title: "Проектирование и объекты — ПЛАНКОД", description: "Портфолио инженерных проектов.", images: [] },
};

const projects = [
  ["Частный дом", "Инженерные системы и автоматизация", "Площадь · регион · год — добавить", "project-img-one"],
  ["Коммерческое помещение", "Вентиляция и кондиционирование", "Назначение · площадь · год — добавить", "project-img-two"],
  ["Частный дом", "Отопление и управление климатом", "Площадь · регион · год — добавить", "project-img-three"],
  ["Объект гостеприимства", "Комплекс инженерных систем", "Формат · площадь · год — добавить", "project-img-four"],
  ["Частный интерьер", "Умный дом после ремонта", "Состав системы · регион — добавить", "project-img-five"],
  ["Коммерческий объект", "Климат и диспетчеризация", "Назначение · мощность · год — добавить", "project-img-six"],
];

export default function ProjectsPage() {
  return (
    <main>
      <SiteHeader active="projects" />

      <section className="portfolio-hero shell" id="top">
        <div className="portfolio-copy panel">
          <span className="micro-label">Проектирование и объекты</span>
          <h1>Сначала<br /><em>решение.</em><br />Потом стройка.</h1>
          <p>Проектируем инженерные системы объектов любой сложности: от частного дома до коммерческого пространства. Учитываем монтаж, эксплуатацию и будущую автоматизацию.</p>
          <div className="portfolio-facts"><span><b>с 2022</b> на рынке</span><span><b>1 подрядчик</b> проект + монтаж</span><span><b>HVAC</b> отопление · вентиляция · климат</span></div>
        </div>
        <div className="portfolio-hero-photo panel">
          <div className="portfolio-stamp"><span>PORTFOLIO</span><b>ПЛАНКОД</b><small>данные объектов будут дополнены</small></div>
        </div>
      </section>

      <section className="design-capabilities shell">
        <div className="page-heading"><span>01 / что проектируем</span><h2>Инженерия для<br /><em>реальных объектов</em></h2><p>Проект должен быть не только красивым на листе, но и понятным монтажнику, заказчику и сервисной команде.</p></div>
        <div className="design-list">
          <article><span>01</span><h3>Объекты любой сложности</h3><p>Частные дома, отели, офисы, рестораны и другие коммерческие помещения.</p><b>генеральные решения</b></article>
          <article><span>02</span><h3>Отопление</h3><p>Расчёты, оборудование, разводка, зоны, автоматика и управление температурой.</p><b>ОВ / автоматизация</b></article>
          <article><span>03</span><h3>Вентиляция</h3><p>Воздухообмен, трассы, оборудование, шум и возможность рекуперации.</p><b>ОВ / климат</b></article>
          <article><span>04</span><h3>Кондиционирование</h3><p>Подбор систем, размещение, дренаж, питание и интеграция в управление.</p><b>Gree / Midea / подбор</b></article>
          <article><span>05</span><h3>Умный дом</h3><p>Сценарии, датчики, исполнительные устройства и связь с инженерными системами.</p><b>проект + программирование</b></article>
          <article><span>06</span><h3>Архитектурная затравка</h3><p>Общее проектирование дома можем обсуждать как дополнительное направление.</p><b>дополнительная услуга</b></article>
        </div>
      </section>

      <section className="portfolio-section">
        <div className="shell">
          <div className="portfolio-heading"><div><span className="section-number">02</span><p>Объекты</p></div><h2>Работы, которые<br />говорят <em>за нас</em></h2><p>Сейчас карточки показывают структуру портфолио. Заменим тексты и изображения после получения точных данных.</p></div>
          <div className="portfolio-filters"><span className="active-filter">Все объекты</span><span>Частные дома</span><span>Коммерция</span><span>Отопление</span><span>Вентиляция и климат</span><span>Умный дом</span></div>
          <div className="portfolio-grid">
            {projects.map(([type, title, data, imageClass], index) => (
              <article className={`portfolio-card panel ${imageClass}`} key={title}>
                <div className="portfolio-placeholder">PLACEHOLDER / {String(index + 1).padStart(2, "0")}</div>
                <div className="portfolio-card-copy"><span>{type}</span><h3>{title}</h3><p>{data}</p><a href="/#contact">Запросить похожий проект ↗</a></div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="project-content shell">
        <div className="project-content-title panel"><span className="micro-label">Как будет выглядеть подробный кейс</span><h2>Не галерея.<br /><em>Разбор решения.</em></h2><p>В каждой работе покажем исходную задачу, ограничения, принятые решения, состав оборудования и фотографии реализации.</p></div>
        <div className="project-case-template panel">
          <div><span>01</span><h3>Задача заказчика</h3><p>Что требовалось решить и на какой стадии находился объект.</p></div>
          <div><span>02</span><h3>Проектное решение</h3><p>Почему выбрали именно такую схему и оборудование.</p></div>
          <div><span>03</span><h3>Реализация</h3><p>Монтаж, пусконаладка, сложные узлы и фактический состав работ.</p></div>
          <div><span>04</span><h3>Результат</h3><p>Проверяемые показатели и отзыв — только после согласования с заказчиком.</p></div>
        </div>
      </section>

      <ContactBand eyebrow="Обсудить проектирование" title={"Есть объект?\nНачнём с исходных данных."} />
      <SiteFooter />
    </main>
  );
}
