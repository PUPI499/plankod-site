import type { Metadata } from "next";
import { ContactBand, SiteFooter, SiteHeader } from "../components";
import { GetSmartHomeButton } from "../get-smart-home-modal";

export const metadata: Metadata = {
  title: "Умный дом под ключ — ПЛАНКОД",
  description: "Интеграция отопления, вентиляции, кондиционирования, света, безопасности и доступа с Алисой или Сбером.",
  openGraph: { title: "Умный дом под ключ — ПЛАНКОД", description: "Инженерные системы, климат, безопасность и голосовое управление в одной системе.", images: [] },
  twitter: { title: "Умный дом под ключ — ПЛАНКОД", description: "Инженерные системы и автоматизация дома.", images: [] },
};

export default function SmartHomePage() {
  return (
    <main>
      <SiteHeader active="smart" />

      <section className="subhero shell" id="top">
        <div className="subhero-copy panel">
          <span className="micro-label">Умный дом / проектирование и монтаж</span>
          <h1>Инженерия дома.<br /><em>Под вашим</em><br />контролем.</h1>
          <p>Управляйте отоплением, вентиляцией, кондиционированием, светом и безопасностью привычным способом: кнопкой, в приложении или голосом.</p>
          <div className="subhero-actions"><GetSmartHomeButton label="Связаться с нами" /><b className="pill">Проект от 15 000 ₽</b></div>
          <div className="subhero-note"><span className="pill">Все голосовые ассистенты</span><small>* Подтверждаем совместимость оборудования до закупки.</small></div>
        </div>
        <div className="integration-visual panel">
          <div className="visual-grid" />
          <div className="integration-hub"><small>ПЛАНКОД</small><strong>ДОМ</strong><span>все системы на связи</span></div>
          <svg className="integration-traces" viewBox="0 0 760 56" preserveAspectRatio="none" aria-hidden="true">
            <path d="M380 0 V18 H90 V56 M380 18 H283 V56 M380 18 H477 V56 M380 18 H670 V56" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth="1.5" />
            <circle cx="380" cy="0" r="4.5" fill="#9f9cf0" />
            <circle cx="380" cy="18" r="3.5" fill="#fff" />
            <circle cx="90" cy="56" r="3.5" fill="#fff" />
            <circle cx="283" cy="56" r="3.5" fill="#fff" />
            <circle cx="477" cy="56" r="3.5" fill="#fff" />
            <circle cx="670" cy="56" r="3.5" fill="#fff" />
          </svg>
          <div className="integration-chips">
            <div className="system-chip"><i>01</i><b>Отопление</b><span>22° · норма</span></div>
            <div className="system-chip"><i>02</i><b>Вентиляция</b><span>воздух · чисто</span></div>
            <div className="system-chip"><i>03</i><b>Кондиционер</b><span>тихий режим</span></div>
            <div className="system-chip"><i>04</i><b>Безопасность</b><span>всё закрыто</span></div>
          </div>
          <div className="voice-command">«Алиса, я дома»<b>→</b></div>
        </div>
      </section>

      <section className="page-section shell">
        <div className="page-heading capability-heading"><span>01 / возможности</span><h2>Не отдельные функции.<br /><em>Цельный дом.</em></h2><p>Сценарии проектируются вместе с инженерными системами.</p></div>
        <div className="capability-grid">
          <article className="capability-card panel cobalt"><span>Климат</span><h3>Отопление</h3><p>Температура по комнатам, расписания, экономичный режим и защита от замерзания.</p><b>01</b></article>
          <article className="capability-card panel"><span>Воздух</span><h3>Вентиляция</h3><p>Скорость по качеству воздуха, ночной режим и совместная работа с климатом.</p><b>02</b></article>
          <article className="capability-card panel photo-cap"><span>Комфорт</span><h3>Кондиционирование</h3><p>Поддержание температуры, расписания и голосовое управление совместимыми моделями.</p><b>03</b></article>
          <article className="capability-card panel dark-cap"><span>Безопасность</span><h3>Протечки и доступ</h3><p>Перекрытие воды, уведомления, видеодомофон, двери и контроль присутствия.</p><b>04</b></article>
          <article className="capability-card panel"><span>Быт</span><h3>Свет и розетки</h3><p>Типовые задачи, с которых удобно начать в уже готовом доме или квартире.</p><b>05</b></article>
          <article className="capability-card panel outline-cap"><span>Интеграция</span><h3>Единые сценарии</h3><p>Одна команда меняет свет, температуру, вентиляцию и режим безопасности.</p><b>06</b></article>
        </div>
      </section>

      <section className="smart-scenes">
        <div className="shell">
          <div className="page-heading page-heading-light"><span>02 / как это ощущается</span><h2>Сценарии без<br /><em>театральности</em></h2><p>Автоматизируем то, что повторяется каждый день. Всё остальное оставляем под обычной кнопкой.</p></div>
          <div className="scene-timeline">
            <article><span>07:00</span><h3>Доброе утро</h3><div className="scene-note"><p>Вентиляция выходит из тихого режима, в доме комфортная температура.</p></div></article>
            <article className="scene-active"><span>08:30</span><h3>Все ушли</h3><div className="scene-note"><p>Свет и выбранные розетки выключены, вода под контролем, климат экономит.</p></div></article>
            <article><span>18:40</span><h3>Возвращаемся</h3><div className="scene-note"><p>Дом заранее готовит воздух и температуру, включается нужный свет.</p></div></article>
            <article><span>23:30</span><h3>Ночь</h3><div className="scene-note"><p>Тихая вентиляция, комфорт в спальнях и контроль дверей.</p></div></article>
          </div>
        </div>
      </section>

      <section className="page-section shell smart-kit-section">
        <div className="kit-copy panel">
          <span className="micro-label">С чего можно начать</span>
          <h2>С одной задачи<br />или со всего<br /><em>дома сразу</em></h2>
          <p>Для готового интерьера — беспроводные устройства. Для стройки — полноценный проект с инженерией и автоматикой.</p>
          <a href="/products">Перейти к продукции <span>↗</span></a>
        </div>
        <div className="kit-list panel">
          <div><span>01</span><h3>Контроль протечек</h3><p>Датчики + привод перекрытия + уведомление</p><b>готовый дом</b></div>
          <div><span>02</span><h3>Умный климат</h3><p>Температура + кондиционер + отопление</p><b>проект / готовый дом</b></div>
          <div><span>03</span><h3>Безопасный доступ</h3><p>Видеодомофон + замок + сценарии</p><b>дом / коммерция</b></div>
          <div><span>04</span><h3>Весь дом</h3><p>Инженерия + свет + безопасность + голос</p><b>лучше до ремонта</b></div>
        </div>
      </section>

      <section className="smart-method shell">
        <div className="page-heading"><span>03 / порядок работы</span><h2>Серьёзная система<br />начинается <em>с проекта</em></h2></div>
        <div className="method-line">
          <article><i>1</i><h3>Задачи</h3><p>Что должно происходить и что уже есть на объекте.</p></article>
          <article><i>2</i><h3>Проект</h3><p>Сценарии, точки, оборудование и связи между системами.</p></article>
          <article><i>3</i><h3>Поставка</h3><p>Комплектуем согласованными и проверенными устройствами.</p></article>
          <article><i>4</i><h3>Монтаж</h3><p>Установка, подключение, программирование и испытания.</p></article>
          <article><i>5</i><h3>Сервис</h3><p>Обучение, поддержка и развитие системы.</p></article>
        </div>
      </section>

      <ContactBand eyebrow="Умный дом начинается с разговора" title={"Расскажите, что должен\nуметь ваш дом."} />
      <SiteFooter />
    </main>
  );
}
