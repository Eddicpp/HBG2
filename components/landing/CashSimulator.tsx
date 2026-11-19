"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { track } from "@vercel/analytics";
import { SectionHeading, TrialLink } from "./shared";

const day = 86_400_000;
const threshold = 0;
const money = new Intl.NumberFormat("it-IT", { style: "currency", currency: "EUR", maximumFractionDigits: 2 });
const monthFormat = new Intl.DateTimeFormat("it-IT", { month: "long", year: "numeric", timeZone: "UTC" });
const shortDate = new Intl.DateTimeFormat("it-IT", { day: "numeric", month: "short", timeZone: "UTC" });
const inputs = [
  ["balance", "Saldo di oggi (€)", undefined],
  ["income", "Incassi attesi al mese (€)", 0],
  ["expenses", "Uscite fisse al mese (€)", 0],
  ["vat", "Importo IVA (€)", 0],
] as const;
const subscribe = () => () => {};

function localToday() {
  const date = new Date();
  return Date.UTC(date.getFullYear(), date.getMonth(), date.getDate());
}

function nextMonths(today: number) {
  const date = new Date(today);
  return Array.from({ length: 12 }, (_, i) => {
    const time = Date.UTC(date.getUTCFullYear(), date.getUTCMonth() + i, 16);
    return { time, label: monthFormat.format(time) };
  }).filter(({ time }) => time >= today);
}

export function CashSimulator() {
  const [months, setMonths] = useState<ReturnType<typeof nextMonths>>([]);
  const [weeks, setWeeks] = useState<{ end: number; balance: number }[] | null>(null);
  const [monthError, setMonthError] = useState(false);
  const ready = useSyncExternalStore(subscribe, () => true, () => false);

  function calculate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const balance = Number(form.get("balance"));
    const income = Number(form.get("income"));
    const expenses = Number(form.get("expenses"));
    const vat = Number(form.get("vat"));
    if (vat > 0 && !form.get("month")) {
      setMonthError(true);
      setWeeks(null);
      return;
    }
    setMonthError(false);
    const vatDay = form.get("month") ? Number(form.get("month")) : Infinity;
    const today = localToday();
    track("simulator_used");
    setWeeks(Array.from({ length: 8 }, (_, i) => {
      const days = (i + 1) * 7;
      const end = today + days * day;
      return { end, balance: Math.round((balance + (income - expenses) * days / 30 - (vatDay >= today && vatDay <= end ? vat : 0)) * 100) / 100 };
    }));
  }

  const firstBelow = weeks?.findIndex(({ balance }) => balance < threshold) ?? -1;
  const maximum = Math.max(1, ...(weeks?.map(({ balance }) => Math.abs(balance)) ?? []));

  return (
    <section className="section" id="simulatore" aria-labelledby="simulatore-titolo">
      <div className="shell">
        <SectionHeading label="SIMULATORE" id="simulatore-titolo" title="Simula la tua cassa a 8 settimane." description="Prova con i tuoi numeri: restano nel browser." />
        <div className="split-section simulator-layout">
          <form onSubmit={calculate} onFocus={() => { if (!months.length) setMonths(nextMonths(localToday())); }}>
            <fieldset className="lead-fields" disabled={!ready}>
              {inputs.slice(0, 3).map(([name, label, min]) => <div className="lead-field" key={name}><label htmlFor={`sim-${name}`}>{label}</label><input id={`sim-${name}`} name={name} type="number" step="0.01" min={min ?? -1_000_000_000} max={1_000_000_000} required /></div>)}
              <div className="lead-field"><label htmlFor="sim-month">Mese della prossima liquidazione IVA</label><select id="sim-month" name="month" aria-invalid={monthError} aria-describedby={monthError ? "sim-month-error" : undefined} onChange={() => setMonthError(false)}><option value="">Nessuna liquidazione da simulare</option>{months.map(({ time, label }) => <option key={time} value={time}>{label}</option>)}</select><small id="sim-month-error" aria-live="polite">{monthError && "Scegli il mese per includere l’IVA nella previsione."}</small></div>
              <div className="lead-field"><label htmlFor="sim-vat">Importo IVA (€)</label><input id="sim-vat" name="vat" type="number" step="0.01" min={0} max={1_000_000_000} defaultValue={0} /></div>
              <p className="simulator-note">Stima: entrate e uscite sono distribuite su 30 giorni. L’IVA è sottratta il 16 del mese scelto, come ipotesi di calcolo e non come scadenza fiscale.</p>
              <div><button className="button button-primary" type="submit">Calcola la previsione</button></div>
            </fieldset>
          </form>
          <div className="simulator-result">
            <h3>Previsione a 8 settimane</h3>
            <p className="simulator-note">Soglia di cassa: 0 €</p>
            <p className="simulator-status" aria-live="polite" aria-atomic="true">{weeks ? firstBelow === -1 ? "Nessuna settimana sotto soglia." : `Prima settimana sotto soglia: ${firstBelow + 1} (${money.format(weeks[firstBelow].balance)}).` : "Inserisci i dati e calcola la previsione."}</p>
            {weeks && <ol className="simulator-bars" aria-label="Saldi previsti a fine settimana">
              {weeks.map(({ end, balance }, i) => <li key={i} className={firstBelow === i ? "simulator-critical" : undefined}>
                <span title={`Fino al ${shortDate.format(end)}`}>S{i + 1}<span className="sr-only">, fino al {shortDate.format(end)}</span></span>
                <span className="simulator-track" aria-hidden="true"><span className={balance < 0 ? "negative" : undefined} style={{ width: `${Math.abs(balance) / maximum * 50}%` }} /></span>
                <strong>{money.format(balance)}</strong>
              </li>)}
            </ol>}
            <p className="simulator-cta">Vuoi la previsione con i tuoi dati veri? <TrialLink section="simulatore" /></p>
          </div>
        </div>
      </div>
    </section>
  );
}
