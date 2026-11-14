import { SiteHeader, SiteFooter } from '../components';
import { PageHero } from '../page-hero';
import { SmartInquiry } from './inquiry';
import { smartMetadata } from './data';
import { Breadcrumbs, SmartLink, SmartHeading, DirectionCards, FeatureGrid, capabilities, EngineeringApproach, Process, modernizationStages } from './sections';

export const metadata = smartMetadata();

export default function SmartSystemsPage() {
  return <main className="engineering-page premium-page ss-page">
    <SiteHeader active="smart" />
    <Breadcrumbs />
    <PageHero topic="Инженерная автоматизация" title="Модернизация управления в действующем здании"
      description="Помогаем организациям перейти от ручных обходов и разрозненных настроек к управлению совместимой инженерией. Начинаем с обследования, затем проектируем и организуем внедрение до проверки и передачи результата."
      image="/images/smart-systems/hub-v2.webp" mobileImage="/images/smart-systems/hub-v2-mobile.webp"
      slogan="Управлять просто." theme="ss-hero" action={<><SmartLink href="#contact">Обсудить модернизацию</SmartLink><SmartLink href="#process" quiet>Как проходят работы</SmartLink></>} />
    <section className="ss-section shell">
      <SmartHeading number="01" tag="Объекты и услуги" title="Что требуется вашему объекту?" text="Работаем с коммерческими, общественными и специализированными зданиями. Для предварительной оценки важны назначение помещений, существующее оборудование и задача службы эксплуатации." />
      <DirectionCards />
    </section>
    <section className="ss-dark"><div className="shell">
      <SmartHeading number="02" tag="Функции управления" title="Что сможет делать служба эксплуатации" text="Возможность каждого сценария определяем после обследования. Проверяем доступные сигналы, защиту оборудования и допустимые действия персонала." />
      <FeatureGrid items={capabilities} />
    </div></section>
    <section className="ss-section shell" id="process">
      <SmartHeading number="03" tag="Порядок работ" title="От обследования до передачи системы" text="Перечень этапов, стоимость и график определяем после изучения объекта. Когда модернизируем отдельный узел, проектирование всей инженерии здания может не потребоваться." />
      <Process items={modernizationStages} />
    </section>
    <EngineeringApproach />
    <SmartInquiry hub />
    <SiteFooter slogan="Управлять просто." />
  </main>;
}
