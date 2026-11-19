import { Check } from "lucide-react";
import { HERO_TITLE } from "@/lib/landing-copy";
import { CashChart } from "./cash-chart";
import { DemoLink, TrialLink } from "./shared";

export function Hero() {
  return (
    <section className="hero" id="inizio" aria-labelledby="hero-title">
      <div className="shell hero-grid">
        <div>
          <p className="hero-tag">TESORERIA PER PMI</p>
          <h1 id="hero-title">{HERO_TITLE}</h1>
          <p className="hero-description">Passa da Excel a una previsione sempre a portata di mano. Riunisci conti e fatture e scopri per tempo quando la cassa rischia di non bastare.</p>
          <div className="button-group"><TrialLink section="inizio" /><DemoLink section="inizio" /></div>
          <p className="hero-note"><Check size={16} aria-hidden="true" /> <span>Senza carta di credito · Nessun vincolo · Onboarding guidato di 45 minuti</span></p>
        </div>
        <CashChart />
      </div>
    </section>
  );
}
