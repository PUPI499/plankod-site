import { PageHero } from "../../page-hero";
import { ArrowIcon } from "../../arrow-icon";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import services from "../services.json";
import { SiteHeader, SiteFooter, ContactBand } from "../../components";
import { ProjectCards } from "../shared";
type Props={params:Promise<{slug:string}>};
export const dynamicParams=false;
export function generateStaticParams(){return services.map(s=>({slug:s.slug}));}
export async function generateMetadata({params}:Props):Promise<Metadata>{const {slug}=await params;const s=services.find(x=>x.slug===slug);if(!s)return {};return {title:`${s.title} — ${s.price} | ПЛАНКОД`,description:s.description,alternates:{canonical:`/design/${slug}/`},openGraph:{title:s.title,description:s.description,images:["/og.png"]},twitter:{title:s.title,description:s.description,images:["/og.png"]}};}
export default async function ServicePage({params}:Props){const {slug}=await params;const s=services.find(x=>x.slug===slug);if(!s)notFound();return <main className="engineering-page premium-page service-page"><SiteHeader active="design" />
<PageHero topic={s.name} title={s.title} description={s.description} image="/images/home/engineering-warm.webp" mobileImage="/images/home/engineering-warm-mobile.webp" slogan="Думать системно." theme="page-cover-engineering page-cover-service" back={{href:"/design",label:"Все направления"}} facts={["Задача объекта", "Расчёты и решения", "Документация"]} />
<section className="service-investment shell" aria-label="Стоимость проектирования"><div><span>СТОИМОСТЬ ПРОЕКТИРОВАНИЯ</span><strong>{s.price}</strong></div><p>Итоговую стоимость определяем по исходным данным, стадии и составу работ. Сроки согласовываем для конкретного объекта.</p><a href="#contact">Обсудить задачу <ArrowIcon direction="up-right" /></a></section>
<section className="page-section shell"><div className="page-heading"><span>01 / СОСТАВ РАБОТ</span><h2>Что входит<br/><em>в проект.</em></h2><p>Окончательный перечень материалов фиксируем в техническом задании.</p></div><div className="service-deliverables">{s.scope.map((x,i)=><article className="panel" key={x}><span>0{i+1}</span><h3>{x}</h3></article>)}</div></section>
<section className="service-context"><div className="shell"><span className="micro-label">02 / ОСОБЕННОСТИ ЗАДАЧИ</span><h2>Решения под<br/><em>ваш объект.</em></h2><div className="service-details">{s.details.map((x,i)=><article key={x}><span>0{i+1}</span><p>{x}</p></article>)}</div></div></section>
{s.projects.length>0&&<section className="page-section shell" id="portfolio"><div className="page-heading"><span>03 / ПРИМЕРЫ</span><h2>Материалы<br/><em>проектов.</em></h2><p>В примерах представлены отдельные решения и разделы. Состав вашего проекта определяем по его задачам.</p></div><ProjectCards slugs={s.projects}/></section>}
<section className="page-section shell"><div className="page-heading"><span>04 / НАЧАЛО РАБОТЫ</span><h2>Что нужно<br/><em>для обсуждения.</em></h2></div><div className="service-inputs">{s.inputs.map((x,i)=><article key={x}><span>0{i+1}</span><h3>{x}</h3></article>)}</div><p>Передайте доступные материалы — уточним исходные данные, состав разделов и подготовим предложение.</p></section>
<ContactBand engineering context={`Интересует: ${s.title}.`} eyebrow="ОБСУДИТЬ НАПРАВЛЕНИЕ" title={"Начнём с задачи.\nПодготовим предложение."}/><SiteFooter slogan="Думать системно." /></main>;}
