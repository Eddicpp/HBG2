"use server";

type Field = "name" | "email" | "employees" | "cashManagement" | "privacy";

export type LeadState =
  | { status: "idle" }
  | { status: "error"; message: string; fields?: Partial<Record<Field, string>> }
  | { status: "preview" }
  | { status: "success" };

const employeeOptions = ["1-9", "10-49", "50-249"];
const managementOptions = ["excel", "software", "commercialista"];

function read(form: FormData, field: string) {
  const value = form.get(field);
  return typeof value === "string" ? value.trim() : "";
}

export async function submitLead(source: "demo" | "ocr_waitlist", _previous: LeadState, form: FormData): Promise<LeadState> {
  if (source !== "demo" && source !== "ocr_waitlist") {
    return { status: "error", message: "Modulo non valido. Ricarica la pagina e riprova." };
  }

  const email = read(form, "email");
  const name = read(form, "name");
  const employees = read(form, "employees");
  const cashManagement = read(form, "cashManagement");
  const fields: Partial<Record<Field, string>> = {};

  if (email.length > 254 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) fields.email = "Inserisci un indirizzo email valido.";
  if (form.get("privacy") !== "on") fields.privacy = "Conferma la presa visione dell’informativa.";
  if (source === "demo") {
    if (!name || name.length > 120) fields.name = "Inserisci un nome di massimo 120 caratteri.";
    if (!employeeOptions.includes(employees)) fields.employees = "Scegli il numero di addetti.";
    if (!managementOptions.includes(cashManagement)) fields.cashManagement = "Indica come gestisci la cassa.";
  }
  if (Object.keys(fields).length) {
    return { status: "error", message: "Controlla i campi indicati e riprova.", fields };
  }

  const lead = {
    source,
    email,
    privacyAccepted: true,
    submittedAt: new Date().toISOString(),
    ...(source === "demo" ? { name, employees, cashManagement } : {}),
  };
  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    // Keep contact details out of persistent logs on hosted deployments.
    if (process.env.VERCEL) console.info("[lead] Webhook non configurato", { source });
    else console.info("[lead] Anteprima locale", lead);
    return { status: "preview" };
  }
  try {
    const url = new URL(webhook);
    const local = !process.env.VERCEL && url.protocol === "http:" && ["localhost", "127.0.0.1"].includes(url.hostname);
    if ((!local && url.protocol !== "https:") || url.username || url.password) throw new Error("URL non valido");
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(lead),
      signal: AbortSignal.timeout(8000),
      redirect: "error",
    });
    if (!response.ok) {
      console.error("[lead] Il webhook ha risposto con stato", response.status);
      return { status: "error", message: "Non siamo riusciti a inviare la richiesta. Riprova tra poco." };
    }
    return { status: "success" };
  } catch {
    console.error("[lead] Webhook non raggiungibile o non valido");
    return { status: "error", message: "Non siamo riusciti a inviare la richiesta. Riprova tra poco." };
  }
}
