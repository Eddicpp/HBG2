import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DemoLink, SectionHeading, TrialLink } from "./shared";

const roles = [
  { id: "titolare", label: "Titolare", title: "Sai prima quando può mancare cassa.", objection: "«Ho già Excel e il commercialista.»", response: "Il commercialista ti aiuta a leggere il passato. CashKing Tesoreria per PMI ti mostra il futuro della cassa. E puoi partire dal tuo Excel.", cta: TrialLink },
  { id: "amministrazione", label: "Amministrazione", title: "Meno inserimenti a mano, più tempo per controllare.", objection: "«Non voglio inserire i dati due volte.»", response: "Riunisci conti e fatture e parti dai dati che hai già. Verifica gli abbinamenti e leggi la previsione delle prossime 8 settimane.", cta: DemoLink },
  { id: "commercialista", label: "Commercialista", title: "Clienti più ordinati, meno file da rincorrere.", objection: "«Un altro strumento da imparare.»", response: "Consulti scadenze e movimenti in sola lettura, senza doverli aggiornare. Se preferisci lavorare con i tuoi strumenti, puoi usare il CSV.", cta: DemoLink },
];

export function Audience() {
  return (
    <section className="section section-tint" aria-labelledby="per-chi">
      <div className="shell split-section audience-layout">
        <SectionHeading label="PER CHI È" id="per-chi" title="La stessa cassa, tre punti di vista." description="Per chi guida una PMI B2B, tiene i conti o segue l’azienda dallo studio." />
        <Tabs defaultValue="titolare">
          <TabsList aria-label="Scegli il tuo ruolo">
            {roles.map(({ id, label }) => <TabsTrigger key={id} value={id}>{label}</TabsTrigger>)}
          </TabsList>
          {roles.map(({ id, title, objection, response, cta: Cta }) => <TabsContent key={id} value={id}><h3>{title}</h3><p className="objection">{objection}</p><p>{response}</p><Cta /></TabsContent>)}
        </Tabs>
      </div>
    </section>
  );
}
