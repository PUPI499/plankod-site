/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages -- shared static export */
import { HotelDemo } from './hotels/room/demo';
import type { ReactNode } from 'react';
import { ArrowIcon } from '../arrow-icon';
import { smartDirections, equipmentCategories, confirmedEquipment, type SmartSlug } from './data';
export function SmartLink({href,children,quiet=false}:{href:string;children:ReactNode;quiet?:boolean}) {return <a className={quiet?'ss-text-link':'ss-button'} href={href}>{children}<ArrowIcon /></a>;}
export function SmartHeading({number,tag,title,text}:{number:string;tag:string;title:ReactNode;text?:string}) {return <div className="ss-heading"><span className="ss-eyebrow">{number} / {tag}</span><h2>{title}</h2>{text&&<p>{text}</p>}</div>;}
export function Breadcrumbs({slug}:{slug?:SmartSlug}) {const item=smartDirections.find(s=>s.slug===slug);const items=[{name:'Главная',url:'/'},{name:'Автоматизация',url:'/smart-systems/'},...(item?[{name:item.name,url:`/smart-systems/${slug}/`}]:[])];return <><nav className="ss-breadcrumbs shell" aria-label="Хлебные крошки">{items.map((x,i)=><span key={x.url}>{i>0&&<span aria-hidden="true"> / </span>}{i===items.length-1?<span aria-current="page">{x.name}</span>:<a href={x.url}>{x.name}</a>}</span>)}</nav><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify({'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:items.map((x,i)=>({'@type':'ListItem',position:i+1,name:x.name,item:'https://plancod.ru'+x.url}))}).replace(/</g,'\\u003c')}} /></>;}
export function DirectionCards({exclude,explicitDesign=false}:{exclude?:SmartSlug;explicitDesign?:boolean}) {return <div className={`ss-directions ${exclude?'ss-related':''}`}>{smartDirections.filter(x=>x.slug!==exclude).map(x=><a className={`ss-direction ss-direction-${x.slug}`} href={`/smart-systems/${x.slug}/`} key={x.slug}><div className="ss-direction-art"><img src={x.card} alt={x.slug==='medical'?'Визуализация входа в медицинский центр':x.slug==='design'?'Концепция инженерного проектирования':x.slug==='equipment'?'Иллюстрация категорий оборудования — не конкретные модели':'Концептуальная визуализация интерьера'} loading="lazy" /></div><div className="ss-direction-copy"><span className="ss-eyebrow">{x.kicker}</span><h3>{explicitDesign&&x.slug==='design'?'Проект автоматизации':x.name}<ArrowIcon /></h3><p>{x.short}</p><div className="ss-tags">{x.features.map(f=><span key={f}>{f}</span>)}</div></div></a>)}</div>;}
export function Related({slug}:{slug:SmartSlug}) {return <section className="ss-section shell"><SmartHeading number="Далее" tag="Автоматизация" title="Выберите следующий шаг."/><DirectionCards exclude={slug}/></section>;}
export function FeatureGrid({items}:{items:readonly (readonly string[])[]}) {return <div className="ss-feature-grid">{items.map(([title,text],i)=><article key={title}><span className="ss-index">{String(i+1).padStart(2,'0')}</span><h3>{title}</h3><p>{text}</p></article>)}</div>;}
export function Process({items}:{items:readonly (readonly string[])[]}) {return <ol className="ss-process">{items.map(([title,text])=><li key={title}><h3>{title}</h3><p>{text}</p></li>)}</ol>;}
export const capabilities = [
  ["Вентиляция", "Для установки с доступным входом управления согласуем расписание пуска. По сигналу работы инженер сможет отличить команду включения от фактического запуска."],
  ["Отопление", "Проверяем регулятор и привод клапана теплового узла. Если уставку можно менять извне, персонал задаёт разрешённый режим для выбранной зоны."],
  ["Кондиционирование", "Уточняем интерфейс фанкойла или кондиционера. На совместимом устройстве можно ограничить диапазон уставок и видеть выбранный режим."],
  ["Освещение", "По схеме щита определяем независимо управляемые группы. Для коридоров и залов можно согласовать график света с графиком работы здания."],
  ["Датчики", "Выбираем точку измерения и проверяем сигнал. Температура, положение клапана или признак аварии помогают дежурному определить, какой узел осмотреть."],
  ["Сценарии", "Для согласованных зон описываем последовательность команд и приоритет ручного управления. Персонал переключает режим по понятному регламенту."],
  ["Общее наблюдение", "Если платформа принимает сигналы оборудования, выводим выбранные состояния на рабочее место дежурного. Перечень доступных команд и права определяем отдельно."]
] as const;

export const modernizationStages = [
  ["Обследуем объект", "Изучаем документацию, осматриваем доступные узлы вместе с эксплуатацией и записываем, какие операции сегодня выполняются вручную."],
  ["Оцениваем совместимость", "Сверяем модели, состояние приводов, питание, управляющие сигналы и доступ к настройкам. Определяем, что можно сохранить и что потребуется заменить."],
  ["Согласуем решение", "Описываем функции, границы ответственности и критерии приёмки. В проекте увязываем выбранные устройства со щитами и сетями здания."],
  ["Подбираем и поставляем оборудование", "Комплектуем решение по согласованной спецификации. Изменение модели, объёма или стоимости согласуем до поставки."],
  ["Монтируем и подключаем", "Организуем доступ в помещения и работы по участкам в согласованные окна. Подключаем устройства и интегрируем их с совместимыми системами."],
  ["Программируем и настраиваем", "Настраиваем сценарии, пределы регулирования и приоритеты команд по утверждённому заданию."],
  ["Проводим пусконаладку", "Проверяем сигналы, реакцию оборудования и согласованные режимы вместе со службой эксплуатации. Замечания фиксируем для устранения."],
  ["Передаём результат", "Демонстрируем работу системы и передаём документы по согласованному перечню. Ответственность участников и участие подрядчиков закрепляем в составе работ."]
] as const;

export function EngineeringApproach() {return <section className="ss-engineering shell"><div><span className="ss-eyebrow">Инженерный подход ПЛАНКОД</span><h2>Управление начинается<br />с понимания здания.</h2><p>Термостат должен учитывать систему отопления. Управление вентиляцией — режимы воздухообмена. Световые сценарии — электрические нагрузки и схему подключения.</p><p>Мы проектируем отопление, вентиляцию, кондиционирование и электроснабжение. Этот опыт помогает рассматривать устройства автоматизации вместе с инженерией объекта.</p><SmartLink href="/smart-systems/design/" quiet>О проектировании</SmartLink></div><figure><img src="/images/projects/details/laundry-equipment-control.png" alt="Фрагмент проектной документации ПЛАНКОД: управление оборудованием вентиляции прачечной" loading="lazy"/><figcaption>Фрагмент инженерной документации ПЛАНКОД. Прачечная · вентиляция. <a href="/projects/laundry-ventilation/">Посмотреть проект <ArrowIcon /></a></figcaption></figure></section>;}
function RoomExperience() {
  return <section className="ss-section shell" id="possibilities">
    <SmartHeading number="01" tag="Умный номер"
      title={<>Комфорт для гостей.<br /><em>Управление для отеля.</em></>}
      text="Наведите курсор на метку или коснитесь её, чтобы открыть шторы, включить бра или изменить режим климата. На панели сотрудника можно управлять розеткой, открыть шлагбаум и перевести номер в режим после выезда."/>
    <div id="hotel-room-demo"><HotelDemo/></div>
    <noscript>Для управления моделью включите JavaScript.</noscript>
    <p className="ss-fine">Демонстрационная модель. Для конкретного отеля уточняем совместимость оборудования, доступные сигналы и права сотрудников.</p>
    <div className="ss-scenes">
      <details><summary>Какие функции доступны в номере<ArrowIcon direction="chevron-down"/></summary>
        <p>Для освещения определяем группы светильников, для штор подбираем приводы под карнизы. Диапазон температур зависит от отопления и кондиционирования. Для сценариев присутствия уточняем расположение датчиков. Вывод состояния номеров на рабочее место сотрудника зависит от интерфейсов оборудования и возможностей платформы.</p>
      </details>
      <details><summary>Что проверить на пилотном номере<ArrowIcon direction="chevron-down"/></summary>
        <p>После выезда гостя замерьте время подготовки номера и проверьте, какие розетки должны оставаться под напряжением. Для въезда согласуйте права сотрудников и проверьте датчик положения стрелы и штатную защиту проезда.</p>
        <p>Перед оснащением всего отеля сравните энергопотребление в гостевом и дежурном режимах при сопоставимой загрузке и погоде. Сопоставьте результат со стоимостью оборудования, наладки и обслуживания одного номера.</p>
      </details>
    </div>
  </section>;
}
export const supplySteps=[['Анализ объекта','Назначение, масштаб и текущая инфраструктура.'],['Технические требования','Функции, ограничения и требования эксплуатации.'],['Подбор оборудования','Категории устройств и возможные технические решения.'],['Проверка совместимости','Интерфейсы, нагрузки, связь и ограничения платформ.'],['Предложение','Состав оборудования и коммерческие условия.'],['Согласование','Модели, доступность и условия поставки.'],['Поставка','Оборудование по согласованной спецификации.']] as const;
export function HotelContent() {
  return <>
    <RoomExperience />
    <section className="ss-dark"><div className="shell">
      <SmartHeading number="02" tag="Типовой номер" title="Согласуйте сценарии до выбора устройств." />
      <FeatureGrid items={[
        ["Гость", "При входе включается выбранная группа света. Температуру и положение штор гость меняет с панели, если оборудование поддерживает эти команды."],
        ["Служба эксплуатации", "Чтобы видеть состояние номеров с одного рабочего места, проверяем доступные сигналы, возможности платформы и лицензии."],
        ["Технический заказчик", "Для интеграции с действующей гостиничной системой нужны её название, версия и документация по обмену данными. Возможность связи подтверждаем для выбранной конфигурации."]
      ]} />
    </div></section>
    <section className="ss-section shell">
      <SmartHeading number="03" tag="Состав работ" title="Что требуется вашему объекту?" />
      <div className="ss-packages">
        <article><h3>Обсудить конфигурацию</h3><p>Если планируется модернизация, начнём с одного типового номера. Уточним действия гостя и персонала, состав инженерных систем и требования к общим зонам.</p><SmartLink quiet href="#contact">Обсудить типовой номер</SmartLink></article>
        <article><h3>Заказать проект управления</h3><p>По заданию разрабатываем сценарии, архитектуру управления и интерфейсы со смежными системами. Стадию и состав документации согласуем отдельно.</p><SmartLink quiet href="/smart-systems/design/">Состав проектирования</SmartLink></article>
        <article><h3>Получить предложение на поставку</h3><p>Для оснащения действующего отеля сверим модели, количество, питание и протоколы. В предложении укажем согласованную комплектацию и условия поставки.</p><SmartLink quiet href="#contact">Запросить комплектацию</SmartLink></article>
      </div>
    </section>
    <section className="ss-section shell">
      <SmartHeading number="04" tag="Исходные данные" title="Что прислать для предварительного подбора?" text="Достаточно описания объекта. Если планы или спецификация готовы, приложите ссылку к обращению." />
      <FeatureGrid items={[
        ["Номерной фонд", "Количество и типы номеров, общие зоны, занятость корпусов и допустимые окна для работ."],
        ["Существующие системы", "Тип фанкойла или другого климатического оборудования, группы света, шторы, датчики и доступная проводка."],
        ["Требуемые интеграции", "Какие команды нужно передавать, какие статусы получать и кто будет пользоваться системой."]
      ]} />
    </section>
  </>;
}
export function CategorySymbol({index}:{index:number}) {const shapes=['M7 7h18v18H7zM3 11h4m-4 6h4m-4 6h4m18-12h4m-4 6h4m-4 6h4M11 3v4m6-4v4m6-4v4M11 25v4m6-4v4m6-4v4','M16 5v14a5 5 0 1 1-5 0V5a2.5 2.5 0 0 1 5 0ZM22 9h6m-6 7h4m-4 7h6','M6 3h20v26H6zM10 8h12M10 14h5m-5 6h12','M4 8h24v16H4zM10 12v8m6-8v8m6-8v8','M16 14a2 2 0 1 0 .1 0M9 8a10 10 0 0 1 14 0M4 3a17 17 0 0 1 24 0M7 26h18','M3 5h26M6 6v22l9-6V6m2 0v16l9 6V6','M4 7h24v18H4zM8 12h16m-16 5h16m-16 4h16','M3 27h26M6 27V6h20v21M12 27v-8h8v8M10 11h2m8 0h2','M3 5h8v8H3zM21 19h8v8h-8zM21 5h8v8h-8zM11 9h10M7 13v10h14'];return <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={shapes[index%shapes.length]}/></svg>;}
export function ConfirmedProducts() {
 if (!confirmedEquipment.length) return null;
 return <section className="ss-section shell"><SmartHeading number="Каталог" tag="Оборудование" title="Устройства под вашу задачу."/><div className="ss-product-grid">{confirmedEquipment.map(product => <article className="ss-product" key={product.manufacturer + product.model}>
 <img src={product.photo} alt={`${product.manufacturer} ${product.model}`} loading="lazy"/>
 <span className="ss-eyebrow">{product.manufacturer}</span><h3>{product.model}</h3><p>{product.purpose}</p>
 <dl>{Object.entries({...product.specifications,'Протоколы':product.protocols.join(', '),'Подключение':product.connectionRequirements,'Совместимость':product.compatibility,'Доступность':product.availability}).map(([name,value])=><div key={name} style={{display:'contents'}}><dt>{name}</dt><dd>{value}</dd></div>)}</dl>
 <a className="ss-text-link" href={product.documentationUrl} target="_blank" rel="noopener noreferrer">Документация <ArrowIcon/></a>
 <SmartLink href="#contact">Запросить предложение</SmartLink>
 </article>)}</div></section>;
}
export function EquipmentContent() {return <><ConfirmedProducts/><section className="ss-section shell" id="categories"><SmartHeading number="01" tag="Категорийная витрина" title={<>Начните с функции.<br /><em>Мы уточним устройство.</em></>} text="Выберите категории для запроса. Это список интересов для подбора, а не заказ или фиксированный комплект."/><div className="ss-equipment-grid">{equipmentCategories.map(([id,title,text,requirements],i)=><article key={id}><div className="ss-equipment-art"><CategorySymbol index={i}/><span>0{i+1}</span></div><h3>{title}</h3><p>{text}</p><small>Проверяем: {requirements.toLowerCase()}.</small><button type="button" data-pick-equipment={title} aria-pressed="false">Включить в запрос <span aria-hidden="true">+</span></button></article>)}</div><div className="ss-selection" aria-live="polite"><span data-equipment-summary>Выберите категории или сразу опишите задачу.</span><SmartLink quiet href="#contact">К запросу стоимости</SmartLink></div></section><section className="ss-dark"><div className="shell"><SmartHeading number="02" tag="Основание для выбора" title="Не просто перечень устройств."/><FeatureGrid items={[
 ['Производитель и модель','В предложении указываем конкретные позиции существующих производителей. Собственные устройства ПЛАНКОД не выпускает.'],['Техническая совместимость','Проверяем характеристики, поддерживаемые протоколы, требования подключения и взаимодействие с оборудованием объекта.'],['Документация и доступность','Сопоставляем данные производителей, уточняем наличие и согласовываем состав поставки до заказа.']
 ]}/></div></section><section className="ss-section shell"><SmartHeading number="03" tag="Производители" title="Сначала требования. Затем выбор." text="Производителя и модель предлагаем под задачу и техническую архитектуру объекта. Если у вас уже есть спецификация или предпочтения по брендам, укажите их в запросе."/><SmartLink href="/products">Сравнить модели в каталоге</SmartLink></section></>;}
export function DesignContent() {return <><section className="ss-section shell"><SmartHeading number="01" tag="Состав проектирования" title={<>Сценарии — в решения.<br /><em>Решения — в документацию.</em></>} text="Проектирование доступно организациям как самостоятельная услуга. Окончательный состав документации определяем техническим заданием."/><FeatureGrid items={[
 ['Архитектура управления','Структура системы, управляющие устройства и способы связи.'],['Автоматизация климата','Решения по управлению отоплением, вентиляцией и кондиционированием.'],['Управление освещением','Группы света, органы управления и сценарии.'],['Размещение устройств','Панели, датчики, контроллеры и требования к их размещению.'],['Сценарии управления','Действия систем, приоритеты команд и режимы работы.'],['Соединения','Электрические и информационные связи в пределах согласованного задания.'],['Взаимодействие с инженерией','Связи с электроснабжением, водоснабжением и другими совместимыми системами.']
 ]}/></section><section className="ss-section shell"><SmartHeading number="02" tag="Процесс" title="Понимать задачу на каждом этапе."/><Process items={[
 ['Анализ здания','Исходные данные и существующие инженерные системы.'],['Техническое задание','Задачи, функции, границы и состав документации.'],['Концепция','Принципы управления и основные сценарии.'],['Техническая архитектура','Устройства, интерфейсы и схема взаимодействия.'],['Документация','Планы, схемы и спецификации в согласованном составе.'],['Координация','Проверка связей со смежными инженерными системами.'],['Передача проекта','Подготовленные материалы для дальнейшей реализации.']
 ]}/></section><EngineeringApproach/><section className="ss-section shell ss-design-note"><span className="ss-eyebrow">Поставка и проектирование</span><h2>Услуги можно разделить.</h2><p>Заказ проекта не требует обязательной покупки оборудования или заказа монтажа. Если нужна комплектация, её состав и условия обсуждаем отдельно.</p><SmartLink quiet href="/smart-systems/equipment/">Перейти к оборудованию</SmartLink></section></>;}
