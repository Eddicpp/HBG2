import { Check, X } from "lucide-react";
import { plans } from "./offer";
import { SectionHeading } from "./shared";

const rows = [
  ["Previsione già pronta", "Da costruire", "[DA CONFERMARE]", "Sì, a 8 settimane"],
  ["Cambio di banca richiesto", "No", "[DA CONFERMARE]", "No"],
  ["Tempo di avvio", "Dipende dal file", "[DA CONFERMARE]", "45 minuti di onboarding"],
  ["Commercialista incluso", "Condivisione manuale del file", "[DA CONFERMARE]", "Accesso in sola lettura"],
  ["Prezzo d’ingresso", "[DA CONFERMARE: licenza]", "[DA CONFERMARE]", `Da ${plans[0].price} €/mese, IVA esclusa`],
];

export function Comparison() {
  return (
    <section className="section" aria-labelledby="confronto">
      <div className="shell">
        <SectionHeading label="CONFRONTO" id="confronto" title="Uno strumento per la cassa, non un nuovo conto." />
        <div className="table-scroll" tabIndex={0} role="region" aria-label="Tabella scorrevole di confronto">
          <table>
            <caption className="sr-only">Confronto tra Excel, piattaforme complete con conto e carte e CashKing Tesoreria per PMI</caption>
            <thead><tr><th scope="col">Cosa confrontiamo</th><th scope="col">Excel</th><th scope="col">Piattaforme complete <small>con conto e carte</small></th><th scope="col">CashKing <small>Tesoreria per PMI</small></th></tr></thead>
            <tbody>{rows.map(([label, excel, platforms, cashking], index) => <tr key={label}><th scope="row">{label}</th><td>{index === 1 && <X size={16} className="table-mark" aria-hidden="true" />}{excel}</td><td>{platforms}</td><td>{index === 1 ? <X size={16} className="table-mark" aria-hidden="true" /> : (index === 0 || index === 3) && <Check size={16} className="table-mark" aria-hidden="true" />}{cashking}</td></tr>)}</tbody>
          </table>
        </div>
        <p className="table-hint">Scorri la tabella per vedere tutte le opzioni.</p>
      </div>
    </section>
  );
}
