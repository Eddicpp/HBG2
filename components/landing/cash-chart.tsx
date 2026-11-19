import { TriangleAlert } from "lucide-react";
import { ProductFrame } from "./product-frame";

const balances = [48320, 52160, 41280, 45740, 18920, 32850, 44610, 56190];
const maximum = 60000;
const threshold = 25000;
const euro = new Intl.NumberFormat("it-IT", { maximumFractionDigits: 0 });

export function CashChart() {
  return (
    <figure className="chart-scene" aria-label="Anteprima illustrativa della previsione a 8 settimane">
      <ProductFrame area="Tesoreria">
        <div className="mock-topline"><span>PANORAMICA</span><span>8 settimane</span></div>
        <div className="mock-heading"><strong>Previsione di cassa</strong><p>Entrate e uscite previste</p></div>
        <div className="dash-metrics">
          <div><span>Incassi</span><strong className="positive">+ 29.700 €</strong></div>
          <div><span>Pagamenti</span><strong>− 21.830 €</strong></div>
          <div><span>Cassa prevista</span><strong>{euro.format(balances[0])} €</strong></div>
        </div>
        <div className="chart-grid">
          <div className="plot-axis" aria-hidden="true">{[60000, 40000, 20000, 0].map((value) => <span key={value}>{euro.format(value)} €</span>)}</div>
          <div className="plot">
            <div className="plot-grid" aria-hidden="true"><i /><i /><i /><i /></div>
            <span className="plot-threshold" style={{ bottom: `${threshold / maximum * 100}%` }}><span>Soglia</span></span>
            <div className="bars">
              {balances.map((value, index) => <div key={index} className={value < threshold ? "is-critical" : undefined}><span className="plot-bar" style={{ height: `${value / maximum * 100}%` }}><span>{euro.format(value)} €</span></span></div>)}
            </div>
          </div>
          <div className="plot-labels">{balances.map((value, index) => <span key={index} className={value < threshold ? "critical-label" : undefined}>S{index + 1}</span>)}</div>
        </div>
        <div className="dash-alert"><TriangleAlert size={16} aria-hidden="true" /><div><strong>Cassa sotto soglia · Settimana 5</strong><p>Controlla F24 e pagamenti in scadenza.</p></div></div>
      </ProductFrame>
      <figcaption>Anteprima illustrativa · La settimana 5 scende sotto soglia.</figcaption>
    </figure>
  );
}
