import { SectionHeading } from "./shared";
import { SHOW_PLACEHOLDERS } from "@/lib/config";

const securityItems = [
  { title: "GDPR e DPA", confirmed: "Il DPA, l’accordo sul trattamento dei dati, è disponibile.", pending: "Dettagli sul trattamento ai sensi del GDPR: [DA CONFERMARE]." },
  { title: "Chi vede cosa", confirmed: "Lo studio consulta i dati in sola lettura e non può modificarli.", pending: "Permessi del team aziendale: [DA CONFERMARE]." },
  { title: "Collegamento bancario", pending: "[DA CONFERMARE: PSD2 / provider]" },
  { title: "Hosting", pending: "[DA CONFERMARE]" },
];

export function Security() {
  return (
    <section className="section" id="sicurezza" aria-labelledby="sicurezza-title">
      <div className="shell split-section security-layout">
        <SectionHeading label="SICUREZZA E DATI" id="sicurezza-title" title="Chi può vedere i tuoi dati?" description="Lo studio può consultare i dati senza modificare i movimenti." />
        <div className="security-list">{securityItems.filter(({ confirmed }) => SHOW_PLACEHOLDERS || confirmed).map(({ title, confirmed, pending }) => <div key={title}><h3>{title}</h3><p>{[confirmed, SHOW_PLACEHOLDERS && pending].filter(Boolean).join(" ")}</p></div>)}</div>
      </div>
    </section>
  );
}
