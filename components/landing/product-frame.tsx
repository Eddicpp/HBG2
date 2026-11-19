import type { ReactNode } from "react";
import { BrandMark } from "./brand-mark";

const areas = ["Tesoreria", "Scadenziario", "Riconciliazione", "IVA"] as const;
export type ProductArea = typeof areas[number];

export function ProductFrame({ area, children }: { area: ProductArea; children: ReactNode }) {
  return (
    <div className="product-frame">
      <div className="product-chrome" aria-hidden="true"><i /><i /><i /></div>
      <div className="product-app">
        <aside className="product-sidebar" aria-label="Sezioni dell’anteprima">
          <div className="product-wordmark"><BrandMark size={16} /><span><b>CashKing</b><small>Tesoreria per PMI</small></span></div>
          <ul>{areas.map((item) => <li key={item} aria-current={area === item ? "true" : undefined}>{item}</li>)}</ul>
        </aside>
        <div className="product-main">{children}</div>
      </div>
    </div>
  );
}
