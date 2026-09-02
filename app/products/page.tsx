import type { Metadata } from "next";
import { ContactBand, SiteFooter, SiteHeader } from "../components";
import ProductCatalog from "./catalog";

export const metadata: Metadata = {
  title: "Продукция для умного дома и кондиционирования — ПЛАНКОД",
  description: "Оборудование для умного дома, датчики, розетки, видеодомофоны и кондиционеры Gree и Midea с подбором, доставкой и монтажом.",
  openGraph: { title: "Продукция для умного дома — ПЛАНКОД", description: "Совместимое оборудование, кондиционеры, доставка и монтаж.", images: [] },
  twitter: { title: "Продукция для умного дома — ПЛАНКОД", description: "Оборудование и кондиционирование с подбором.", images: [] },
};

export default function ProductsPage() {
  return (
    <main>
      <SiteHeader active="products" />

      <section className="products-hero shell" id="top">
        <div className="products-hero-copy panel">
          <span className="micro-label">Продукция / поставка и монтаж</span>
          <h1>Устройства,<br />которые <em>работают</em><br />как одна система</h1>
          <p>Подбираем устройства под задачу, проверяем совместимость, доставляем на дом и при необходимости устанавливаем.</p>
          <div className="products-hero-points"><span>Умный дом</span><span>Gree / Midea</span><span>Доставка</span><span>Монтаж</span></div>
        </div>
        <div className="products-showcase panel">
          <div className="showcase-device showcase-one"><i /><b>Датчик</b></div>
          <div className="showcase-device showcase-two"><i /><b>Розетка</b></div>
          <div className="showcase-device showcase-three"><i /><b>Домофон</b></div>
          <svg className="showcase-traces" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <path d="M50 20 V70 M50 33 H22 M50 28 H77 M50 64 H66" fill="none" stroke="rgba(255,255,255,.5)" strokeWidth=".6" vectorEffect="non-scaling-stroke" />
            <circle cx="50" cy="45" r="1.6" fill="#9f9cf0" />
            <circle cx="50" cy="33" r="1.1" fill="#fff" /><circle cx="22" cy="33" r="1.1" fill="#fff" />
            <circle cx="50" cy="28" r="1.1" fill="#fff" /><circle cx="77" cy="28" r="1.1" fill="#fff" />
            <circle cx="50" cy="64" r="1.1" fill="#fff" /><circle cx="66" cy="64" r="1.1" fill="#fff" />
          </svg>
          <div className="showcase-caption"><span>ПЛАНКОД / КАТАЛОГ</span><strong>подбор → поставка → монтаж</strong></div>
        </div>
      </section>

      <section className="catalog-section shell">
        <div className="catalog-heading"><span>01 / каталог</span><h2>Выберите направление.<br /><em>Совместимость проверим мы.</em></h2><p>Показываем основные категории. Конкретные модели, стоимость и наличие подтверждаем после проверки задачи и совместимости.</p></div>
        <ProductCatalog />
      </section>

      <section className="buy-process">
        <div className="shell">
          <div className="page-heading"><span>02 / как купить</span><h2>Сначала проверяем.<br /><em>Потом оформляем.</em></h2></div>
          <div className="buy-steps">
            <article><span>1</span><h3>Вы выбираете</h3><p>Выбираете категорию или просто описываете задачу.</p></article>
            <article><span>2</span><h3>Мы проверяем</h3><p>Совместимость, мощность, наличие и итоговую комплектацию.</p></article>
            <article><span>3</span><h3>Подтверждаем</h3><p>Фиксируем цену, доставку, монтаж и способ оплаты.</p></article>
            <article><span>4</span><h3>Доставляем</h3><p>На дом или объект; при заказе монтажа передаём команде.</p></article>
          </div>
          <div className="commerce-note"><b>До заказа подтверждаем:</b><span>совместимость</span><span>модель и мощность</span><span>актуальную стоимость</span><span>наличие и доставку</span><span>монтаж</span></div>
        </div>
      </section>

      <ContactBand eyebrow="Не нашли нужное оборудование?" title={"Опишите задачу.\nПодберём комплект вручную."} />
      <SiteFooter />
    </main>
  );
}
