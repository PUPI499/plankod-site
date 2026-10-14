export type BrandSlogan = "Жить комфортно." | "Управлять просто." | "Думать системно.";

/** The name and promise are one typographic statement at every size. */
export function BrandSignature({ slogan = "Жить комфортно.", className = "" }: { slogan?: BrandSlogan; className?: string }) {
  return <div className={`brand-signature ${className}`}>
    <span className="brand-signature-name">ПЛАНКОД<span aria-hidden="true"> —</span></span>
    <span>{slogan}</span>
  </div>;
}
