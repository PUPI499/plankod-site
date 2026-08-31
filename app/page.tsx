import { ContactBand, SiteFooter, SiteHeader } from "./components";
import { GetSmartHomeButton } from "./get-smart-home-modal";

// Isometric house geometry (flatter, grazing-angle isometric): front-bottom
// corner O=(150,410), right wall along Wvec=(155,-41), left wall along
// Dvec=(-106,-29), height 220 (4 floor bands of 55).
function rightPoint(t: number, h: number): [number, number] {
  return [150 + t * 155, 410 - t * 41 - h];
}
function leftPoint(t: number, h: number): [number, number] {
  return [150 - t * 106, 410 - t * 29 - h];
}
function panelPath(pointFn: (t: number, h: number) => [number, number], t: number, h: number, dt: number, dh: number) {
  const [x1, y1] = pointFn(t, h);
  const [x2, y2] = pointFn(t + dt, h);
  const [x3, y3] = pointFn(t + dt, h + dh);
  const [x4, y4] = pointFn(t, h + dh);
  return `M${x1} ${y1} L${x2} ${y2} L${x3} ${y3} L${x4} ${y4} Z`;
}
const rightWindows = [0, 1, 2, 3].flatMap((floor) =>
  [0.3, 0.66].map((t) => ({ t, h: floor * 55 + 17 }))
);
const leftWindows = [0, 1, 2, 3].flatMap((floor) =>
  [0.24, 0.6].map((t) => ({ t, h: floor * 55 + 17 }))
);

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

        <div className="hero-system panel" aria-label="Детализированная изометрическая схема дома: фундамент, стены, окна, крыша, отопление и водоснабжение">
          <div className="system-top"><span>ПЛАНКОД / ЛИСТ ОВ-07</span><strong>изометрия</strong></div>
          <div className="object-schematic">
            <svg viewBox="0 0 400 460" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
              {/* тень на земле — для объёма */}
              <ellipse cx="172" cy="434" rx="172" ry="17" fill="rgba(0,0,0,.22)" />
              {/* фундамент */}
              <path d="M150 410 L305 369 L305 387 L150 428 Z" fill="rgba(255,255,255,.08)" stroke="rgba(255,255,255,.55)" strokeWidth="1.6" />
              <path d="M150 410 L44 381 L44 399 L150 428 Z" fill="rgba(255,255,255,.03)" stroke="rgba(255,255,255,.55)" strokeWidth="1.6" />
              {/* стены */}
              <path d="M150 410 L305 369 L305 149 L150 190 Z" fill="rgba(255,255,255,.09)" stroke="rgba(255,255,255,.65)" strokeWidth="2.2" />
              <path d="M150 410 L44 381 L44 161 L150 190 Z" fill="rgba(255,255,255,.025)" stroke="rgba(255,255,255,.6)" strokeWidth="2.2" />
              <path d="M150 355 L305 314 M150 300 L305 259 M150 245 L305 204" fill="none" stroke="rgba(255,255,255,.12)" strokeWidth="0.7" />
              <path d="M150 355 L44 326 M150 300 L44 271 M150 245 L44 216" fill="none" stroke="rgba(255,255,255,.1)" strokeWidth="0.7" />
              {/* окна */}
              {rightWindows.map((w, i) => {
                const mt = w.t + 0.05;
                const [mx1, my1] = rightPoint(mt, w.h);
                const [mx2, my2] = rightPoint(mt, w.h + 20);
                return (
                  <g key={`rw${i}`}>
                    <path d={panelPath(rightPoint, w.t, w.h, 0.1, 20)} fill="rgba(159,156,240,.24)" stroke="rgba(255,255,255,.65)" strokeWidth="0.9" />
                    <path d={`M${mx1} ${my1} L${mx2} ${my2}`} stroke="rgba(255,255,255,.3)" strokeWidth="0.6" />
                  </g>
                );
              })}
              {leftWindows.map((w, i) => {
                const mt = w.t + 0.05;
                const [mx1, my1] = leftPoint(mt, w.h);
                const [mx2, my2] = leftPoint(mt, w.h + 20);
                return (
                  <g key={`lw${i}`}>
                    <path d={panelPath(leftPoint, w.t, w.h, 0.1, 20)} fill="rgba(159,156,240,.15)" stroke="rgba(255,255,255,.45)" strokeWidth="0.9" />
                    <path d={`M${mx1} ${my1} L${mx2} ${my2}`} stroke="rgba(255,255,255,.2)" strokeWidth="0.6" />
                  </g>
                );
              })}
              {/* входная дверь */}
              <path d={panelPath(rightPoint, 0.42, 0, 0.09, 40)} fill="rgba(255,255,255,.1)" stroke="rgba(255,255,255,.6)" strokeWidth="1.2" />
              {/* крыша (вальмовая) */}
              <path d="M150 190 L305 149 L175 75 Z" fill="rgba(255,255,255,.17)" stroke="rgba(255,255,255,.7)" strokeWidth="2.2" />
              <path d="M150 190 L44 161 L175 75 Z" fill="rgba(255,255,255,.05)" stroke="rgba(255,255,255,.65)" strokeWidth="2.2" />
              <path d="M175 75 L200 64" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="1.3" />
              {/* кровельный блок вентиляции */}
              <rect x="205" y="118" width="24" height="12" fill="rgba(255,255,255,.16)" stroke="rgba(255,255,255,.55)" strokeWidth="1" />
              <path d="M217 118 V102 H247" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.3" />
              <circle cx="247" cy="102" r="2.6" fill="#fff" />
              <text x="233" y="96" fontSize="7" fill="rgba(255,255,255,.55)">ПВУ</text>
              {/* стояк отопления от ИТП, трасса приподнята над карнизом и не совпадает с коньковым узлом */}
              <path d="M150 446 V178" fill="none" stroke="rgba(255,255,255,.9)" strokeWidth="2.2" />
              <path d="M96 192 L246 153" fill="none" stroke="#9f9cf0" strokeWidth="1.8" />
              <circle cx="150" cy="178" r="3.4" fill="#9f9cf0" />
              <path d="M96 192 L66 184" fill="none" stroke="#9f9cf0" strokeWidth="1.6" />
              <circle cx="96" cy="192" r="3" fill="#9f9cf0" />
              <circle cx="246" cy="153" r="2.8" fill="#9f9cf0" />
              <circle cx="66" cy="184" r="2.8" fill="#9f9cf0" />
              <path d="M246 153 V173" fill="none" stroke="#9f9cf0" strokeWidth="1.3" />
              <rect x="239" y="173" width="14" height="8" fill="#9f9cf0" />
              <path d="M66 184 V204" fill="none" stroke="#9f9cf0" strokeWidth="1.3" />
              <rect x="59" y="204" width="14" height="8" fill="#9f9cf0" />
              <text x="172" y="164" fontSize="7" fill="rgba(159,156,240,.9)">Ø20</text>
              <text x="252" y="168" fontSize="7" fill="rgba(159,156,240,.9)">Ø15</text>
              <text x="32" y="200" fontSize="7" fill="rgba(159,156,240,.9)">Ø15</text>
              {/* бак ГВС и водоснабжение */}
              <ellipse cx="225" cy="392" rx="16" ry="6" fill="rgba(111,179,255,.15)" stroke="rgba(111,179,255,.8)" strokeWidth="1.2" />
              <path d="M209 392 V424 M241 392 V424" fill="none" stroke="rgba(111,179,255,.8)" strokeWidth="1.2" />
              <path d="M209 424 A16 6 0 0 0 241 424" fill="none" stroke="rgba(111,179,255,.8)" strokeWidth="1.2" />
              <path d="M225 392 V304" fill="none" stroke="rgba(111,179,255,.9)" strokeWidth="1.6" />
              <path d="M225 304 L188 294" fill="none" stroke="rgba(111,179,255,.9)" strokeWidth="1.6" />
              <path d="M188 294 V270" fill="none" stroke="rgba(111,179,255,.9)" strokeWidth="1.6" />
              <circle cx="225" cy="304" r="2.6" fill="rgba(111,179,255,.95)" />
              <circle cx="188" cy="270" r="2.8" fill="rgba(111,179,255,.95)" />
              <path d="M197 420 L150 437" fill="none" stroke="rgba(111,179,255,.55)" strokeWidth="1.2" strokeDasharray="3 2" />
              <text x="194" y="266" fontSize="7" fill="rgba(111,179,255,.95)">Ø20</text>
              {/* тепловой пункт */}
              <rect x="123" y="428" width="54" height="18" fill="rgba(23,20,143,.6)" stroke="rgba(255,255,255,.6)" strokeWidth="1.4" />
              <text x="133" y="441" fontSize="9" fill="rgba(255,255,255,.85)">ИТП</text>
              {/* ввод сетей — водопровод от границы участка */}
              <path d="M250 447 L177 438" fill="none" stroke="rgba(255,255,255,.4)" strokeWidth="1.4" strokeDasharray="3 3" />
              <circle cx="250" cy="447" r="3" fill="none" stroke="rgba(255,255,255,.55)" strokeWidth="1.2" />
              {/* подписи — тонкие выносные линии без плашек, в стиле чертежа */}
              <g>
                <line x1="300" y1="128" x2="246" y2="153" stroke="rgba(255,255,255,.4)" strokeWidth="1" />
                <line x1="300" y1="115" x2="384" y2="115" stroke="rgba(255,255,255,.28)" strokeWidth="0.75" />
                <text x="300" y="111" fontSize="7" letterSpacing=".04em" fill="rgba(255,255,255,.6)">ОТОПЛЕНИЕ</text>
                <text x="300" y="126" fontSize="8.5" fill="#fff">Ø20 · двухтрубная</text>
              </g>
              <g>
                <line x1="305" y1="343" x2="225" y2="320" stroke="rgba(255,255,255,.4)" strokeWidth="1" />
                <line x1="305" y1="330" x2="374" y2="330" stroke="rgba(255,255,255,.28)" strokeWidth="0.75" />
                <text x="305" y="326" fontSize="7" letterSpacing=".04em" fill="rgba(255,255,255,.6)">ГВС</text>
                <text x="305" y="341" fontSize="8.5" fill="#fff">бак 200 л</text>
              </g>
              <g>
                <line x1="290" y1="420" x2="250" y2="447" stroke="rgba(255,255,255,.4)" strokeWidth="1" />
                <line x1="290" y1="407" x2="374" y2="407" stroke="rgba(255,255,255,.28)" strokeWidth="0.75" />
                <text x="290" y="403" fontSize="7" letterSpacing=".04em" fill="rgba(255,255,255,.6)">ВВОД СЕТЕЙ</text>
                <text x="290" y="418" fontSize="8.5" fill="#fff">водопровод</text>
              </g>
            </svg>
          </div>
          <div className="object-card">
            <small>Экспликация помещений</small>
            <div className="room-schedule">
              <div><i>01</i><span>Тепловой пункт</span><b>3,4 м²</b></div>
              <div><i>02</i><span>Венткамера</span><b>2,6 м²</b></div>
              <div><i>03</i><span>Техническое</span><b>4,1 м²</b></div>
            </div>
            <div className="circuit-legend"><span>Т1</span><span>Т2</span><span>ГВС</span></div>
          </div>
          <div className="system-caption">Отопление. Вентиляция. Водоснабжение.<br /><strong>Один инженерный проект — от расчёта до пусконаладки.</strong></div>
        </div></section>

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
