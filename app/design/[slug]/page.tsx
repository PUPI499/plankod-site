import type { Metadata } from "next";
import { notFound } from "next/navigation";
import services from "../services.json";
import { SiteHeader, SiteFooter, ContactBand } from "../../components";
import { ArrowIcon } from "../../arrow-icon";
import { ProjectCards } from "../shared";
import { EngineeringCrumbs, EngineeringHero, EngineeringHeading, EngineeringDocuments, EngineeringProcess } from "../editorial";
import { engineeringArt, disciplineNotes, engineeringDeliverables } from "../visuals";
type Props={params:Promise<{slug:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return services.map(s=>({slug:s.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{
 const {slug}=await params;const s=services.find(x=>x.slug===slug);if(!s)return {};
 return {title:s.title+" — состав проекта и стоимость | ПЛАНКОД",description:s.description,alternates:{canonical:"/design/"+slug+"/"},openGraph:{title:s.title,description:s.description,images:[engineeringArt(slug).image]},twitter:{title:s.title,description:s.description,images:[engineeringArt(slug).image]}};
}
export default async function ServicePage({params}:Props){
 const {slug}=await params;const s=services.find(x=>x.slug===slug);if(!s)notFound();
 const note=disciplineNotes[slug];
 return <main className="engineering-page premium-page eng-page eng-service-page"><SiteHeader active="design"/><EngineeringCrumbs title={s.name}/>
 <EngineeringHero topic={s.name} title={s.title} description={s.description} {...engineeringArt(slug)} secondary={{href:s.projects.length?"#portfolio":"#scope",label:s.projects.length?"Материалы проектов":"Состав проектных работ"}} facts={[note.code,"Расчёты и координация","Документация по заданию"]}/>
 <section className="eng-investment shell"><div><span className="eng-kicker">СТОИМОСТЬ ПРОЕКТИРОВАНИЯ</span><strong>{s.price}</strong></div><p>{s.price.startsWith("от") ? "Стартовая стоимость направления. Для вашего объекта рассчитаем предложение по планам, стадии и перечню разделов. " : "Оценим работы по планам существующих сетей и границам ремонта. "}Площадь и состав работ фиксируем в предложении.</p><a className="eng-link" href="#contact">Запросить расчёт стоимости<ArrowIcon direction="up-right"/></a></section>
 <section className="eng-section shell" id="scope"><EngineeringHeading index="01 / СОСТАВ РАБОТ" title={<>Что входит<br/><em>в проект.</em></>}>{note.focus}. Окончательный перечень материалов фиксируем в техническом задании.</EngineeringHeading><div className="eng-scope">{s.scope.map((item,i)=><article key={item}><span>0{i+1}</span><h3>{item}</h3></article>)}</div></section>
 <section className="eng-dark"><div className="shell"><EngineeringHeading index="02 / ОСОБЕННОСТИ ОБЪЕКТА" title={<>Что учитываем<br/>на вашем объекте.</>}>Учитываем архитектуру, назначение помещений и связи с другими инженерными системами.</EngineeringHeading><div className="eng-context-grid">{s.details.map((item,i)=><article key={item}><span>0{i+1}</span><p>{item}</p></article>)}</div></div></section>
 <EngineeringDocuments items={engineeringDeliverables[slug]} drawing={note.drawing?"/images/projects/details/"+note.drawing:undefined} label={note.drawingLabel} href={note.project?"/projects/"+note.project+"/#drawings":undefined}/>
 <EngineeringProcess/>
 <section className="eng-section shell eng-service-faq">
   <h2>До заказа проекта</h2>
   <details><summary>{s.question}</summary><p>{s.answer}</p></details>
   <details><summary>Какой комплект получит технический заказчик?</summary><p>{engineeringDeliverables[slug].join(". ")}. Стадию, границы раздела и формат передачи согласуем в задании.</p></details>
 </section>
 {s.projects.length>0&&<section className="eng-section shell" id="portfolio"><EngineeringHeading index="03 / ОПЫТ В ПРОЕКТАХ" title={<>Задачи и решения.<br/><em>На реальных объектах.</em></>}>В примерах представлены отдельные решения и разделы. Состав вашего проекта определяем по его задачам.</EngineeringHeading><ProjectCards slugs={s.projects}/></section>}
 <section className="eng-section shell eng-input-section"><EngineeringHeading index="04 / НАЧАЛО РАБОТЫ" title={<>Начнём<br/><em>с исходных данных.</em></>}>Передайте доступные материалы — уточним задачу, состав разделов и подготовим предложение.</EngineeringHeading><div className="eng-inputs">{s.inputs.map((item,i)=><article key={item}><span>0{i+1}</span><h3>{item}</h3></article>)}</div></section>
 <ContactBand engineering context={"Интересует: "+s.title+"."} eyebrow="ОБСУДИТЬ НАПРАВЛЕНИЕ" title={"Что нужно рассчитать\nдля вашего объекта?"}/><SiteFooter slogan="Думать системно."/></main>;
}
