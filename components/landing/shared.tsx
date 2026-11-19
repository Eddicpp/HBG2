import { ArrowRight, Crown } from "lucide-react";
import { DEMO_URL, TRIAL_URL } from "@/lib/config";

export function Brand({ href = "#inizio" }: { href?: string }) {
  return (
    <a href={href} className="brand">
      <span className="brand-icon"><Crown size={20} aria-hidden="true" /></span>
      <span className="brand-text"><strong>CashKing</strong><small>Tesoreria per PMI</small></span>
    </a>
  );
}

export function TrialLink() {
  return <a className="button button-primary" href={TRIAL_URL}>Prova gratis 30 giorni</a>;
}

export function DemoLink() {
  return <a className="button button-secondary" href={DEMO_URL}>Prenota una demo sui tuoi numeri <ArrowRight size={17} aria-hidden="true" /></a>;
}

export function SectionHeading({ label, title, description, id }: { label: string; title: string; description?: string; id: string }) {
  return <div className="section-heading"><p className="eyebrow">{label}</p><h2 id={id}>{title}</h2>{description && <p className="section-intro">{description}</p>}</div>;
}
