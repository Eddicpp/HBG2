import { SectionHeading } from "./shared";

const steps = [
  { title: "Collega conti e fatture", text: "Riunisci i dati che usi già, senza cambiare banca." },
  { title: "Vedi entrate e uscite previste", text: "CashKing Tesoreria per PMI mette in fila incassi e pagamenti per le prossime 8 settimane." },
  { title: "Anticipa la settimana critica", text: "Ricevi un avviso prima che la cassa scenda sotto soglia, così hai tempo per decidere." },
];

export function HowItWorks() {
  return (
    <section className="section section-tint" aria-labelledby="come-funziona">
      <div className="shell">
        <SectionHeading label="COME FUNZIONA" id="come-funziona" title="Dai tuoi dati alla previsione, in tre passi." />
        <ol className="timeline" role="list">
          {steps.map(({ title, text }, index) => <li key={title}><div className="step-marker"><span className="sr-only">PASSO </span><span className="step-number">0{index + 1}</span></div><h3>{title}</h3><p>{text}</p></li>)}
        </ol>
      </div>
    </section>
  );
}
