import { ProductFrame } from "./product-frame";

const entries = [
  ["21 nov", "Officine Demo Srl", "− 2.450 €", "Da pagare"],
  ["24 nov", "Alfa Esempio Srl", "+ 8.320 €", "Da incassare"],
  ["27 nov", "Beta Demo Srl", "− 1.180 €", "Pagato"],
  ["30 nov", "Gamma Esempio Srl", "+ 5.640 €", "Incassato"],
  ["02 dic", "Delta Demo Srl", "− 3.220 €", "Da pagare"],
  ["04 dic", "Sigma Esempio Srl", "+ 7.180 €", "Da incassare"],
];

export function Schedule({ showTemplates = false }: { showTemplates?: boolean }) {
  return (
    <figure className="schedule">
      <ProductFrame area="Scadenziario">
        <div className="mock-heading"><strong>Scadenziario</strong><p>Incassi e pagamenti</p></div>
        <table className="mock-table">
          <caption className="sr-only">Esempi con date, controparti e importi fittizi</caption>
          <thead><tr>{["Data", "Controparte", "Importo", "Stato"].map((item) => <th scope="col" key={item}>{item}</th>)}</tr></thead>
          <tbody>{entries.map(([date, company, value, state]) => <tr key={company}><td>{date}</td><th scope="row">{company}</th><td className={value.startsWith("+") ? "positive" : undefined}>{value}</td><td>{state}</td></tr>)}</tbody>
        </table>
        {showTemplates && <dl className="schedule-key"><div><dt>IVA / F24</dt><dd>Modello</dd></div><div><dt>Stipendi</dt><dd>Modello</dd></div><div><dt>Fornitori</dt><dd>Pagamento</dd></div><div><dt>Fatture clienti</dt><dd>Incasso</dd></div></dl>}
      </ProductFrame>
      <figcaption>Anteprima illustrativa</figcaption>
    </figure>
  );
}
