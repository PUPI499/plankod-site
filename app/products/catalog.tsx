"use client";

import { useState } from "react";

const products = [
  { id: "leak", category: "Безопасность", title: "Комплект контроля протечки", text: "Датчики, привод перекрытия и уведомления.", price: "по прайсу", art: "catalog-leak" },
  { id: "socket", category: "Управление", title: "Умная розетка", text: "Удалённое включение и сценарии по расписанию.", price: "по прайсу", art: "catalog-socket" },
  { id: "doorbell", category: "Доступ", title: "Видеодомофон", text: "Камера, звонок и управление входом.", price: "по прайсу", art: "catalog-doorbell" },
  { id: "hub", category: "Система", title: "Центр управления", text: "Связывает совместимые датчики и сценарии.", price: "по прайсу", art: "catalog-hub" },
  { id: "relay", category: "Электрика", title: "Умное реле", text: "Управление светом и нагрузками из сценариев.", price: "по прайсу", art: "catalog-relay" },
  { id: "thermostat", category: "Климат", title: "Термостат / датчик климата", text: "Температура, влажность и управление зоной.", price: "по прайсу", art: "catalog-thermostat" },
  { id: "gree", category: "Кондиционирование", title: "Кондиционеры Gree", text: "Серию и мощность подбираем по помещению.", price: "по прайсу", art: "catalog-ac" },
  { id: "midea", category: "Кондиционирование", title: "Кондиционеры Midea", text: "Поставка, монтаж и совместимое управление.", price: "по прайсу", art: "catalog-ac dark-ac" },
];

const filters = [
  { label: "Всё", category: null },
  { label: "Безопасность", category: "Безопасность" },
  { label: "Управление", category: "Управление" },
  { label: "Доступ", category: "Доступ" },
  { label: "Климат", category: "Климат" },
  { label: "Кондиционеры", category: "Кондиционирование" },
] as const;

export default function ProductCatalog() {
  const [cart, setCart] = useState<string[]>([]);
  const [notice, setNotice] = useState(false);
  const [activeFilter, setActiveFilter] = useState<string>("Всё");
  const selected = products.filter((item) => cart.includes(item.id));
  const activeCategory = filters.find((filter) => filter.label === activeFilter)?.category ?? null;
  const visibleProducts = activeCategory ? products.filter((item) => item.category === activeCategory) : products;

  function toggle(id: string) {
    setCart((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]);
    setNotice(false);
  }

  return (
    <>
    <div className="catalog-filters">
      {filters.map((filter) => (
        <span key={filter.label} className={activeFilter === filter.label ? "active-filter" : ""} onClick={() => setActiveFilter(filter.label)} role="button" tabIndex={0}>{filter.label}</span>
      ))}
    </div>
    <div className="catalog-layout">
      <div className="catalog-products">
        {visibleProducts.map((item, index) => {
          const isSelected = cart.includes(item.id);
          return (
            <article className="catalog-card panel" data-category={item.category} key={item.id}>
              <div className={`catalog-art ${item.art}`}><span>{String(index + 1).padStart(2, "0")}</span><i /><b /></div>
              <div className="catalog-info"><small>{item.category}</small><h3>{item.title}</h3><p>{item.text}</p><div className="catalog-buy"><strong>{item.price}</strong><button type="button" data-id={item.id} data-title={item.title} className={isSelected ? "selected-product" : ""} onClick={() => toggle(item.id)}>{isSelected ? "Добавлено ✓" : "Добавить в заказ +"}</button></div></div>
            </article>
          );
        })}
      </div>

      <aside className="catalog-cart panel" aria-live="polite">
        <div className="cart-head"><span>Ваш заказ</span><b>{cart.length}</b></div>
        {selected.length === 0 ? (
          <div className="empty-cart"><strong>Пока пусто</strong><p>Добавьте оборудование. Мы проверим совместимость и подтвердим цену перед оплатой.</p></div>
        ) : (
          <div className="cart-items">{selected.map((item) => <div key={item.id}><span>{item.title}</span><button type="button" onClick={() => toggle(item.id)} aria-label={`Убрать ${item.title}`}>×</button></div>)}</div>
        )}
        <div className="order-form">
          <label>Имя<input placeholder="Как к вам обращаться" /></label>
          <label>Телефон<input inputMode="tel" placeholder="+7 ___ ___-__-__" /></label>
          <label>Город доставки<input placeholder="Город / населённый пункт" /></label>
          <div className="payment-options"><span>Карта</span><span>СБП</span><span>Счёт</span><span>Доставка</span></div>
          <button type="button" disabled={selected.length === 0} onClick={() => setNotice(true)}>Подготовить заказ <span>↗</span></button>
          {notice && <p className="order-notice">Демонстрационный режим: заказ собран, но ещё не отправлен. Для запуска нужны рабочие контакты, договор с доставкой, товарный прайс и эквайринг.</p>}
          {!notice && <p className="order-note">Цены и наличие подтверждаются до списания. Онлайн-оплата подключается после настройки эквайринга.</p>}
        </div>
      </aside>
    </div>
    </>
  );
}
