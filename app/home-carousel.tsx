"use client";
import { useEffect, useRef } from "react";
import { BrandSignature } from "./brand-signature";
import { ArrowIcon } from "./arrow-icon";
import { initHomeCarousel } from "./home-carousel-controller";

const slides = [
  { key: "smart", name: "Для бизнеса", label: "Гостиницы и бизнес", title: <>Умные системы.<br />Для бизнеса.</>, description: "Подбираем и поставляем оборудование для управления климатом, светом и шторами в гостиницах и коммерческих зданиях.", href: "/smart-systems/hotels/", action: "Решения для бизнеса", image: "/images/smart-systems/hotels-v2.webp", mobile: "/images/smart-systems/hotels-v2-mobile.webp", alt: "Концептуальная визуализация гостиничного номера с управлением климатом и освещением", detail: "Гостиницы · Коммерческие пространства · Подбор оборудования" },
  { key: "equipment", name: "Оборудование", label: "Оборудование умных систем", title: <>Для дома.<br />Для вашего бизнеса.</>, description: "Подбираем и поставляем оборудование автоматизации для гостиниц, бизнеса и дома. Проверяем совместимость под задачу.", href: "/smart-systems/equipment/", action: "Выбрать оборудование", image: "/images/home/smart-equipment.webp", mobile: "/images/home/smart-equipment-mobile.webp", alt: "Иллюстрация устройств умного дома: панель управления, датчики и модули", detail: "Подбор · Совместимость · Поставка" },
  { key: "design", name: "Проектирование", label: "Инженерное проектирование", title: <>Всё начинается<br />с проекта.</>, description: "Отопление, вентиляция, кондиционирование, вода и электроснабжение — согласованные решения для вашего объекта.", href: "/design", action: "Выбрать направление", image: "/images/design/hub-v1.webp", mobile: "/images/design/hub-mobile-v1.webp", alt: "Концептуальная визуализация здания в разрезе с инженерными системами", detail: "Расчёты · Чертежи · Координация" },
];
export function HomeCarousel() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => ref.current ? initHomeCarousel(ref.current) : undefined, []);
  return <section ref={ref} className="home-showcase shell" id="top" aria-label="Направления ПЛАНКОД" aria-roledescription="карусель" data-home-carousel>
    <div className="showcase-stage">
      {slides.map((slide, i) => <article key={slide.key} className={`showcase-slide showcase-${slide.key}${i === 0 ? " is-active" : ""}`} data-slide aria-hidden={i !== 0} inert={i !== 0} role="group" aria-roledescription="слайд" aria-label={`${i + 1} из 3: ${slide.name}`}>
        <picture className="showcase-picture"><source media="(max-width: 700px)" srcSet={slide.mobile} /><img src={slide.image} alt={slide.alt} fetchPriority={i === 0 ? "high" : "low"} decoding="async" /></picture>
        <div className="showcase-shade" />
        <div className="showcase-masthead">
          <p className="showcase-eyebrow"><span>0{i + 1}</span>{slide.label}</p>
          <BrandSignature className="showcase-signature" slogan={i < 2 ? "Управлять просто." : "Думать системно."} />
        </div>
        <div className="showcase-copy">{i === 0 ? <h1>{slide.title}</h1> : <h2>{slide.title}</h2>}<p className="showcase-description">{slide.description}</p><a className="showcase-cta" href={slide.href}>{slide.action}<span><ArrowIcon /></span></a><p className="showcase-detail">{slide.detail}</p></div>
      </article>)}
      <div className="showcase-controls"><div className="showcase-selectors" aria-label="Выбрать тему">{slides.map((s,i)=><button type="button" key={s.key} data-slide-select={i} aria-pressed={i===0}><span className="showcase-index">0{i+1}</span>{s.name}<i /></button>)}</div><div className="showcase-arrows"><button type="button" data-slide-prev aria-label="Предыдущий слайд"><ArrowIcon direction="left" /></button><button type="button" data-slide-pause aria-label="Остановить смену слайдов" aria-pressed="false"><svg className="showcase-pause-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M9 6v12M15 6v12" /></svg><svg className="showcase-play-icon" viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="m9 5 10 7-10 7Z" /></svg></button><button type="button" data-slide-next aria-label="Следующий слайд"><ArrowIcon direction="right" /></button></div></div>
    </div>
    <div className="showcase-footnote"><span>Инженерия для жизни и бизнеса · Визуализации</span><a href="#contact">Обсудим ваш объект <ArrowIcon /></a></div>
  </section>;
}
