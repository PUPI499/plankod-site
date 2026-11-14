import type { Metadata } from "next";
import { PageHero } from "../page-hero";
import { ArrowIcon } from "../arrow-icon";
import { ContactBand, SiteFooter, SiteHeader } from "../components";

const title = "Об инженерной компании ПЛАНКОД";
const description = "Автоматизация действующих зданий организаций и проектирование ОВиК. Как ПЛАНКОД обследует объект, согласует состав работ и передаёт результат заказчику.";

export const metadata: Metadata = {
  title, description, alternates: { canonical: "/about.html" },
  openGraph: { title, description, images: ["/images/about-work.jpg"] },
  twitter: { title, description, images: ["/images/about-work.jpg"] },
};

const principles = [
  ["Фиксируем исходное состояние", "Вместе со службой эксплуатации изучаем схемы, установленное оборудование и ручные операции, которые заказчик хочет изменить."],
  ["Согласуем границы", "Описываем сохраняемые системы, точки подключения и ограничения по доступу. Границы изменений становятся частью задания."],
  ["Организуем работы", "Сводим проектирование, поставку, монтаж и настройку в согласованный план. Распределяем задачи между участниками и уточняем допустимые окна работ."],
  ["Проверяем результат", "С заказчиком проверяем согласованные сценарии, доступные показания и способы управления. Передаём предусмотренные договором документы."],
];

export default function AboutPage() {
  return <main className="engineering-page premium-page page-about">
    <SiteHeader active="about" />
    <PageHero topic="О компании" title={<>Инженерная компания<br/>ПЛАНКОД.</>}
      description="Автоматизируем инженерные системы действующих зданий для организаций. Для строительства, реконструкции и ремонта отдельно проектируем вентиляцию, отопление и кондиционирование."
      image="/images/about-work.jpg" slogan="Думать системно." theme="page-cover-about"
      actionHref="#contact" actionLabel="Обсудить объект"
      facts={["Обследование и совместимость", "Монтаж и пусконаладка", "Проектная документация"]}/>
    <section className="page-section shell">
      <div className="page-heading"><h2>Как организуем работы<br/><em>на действующем объекте</em></h2><p>Руководитель организации согласует состав работ и условия приёмки. Техническая служба участвует в выборе режимов и определяет ограничения эксплуатации.</p></div>
      <div className="about-principles">{principles.map(([name, text], i) =>
        <article key={name} className={["panel","panel about-principle-dark","panel","panel about-principle-blue"][i]}>
          <h3>{name}</h3><p>{text}</p>
        </article>)}</div>
    </section>
    <section className="about-cycle"><div className="shell">
      <div className="page-heading page-heading-light"><h2>Что войдёт<br/><em>в предложение</em></h2><p>После первого обращения уточним назначение здания, задачу и доступные планы. Если документации недостаточно, предложим согласовать обследование с технической службой.</p></div>
      <div className="about-cycle-grid">
        <article><h3>Объём</h3><p>Помещения, инженерные системы и перечень работ по каждому контуру.</p></article>
        <article><h3>Решения</h3><p>Сохраняемое оборудование, новые компоненты и проверяемые точки интеграции.</p></article>
        <article><h3>Этапы</h3><p>Последовательность и сроки с учётом доступа и режима работы учреждения.</p></article>
        <article><h3>Изменения</h3><p>Если обследование выявит дополнительные работы, согласуем их объём и стоимость с заказчиком.</p></article>
        <article><h3>Приёмка</h3><p>Сценарии испытаний, способ проверки и комплект передаваемых документов.</p></article>
      </div></div>
    </section>
    <section className="about-proof shell">
      <div><span className="micro-label">Проектная практика</span><h2>От расчёта<br/><em>до рабочего чертежа</em></h2></div>
      <p>В проекте пищеблока показаны местные отсосы, в прачечной — разделение воздушных потоков, в доме культуры — схемы отопления и кондиционирования. Откройте листы и сравните решения с задачей вашего объекта.</p>
      <a href="/projects.html">Посмотреть документацию <span><ArrowIcon direction="up-right"/></span></a>
    </section>
    <ContactBand engineering eyebrow="Для организаций" title={"Какая задача стоит\nперед вашей службой эксплуатации?"}/>
    <SiteFooter slogan="Думать системно."/>
  </main>;
}
