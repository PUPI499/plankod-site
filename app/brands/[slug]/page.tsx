import { notFound } from "next/navigation";
import { brands, products } from "../../products/data";
import { CatalogBreadcrumbs } from "../../products/ui";
import ProductCatalog from "../../products/catalog";
import { ContactBand, SiteHeader, SiteFooter } from "../../components";

type PageProps = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return brands.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const brand = brands.find(item => item.slug === slug);
  if (!brand) return {};
  return {
    title: brand.name + " — оборудование | ПЛАНКОД",
    description: brand.description,
    alternates: { canonical: "/brands/" + slug + "/" },
    robots: { index: products.some(item => item.brand === slug), follow: true },
  };
}

export default async function BrandPage({ params }: PageProps) {
  const { slug } = await params;
  const brand = brands.find(item => item.slug === slug);
  if (!brand) notFound();
  const hasProducts = products.some(item => item.brand === slug);
  return (
    <main id="top" className="engineering-page premium-page store-page">
      <SiteHeader active="products" />
      <CatalogBreadcrumbs brand={slug} />
      <section className="shell store-section">
        <div className="store-brand-intro">
          <small>{hasProducts ? brand.kind : "Справочник оборудования"}</small>
          <h1>{brand.name}</h1>
          <p>{brand.description}</p>
          {hasProducts && <p><strong>Для кого</strong> · {brand.audience}</p>}
          {hasProducts
            ? <a className="store-all" href="#contact">Запросить подбор по спецификации →</a>
            : <a className="store-all" href="/products.html">Перейти к каталогу оборудования →</a>}
        </div>
      </section>
      {hasProducts && <section className="shell store-section"><h2>Оборудование</h2><ProductCatalog brand={slug} /></section>}
      <ContactBand context={"Каталог: " + brand.name} title={"Запросить подбор по спецификации."} />
      <SiteFooter slogan="Управлять просто." />
    </main>
  );
}
