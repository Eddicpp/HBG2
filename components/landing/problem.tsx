import { SectionHeading } from "./shared";

const painPoints = [
  { title: "Scoperte a ridosso delle scadenze", text: "I pagamenti sono già vicini e hai poco tempo per intervenire." },
  { title: "Le uscite si concentrano", text: "IVA, F24 e stipendi cadono nella stessa settimana. Gli incassi, invece, possono slittare." },
  { title: "Excel ti ruba le serate", text: "Tra file, estratti conto e fatture, aggiornare i numeri a mano diventa un secondo lavoro." },
];

export function Problem() {
  return (
    <section className="section problem-section" aria-labelledby="problema">
      <div className="shell problem-grid">
        <div className="problem-top">
          <figure className="stat"><strong>42%</strong><div><p>Solo il 42% delle imprese italiane paga i fornitori alla scadenza</p><figcaption>CRIBIS, Studio Pagamenti, giugno 2026</figcaption></div></figure>
        </div>
        <div>
          <SectionHeading label="IL PROBLEMA" id="problema" title="La cassa non aspetta la fine del mese." />
          <ol className="pain-list" role="list">
            {painPoints.map(({ title, text }, index) => <li key={title}><span className="list-index" aria-hidden="true">0{index + 1}</span><div><h3>{title}</h3><p>{text}</p></div></li>)}
          </ol>
        </div>
      </div>
    </section>
  );
}
