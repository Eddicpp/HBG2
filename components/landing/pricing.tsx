import { Check } from "lucide-react";
import { plans } from "./offer";
import { SectionHeading, TrialLink } from "./shared";

export function Pricing() {
  return (
    <section className="section section-tint" id="prezzi" aria-labelledby="prezzi-title">
      <div className="shell">
        <SectionHeading label="PREZZI" id="prezzi-title" title="Tre piani, un mese per provare." />
        <div className="price-grid">
          {plans.map(({ name, price, featured }) => <article className={`price-column${featured ? " price-featured" : ""}`} key={name}><div className="price-heading"><h3>{name}</h3>{featured && <span className="popular">[DA CONFERMARE: Più scelto]</span>}</div><p className="price"><strong>{price} €</strong><span> / mese</span></p><p className="tax">IVA esclusa</p><p className="plan-features">Funzioni del piano: <strong>[DA CONFERMARE]</strong></p><TrialLink /></article>)}
        </div>
        <div className="pricing-notes"><p><Check size={18} aria-hidden="true" /> Primo mese gratis, nessun vincolo</p><p>Sconto annuale: [DA CONFERMARE]</p></div>
      </div>
    </section>
  );
}
