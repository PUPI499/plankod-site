"use client";

import { useState } from "react";

// PLACEHOLDER contacts — Anna will supply the real Telegram / Max links later.
const TELEGRAM_LINK = "https://t.me/plankod";
const MAX_LINK = "https://max.ru/plankod";
const CONTACT_EMAIL = "info@plankod.ru";

export function ContactForm() {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [consent, setConsent] = useState(false);

  const body = `Имя: ${name || "—"}\n\nЗадача:\n${message || "—"}`;
  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Заявка с сайта ПЛАНКОД")}&body=${encodeURIComponent(body)}`;

  return (
    <div className="contact-form">
      <label>Как к вам обращаться<input value={name} onChange={(event) => setName(event.target.value)} placeholder="Имя" /></label>
      <label>Опишите задачу<textarea rows={4} value={message} onChange={(event) => setMessage(event.target.value)} placeholder="Что нужно спроектировать, смонтировать или подключить" /></label>
      <div className="consent-row">
        <input type="checkbox" id="pd-consent" checked={consent} onChange={(event) => setConsent(event.target.checked)} />
        <label htmlFor="pd-consent" style={{ margin: 0 }}>Даю согласие на обработку персональных данных</label>
      </div>
      <div className="contact-form-actions">
        <a className={`mail-link${consent ? "" : " disabled-link"}`} aria-disabled={!consent} href={consent ? mailtoHref : undefined} onClick={(event) => { if (!consent) event.preventDefault(); }}>
          Написать на почту
        </a>
        <a className="telegram-link" href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">Telegram</a>
        <a className="max-link" href={MAX_LINK} target="_blank" rel="noopener noreferrer">Max</a>
      </div>
    </div>
  );
}
