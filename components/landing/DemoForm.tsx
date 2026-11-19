"use client";

import { useActionState, useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { submitLead, type LeadState } from "@/app/actions/lead";
import { PRIVACY_URL } from "@/lib/config";

const demoAction = submitLead.bind(null, "demo");
const initialState: LeadState = { status: "idle" };

export function DemoForm() {
  const [state, action, pending] = useActionState(demoAction, initialState);
  const [values, setValues] = useState({ name: "", email: "", employees: "", cashManagement: "", privacy: false });
  const errors = state.status === "error" ? state.fields : undefined;
  const delivered = state.status === "success";
  useEffect(() => { if (delivered) track("demo_submit"); }, [delivered]);

  function field(name: keyof typeof values) {
    return { id: `demo-${name}`, name, "aria-invalid": !!errors?.[name], "aria-describedby": errors?.[name] ? `demo-${name}-error` : undefined };
  }

  function error(name: keyof typeof values) {
    return errors?.[name] && <small id={`demo-${name}-error`}>{errors[name]}</small>;
  }

  return (
    <div className="demo-form" id="demo" tabIndex={-1} aria-labelledby="demo-title">
      <h3 id="demo-title">Richiedi una demo</h3>
      <p className="form-message" aria-live="polite" aria-atomic="true">
        {state.status === "error" && state.message}
        {state.status === "preview" && "Invio di prova registrato nei log. La richiesta non è stata inoltrata."}
        {delivered && "Ti contattiamo entro 1 giorno lavorativo"}
      </p>
      {!delivered && state.status !== "preview" && <form action={action} aria-busy={pending}>
        <fieldset className="lead-fields" disabled={pending}>
          <div className="lead-field"><label htmlFor="demo-name">Nome</label><input {...field("name")} autoComplete="name" required maxLength={120} value={values.name} onChange={(e) => setValues({ ...values, name: e.target.value })} />{error("name")}</div>
          <div className="lead-field"><label htmlFor="demo-email">Email aziendale</label><input {...field("email")} type="email" autoComplete="email" required maxLength={254} value={values.email} onChange={(e) => setValues({ ...values, email: e.target.value })} />{error("email")}</div>
          <div className="lead-field"><label htmlFor="demo-employees">Numero di addetti</label><select {...field("employees")} required value={values.employees} onChange={(e) => setValues({ ...values, employees: e.target.value })}><option value="">Seleziona</option><option>1-9</option><option>10-49</option><option>50-249</option></select>{error("employees")}</div>
          <div className="lead-field"><label htmlFor="demo-cashManagement">Come gestisci la cassa oggi?</label><select {...field("cashManagement")} required value={values.cashManagement} onChange={(e) => setValues({ ...values, cashManagement: e.target.value })}><option value="">Seleziona</option><option value="excel">Excel</option><option value="software">Software</option><option value="commercialista">Commercialista</option></select>{error("cashManagement")}</div>
          <div className="lead-consent"><label htmlFor="demo-privacy"><input {...field("privacy")} type="checkbox" required checked={values.privacy} onChange={(e) => setValues({ ...values, privacy: e.target.checked })} /><span>Ho preso visione {PRIVACY_URL ? "dell’informativa privacy." : "dell’uso dei dati per rispondere alla mia richiesta."}</span></label>{PRIVACY_URL && <a href={PRIVACY_URL}>Leggi l’informativa privacy</a>}{error("privacy")}</div>
          <div className="lead-submit"><button className="button button-primary" type="submit">{pending ? "Invio in corso…" : "Richiedi la demo"}</button></div>
        </fieldset>
      </form>}
    </div>
  );
}
