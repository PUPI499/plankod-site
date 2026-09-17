/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages -- direct paths keep the static and hosted builds consistent */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContactBand, SiteFooter, SiteHeader } from "../../components";
import { getProject, projects } from "../data";
import { ProjectGallery } from "../project-gallery";

type PageProps = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  const title = `${project.title} — ПЛАНКОД`;
  return {
    title,
    description: project.summary,
    openGraph: { title, description: project.summary, images: [`https://plancod.ru${project.image}`] },
    twitter: { title, description: project.summary, images: [`https://plancod.ru${project.image}`] },
  };
}

export default async function ProjectCasePage({ params }: PageProps) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  const projectIndex = projects.findIndex((item) => item.slug === project.slug);
  const nextProject = projects[(projectIndex + 1) % projects.length];

  return (
    <main className="engineering-page page-projects">
      <SiteHeader active="projects" />

      <section className="case-hero shell" id="top">
        <a className="case-hero-media panel" href={project.image} target="_blank" rel="noreferrer" aria-label="Открыть главный чертёж в полном размере">
          <img src={project.image} alt={`Главный чертёж: ${project.title}`} />
          <span>{project.number} / рабочая документация</span>
          <b>Открыть полностью ↗</b>
        </a>
        <div className="case-hero-copy panel">
          <a className="case-back-link" href="/projects">← Все объекты</a>
          <small>{project.scope}</small>
          <h1>{project.title}</h1>
          <p>{project.summary}</p>
          <div className="case-facts">{project.facts.map((fact) => <span key={fact}>{fact}</span>)}</div>
          <a className="case-discuss-link" href="#contact">Обсудить похожий объект <span>↗</span></a>
        </div>
      </section>

      <section className="case-story shell">
        <div className="case-story-heading">
          <span>01 / логика проекта</span>
          <h2>{project.statement}</h2>
          <p>Показываем не просто изображения листов, а задачу, принятое решение и результат для заказчика.</p>
        </div>
        <div className="case-story-list">
          <article><span>01 / задача</span><h3>{project.challengeLead}</h3><p>{project.challenge}</p></article>
          <article><span>02 / решение</span><h3>{project.solutionLead}</h3><p>{project.solution}</p></article>
          <article><span>03 / результат</span><h3>{project.resultLead}</h3><p>{project.result}</p></article>
        </div>
      </section>

      <section className="case-gallery-section">
        <div className="shell">
          <div className="case-gallery-heading">
            <div><span>02 / материалы объекта</span><h2>Проект<br /><em>в деталях</em></h2></div>
            <p>Нажмите на лист, чтобы рассмотреть обозначения, размеры и монтажные отметки. В полноэкранном режиме работают стрелки клавиатуры и кнопки навигации.</p>
          </div>
          <ProjectGallery media={project.media} />
        </div>
      </section>

      <section className="case-result shell">
        <div className="case-result-metric panel"><span>03 / итог</span><strong>{project.metric}</strong><p>{project.metricText}</p></div>
        <div className="case-result-copy panel"><h2>Проект, по которому<br /><em>можно работать.</em></h2><p>{project.result}</p><a href="#contact">Обсудить проект ↗</a></div>
      </section>

      <section className="case-next">
        <div className="shell case-next-inner">
          <div><span>Следующий объект / {nextProject.number}</span><h2>{nextProject.title}</h2></div>
          <a href={`/projects/${nextProject.slug}`}>Смотреть следующий объект <span>→</span></a>
        </div>
      </section>

      <ContactBand engineering eyebrow="Обсудить похожий объект" title={"Есть задача?\nНачнём с исходных данных."} />
      <SiteFooter />
    </main>
  );
}
