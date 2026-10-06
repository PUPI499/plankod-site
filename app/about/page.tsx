import { ArrowIcon } from "../arrow-icon";
/* eslint-disable @next/next/no-html-link-for-pages -- direct paths keep the static and hosted builds consistent */
import type { Metadata } from "next";
import { EngineeringPanel, ContactBand, SiteFooter, SiteHeader } from "../components";

export const metadata: Metadata = {
  title: "О компании — ПЛАНКОД",
  description: "ПЛАНКОД — проектирование и координация инженерных систем. Умный дом — самостоятельное направление. На рынке с 2022 года.",
  openGraph: { title: "О компании — ПЛАНКОД", description: "Инженерное проектирование, координация разделов и умный дом.", images: ["/og.png"] },
  twitter: { title: "О компании — ПЛАНКОД", description: "Проектирование инженерных систем и умного дома.", images: ["/og.png"] },
};

export default function AboutPage() {
  return (
    <main className="engineering-page page-about">
      <SiteHeader active="about" />

      <section className="about-hero shell" id="top">
        <div className="about-hero-copy panel">
          <span className="micro-label">ПЛАНКОД / инженерная компания</span>
          <h1>Сначала проект.<br />Потом <em>оборудование.</em></h1>
          <p>С 2022 года проектируем инженерные системы. Увязываем расчёты, оборудование и решения разных разделов. Развиваем умный дом как отдельное направление — со сценариями управления и взаимодействием систем.</p>
          <a className="interior-cta" href="#contact">Обсудить проект <span><ArrowIcon direction="up-right" /></span></a>
          <div className="about-facts">
            <span><b>с 2022</b> работаем на рынке</span>
            <span><b>1 команда</b> согласованные решения</span>
            <span><b>География</b> европейская часть России и Урал</span>
          </div>
        </div>
        <EngineeringPanel variant="about" />
      </section>

      <section className="page-section shell">
        <div className="page-heading"><span>01 / как работаем</span><h2>Решения<br /><em>согласованы</em></h2><p>Рассматриваем инженерные системы во взаимосвязи и фиксируем принятые решения в документации.</p></div>
        <div className="about-principles">
          <article className="panel"><span>01</span><h3>Считаем до закупки</h3><p>Сначала фиксируем задачи и техническое решение. Только потом формируем спецификацию и смету.</p></article>
          <article className="panel about-principle-dark"><span>02</span><h3>Объясняем выбор</h3><p>Показываем, за что отвечает каждый элемент и где не стоит переплачивать.</p></article>
          <article className="panel"><span>03</span><h3>Проверяем совместимость</h3><p>Сверяем оборудование, протоколы и ограничения до заказа, а не на монтаже.</p></article>
          <article className="panel about-principle-blue"><span>04</span><h3>Разъясняем решения</h3><p>Передаём проектную документацию и отвечаем на вопросы по принятым решениям.</p></article>
        </div>
      </section>

      <section className="about-cycle">
        <div className="shell">
          <div className="page-heading page-heading-light"><span>02 / разработка проекта</span><h2>Пять этапов.<br /><em>Единая логика.</em></h2><p>От исходных данных к согласованному комплекту. Состав разделов и стадии разработки определяем по задаче объекта.</p></div>
          <div className="about-cycle-grid">
            <article><span>01</span><h3>Проектирование</h3><p>Расчёты, схемы, сценарии и спецификация.</p></article>
            <article><span>02</span><h3>Расчёты</h3><p>Нагрузки, расходы и параметры систем по исходным данным.</p></article>
            <article><span>03</span><h3>Решения</h3><p>Оборудование, трассы, планы и схемы.</p></article>
            <article><span>04</span><h3>Координация</h3><p>Увязка систем и заданий между разделами.</p></article>
            <article><span>05</span><h3>Документация</h3><p>Передача согласованного комплекта и разъяснение решений.</p></article>
          </div>
        </div>
      </section>

      <section className="about-clients shell">
        <div className="about-clients-copy panel"><span className="micro-label">Для кого работаем</span><h2>Частные дома.<br />Отели.<br /><em>Коммерция.</em></h2><p>Масштаб решения меняется, принцип остаётся тем же: проектируем под реальную эксплуатацию и заранее думаем о монтаже и обслуживании.</p></div>
        <div className="about-clients-list panel">
          <article><span>01</span><div><h3>Частные дома</h3><p>Комфортный климат, безопасность, управление и возможность развивать систему поэтапно.</p></div></article>
          <article><span>02</span><div><h3>Отели и гостевые объекты</h3><p>Климат в номерах и общих зонах, контроль режимов и удобство эксплуатации.</p></div></article>
          <article><span>03</span><div><h3>Коммерческие помещения</h3><p>Вентиляция, кондиционирование и диспетчеризация с учётом назначения объекта.</p></div></article>
          <article><span>04</span><div><h3>Партнёры и подрядчики</h3><p>Проектирование и поставка оборудования как часть общей реализации объекта.</p></div></article>
        </div>
      </section>

      <section className="about-proof shell">
        <div><span className="micro-label">Факты вместо громких обещаний</span><h2>Доверие подтверждают<br /><em>документы и объекты</em></h2></div>
        <p>До старта показываем состав проекта, фиксируем этапы, оборудование и смету. Материалы объектов публикуем после проверки данных и согласования с заказчиками.</p>
        <a href="/design#portfolio">Перейти к проектам <span><ArrowIcon direction="up-right" /></span></a>
      </section>

      <ContactBand engineering eyebrow="Начать с консультации" title={"Есть объект?\nДавайте обсудим задачу."} />
      <SiteFooter />
    </main>
  );
}
