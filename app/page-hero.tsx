import type { ReactNode } from "react";
import { ArrowIcon } from "./arrow-icon";
import { BrandSignature, type BrandSlogan } from "./brand-signature";

type PageHeroProps = {
  topic: string; title: ReactNode; description: string; image: string;
  mobileImage?: string; slogan: BrandSlogan; theme?: string;
  action?: ReactNode; actionLabel?: string; actionHref?: string;
  facts?: string[]; back?: { href: string; label: string };
};

/** Shared editorial composition for the site's interior pages. */
export function PageHero({ topic, title, description, image, mobileImage, slogan, theme = "", action, actionLabel = "Обсудить проект", actionHref = "#contact", facts, back }: PageHeroProps) {
  return <section className={`page-cover shell ${theme}`} id="top">
    <picture className="page-cover-picture">
      {mobileImage && <source media="(max-width: 700px)" srcSet={mobileImage} />}
      <img src={image} alt="" fetchPriority="high" />
    </picture>
    <div className="page-cover-shade" aria-hidden="true" />
    <div className="page-cover-masthead"><span className="page-cover-topic">{topic}</span><BrandSignature slogan={slogan} /></div>
    <div className="page-cover-copy">
      {back && <a className="page-cover-back" href={back.href}><ArrowIcon direction="left" />{back.label}</a>}
      <h1>{title}</h1><p>{description}</p>
      <div className="page-cover-actions">{action || <a className="page-cover-cta" href={actionHref} data-goal={actionHref === "#contact" ? "discuss_service" : undefined}>{actionLabel}<span><ArrowIcon direction="up-right" /></span></a>}</div>
    </div>
    {facts && <div className="page-cover-facts">{facts.map((fact, index) => <span key={fact}><i>0{index + 1}</i>{fact}</span>)}</div>}
  </section>;
}
