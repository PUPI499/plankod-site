// Interactivity (validation, /contact.php submission) lives in
// work/hostland-catalog.js — this export ships no React runtime, only
// server-rendered markup, so behaviour must be plain DOM JS.
const TELEGRAM_LINK = "https://t.me/plancod";

export function ContactForm() {
  return (
    <form className="contact-form" action="/contact.php" method="post" aria-label="Заявка на консультацию">
      <label>Как к вам обращаться<input name="name" autoComplete="name" placeholder="Имя" maxLength={60} required /></label>
      <label>Как с вами связаться<input name="contact" autoComplete="tel" placeholder="Телефон, email или Telegram" maxLength={90} required /></label>
      <label>Опишите задачу<textarea name="message" rows={4} placeholder="Что нужно спроектировать, смонтировать или подключить" maxLength={5000} required /></label>
      <input type="text" name="website" className="hp-field" tabIndex={-1} autoComplete="off" aria-hidden="true" />
      <div className="consent-row">
        <input type="checkbox" id="pd-consent" name="consent" value="1" required />
        <label htmlFor="pd-consent" style={{ margin: 0 }}>Даю согласие на <a href="/privacy" target="_blank" rel="noopener noreferrer">обработку персональных данных</a></label>
      </div>
      <div className="contact-form-actions">
        <button type="submit" className="mail-link" disabled>Отправить заявку</button>
        <a className="telegram-link" href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">Telegram</a>
      </div>
      <p className="form-status form-status-ok" role="status" hidden>Заявка отправлена, ответим в течение одного рабочего дня.</p>
      <p className="form-status form-status-error" role="alert" hidden>
        Не удалось подтвердить отправку. Ваш текст сохранён в форме. Попробуйте ещё раз или напишите нам в <a href={TELEGRAM_LINK} target="_blank" rel="noopener noreferrer">Telegram</a>.
      </p>
      <noscript><p>Для отправки формы нужен JavaScript. Вы также можете написать на <a href="mailto:info@plancod.ru">info@plancod.ru</a> или в Telegram.</p></noscript>
    </form>
  );
}
