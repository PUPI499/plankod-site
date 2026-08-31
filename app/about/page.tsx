import type { Metadata } from "next";
import { ContactBand, SiteFooter, SiteHeader } from "../components";

export const metadata: Metadata = {
  title: "О компании — ПЛАНКОД",
  description: "ПЛАНКОД проектирует, поставляет, монтирует и обслуживает инженерные системы и умный дом. На рынке с 2022 года.",
  openGraph: { title: "О компании — ПЛАНКОД", description: "Один подрядчик: от инженерного проекта до запуска умного дома.", images: [] },
  twitter: { title: "О компании — ПЛАНКОД", description: "Проектирование, поставка, монтаж и сервис инженерных систем.", images: [] },
};

export default function AboutPage() {
  return (
    <main>
      <SiteHeader active="about" />

      <section className="about-hero shell" id="top">
        <div className="about-hero-copy panel">
          <span className="micro-label">ПЛАНКОД / инженерная компания</span>
          <h1>Сначала проект.<br />Потом <em>оборудование.</em></h1>
          <p>С 2022 года проектируем и внедряем отопление, вентиляцию, кондиционирование и умный дом. Один подрядчик отвечает за расчёты, поставку, монтаж, настройку и дальнейший сервис.</p>
          <div className="about-facts">
            <span><b>с 2022</b> работаем на рынке</span>
            <span><b>1 команда</b> от проекта до запуска</span>
            <span><b>2 региона</b> европейская часть России и Урал</span>
          </div>
        </div>
        <div className="about-hero-photo panel">
          <div className="about-photo-note"><span>ПОДХОД ПЛАНКОД</span><strong>Красивое управление начинается с точных расчётов.</strong></div>
        </div>
      </section>

      <section className="page-section shell">
        <div className="page-heading"><span>01 / как работаем</span><h2>Ответственность<br /><em>не делится</em></h2><p>Когда проект, оборудование и монтаж у одной команды, меньше спорных зон и проще контролировать результат.</p></div>
        <div className="about-principles">
          <article className="panel"><span>01</span><h3>Считаем до закупки</h3><p>Сначала фиксируем задачи и техническое решение. Только потом формируем спецификацию и смету.</p></article>
          <article className="panel about-principle-dark"><span>02</span><h3>Объясняем выбор</h3><p>Показываем, за что отвечает каждый элемент и где не стоит переплачивать.</p></article>
          <article className="panel"><span>03</span><h3>Проверяем совместимость</h3><p>Сверяем оборудование, протоколы и ограничения до заказа, а не на монтаже.</p></article>
          <article className="panel about-principle-blue"><span>04</span><h3>Остаёмся после запуска</h3><p>Передаём понятное управление, документы по системе и предлагаем дальнейший сервис.</p></article>
        </div>
      </section>

      <section className="about-cycle">
        <div className="shell">
          <div className="page-heading page-heading-light"><span>02 / полный цикл</span><h2>Пять этапов.<br /><em>Один ответственный.</em></h2><p>Не нужно отдельно координировать проектировщика, магазин, монтажников и специалиста по автоматизации.</p></div>
          <div className="about-cycle-grid">
            <article><span>01</span><h3>Проектирование</h3><p>Расчёты, схемы, сценарии и спецификация.</p></article>
            <article><span>02</span><h3>Поставка</h3><p>Подбор совместимого оборудования и комплектация.</p></article>
            <article><span>03</span><h3>Монтаж</h3><p>Установка, подключение и контроль качества.</p></article>
            <article><span>04</span><h3>Автоматизация</h3><p>Интеграция климата, безопасности и управления.</p></article>
            <article><span>05</span><h3>Сервис</h3><p>Диагностика, обслуживание и развитие системы.</p></article>
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
        <p>На странице проектов подготовлена структура будущих кейсов. Точные адреса, площади, фотографии, состав работ, команда, сертификаты и юридические реквизиты будут добавлены только после подтверждения. До этого они честно отмечены как placeholders.</p>
        <a href="/projects">Перейти к проектам <span>↗</span></a>
      </section>

      <ContactBand eyebrow="Познакомиться с командой" title={"Есть объект?\nДавайте обсудим задачу."} />
      <SiteFooter />
    </main>
  );
}
