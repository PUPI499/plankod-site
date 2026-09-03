"use client";

import { useState } from "react";

const TELEGRAM_LINK = "https://t.me/plancod";
const EMAIL_LINK = "mailto:info@plancod.ru?subject=Получить%20умный%20дом";

export function GetSmartHomeButton({ label = "Обсудить объект" }: { label?: string }) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" className="primary-button smart-home-cta" onClick={() => setOpen(true)}>
        {label} <span>↗</span>
      </button>
      <div className="modal-overlay" hidden={!open} role="dialog" aria-modal="true" aria-label="Обсудить объект" onClick={() => setOpen(false)}>
        <div className="modal-card" onClick={(event) => event.stopPropagation()}>
          <button type="button" className="modal-close" aria-label="Закрыть" onClick={() => setOpen(false)}>×</button>
          <span className="micro-label">Обсудить объект</span>
          <h3>Выберите удобный способ связи</h3>
          <p>Ответим и предложим следующий шаг: короткий разговор о задаче или сразу расчёт.</p>
          <div className="modal-links">
            <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">Telegram <span>↗</span></a>
            <a href={EMAIL_LINK}>Email <span>↗</span></a>
          </div>
          <small>В Telegram можно сразу приложить планировку или фотографию объекта.</small>
        </div>
      </div>
    </>
  );
}
