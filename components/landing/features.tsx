import { ArrowRight, ChevronDown } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CashChart } from "./cash-chart";
import { ProductFrame, type ProductArea } from "./product-frame";
import { Schedule } from "./schedule";
import { SectionHeading } from "./shared";

const features = [
  { id: "cassa", title: "Tesoreria previsionale", text: "Guarda avanti di 8 settimane e individua quando potresti scendere sotto soglia." },
  { id: "scadenze", title: "Scadenziario di incassi e pagamenti", text: "Vedi chi deve pagarti e quali uscite sono in programma, in un’unica vista." },
  { id: "iva", title: "IVA e F24", text: "Tieni le scadenze fiscali nella previsione, accanto a stipendi e fornitori." },
  { id: "movimenti", title: "Riconciliazione di movimenti e fatture", text: "Abbina i movimenti bancari alle fatture per capire cosa è stato saldato e cosa manca." },
  { id: "studio", title: "Accesso per il commercialista", text: "Dai allo studio accesso in sola lettura, senza mandare copie del tuo file." },
  { id: "csv", title: "Export CSV per lo studio", text: "Esporta i dati in CSV se il tuo commercialista preferisce elaborarli nei suoi strumenti." },
] as const;

const examples: Record<"iva" | "movimenti" | "studio" | "csv", { area: ProductArea; columns: string[]; rows: string[][] }> = {
  iva: { area: "IVA", columns: ["Scadenza", "Voce", "Importo"], rows: [["16 dic", "IVA", "− 3.240 €"], ["16 dic", "F24", "− 1.480 €"], ["27 dic", "Stipendi", "− 8.650 €"]] },
  movimenti: { area: "Riconciliazione", columns: ["Movimento", "Fattura", "Stato"], rows: [["Officine Demo Srl", "FT 018", "Abbinato"], ["Beta Demo Srl", "FT 021", "Abbinato"], ["Delta Demo Srl", "—", "Da abbinare"]] },
  studio: { area: "Tesoreria", columns: ["Profilo", "Area", "Permesso"], rows: [["Studio Demo", "Tesoreria", "Sola lettura"], ["Studio Demo", "Scadenziario", "Sola lettura"], ["Studio Demo", "Riconciliazione", "Sola lettura"]] },
  csv: { area: "Scadenziario", columns: ["Nome file", "Periodo", "Formato"], rows: [["movimenti.csv", "Novembre", "CSV"], ["scadenze.csv", "Dicembre", "CSV"]] },
};

function FeaturePreview({ feature }: { feature: typeof features[number] }) {
  if (feature.id === "cassa") return <CashChart />;
  if (feature.id === "scadenze") return <Schedule />;
  const { area, columns, rows } = examples[feature.id];

  return (
    <figure>
      <ProductFrame area={area}>
        <div className="mock-heading"><strong>{feature.title}</strong></div>
        <table className="mock-table">
          <thead><tr>{columns.map((column) => <th key={column} scope="col">{column}</th>)}</tr></thead>
          <tbody>{rows.map((row) => <tr key={row.join("|")}><th scope="row">{row[0]}</th>{row.slice(1).map((cell, index) => <td key={index}>{cell}</td>)}</tr>)}</tbody>
        </table>
      </ProductFrame>
      <figcaption className="mock-caption">Anteprima illustrativa</figcaption>
    </figure>
  );
}

export function Features() {
  return (
    <section className="section" id="funzioni" aria-labelledby="funzioni-title">
      <div className="shell">
        <SectionHeading label="FUNZIONI" id="funzioni-title" title="Tutto quello che serve per seguire la cassa." description="Previsioni, scadenze e movimenti in un solo posto, senza cambiare conto." />
        <div className="features-desktop">
          <Tabs className="features-grid" defaultValue="cassa" orientation="vertical">
            <TabsList className="feature-list" aria-label="Anteprime delle funzioni">
              {features.map(({ id, title, text }) => <TabsTrigger className="feature-trigger" key={id} value={id}><span><strong>{title}</strong><span className="feature-description">{text}</span></span><ArrowRight size={16} aria-hidden="true" /></TabsTrigger>)}
            </TabsList>
            <div className="feature-stage">{features.map((feature) => <TabsContent className="feature-preview" key={feature.id} value={feature.id}><FeaturePreview feature={feature} /></TabsContent>)}</div>
          </Tabs>
        </div>
        <div className="features-mobile">{features.map((feature) => (
          <article key={feature.id}>
            <h3 id={`funzione-${feature.id}`}>{feature.title}</h3>
            <p>{feature.text}</p>
            <details className="feature-disclosure">
              <summary aria-labelledby={`anteprima-${feature.id} funzione-${feature.id}`}>
                <span id={`anteprima-${feature.id}`}>Anteprima</span><ChevronDown size={16} aria-hidden="true" />
              </summary>
              <FeaturePreview feature={feature} />
            </details>
          </article>
        ))}</div>
      </div>
    </section>
  );
}
