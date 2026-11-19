import { Check } from "lucide-react";
import { Schedule } from "./schedule";
import { SectionHeading } from "./shared";

export function Excel() {
  return (
    <section className="section" aria-labelledby="excel">
      <div className="shell split-section excel-layout">
        <div>
          <SectionHeading label="IL PASSAGGIO DA EXCEL" id="excel" title="Da Excel a CashKing Tesoreria per PMI." description="Porta il file che usi già. Lo importi durante l’onboarding guidato, senza ripartire da un foglio vuoto." />
          <p className="excel-note"><Check size={18} aria-hidden="true" /> Modelli già pronti per IVA e stipendi</p>
        </div>
        <Schedule showTemplates />
      </div>
    </section>
  );
}
