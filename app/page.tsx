import { ContactBand, SiteFooter, SiteHeader } from "./components";
import { GetSmartHomeButton } from "./get-smart-home-modal";

const heatingFloors = [
  { n: 1, color: "#fff" },
  { n: 2, color: "#9f9cf0" },
  { n: 3, color: "#fff" },
  { n: 4, color: "#9f9cf0" },
];

export default function Home() {
  return (
    <main>
      <SiteHeader active="home" />

      <section className="hero shell" id="top">
        <div className="hero-copy panel">
          <div className="eyebrow"><span>Проект от 15 000 ₽</span><b>Сначала думаем. Потом делаем.</b></div>
          <h1>Считаем.<br /><em>Проектируем.</em><br />Делаем умным.</h1>
          <p>Проектируем инженерные системы объектов любой сложности — от частного дома до производственного цеха: отопление, вентиляция, кондиционирование. А для дома — ещё и умный дом с понятным управлением.</p>
          <div className="hero-actions">
            <GetSmartHomeButton label="Связаться с нами" />
            <a className="quiet-link" href="#install">Как мы работаем ↓</a>
          </div>
          <div className="trust-strip">
            <span><i>01</i><b>На рынке с 2022 года</b></span>
            <span><i>02</i><b>Смета до начала работ</b></span>
            <span><i>03</i><b>Один подрядчик на весь цикл</b></span>
          </div>
        </div>

        <div className="hero-system panel" aria-label="Изометрическая схема здания с разводкой отопления">
          <div className="system-top"><span>ПЛАНКОД / ЛИСТ ОВ-03</span><strong>изометрия</strong></div>
          <div className="object-schematic">
            <svg viewBox="0 0 400 460" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              <path d="M170 400 L300 325 L300 105 L170 180 Z" fill="rgba(255,255,255,.045)" stroke="rgba(255,255,255,.5)" strokeWidth="1.6" />
              <path d="M170 400 L75 345 L75 125 L170 180 Z" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.5)" strokeWidth="1.6" />
              <path d="M170 180 L300 105 L205 50 L75 125 Z" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.55)" strokeWidth="1.6" />
              <path d="M170 345 L300 270 M170 290 L300 215 M170 235 L300 160" fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="1" />
              <path d="M170 345 L75 290 M170 290 L75 235 M170 235 L75 180" fill="none" stroke="rgba(255,255,255,.16)" strokeWidth="1" />
              <path d="M170 400 V180" fill="none" stroke="rgba(255,255,255,.85)" strokeWidth="2.2" />
              {heatingFloors.map((f) => {
                const riserY = 400 - f.n * 55;
                const rightX = 235, rightY = riserY - 37.5;
                const leftX = 122.5, leftY = riserY - 27.5;
                return (
                  <g key={f.n}>
                    <path d={`M170 ${riserY} L${rightX} ${rightY}`} fill="none" stroke={f.color} strokeWidth="1.6" />
                    <path d={`M170 ${riserY} L${leftX} ${leftY}`} fill="none" stroke={f.color} strokeWidth="1.6" />
                    <circle cx="170" cy={riserY} r="3.4" fill={f.color} />
                    <path d={`M${rightX} ${rightY - 6} L${rightX + 6} ${rightY} L${rightX} ${rightY + 6} L${rightX - 6} ${rightY} Z`} fill={f.color} />
                    <path d={`M${leftX} ${leftY - 6} L${leftX + 6} ${leftY} L${leftX} ${leftY + 6} L${leftX - 6} ${leftY} Z`} fill={f.color} />
                    <text x="152" y={riserY - 10} fontSize="7" fill="rgba(255,255,255,.5)">{`+${(f.n * 3.3).toFixed(1)}`}</text>
                  </g>
                );
              })}
              <text x="240" y="130" fontSize="8" fill="rgba(255,255,255,.55)">Ø25</text>
              <text x="88" y="195" fontSize="8" fill="rgba(159,156,240,.85)">Ø32</text>
              <rect x="143" y="404" width="54" height="18" fill="rgba(23,20,143,.5)" stroke="rgba(255,255,255,.55)" strokeWidth="1.4" />
              <text x="153" y="417" fontSize="9" fill="rgba(255,255,255,.8)">ИТП</text>
            </svg>
          </div>
          <div className="object-card">
            <small>Тепловая нагрузка</small>
            <div className="room-schedule">
              <div><i>01</i><span>Этаж 1</span><b>4,2 кВт</b></div>
              <div><i>02</i><span>Этаж 2</span><b>3,8 кВт</b></div>
              <div><i>03</i><span>Этаж 3</span><b>3,8 кВт</b></div>
            </div>
            <div className="circuit-legend"><span>Т1</span><span>Т2</span><span>ГВС</span></div>
          </div>
          <div className="system-caption">Вентиляция. Отопление. Кондиционирование.<br /><strong>Один инженерный проект — от расчёта до пусконаладки.</strong></div>
        </div>
      </section>

      <section className="equipment-preview shell" id="equipment">
        <div className="section-head">
          <div><span className="section-number">01</span><p>Что устанавливаем</p></div>
          <h2>Оборудование,<br />которое <em>работает вместе</em></h2>
        </div>
        <div className="equipment-grid">
          <a className="equipment-card blue-card" href="/products">
            <div className="device-art sensor-art"><i /><span /></div>
            <small>Безопасность</small><h3>Датчики протечки</h3><p>Уведомят и перекроют воду по сценарию.</p>
          </a>
          <a className="equipment-card" href="/products">
            <div className="device-art socket-art"><i /><i /></div>
            <small>Управление</small><h3>Розетки и реле</h3><p>Свет и приборы без ремонта готового интерьера.</p>
          </a>
          <a className="equipment-card photo-card" href="/products">
            <div className="card-photo" />
            <small>Доступ</small><h3>Видеодомофоны</h3><p>Звонок, камера и открытие двери в одном приложении.</p>
          </a>
          <a className="equipment-card dark-card" href="/products">
            <div className="device-art climate-art"><span>22</span><i>°</i></div>
            <small>Климат</small><h3>Кондиционеры</h3><p>Gree и Midea: поставка, монтаж, управление.</p>
          </a>
        </div>
      </section>

      <section className="trust-section shell" id="install">
        <div className="trust-title blue-panel panel">
          <span className="micro-label">Что делает ПЛАНКОД</span>
          <h2>Проектируем.<br />Монтируем.<br /><em>Объединяем.</em></h2>
          <p>Инженерное проектирование — вентиляция, отопление, кондиционирование, климат производственных и общественных зданий — и умный дом там, где он нужен. Не разные подрядчики, а одна команда и один проект.</p>
          <div className="trust-highlights"><span className="pill">Проект</span><span className="pill">Оборудование</span><span className="pill">Монтаж</span><span className="pill">Сервис</span></div>
          <div className="plan-code-mark"><span>ПЛАН</span><i>→</i><span>КОД</span></div>
        </div>
        <div className="proof-grid">
          <article className="proof-card panel">
            <span>01</span><h3>Инженерный проект</h3>
            <p>Отопление, вентиляция, кондиционирование и автоматика — для дома, производства и коммерческих объектов — до выхода на площадку.</p>
          </article>
          <article className="proof-card panel dark-proof">
            <span>02</span><h3>Поставка оборудования</h3>
            <p>Умный дом, Gree и Midea: подбираем совместимое и комплектуем объект.</p>
          </article>
          <article className="proof-card panel photo-proof">
            <div className="proof-photo" />
            <span>03</span><h3>Монтаж и запуск</h3>
            <p>Устанавливаем, подключаем, программируем и проверяем рабочие режимы.</p>
          </article>
          <article className="proof-card panel">
            <span>04</span><h3>Умный дом</h3>
            <p>Связываем климат, свет, безопасность и доступ в единые сценарии.</p>
          </article>
        </div>
      </section>

      <section className="shop-section" id="price">
        <div className="shell">
          <div className="section-head inverse-head">
            <div><span className="section-number">02</span><p>Комплекты и стоимость</p></div>
            <h2>Покупаете не гаджеты.<br />Покупаете <em>результат.</em></h2>
          </div>
          <div className="price-layout">
            <article className="price-card price-main panel">
              <div className="price-top"><span>01 / обязательный старт</span><b>Рекомендуем</b></div>
              <h3>Стартовый инженерный проект</h3>
              <div className="price-value">от 15 000 ₽</div>
              <p>Зачтём эту сумму в монтаж, если продолжим работать вместе.</p>
              <ul><li>Задачи и инженерные решения</li><li>Схемы размещения</li><li>Спецификация оборудования</li><li>Предварительная смета</li></ul>
              <a href="#contact">Заказать проект <span>↗</span></a>
            </article>
            <article className="price-card panel">
              <div className="price-top"><span>02 / для готового ремонта</span></div>
              <h3>Беспроводной старт</h3>
              <div className="price-value small-price">по составу</div>
              <p>Датчики, розетки, реле и сценарии без капитальной переделки электрики.</p>
              <div className="honest-note"><b>Почему нет фальшивой цены «от»?</b><span>Она зависит от количества точек и выбранной экосистемы. Сначала дадим список, потом счёт.</span></div>
              <a href="#contact">Собрать комплект <span>↗</span></a>
            </article>
            <article className="price-card panel">
              <div className="price-top"><span>03 / климат</span></div>
              <h3>Кондиционер под ключ</h3>
              <div className="price-value small-price">по смете</div>
              <p>Gree или Midea, доставка, монтаж, запуск и подключение к управлению — если модель это поддерживает.</p>
              <div className="brand-row"><span>GREE</span><span>MIDEA</span></div>
              <a href="#contact">Подобрать модель <span>↗</span></a>
            </article>
          </div>
        </div>
      </section>

      <section className="company-trust shell">
        <div className="company-year panel"><span>На рынке</span><strong>с 2022</strong><p>Проектирование, инженерные системы, монтаж и автоматизация.</p></div>
        <div className="company-story panel">
          <span className="micro-label">О компании</span>
          <h2>Сначала проект.<br />Потом <em>оборудование и монтаж.</em></h2>
          <p>Так меньше риск купить несовместимые устройства, переделывать монтаж и искать ответственного между разными подрядчиками. ПЛАНКОД ведёт объект от расчётов до запуска и сервиса.</p>
          <div className="company-proof"><span><b>Проект</b> до закупки</span><span><b>Смета</b> по этапам</span><span><b>Один подрядчик</b> на весь цикл</span></div>
          <div className="company-links"><a href="/about">Подробнее о компании ↗</a><a href="/projects">Смотреть объекты ↗</a></div>
        </div>
      </section>

      <section className="scenarios-section shell">
        <div className="scenario-copy panel">
          <span className="micro-label">Не «вау-эффекты», а ежедневные мелочи</span>
          <h2>Дом понимает<br /><em>обычные команды</em></h2>
          <p>Вам не нужно изучать интерфейс инженера. Оставляем понятные кнопки, приложение и голосовые сценарии.</p>
          <div className="assistant-badges"><span className="pill">Все голосовые ассистенты</span></div>
          <small>* Совместимость подтверждаем для конкретного комплекта до закупки.</small>
        </div>
        <div className="scenario-board panel">
          <div className="board-head"><span>МОИ СЦЕНАРИИ</span><b>4 активных</b></div>
          <div className="scenario-list">
            <article><i>01</i><div><h3>Я ушёл</h3><p>Свет выключен, вода перекрыта, охрана включена.</p></div><b>→</b></article>
            <article className="active-scenario"><i>02</i><div><h3>Я дома</h3><p>Комфортный свет и климат без лишних действий.</p></div><b>→</b></article>
            <article><i>03</i><div><h3>Спокойная ночь</h3><p>Дверь закрыта, техника выключена, датчики на связи.</p></div><b>→</b></article>
            <article><i>04</i><div><h3>Протечка</h3><p>Вода перекрыта, уведомление уже в телефоне.</p></div><b>→</b></article>
          </div>
        </div>
      </section>

      <section className="steps-section shell">
        <div className="section-head">
          <div><span className="section-number">03</span><p>Как всё проходит</p></div>
          <h2>Четыре шага.<br /><em>Без сюрпризов.</em></h2>
        </div>
        <div className="steps-grid">
          <article><span>1</span><h3>Получаем вводные</h3><p>План, адрес, стадия ремонта, ваши задачи и уже купленная техника.</p><small>15–30 минут</small></article>
          <article><span>2</span><h3>Собираем решение</h3><p>Проектируем сценарии, проверяем устройства и объясняем выбор.</p><small>срок после вводных</small></article>
          <article><span>3</span><h3>Поставляем и монтируем</h3><p>Привозим согласованное оборудование, устанавливаем и настраиваем.</p><small>по согласованному графику</small></article>
          <article><span>4</span><h3>Сдаём и остаёмся</h3><p>Проверяем каждый сценарий вместе, обучаем и берём на сервис.</p><small>акт + инструкция</small></article>
        </div>
      </section>

      <section className="comparison-section shell">
        <div className="comparison-title panel">
          <span className="micro-label">Главное отличие</span>
          <h2>Не магазин.<br />Не «мастер<br />на час».</h2>
          <p>ПЛАНКОД — один ответственный за подбор, оборудование, монтаж, настройку и дальнейшую работу системы.</p>
          <div className="comparison-points"><span><b>1</b>Проект</span><span><b>2</b>Оборудование</span><span><b>3</b>Монтаж</span><span><b>4</b>Сервис</span></div>
        </div>
        <div className="comparison-table panel">
          <div className="table-row table-head"><span>Что сравниваем</span><span>Обычная покупка</span><span>ПЛАНКОД</span></div>
          <div className="table-row"><b>Совместимость</b><span>разбираетесь сами</span><strong>проверяем до заказа</strong></div>
          <div className="table-row"><b>Монтаж</b><span>отдельный исполнитель</span><strong>одна команда</strong></div>
          <div className="table-row"><b>Сценарии</b><span>настраиваете сами</span><strong>сдаём готовыми</strong></div>
          <div className="table-row"><b>Если что-то не работает</b><span>несколько поддержек</span><strong>одно окно</strong></div>
          <div className="table-row"><b>Цена</b><span>коробки без полной картины</span><strong>состав и работы отдельно</strong></div>
        </div>
      </section>

      <section className="secondary-section">
        <div className="shell secondary-grid">
          <div className="secondary-intro">
            <span className="micro-label">Два направления — одна команда</span>
            <h2>Проектирование<br />и <em>умный дом</em></h2>
            <p>Отопление, вентиляцию и кондиционирование проектируем для дома, производственных цехов и коммерческих объектов — от квартиры до комплекса зданий. Умный дом связываем в тот же проект, где это уместно.</p>
          </div>
          <div className="secondary-list">
            <article><span>01</span><h3>Кондиционирование</h3><p>Подбор, поставка и монтаж Gree / Midea.</p></article>
            <article><span>02</span><h3>Вентиляция</h3><p>Приток, вытяжка и решения с рекуперацией — от квартиры до цеха пищевого производства.</p></article>
            <article><span>03</span><h3>Отопление</h3><p>Проектирование и управление температурой.</p></article>
            <article><span>04</span><h3>Промышленные и общественные объекты</h3><p>Вентиляция производств, климат кинозалов, фасадный обогрев, инженерия кампусов.</p></article>
            <article><span>05</span><h3>Умный дом</h3><p>Сценарии, датчики и объединённое управление домом.</p></article>
            <article><span>06</span><h3>Сервис</h3><p>Диагностика, регламент и развитие системы.</p></article>
          </div>
        </div>
      </section>

      <section className="cases-section shell">
        <div className="case-card panel case-photo-one"><span>PLACEHOLDER / ЧАСТНЫЙ ДОМ</span><h3>Инженерные системы и умный дом</h3><p>Площадь, регион, состав проекта и фотографии будут добавлены после получения данных.</p></div>
        <div className="case-card panel case-message"><span>ПОРТФОЛИО ПЛАНКОД</span><h2>Проекты,<br />которыми можно<br /><em>объяснить подход</em></h2><p>На отдельной странице подготовлена структура портфолио: задача, решение, оборудование, монтаж и результат.</p><a href="/projects">Перейти ко всем объектам ↗</a></div>
        <div className="case-card panel case-photo-two"><span>PLACEHOLDER / ПРОИЗВОДСТВО</span><h3>Вентиляция производственного цеха</h3><p>Тип объекта, площадь и инженерные показатели будут заполнены позднее.</p></div>
      </section>

      <section className="faq-section shell">
        <div className="faq-title"><span className="section-number">04</span><h2>Нормальные<br /><em>сомнения</em></h2><p>Мы тоже перепроверяем технику перед покупкой. Поэтому отвечаем без рекламных формулировок.</p></div>
        <div className="faq-list">
          <details open><summary>А если интернет отключится?<b>+</b></summary><p>Зависит от выбранного оборудования. Критичные функции — например, физическая кнопка света или локальное перекрытие воды — проектируем так, чтобы они не зависели только от облака.</p></details>
          <details><summary>Вы привязываете к одному производителю?<b>+</b></summary><p>Нет цели продать один логотип. Подбираем совместимую систему под задачу и заранее фиксируем, какие компоненты можно будет заменить или расширить.</p></details>
          <details><summary>Можно начать с нескольких устройств?<b>+</b></summary><p>Да. Для готового дома разумно начать с протечек, розеток, видеодомофона или управления климатом, а затем расширять систему.</p></details>
          <details><summary>Почему на сайте мало точных цен?<b>+</b></summary><p>Потому что комплект зависит от количества точек, протокола и состояния объекта. Подтверждённая цена проекта — от 15 000 ₽. Остальное считаем по прозрачной спецификации, а не заманиваем нереальной ценой.</p></details>
          <details><summary>Что будет после установки?<b>+</b></summary><p>Проверим сценарии вместе с вами, покажем управление, передадим состав системы и предложим сервис — без обязательной подписки, если она вам не нужна.</p></details>
        </div>
      </section>

      <ContactBand eyebrow="Начать без обязательств" title={"Покажите план.\nМы покажем, что имеет смысл."} />
      <SiteFooter />
    </main>
  );
}
