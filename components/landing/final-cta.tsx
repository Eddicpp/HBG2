import { DemoLink, TrialLink } from "./shared";

export function FinalCta() {
  return (
    <section className="final-cta" aria-labelledby="inizia-title">
      <div className="shell">
        <p className="eyebrow">INIZIA DAI TUOI NUMERI</p>
        <h2 id="inizia-title">Non aspettare fine mese per sapere quanta cassa avrai.</h2>
        <p className="final-description">Prova gratis per 30 giorni o guarda la previsione in una demo sui tuoi numeri.</p>
        <div className="button-group"><TrialLink /><DemoLink /></div>
      </div>
    </section>
  );
}
