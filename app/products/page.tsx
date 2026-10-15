import { PageHero } from "../page-hero";
import type { Metadata } from "next";
import { ContactBand, SiteFooter, SiteHeader } from "../components";
import ProductCatalog from "./catalog";

export const metadata: Metadata = {
  title: "Продукция для умного дома и кондиционирования — ПЛАНКОД",
  description: "Оборудование для умного дома, датчики, розетки, видеодомофоны и кондиционеры Gree и Midea с подбором, доставкой и монтажом.",
  openGraph: { title: "Продукция для умного дома — ПЛАНКОД", description: "Совместимое оборудование, кондиционеры, доставка и монтаж.", images: ["/og.png"] },
  twitter: { title: "Продукция для умного дома — ПЛАНКОД", description: "Оборудование и кондиционирование с подбором.", images: ["/og.png"] },
};

export default function ProductsPage() {
  return (
    <main className="engineering-page premium-page page-products">
      <SiteHeader active="products" />

      <PageHero topic="Оборудование" title={<>Устройства.<br />Одна система.</>} description="Подбираем устройства под задачу объекта и проверяем совместимость с инженерными системами. Состав комплекта определяем на основе проекта." image="/images/home/smart-equipment.webp" mobileImage="/images/home/smart-equipment-mobile.webp" slogan="Управлять просто." theme="page-cover-equipment" actionLabel="Выбрать оборудование" actionHref="#catalog" facts={["Умный дом", "Климат и управление", "Безопасность"]} />

      <section className="catalog-section shell" id="catalog">
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
      <SiteFooter slogan="Управлять просто." />
    </main>
  );
}
