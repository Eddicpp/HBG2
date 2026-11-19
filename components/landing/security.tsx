import { SectionHeading } from "./shared";

const securityItems = [
  { title: "GDPR e DPA", text: "Il DPA, l’accordo sul trattamento dei dati, è disponibile. Dettagli sul trattamento ai sensi del GDPR: [DA CONFERMARE]." },
  { title: "Chi vede cosa", text: "Lo studio consulta i dati in sola lettura e non può modificarli. Permessi del team aziendale: [DA CONFERMARE]." },
  { title: "Collegamento bancario", text: "[DA CONFERMARE: PSD2 / provider]" },
  { title: "Hosting", text: "[DA CONFERMARE]" },
];

export function Security() {
  return (
    <section className="section" id="sicurezza" aria-labelledby="sicurezza-title">
      <div className="shell split-section security-layout">
        <SectionHeading label="SICUREZZA E DATI" id="sicurezza-title" title="Chi può vedere i tuoi dati?" description="Lo studio può consultare i dati senza modificare i movimenti." />
        <div className="security-list">{securityItems.map(({ title, text }) => <div key={title}><h3>{title}</h3><p>{text}</p></div>)}</div>
      </div>
    </section>
  );
}
