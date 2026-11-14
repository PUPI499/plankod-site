/* eslint-disable @next/next/no-img-element -- static export */
import { ArrowIcon } from "../arrow-icon";
import services from "./services.json";
import { projects } from "../projects/data";
import { engineeringArt, disciplineNotes } from "./visuals";
const coreDirections = ["ventilation", "heating", "air-conditioning", "hvac", "integrated"];
export function ServiceCards({group = "core"}: {group?: "core" | "additional"}){
 const selected = group === "core" ? coreDirections.flatMap(slug => services.filter(service => service.slug === slug)) : services.filter(service => !coreDirections.includes(service.slug));
 return <div className="eng-services">{selected.map((s,i)=><a className="eng-service" href={"/design/"+s.slug+"/"} key={s.slug}><div className="eng-service-image"><img src={engineeringArt(s.slug).cardImage} alt={"Концептуальная иллюстрация: "+s.name} loading="lazy" width="800" height="500"/><span>{String(i+1).padStart(2,"0")} / {disciplineNotes[s.slug].code}</span></div><div className="eng-service-copy"><h3>{s.name}<ArrowIcon direction="up-right"/></h3><p>{s.description}</p><div><strong>{s.price}</strong><span>Расчёт по заданию</span></div></div></a>)}</div>;
}
export function ProjectCards({slugs,filter=false}:{slugs?:string[];filter?:boolean}){
 const selected=slugs?projects.filter(p=>slugs.includes(p.slug)):projects;
 return <div className="project-selection">{filter&&<div className="project-filters" aria-label="Фильтр примеров проектов"><button type="button" data-project-filter="all" aria-pressed="true">Все</button>{services.filter(s=>s.projects.length>0&&!["integrated","reconstruction"].includes(s.slug)).map(s=><button type="button" key={s.slug} data-project-filter={s.slug} aria-pressed="false">{s.name}</button>)}</div>}
 <div className="eng-projects">{selected.map(p=><article className="eng-project service-project" key={p.slug} data-project-directions={services.filter(s=>s.projects.includes(p.slug)).map(s=>s.slug).join(" ")}><a className="eng-project-image" href={"/projects/"+p.slug+"/"}><img src={"/images/design/case-"+p.slug+"-v1.webp"} alt={p.title+" — "+(p.imageLabel||"рабочий чертёж")} loading="lazy"/><span>{p.imageLabel?"Концептуальная визуализация":"Проектная документация"}</span></a><div className="eng-project-copy"><small>{p.number} / {p.scope}</small><h3><a href={"/projects/"+p.slug+"/"}>{p.title}<ArrowIcon direction="up-right"/></a></h3><p>{p.summary}</p><div className="eng-project-bottom"><a href={"/projects/"+p.slug+"/#drawings"}>Чертежи и решения</a><a data-goal="discuss_project" href={"/projects/"+p.slug+"/#contact"}>Обсудить объект <ArrowIcon direction="up-right"/></a></div></div></article>)}</div></div>;
}
