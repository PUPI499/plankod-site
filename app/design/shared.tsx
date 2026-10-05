/* eslint-disable @next/next/no-img-element -- static export */
import services from "./services.json";
import { projects } from "../projects/data";
export function ServiceCards() { return <div className="service-cards">{services.map((s,i)=><a className={`service-card panel ${s.featured?"service-featured":""}`} href={`/design/${s.slug}/`} key={s.slug}><span>0{i+1} / ПРОЕКТИРОВАНИЕ</span><h3>{s.name}</h3><p>{s.description}</p><strong>{s.price}</strong><b>Подробнее ↗</b></a>)}</div>; }
export function ProjectCards({ slugs, filter = false }: { slugs?: string[]; filter?: boolean }) {
 const selected=slugs?projects.filter(p=>slugs.includes(p.slug)):projects;
 return <div className="project-selection">{filter&&<div className="project-filters" aria-label="Фильтр примеров проектов"><button type="button" data-project-filter="all" aria-pressed="true">Все</button>{services.filter(s=>s.projects.length>0&&!['integrated','reconstruction'].includes(s.slug)).map(s=><button type="button" key={s.slug} data-project-filter={s.slug} aria-pressed="false">{s.name}</button>)}</div>}
 <div className="service-projects">{selected.map(p=><article className="service-project panel" key={p.slug} data-project-directions={services.filter(s=>s.projects.includes(p.slug)).map(s=>s.slug).join(" ")}><a href={`/projects/${p.slug}/`}><img src={p.image} alt={`${p.title} — рабочий чертёж`} loading="lazy" /></a><div><small>{p.scope}</small><h3>{p.title}</h3><p>{p.summary}</p><a href={`/projects/${p.slug}/`}>Посмотреть проект →</a><a className="project-discuss" data-goal="discuss_project" href={`/projects/${p.slug}/#contact`}>Обсудить похожий объект ↗</a></div></article>)}</div></div>;
}
