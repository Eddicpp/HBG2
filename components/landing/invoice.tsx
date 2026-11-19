import { ArrowRight, Camera } from "lucide-react";
import { SHOW_PLACEHOLDERS } from "@/lib/config";
import { OcrWaitlistForm } from "./OcrWaitlistForm";
import { SectionHeading } from "./shared";

export function Invoice() {
  return (
    <section className="section section-tint" aria-labelledby="fattura">
      <div className="shell invoice-section">
        <div className="invoice-copy">
          <div className="status-label">In arrivo</div>
          <SectionHeading label="NOVITÀ" id="fattura" title="Fotografa la fattura." description="Scatta una foto: dalla fattura nasce un movimento in uscita, con scadenza e categoria suggerita." />
          <p className="body-copy">I campi dubbi vengono segnalati con «Da verificare». Li controlli e li confermi con un click.</p>
          <OcrWaitlistForm />
        </div>
        <figure className="invoice-scene">
          <div className="invoice-layout">
            <div className="phone" role="img" aria-label="Anteprima illustrativa di una fattura inquadrata dal telefono">
              <span className="phone-slot" />
              <div className="phone-paper"><strong>FATTURA</strong><i /><i /><i /><i /></div>
              <span className="phone-scan" />
              <span className="shutter"><Camera size={17} aria-hidden="true" /></span>
            </div>
            <ArrowRight className="invoice-arrow" size={18} strokeWidth={1.3} aria-hidden="true" />
            <div className="movement">
              <div className="product-chrome" aria-hidden="true"><i /><i /><i /></div>
              <div className="movement-content">
              <div className="mock-heading"><strong>Movimento creato</strong><p>Uscita da fattura</p></div>
              <dl><div><dt>Importo in uscita</dt><dd>{SHOW_PLACEHOLDERS ? "− [DA CONFERMARE]" : "− 2.450 €"}</dd></div><div><dt>Scadenza</dt><dd>{SHOW_PLACEHOLDERS ? "[DA CONFERMARE]" : "21 nov"} <span className="verify-badge">Da verificare</span></dd></div><div><dt>Categoria suggerita</dt><dd>Fornitori <span className="verify-badge">Da verificare</span></dd></div></dl>
              </div>
            </div>
          </div>
          <figcaption>Anteprima illustrativa</figcaption>
        </figure>
      </div>
    </section>
  );
}
