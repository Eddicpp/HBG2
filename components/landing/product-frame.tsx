import { Crown } from "lucide-react";
import type { ReactNode } from "react";

const areas = ["Tesoreria", "Scadenziario", "Riconciliazione", "IVA"] as const;
export type ProductArea = typeof areas[number];

export function ProductFrame({ area, children }: { area: ProductArea; children: ReactNode }) {
  return (
    <div className="product-frame">
      <div className="product-chrome" aria-hidden="true"><i /><i /><i /></div>
      <div className="product-app">
        <aside className="product-sidebar" aria-label="Sezioni dell’anteprima">
          <div className="product-wordmark"><Crown size={16} aria-hidden="true" /><span><b>CashKing</b><small>Tesoreria per PMI</small></span></div>
          <ul>{areas.map((item) => <li key={item} aria-current={area === item ? "true" : undefined}>{item}</li>)}</ul>
        </aside>
        <div className="product-main">{children}</div>
      </div>
    </div>
  );
}
