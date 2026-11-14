import { ArrowIcon } from '../arrow-icon';
import { equipmentCategories, type SmartService } from './data';
const options = [['b2b_supply','Автоматизация действующего объекта'],['equipment','Стоимость оборудования'],['smart_design','Проектирование автоматизации']] as const;
export function SmartInquiry({service='b2b_supply'}:{service?:SmartService;hub?:boolean}) {
 const title=service==='smart_design'?'Начнём с задачи.\nРазработаем проект.':service==='equipment'?'Расскажите о задаче.\nПодберём оборудование.':'Расскажите об объекте.\nПодготовим предложение.';
 return <section id="contact" className="ss-contact shell"><div className="ss-contact-copy"><span className="ss-eyebrow">Обсудить решение</span><h2>{title.split('\n').map(t=><span key={t}>{t}</span>)}</h2><p>Укажите назначение здания и задачу эксплуатации. Инженер уточнит исходные данные и определит, требуется ли обследование для подготовки предложения.</p><a href="tel:+79518285872">+7 951 828-58-72</a><a href="mailto:info@plancod.ru">info@plancod.ru</a><a href="https://t.me/plancod" target="_blank" rel="noopener noreferrer">Обсудить в Telegram <ArrowIcon /></a><p className="ss-fine">Техническое задание можно передать ссылкой в форме или отправить файлом в Telegram / по email.</p></div>
 <form id="smart-inquiry" className="contact-form smart-inquiry" data-smart-form action="/contact.php" method="post" data-service={service} aria-label="Заявка на автоматизацию здания">
 <div className="ss-fields">
 <label className="ss-full">Что требуется<select name="service" defaultValue={service}>{options.map(([v,n])=><option key={v} value={v}>{n}</option>)}</select></label>
 <label className="ss-full">Компания<input name="company" autoComplete="organization" maxLength={120} placeholder="Название компании" /></label>
 <label>Ваше имя (обязательно)<input name="name" autoComplete="name" maxLength={60} required placeholder="Как к вам обращаться" /></label>
 <label>Телефон или email<input name="contact" autoComplete="email" maxLength={90} required placeholder="Для связи с вами" /></label>
 <label>Тип объекта<select name="object_type" required defaultValue=""><option value="" disabled>Выберите объект</option>{['Гостиница или отель','Санаторий или пансионат','Больница или медицинский центр','Родильный дом','Специализированное отделение','Другое здание организации'].map(s=><option key={s}>{s}</option>)}</select></label>
 <label>Город (по желанию)<input name="city" autoComplete="address-level2" maxLength={100} placeholder="Если уже определён" /></label>
 </div>
 <details open={service==='equipment'}><summary>Добавить функции или категории оборудования</summary><fieldset className="ss-form-options"><legend>{service==='equipment'?'Категории для подбора':'Какие функции интересуют'}</legend>{(service==='equipment'?equipmentCategories.map(x=>x[1]):['Отопление и климат','Вентиляция и кондиционирование','Освещение','Шторы','Датчики и мониторинг','Защита от протечек','Сценарии управления','Централизованное управление']).map(x=><label key={x}><input type="checkbox" name="functions" value={x} />{x}</label>)}</fieldset></details>
 <label>{service==='equipment'?'Список позиций и пожелания':'Задача и существующие инженерные системы'}<textarea name="message" rows={4} maxLength={5000} placeholder={service==='equipment'?'Можно указать модели, количество и нужные функции':'Что уже есть на объекте и какие задачи нужно решить'} /></label>
 <label>Ссылка на ТЗ или план — при наличии<input type="url" name="brief_url" maxLength={1000} placeholder="https://…" /><small>Убедитесь, что доступ к документу открыт для получателя ссылки.</small></label>
 <input type="text" name="website" className="hp-field" tabIndex={-1} autoComplete="off" aria-hidden="true" />
 <div className="consent-row"><input type="checkbox" id="smart-consent" name="consent" value="1" required /><label htmlFor="smart-consent">Даю согласие на <a href="/privacy" target="_blank" rel="noopener noreferrer">обработку персональных данных</a></label></div>
 <button type="submit" className="ss-button ss-submit">{service==='smart_design'?'Отправить заявку на проектирование':service==='b2b_supply'?'Отправить задачу по объекту':'Запросить подбор и стоимость'}<ArrowIcon /></button>
 <p className="form-status" data-smart-status role="status" aria-live="polite" hidden />
 <noscript><p>Для отправки формы включите JavaScript или напишите на info@plancod.ru.</p></noscript>
 </form></section>;
}
