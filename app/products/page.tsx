import {Configurator} from "./kits";
/* eslint-disable @next/next/no-html-link-for-pages -- shared static export */
import { PageHero } from "../page-hero";
import type { Metadata } from "next";
import { ContactBand, SiteFooter, SiteHeader } from "../components";
import ProductCatalog from "./catalog";

export const metadata: Metadata = {
  title: "Продукция ПЛАНКОД — подбор решений для объекта",
  description: "Обзор направлений оборудования ПЛАНКОД. Подбор устройств автоматизации по задачам объекта; спецификацию, доступность и условия поставки согласовываем отдельно.",
  openGraph: { title: "Продукция для умного дома — ПЛАНКОД", description: "Подбор оборудования автоматизации по задачам объекта.", images: ["/og.png"] },
  twitter: { title: "Продукция для умного дома — ПЛАНКОД", description: "Категории оборудования и инженерный подход к подбору.", images: ["/og.png"] },
};

export default function ProductsPage() {
  return (
    <main className="engineering-page premium-page page-products">
      <SiteHeader active="products" />

      <PageHero topic="Оборудование" title={<>Устройства.<br />Одна система.</>} description="Подбираем устройства под задачу объекта и проверяем совместимость с инженерными системами. Состав комплекта определяем на основе проекта." image="/images/home/smart-equipment.webp" mobileImage="/images/home/smart-equipment-mobile.webp" slogan="Управлять просто." theme="page-cover-equipment" actionLabel="Выбрать оборудование" actionHref="#catalog" facts={["Умный дом", "Климат и управление", "Безопасность"]} />

      <section className="catalog-section shell" id="catalog">
        <div className="catalog-heading"><span>01 / каталог</span><h2>Оборудование.<br /><em>По задачам вашего объекта.</em></h2><p>Выбирайте модели по назначению и протоколу. Стоимость, комплектацию и наличие подтвердим в предложении.</p></div>
        <p className="ss-fine">Для гостиниц, бизнеса и частных домов доступна <a href="/smart-systems/equipment/">категорийная витрина с запросом стоимости оборудования</a>.</p><p className="store-directory-link"><a href="/brands/">Все бренды и поставщики →</a></p><ProductCatalog />
      </section>

      <Configurator />
      <section className="buy-process">
        <div className="shell">
          <div className="page-heading"><span>02 / как купить</span><h2>Сначала проверяем.<br /><em>Потом оформляем.</em></h2></div>
          <div className="buy-steps">
            <article><span>1</span><h3>Вы выбираете</h3><p>Выбираете категорию или просто описываете задачу.</p></article>
            <article><span>2</span><h3>Мы проверяем</h3><p>Совместимость, мощность, наличие и итоговую комплектацию.</p></article>
            <article><span>3</span><h3>Подтверждаем</h3><p>Согласовываем спецификацию, стоимость и условия поставки.</p></article>
            <article><span>4</span><h3>Доставляем</h3><p>Поставка на согласованных условиях после подтверждения доступности.</p></article>
          </div>
          <div className="commerce-note"><b>До заказа подтверждаем:</b><span>совместимость</span><span>модель и мощность</span><span>актуальную стоимость</span><span>наличие и доставку</span></div>
        </div>
      </section>

      <ContactBand eyebrow="Не нашли нужное оборудование?" title={"Опишите задачу.\nПодберём комплект вручную."} />
      <SiteFooter slogan="Управлять просто." />
    </main>
  );
}
