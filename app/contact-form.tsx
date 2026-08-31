// PLACEHOLDER: Max — Anna will supply the real Max link later.
// Interactivity (validation, /contact.php submission) lives in
// work/hostland-catalog.js — this export ships no React runtime, only
// server-rendered markup, so behaviour must be plain DOM JS.
const TELEGRAM_LINK = "https://t.me/plancod";
const MAX_LINK = "https://max.ru/plankod";
const CONTACT_EMAIL = "info@plankod.ru";

export function ContactForm() {
  const mailtoHref = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent("Заявка с сайта ПЛАНКОД")}`;

  return (
    <div className="contact-form">
      <label>Как к вам обращаться<input placeholder="Имя" /></label>
      <label>Как с вами связаться<input placeholder="Телефон, email или Telegram" /></label>
      <label>Опишите задачу<textarea rows={4} placeholder="Что нужно спроектировать, смонтировать или подключить" /></label>
      <input type="text" name="website" className="hp-field" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="consent-row">
        <input type="checkbox" id="pd-consent" />
        <label htmlFor="pd-consent" style={{ margin: 0 }}>Даю согласие на обработку персональных данных</label>
      </div>
      <div className="contact-form-actions">
        <button type="button" className="mail-link" disabled>Отправить заявку</button>
        <a className="telegram-link" href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">Telegram</a>
        <a className="max-link" href={MAX_LINK} target="_blank" rel="noopener noreferrer">Max</a>
      </div>
      <p className="form-status form-status-ok" hidden>Заявка отправлена, ответим в течение одного рабочего дня.</p>
      <p className="form-status form-status-error" hidden>
        Не получилось отправить автоматически. Напишите напрямую на <a href={mailtoHref}>{CONTACT_EMAIL}</a> или в Telegram.
      </p>
    </div>
  );
}
