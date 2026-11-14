import { notFound } from 'next/navigation';
import { SiteHeader, SiteFooter } from '../../components';
import { PageHero } from '../../page-hero';
import { SmartInquiry } from '../inquiry';
import { smartDirections, smartMetadata, serviceBySlug } from '../data';
import { Breadcrumbs, SmartLink, Related, HotelContent, EquipmentContent, DesignContent } from '../sections';
import { MedicalContent, SanatoriumContent } from '../segments';

type Props = { params: Promise<{ slug: string }> };
const sections = {
  hotels: HotelContent, sanatoriums: SanatoriumContent, medical: MedicalContent,
  equipment: EquipmentContent, design: DesignContent
};
const actions = {
  hotels: 'Обсудить гостиницу', sanatoriums: 'Описать задачу по корпусу',
  medical: 'Обсудить ограничения объекта', equipment: 'Запросить подбор оборудования',
  design: 'Обсудить задание'
};

export function generateStaticParams() {
  return [...smartDirections.map(({slug}) => ({slug})), { slug: 'home' }];
}
export async function generateMetadata({params}: Props) {
  const {slug} = await params;
  if (slug === 'home') return {title:'Архив раздела | ПЛАНКОД', robots:{index:false,follow:true}, alternates:{canonical:'/smart-systems/home/'}};
  const item = smartDirections.find(x => x.slug === slug);
  return item ? smartMetadata(item.slug) : {};
}

export default async function SmartDirectionPage({params}: Props) {
  const {slug} = await params;
  if (slug === 'home') return <main id="top" className="engineering-page premium-page ss-page"><SiteHeader active="smart" contact="/smart-systems/#contact"/><section className="ss-section shell"><h1>Раздел перенесён в архив</h1><p>Актуальные услуги ПЛАНКОД для организаций представлены в разделе автоматизации инженерных систем.</p><SmartLink href="/smart-systems/">Перейти к автоматизации зданий</SmartLink></section><SiteFooter slogan="Управлять просто." contactHref="/smart-systems/#contact"/></main>;
  const item = smartDirections.find(x => x.slug === slug);
  if (!item) notFound();
  const Content = sections[item.slug];
  return <main className={`engineering-page premium-page ss-page ss-page-${item.slug}`}>
    <SiteHeader active="smart"/><Breadcrumbs slug={item.slug}/>
    <PageHero topic={item.name} title={item.title} description={item.description}
      image={item.image} mobileImage={item.mobile} theme="ss-hero" slogan="Управлять просто."
      action={<SmartLink href="#contact">{actions[item.slug]}</SmartLink>} />
    <Content />
    <SmartInquiry service={serviceBySlug[item.slug]} />
    <Related slug={item.slug} /><SiteFooter slogan="Управлять просто."/>
  </main>;
}
