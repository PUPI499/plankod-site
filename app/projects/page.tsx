import { ArrowIcon } from "../arrow-icon";
/* eslint-disable @next/next/no-img-element -- static Hostland export uses plain image paths */
import type { Metadata } from "next";
import { EngineeringPanel, ContactBand, SiteFooter, SiteHeader } from "../components";
import { projects } from "./data";

export const metadata: Metadata = {
  title: "Выполненные проекты: вентиляция, отопление, инженерные сети — ПЛАНКОД",
  description: "Реальные проекты ПЛАНКОД: вентиляция пищевого блока и прачечной, отопление и кондиционирование дома культуры, инженерные сети санатория. Фрагменты рабочих чертежей.",
  openGraph: { title: "Выполненные проекты: вентиляция, отопление, инженерные сети — ПЛАНКОД", description: "Реальные проекты ПЛАНКОД: вентиляция пищевого блока и прачечной, отопление и кондиционирование дома культуры, инженерные сети санатория. Фрагменты рабочих чертежей.", images: ["/og.png"] },
  twitter: { title: "Выполненные проекты: вентиляция, отопление, инженерные сети — ПЛАНКОД", description: "Реальные проекты ПЛАНКОД: вентиляция пищевого блока и прачечной, отопление и кондиционирование дома культуры, инженерные сети санатория. Фрагменты рабочих чертежей.", images: ["/og.png"] },
};

export default function ProjectsPage() {
  return (
    <main className="engineering-page page-projects">
      <SiteHeader active="projects" />

      <section className="portfolio-hero shell" id="top">
        <div className="portfolio-copy panel">
          <span className="micro-label">Проектирование и объекты</span>
          <h1>Объекты.<br /><em>Задачи.</em><br />Решения.</h1>
          <p>Проектируем инженерные системы объектов любой сложности: от частного дома до производственного комплекса и коммерческого пространства. Учитываем монтаж, эксплуатацию и будущую автоматизацию.</p>
          <a className="interior-cta" href="#portfolio">Смотреть объекты <span><ArrowIcon direction="up-right" /></span></a>
          <div className="portfolio-facts"><span><b>с 2022</b> на рынке</span><span><b>Единый проект</b> согласованные системы</span><span><b>HVAC</b> отопление · вентиляция · климат</span></div>
        </div>
        <EngineeringPanel variant="projects" />
      </section>

      <section className="portfolio-section" id="portfolio">
        <div className="shell">
          <div className="portfolio-heading"><div><span className="section-number">02</span><p>Выполненные проекты</p></div><h2>Не обещания.<br /><em>Рабочие чертежи.</em></h2><p>Показываем реальные завершённые проекты. Названия заказчиков, адреса и персональные данные не публикуем.</p></div>
          <div className="real-projects-grid">
            {projects.map((project) => (
              <article className="real-project-card panel" key={project.number}>
                <a className="project-drawing" href={`/projects/${project.slug}`}><img src={project.image} alt={`Фрагмент рабочего чертежа: ${project.title}`} loading="lazy" /><span>{project.number} / {project.type}</span><b>открыть проект <ArrowIcon direction="up-right" /></b></a>
                <div className="real-project-copy">
                  <small>{project.scope}</small>
                  <h3><a href={`/projects/${project.slug}`}>{project.title}</a></h3>
                  <p>{project.summary}</p>
                  <div className="real-project-facts">{project.facts.map((fact) => <span key={fact}>{fact}</span>)}</div>
                  <a className="project-discuss" data-goal="discuss_project" href={`/projects/${project.slug}/#contact`}>Обсудить похожий объект <ArrowIcon direction="up-right" /></a>
                  <a className="project-card-link" href={`/projects/${project.slug}`}>Смотреть проект <span><ArrowIcon direction="right" /></span></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="project-content shell">
        <div className="project-content-title panel"><span className="micro-label">Что получает заказчик</span><h2>Проект, по которому<br /><em>можно работать.</em></h2><p>Состав документации зависит от объекта. До начала работ фиксируем разделы, исходные данные, сроки и стоимость.</p></div>
        <div className="project-case-template panel">
          <div><span>01</span><h3>Расчёты</h3><p>Нагрузки, воздухообмены, мощности и параметры системы — по исходным данным объекта.</p></div>
          <div><span>02</span><h3>Планы и схемы</h3><p>Трассы, оборудование, подключения, узлы и отметки, необходимые для монтажа.</p></div>
          <div><span>03</span><h3>Спецификация</h3><p>Состав оборудования и материалов, чтобы закупка соответствовала проектному решению.</p></div>
          <div><span>04</span><h3>Сопровождение</h3><p>Разъясняем принятые решения и отвечаем на вопросы по проектной документации.</p></div>
        </div>
      </section>

      <ContactBand engineering eyebrow="Обсудить проектирование" title={"Есть объект?\nНачнём с исходных данных."} />
      <SiteFooter />
    </main>
  );
}
