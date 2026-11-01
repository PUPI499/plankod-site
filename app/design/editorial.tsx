/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages -- optimized static assets */
import type { ReactNode } from "react";
import { ArrowIcon } from "../arrow-icon";
import { BrandSignature } from "../brand-signature";

export function EngineeringCrumbs({title,portfolio=false}:{title?:string;portfolio?:boolean}){
 return <nav className="eng-crumbs shell" aria-label="Хлебные крошки"><a href="/">Главная</a><span>/</span>{title?<a href="/design">Проектирование</a>:<span aria-current="page">Проектирование</span>}{portfolio&&<><span>/</span><a href="/projects">Объекты</a></>}{title&&<><span>/</span><span aria-current="page">{title}</span></>}</nav>;
}
export function EngineeringHero({topic,title,description,image,mobileImage,secondary,facts,caption="Концептуальная инженерная визуализация",drawing=false}:{
 topic:string;title:ReactNode;description:string;image:string;mobileImage?:string;secondary?:{href:string;label:string};facts:string[];caption?:string;drawing?:boolean;
}){
 return <><section className={"eng-hero shell"+(drawing?" eng-hero-document":"")} id="top">
 <picture className="eng-hero-art">{mobileImage&&<source media="(max-width:700px)" srcSet={mobileImage}/>}<img src={image} width="1536" height="1024" alt="" fetchPriority="high"/></picture>
 <div className="eng-hero-shade" aria-hidden="true"/>
 <div className="eng-masthead"><span>{topic}</span><BrandSignature slogan="Думать системно."/></div>
 <div className="eng-hero-copy"><h1>{title}</h1><p>{description}</p><div className="eng-actions"><a className="eng-button" href="#contact" data-goal="discuss_service">Обсудить проект <ArrowIcon direction="up-right"/></a>{secondary&&<a className="eng-link" href={secondary.href}>{secondary.label}<ArrowIcon direction="down"/></a>}</div></div>
 <div className="eng-hero-facts">{facts.map((fact,i)=><span key={fact}><i>{String(i+1).padStart(2,"0")}</i>{fact}</span>)}</div>
 </section><div className="eng-caption shell"><span>ПЛАНКОД / ИНЖЕНЕРНОЕ ПРОЕКТИРОВАНИЕ</span><span>{caption}</span></div></>;
}
export function EngineeringHeading({index,title,children}:{index:string;title:ReactNode;children?:ReactNode}){
 return <div className="eng-heading"><div><span className="eng-kicker">{index}</span><h2>{title}</h2></div>{children&&<p>{children}</p>}</div>;
}
export function EngineeringProcess(){
 const steps=[
 ["Исходные данные","Изучаем планы, назначение помещений, существующие сети и ограничения объекта."],
 ["Состав проекта","Согласовываем задачу, разделы, стадии и перечень выдаваемых материалов."],
 ["Разработка решений","Выполняем расчёты, выбираем оборудование и увязываем трассы со смежными разделами."],
 ["Передача документации","Передаём согласованный комплект и разъясняем принятые проектные решения."]
 ];
 return <section className="eng-section shell" id="process"><EngineeringHeading index="ПРОЦЕСС" title={<>От задачи<br/><em>к решениям.</em></>}>Последовательность и состав работ уточняем для вашего объекта. Сроки фиксируем после изучения исходных данных.</EngineeringHeading><ol className="eng-process">{steps.map(([title,text],i)=><li key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></li>)}</ol></section>;
}
export function EngineeringDocuments({items,drawing,label,href}:{items:string[];drawing?:string;label?:string;href?:string}){
 return <section className="eng-section shell" id="documents"><EngineeringHeading index="ПРОЕКТНАЯ ДОКУМЕНТАЦИЯ" title={<>Решение становится<br/><em>документом.</em></>}>Состав выдачи зависит от конкретной услуги, стадии и технического задания.</EngineeringHeading><div className={"eng-documents "+(drawing?"":"eng-documents-text")}>
 {drawing&&<figure><a href={drawing} target="_blank" rel="noreferrer" aria-label={"Открыть чертёж: "+label}><img src={drawing} alt={label||"Фрагмент проектной документации"} loading="lazy"/></a><figcaption><span>{label}</span>{href&&<a href={href}>К материалам объекта <ArrowIcon direction="right"/></a>}</figcaption></figure>}
 <div className="eng-document-list">{items.map((item,i)=><article key={item}><span>0{i+1}</span><h3>{item}</h3></article>)}<p>Окончательный перечень расчётов, планов, схем и спецификаций фиксируем в задании до начала разработки.</p></div>
 </div></section>;
}
