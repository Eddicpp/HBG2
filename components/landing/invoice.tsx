import CashKingExplainer from "./CashKingExplainer";
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
        <CashKingExplainer />
      </div>
    </section>
  );
}
