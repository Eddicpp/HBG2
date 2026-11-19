"use client";

import { useActionState, useEffect, useState } from "react";
import { track } from "@vercel/analytics";
import { submitLead, type LeadState } from "@/app/actions/lead";
import { PRIVACY_URL } from "@/lib/config";

const waitlistAction = submitLead.bind(null, "ocr_waitlist");
const initialState: LeadState = { status: "idle" };

export function OcrWaitlistForm() {
  const [state, action, pending] = useActionState(waitlistAction, initialState);
  const [email, setEmail] = useState("");
  const [privacy, setPrivacy] = useState(false);
  const errors = state.status === "error" ? state.fields : undefined;
  const delivered = state.status === "success";
  useEffect(() => { if (delivered) track("waitlist_submit"); }, [delivered]);

  return (
    <div className="ocr-form">
      <p className="form-message" aria-live="polite" aria-atomic="true">
        {state.status === "error" && state.message}
        {state.status === "preview" && "Iscrizione di prova registrata nei log. Non sei nella lista d’attesa."}
        {delivered && "Ti avviseremo quando sarà disponibile."}
      </p>
      {!delivered && state.status !== "preview" && <form action={action} aria-busy={pending}>
        <fieldset className="lead-fields" disabled={pending}>
          <div className="lead-field">
            <label htmlFor="ocr-email">Email per ricevere l’avviso</label>
            <input id="ocr-email" name="email" type="email" autoComplete="email" required maxLength={254} aria-invalid={!!errors?.email} aria-describedby={errors?.email ? "ocr-email-error" : undefined} value={email} onChange={(e) => setEmail(e.target.value)} />
            {errors?.email && <small id="ocr-email-error">{errors.email}</small>}
          </div>
          <div className="lead-consent">
            <label htmlFor="ocr-privacy"><input id="ocr-privacy" name="privacy" type="checkbox" required aria-invalid={!!errors?.privacy} aria-describedby={errors?.privacy ? "ocr-privacy-error" : undefined} checked={privacy} onChange={(e) => setPrivacy(e.target.checked)} /><span>Ho preso visione {PRIVACY_URL ? "dell’informativa privacy." : "dell’uso dell’email per ricevere l’avviso."}</span></label>
            {PRIVACY_URL && <a href={PRIVACY_URL}>Leggi l’informativa privacy</a>}
            {errors?.privacy && <small id="ocr-privacy-error">{errors.privacy}</small>}
          </div>
          <div className="lead-submit"><button className="button button-primary" type="submit">{pending ? "Invio in corso…" : "Avvisami quando è disponibile"}</button></div>
        </fieldset>
      </form>}
    </div>
  );
}
