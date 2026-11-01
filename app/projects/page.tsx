import type { Metadata } from "next";
import { ContactBand, SiteFooter, SiteHeader } from "../components";
import { EngineeringCrumbs, EngineeringHero, EngineeringHeading, EngineeringDocuments } from "../design/editorial";
import { ProjectCards } from "../design/shared";
export const metadata:Metadata={
 title:"Выполненные проекты: вентиляция, отопление, инженерные сети — ПЛАНКОД",
 description:"Реальные проекты ПЛАНКОД: вентиляция пищевого блока и прачечной, отопление и кондиционирование дома культуры, инженерные сети санатория. Фрагменты рабочих чертежей.",
 alternates:{canonical:"/projects.html"},
 openGraph:{images:["/images/design/portfolio-v1.webp"]},twitter:{images:["/images/design/portfolio-v1.webp"]}
};
export default function ProjectsPage(){return <main className="engineering-page premium-page eng-page"><SiteHeader active="projects"/><EngineeringCrumbs title="Объекты и решения"/>
 <EngineeringHero topic="Объекты и решения" title={<>Инженерия.<br/>В реальных проектах.</>} description="Проектные задачи пищевого производства, общественных зданий и инженерных сетей. От исходных условий до расчётов, схем и рабочей документации." image="/images/design/portfolio-v1.webp" mobileImage="/images/design/portfolio-mobile-v1.webp" drawing caption="Фрагмент проектной документации · вентиляция пищеблока" secondary={{href:"#portfolio",label:"Рассмотреть объекты"}} facts={["Задачи объектов","Проектные решения","Настоящие чертежи"]}/>
 <section className="eng-section shell" id="portfolio"><EngineeringHeading index="01 / ПРОЕКТЫ" title={<>Разные объекты.<br/><em>Единый подход к деталям.</em></>}>В каждом кейсе — инженерная задача, принятые решения и фрагменты документации. Иллюстрации объектов подписаны отдельно от рабочих чертежей.</EngineeringHeading><ProjectCards filter/></section>
 <EngineeringDocuments items={["Расчётные параметры инженерных систем","Трассы, оборудование, подключения и отметки","Спецификации оборудования и материалов","Разъяснение принятых проектных решений"]} drawing="/images/projects/details/sanatorium-heating-profile-ts3.png" label="Наружные тепловые сети · продольный профиль" href="/projects/sanatorium-utilities/#drawings"/>
 <ContactBand engineering eyebrow="ОБСУДИТЬ ПРОЕКТИРОВАНИЕ" title={"Есть похожая задача?\nНачнём с исходных данных."}/><SiteFooter slogan="Думать системно."/></main>;}
