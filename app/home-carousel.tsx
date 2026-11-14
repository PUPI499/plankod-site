"use client";
/* eslint-disable @next/next/no-html-link-for-pages -- shared navigation for the static Hostland build */
import { useEffect, useRef } from "react";
import { ArrowIcon } from "./arrow-icon";
import { initHomeCarousel } from "./home-carousel-controller";

const slides = [
  { key: "automation", name: "Автоматизация", label: "Для организаций и служб эксплуатации", title: "Автоматизация инженерных систем действующих зданий", description: "Обследуем оборудование, определяем, что можно сохранить, и организуем модернизацию — от проекта и поставки до монтажа, программирования и пусконаладки.", image: "/images/home/automation-daylight.webp", mobile: "/images/home/automation-daylight-mobile.webp", href: "#contact", action: "Обсудить автоматизацию" },
  { key: "design", name: "Проектирование", label: "Проектная и рабочая документация", title: "Проектирование вентиляции, отопления и кондиционирования", description: "Рассчитываем нагрузки, размещаем оборудование и согласуем трассы со смежными разделами. Можно заказать отдельный раздел или проект ОВиК.", image: "/images/design/hub-v1.webp", mobile: "/images/design/hub-mobile-v1.webp", href: "/design", action: "Выбрать направление" },
  { key: "equipment", name: "Оборудование", label: "Комплектация объекта", title: "Оборудование для автоматизации зданий", description: "Контроллеры, датчики и модули управления. Выберите модель в каталоге или пришлите спецификацию — уточним совместимость, наличие и условия поставки.", image: "/images/home/smart-equipment.webp", mobile: "/images/home/smart-equipment-mobile.webp", href: "/products", action: "Открыть каталог" },
];

export function HomeCarousel() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => ref.current ? initHomeCarousel(ref.current) : undefined, []);
  return <section ref={ref} className="b2b-reel shell" id="top" aria-label="Направления ПЛАНКОД" aria-roledescription="карусель" data-home-carousel>
    <div className="b2b-reel-stage">
      {slides.map((slide, i) => <article key={slide.key} className={`b2b-cover b2b-frame frame-${slide.key}${i === 0 ? " is-active" : ""}`} data-slide aria-hidden={i !== 0} inert={i !== 0} role="group" aria-roledescription="слайд" aria-label={`${i + 1} из 3: ${slide.name}`}>
        <picture><source media="(max-width:700px)" srcSet={slide.mobile}/><img src={slide.image} alt="" fetchPriority={i === 0 ? "high" : "low"}/></picture>
        <div className="b2b-cover-copy"><p className="micro-label">{slide.label}</p>
          {i === 0 ? <h1>{slide.title}</h1> : <h2>{slide.title}</h2>}
          <p>{slide.description}</p>
          <div className="b2b-actions"><a className="b2b-primary" data-goal={i===0 ? "discuss_project" : undefined} href={slide.href}>{slide.action}<ArrowIcon/></a>
          {i === 0 && <a href="/design">Проектирование ОВиК <ArrowIcon direction="right"/></a>}</div>
        </div>
      </article>)}
      <div className="showcase-controls"><div className="showcase-selectors" aria-label="Выбрать тему">{slides.map((s,i)=><button type="button" key={s.key} data-slide-select={i} aria-pressed={i===0}><span className="showcase-index">0{i+1}</span>{s.name}<i /></button>)}</div><div className="showcase-arrows"><button type="button" data-slide-prev aria-label="Предыдущий слайд"><ArrowIcon direction="left" /></button><button type="button" data-slide-pause aria-label="Остановить смену слайдов" aria-pressed="false"><svg className="showcase-pause-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M9 6v12M15 6v12" /></svg><svg className="showcase-play-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m9 5 10 7-10 7Z" /></svg></button><button type="button" data-slide-next aria-label="Следующий слайд"><ArrowIcon direction="right" /></button></div></div>
    </div>
  </section>;
}
