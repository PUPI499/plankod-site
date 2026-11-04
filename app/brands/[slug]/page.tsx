import {notFound} from "next/navigation";
import {brands} from "../../products/data";
import {CatalogBreadcrumbs} from "../../products/ui";
import ProductCatalog from "../../products/catalog";
import {ContactBand, SiteHeader, SiteFooter} from "../../components";
export function generateStaticParams(){return brands.map(b=>({slug:b.slug}));}
export async function generateMetadata({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const b=brands.find(x=>x.slug===slug);return b?{title:b.name+" — оборудование | ПЛАНКОД",description:b.description,alternates:{canonical:"/brands/"+slug+"/"}}:{};}
export default async function BrandPage({params}:{params:Promise<{slug:string}>}){const {slug}=await params;const b=brands.find(x=>x.slug===slug);if(!b)notFound();return <main className="engineering-page premium-page store-page"><SiteHeader active="products"/><CatalogBreadcrumbs brand={slug}/><section className="shell store-section"><div className="store-brand-intro"><small>{b.kind}</small><h1>{b.name}</h1><h2>О {b.kind==="Поставщик"?"поставщике":"бренде"}</h2><p>{b.description}</p><p><strong>Кому подойдёт:</strong> {b.audience}</p></div></section><section className="shell store-section"><h2>Оборудование</h2><ProductCatalog brand={slug}/></section><ContactBand context={"Каталог: "+b.name} title={"Подберём оборудование.\nПод вашу задачу."}/><SiteFooter slogan="Управлять просто."/></main>}
