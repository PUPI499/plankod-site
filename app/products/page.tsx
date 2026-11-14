import {Configurator} from "./kits";
/* eslint-disable @next/next/no-html-link-for-pages -- shared static export */
import { PageHero } from "../page-hero";
import type { Metadata } from "next";
import { ContactBand, SiteFooter, SiteHeader } from "../components";
import ProductCatalog from "./catalog";

export const metadata: Metadata = {
  title: "Оборудование для модернизации инженерных систем — ПЛАНКОД",
  alternates: {canonical: "/products.html"},
  description: "Датчики, контроллеры и модули Rubetek, Wiren Board и Zennio: характеристики, фильтры и подбор по задачам. Стоимость и условия поставки по запросу.",
  openGraph: { title: "Компоненты автоматики зданий — ПЛАНКОД", description: "Подбор оборудования автоматизации по задачам объекта.", images: ["/og.png"] },
  twitter: { title: "Компоненты автоматики зданий — ПЛАНКОД", description: "Категории оборудования и инженерный подход к подбору.", images: ["/og.png"] },
};

export default function ProductsPage() {
  return (
    <main className="engineering-page premium-page page-products">
      <SiteHeader active="products" />

      <PageHero topic="Оборудование" title={<>Оборудование для<br />автоматики зданий.</>} description="Подбираем датчики, контроллеры и исполнительные модули для инженерных систем организаций. По спецификации проверим модели, количество и условия поставки." image="/images/home/smart-equipment.webp" mobileImage="/images/home/smart-equipment-mobile.webp" slogan="Управлять просто." theme="page-cover-equipment" actionLabel="Выбрать оборудование" actionHref="#catalog" facts={["Датчики", "Контроллеры", "Исполнительные модули"]} />

      <section className="catalog-section shell" id="catalog">
        <div className="catalog-heading"><span>01 / каталог</span><h2>Оборудование.<br /><em>По задачам вашего объекта.</em></h2><p>Выбирайте модели по назначению и протоколу. Стоимость, комплектацию и наличие подтвердим в предложении.</p></div>
        <p className="ss-fine">Для подбора компонентов под существующую систему <a href="/smart-systems/equipment/">передайте сведения об объекте</a>.</p><p className="store-directory-link"><a href="/brands/">Все бренды и поставщики →</a></p><ProductCatalog />
      </section>

      <Configurator />
      <section className="buy-process">
        <div className="shell">
          <div className="page-heading"><span>Поставка</span><h2>От заявки<br /><em>до поставки.</em></h2></div>
          <div className="buy-steps">
            <article><span>1</span><h3>Исходные данные</h3><p>Пришлите перечень моделей или укажите тип оборудования и его задачу.</p></article>
            <article><span>2</span><h3>Проверка состава</h3><p>Сверяем интерфейсы, питание и мощность нагрузки. При необходимости запрашиваем схемы или обследуем объект.</p></article>
            <article><span>3</span><h3>Подтверждаем</h3><p>Согласовываем спецификацию, стоимость и условия поставки.</p></article>
            <article><span>4</span><h3>Доставляем</h3><p>Поставка на согласованных условиях после подтверждения доступности.</p></article>
          </div>
          <div className="commerce-note"><b>До заказа подтверждаем:</b><span>совместимость</span><span>модель и мощность</span><span>актуальную стоимость</span><span>наличие и доставку</span></div>
        </div>
      </section>

      <ContactBand eyebrow="Не нашли нужное оборудование?" title={"Опишите задачу.\nПодберём оборудование."} />
      <SiteFooter slogan="Управлять просто." />
    </main>
  );
}
