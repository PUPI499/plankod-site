import {BrandCards} from "../products/brands";
import {StoreHeading} from "../products/ui";
import {SiteHeader,SiteFooter,ContactBand} from "../components";
export const metadata={title:"Бренды и поставщики оборудования — ПЛАНКОД",description:"Линейки датчиков, контроллеров и исполнительных модулей для инженерных систем организаций. Подбор по протоколу и спецификации.",alternates:{canonical:"/brands/"}};
export default function BrandsPage(){return <main id="top" className="engineering-page store-page"><SiteHeader active="products"/><section className="shell store-section"><h1>Производители и поставщики оборудования.</h1><StoreHeading tag="Каталог / бренды" title="Выберите линейку для объекта." text="Изучите линейки оборудования и выберите модели для своего объекта. Совместимость и поставку согласуем отдельно."/><BrandCards/></section><ContactBand/><SiteFooter/></main>}
