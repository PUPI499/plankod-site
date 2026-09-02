const products = [
  { id: "leak", category: "Безопасность", title: "Контроль протечки", text: "Датчики, привод перекрытия и уведомления.", art: "catalog-leak" },
  { id: "socket", category: "Управление", title: "Умные розетки", text: "Удалённое включение и сценарии по расписанию.", art: "catalog-socket" },
  { id: "doorbell", category: "Доступ", title: "Видеодомофоны", text: "Камера, звонок и управление входом.", art: "catalog-doorbell" },
  { id: "hub", category: "Система", title: "Центры управления", text: "Связывают совместимые датчики и сценарии.", art: "catalog-hub" },
  { id: "relay", category: "Электрика", title: "Умные реле", text: "Управление светом и нагрузками из сценариев.", art: "catalog-relay" },
  { id: "thermostat", category: "Климат", title: "Термостаты и датчики", text: "Температура, влажность и управление зонами.", art: "catalog-thermostat" },
  { id: "gree", category: "Кондиционирование", title: "Кондиционеры Gree", text: "Серию и мощность подбираем по помещению.", art: "catalog-ac" },
  { id: "midea", category: "Кондиционирование", title: "Кондиционеры Midea", text: "Поставка, монтаж и совместимое управление.", art: "catalog-ac dark-ac" },
];

export default function ProductCatalog() {
  return (
    <div className="catalog-layout">
      <div className="catalog-products">
        {products.map((item, index) => (
          <article className="catalog-card panel" data-category={item.category} key={item.id}>
            <div className={`catalog-art ${item.art}`}><span>{String(index + 1).padStart(2, "0")}</span><i /><b /></div>
            <div className="catalog-info">
              <small>{item.category}</small>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
              <div className="catalog-buy"><strong>по запросу</strong><a href="#contact">Запросить подбор ↗</a></div>
            </div>
          </article>
        ))}
      </div>

      <aside className="catalog-cart panel">
        <div className="cart-head"><span>Подбор оборудования</span><b>→</b></div>
        <div className="catalog-request-copy">
          <strong>Получите совместимую комплектацию</strong>
          <p>Опишите объект и задачу. Подберём модели, проверим связь с умным домом и рассчитаем поставку с монтажом или без него.</p>
        </div>
        <ul className="catalog-request-list">
          <li>модель и мощность</li>
          <li>совместимость устройств</li>
          <li>актуальная стоимость</li>
          <li>наличие и доставка</li>
        </ul>
        <a className="catalog-request-button" href="#contact">Описать задачу <span>↗</span></a>
        <p className="order-note">До заказа подтверждаем состав, цену, наличие, условия доставки и монтажа.</p>
      </aside>
    </div>
  );
}
