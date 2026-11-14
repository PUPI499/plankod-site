/* eslint-disable @next/next/no-img-element -- original project documentation */
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowIcon } from "../../arrow-icon";
import { BrandSignature } from "../../brand-signature";
import { ContactBand, SiteFooter, SiteHeader } from "../../components";
import { EngineeringCrumbs, EngineeringHeading } from "../../design/editorial";
import services from "../../design/services.json";
import { getProject, projects } from "../data";
import { ProjectGallery } from "../project-gallery";
type Props={params:Promise<{slug:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return projects.map(p=>({slug:p.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug}=await params;const p=getProject(slug);if(!p)return {};
 return {title:p.title+" — ПЛАНКОД",description:p.summary,alternates:{canonical:"/projects/"+slug+"/"},openGraph:{title:p.title,description:p.summary,images:[p.image]},twitter:{title:p.title,description:p.summary,images:[p.image]}};
}
export default async function ProjectCasePage({params}:Props){
 const {slug}=await params;const p=getProject(slug);if(!p)notFound();
 const next=projects[(projects.findIndex(item=>item.slug===slug)+1)%projects.length];
 const directions=services.filter(s=>s.projects.includes(slug));
 return <main className="engineering-page premium-page eng-page eng-case-page"><SiteHeader active="projects"/><EngineeringCrumbs title={p.title} portfolio/>
 <section className="eng-case-hero shell" id="top"><div className="eng-case-masthead"><span>ПРОЕКТНАЯ ДОКУМЕНТАЦИЯ / {p.number}</span><BrandSignature slogan="Думать системно."/></div>
 <div className="eng-case-intro"><span className="eng-kicker">{p.type}</span><h1>{p.title}</h1><p>{p.summary}</p><a className="eng-button" data-goal="discuss_project" href="#contact">Обсудить проектирование<ArrowIcon direction="up-right"/></a><a className="eng-link" href="#drawings">Смотреть чертежи<ArrowIcon direction="down"/></a></div>
 <figure className={"eng-case-image"+(!p.imageLabel?" is-drawing":"")}><a href={p.image} target="_blank" rel="noreferrer" aria-label="Открыть главное изображение"><img src={"/images/design/case-"+slug+"-v1.webp"} alt={p.title+" — "+(p.imageLabel||"рабочий чертёж")} fetchPriority="high"/></a><figcaption>{p.imageLabel?"Концептуальная визуализация объекта":"Фрагмент рабочей документации"}</figcaption></figure>
 <div className="eng-case-facts"><div><span>РАЗДЕЛЫ ПРОЕКТА</span><strong>{p.scope}</strong></div>{p.facts.map(fact=><div key={fact}><strong>{fact}</strong></div>)}</div></section>
 <section className="eng-section shell"><EngineeringHeading index="01 / ЗАДАЧА И РЕШЕНИЕ" title={p.statement}>Назначение помещений, ограничения на объекте и решения, отражённые в проекте.</EngineeringHeading><div className="eng-case-story">{[["Задача",p.challengeLead,p.challenge],["Решение",p.solutionLead,p.solution],["Состав проекта",p.scope,p.summary]].map(([label,title,text],i)=><article key={label}><span className="eng-kicker">0{i+1} / {label}</span><h3>{title}</h3><p>{text}</p></article>)}</div></section>
 <section className="eng-drawing-section" id="drawings"><div className="shell"><EngineeringHeading index="02 / ПРОЕКТНАЯ ДОКУМЕНТАЦИЯ" title={<>Чертежи<br/><em>по объекту.</em></>}>Откройте лист, чтобы рассмотреть трассы, оборудование и отметки. В просмотре доступны стрелки клавиатуры и увеличение изображения средствами браузера.</EngineeringHeading><ProjectGallery media={p.media}/></div></section>
 <section className="eng-section shell"><div className="eng-case-result"><div><span className="eng-kicker">В ДОКУМЕНТАЦИИ</span><strong>{p.metric}</strong><p>{p.metricText}</p></div><div><h2>Что вошло<br/>в документацию.</h2><p>{p.result}</p></div></div></section>
 <section className="eng-section shell eng-related"><EngineeringHeading index="03 / НАПРАВЛЕНИЯ ПРОЕКТИРОВАНИЯ" title="Решения для вашего объекта.">Рассмотрите соответствующие услуги и передайте исходные данные для обсуждения.</EngineeringHeading><div>{directions.map(s=><a href={"/design/"+s.slug+"/"} key={s.slug}>{s.name}<ArrowIcon direction="up-right"/></a>)}</div></section>
 <section className="eng-next shell"><div><span className="eng-kicker">СЛЕДУЮЩИЙ ПРОЕКТ / {next.number}</span><h2>{next.title}</h2></div><a className="eng-button" href={"/projects/"+next.slug+"/"}>Рассмотреть проект<ArrowIcon direction="right"/></a></section>
 <ContactBand engineering context={"Интересует похожий объект: "+p.title+". Разделы: "+p.scope+"."} eyebrow="ОБСУДИТЬ ПОХОЖИЙ ОБЪЕКТ" title={"Есть задача?\nНачнём с исходных данных."}/><SiteFooter slogan="Думать системно."/></main>;
}
