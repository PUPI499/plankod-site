"use client";
/* eslint-disable @next/next/no-img-element -- technical drawings must preserve their original dimensions */

import { useEffect, useState } from "react";
import type { ProjectMedia } from "./data";

export function ProjectGallery({ media }: { media: ProjectMedia[] }) {
  const [active, setActive] = useState<number | null>(null);

  useEffect(() => {
    if (active === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setActive(null);
      if (event.key === "ArrowRight") setActive((value) => value === null ? null : (value + 1) % media.length);
      if (event.key === "ArrowLeft") setActive((value) => value === null ? null : (value - 1 + media.length) % media.length);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [active, media.length]);

  const showPrevious = () => setActive((value) => value === null ? null : (value - 1 + media.length) % media.length);
  const showNext = () => setActive((value) => value === null ? null : (value + 1) % media.length);

  return (
    <>
      <div className="case-gallery-grid">
        {media.map((item, index) => (
          <button
            className={`case-gallery-item panel ${item.format === "wide" ? "is-wide" : ""} ${item.format === "portrait" ? "is-portrait" : ""}`}
            key={item.src}
            type="button"
            onClick={() => setActive(index)}
            aria-label={`Открыть изображение: ${item.label}`}
          >
            <img src={item.src} alt={item.label} loading={index < 2 ? "eager" : "lazy"} />
            <span>{String(index + 1).padStart(2, "0")}</span>
            <div><b>{item.label}</b><small>Увеличить ↗</small></div>
          </button>
        ))}
      </div>

      {active !== null && (
        <div className="case-lightbox" role="dialog" aria-modal="true" aria-label="Просмотр проектного чертежа" onClick={() => setActive(null)}>
          <button className="case-lightbox-close" type="button" aria-label="Закрыть" onClick={() => setActive(null)}>×</button>
          <button className="case-lightbox-arrow previous" type="button" aria-label="Предыдущее изображение" onClick={(event) => { event.stopPropagation(); showPrevious(); }}>←</button>
          <figure onClick={(event) => event.stopPropagation()}>
            <img src={media[active].src} alt={media[active].label} />
            <figcaption><span>{media[active].label}</span><b>{active + 1} / {media.length}</b></figcaption>
          </figure>
          <button className="case-lightbox-arrow next" type="button" aria-label="Следующее изображение" onClick={(event) => { event.stopPropagation(); showNext(); }}>→</button>
        </div>
      )}
    </>
  );
}
