import { ArrowRight, Crown } from "lucide-react";
import { DEMO_URL, TRIAL_URL, withLandingUtm } from "@/lib/config";
import { TrackedLink } from "./TrackedLink";

export function Brand({ href = "#inizio" }: { href?: string }) {
  return (
    <a href={href} className="brand">
      <span className="brand-icon"><Crown size={20} aria-hidden="true" /></span>
      <span className="brand-text"><strong>CashKing</strong><small>Tesoreria per PMI</small></span>
    </a>
  );
}

export function TrialLink({ section }: { section: string }) {
  return <TrackedLink className="button button-primary" href={withLandingUtm(TRIAL_URL, section)} section={section} label="Prova gratis 30 giorni">Prova gratis 30 giorni</TrackedLink>;
}

export function DemoLink({ section }: { section: string }) {
  return <TrackedLink className="button button-secondary" href={withLandingUtm(DEMO_URL, section)} section={section} label="Prenota una demo sui tuoi numeri">Prenota una demo sui tuoi numeri <ArrowRight size={17} aria-hidden="true" /></TrackedLink>;
}

export function SectionHeading({ label, title, description, id }: { label: string; title: string; description?: string; id: string }) {
  return <div className="section-heading"><p className="eyebrow">{label}</p><h2 id={id}>{title}</h2>{description && <p className="section-intro">{description}</p>}</div>;
}
