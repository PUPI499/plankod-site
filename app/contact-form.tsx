// Interactivity (validation, /contact.php submission) lives in
// work/hostland-catalog.js — this export ships no React runtime, only
// server-rendered markup, so behaviour must be plain DOM JS.
const TELEGRAM_LINK = "https://t.me/plancod";

export function ContactForm() {
  return (
    <div className="contact-form" role="form" aria-label="Заявка на консультацию">
      <label>Как к вам обращаться<input name="name" autoComplete="name" placeholder="Имя" required /></label>
      <label>Как с вами связаться<input name="contact" autoComplete="tel" placeholder="Телефон, email или Telegram" required /></label>
      <label>Опишите задачу<textarea name="message" rows={4} placeholder="Что нужно спроектировать, смонтировать или подключить" required /></label>
      <input type="text" name="website" className="hp-field" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="consent-row">
        <input type="checkbox" id="pd-consent" />
        <label htmlFor="pd-consent" style={{ margin: 0 }}>Даю согласие на обработку персональных данных</label>
      </div>
      <div className="contact-form-actions">
        <button type="button" className="mail-link" disabled>Отправить заявку</button>
        <a className="telegram-link" href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">Telegram</a>
      </div>
      <p className="form-status form-status-ok" hidden>Заявка отправлена, ответим в течение одного рабочего дня.</p>
      <p className="form-status form-status-error" hidden>
        Не получилось отправить автоматически. Пожалуйста, напишите нам в <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">Telegram</a> — сообщение точно не потеряется.
      </p>
    </div>
  );
}
