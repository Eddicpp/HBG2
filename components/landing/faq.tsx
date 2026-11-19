import { AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "./shared";
import { TrackedFaq, TrackedLink } from "./TrackedLink";
import { DEMO_ANCHOR, SHOW_PLACEHOLDERS } from "@/lib/config";

const questions = [
  { question: "Quali banche si collegano?", pending: "[DA CONFERMARE: banche supportate]", demo: true },
  { question: "Funziona con lo SDI?", pending: "[DA CONFERMARE: integrazione con lo SDI]", demo: true },
  { question: "Posso disdire quando voglio?", answer: "Sì, non ci sono vincoli. Puoi provare per 30 giorni senza carta di credito." },
  { question: "Il commercialista paga?", answer: "Il commercialista accede in sola lettura.", pending: "Eventuale costo per lo studio: [DA CONFERMARE].", demo: true },
  { question: "I miei dati sono al sicuro?", answer: "Lo studio accede in sola lettura e il DPA è disponibile.", pending: "Misure di sicurezza e dettagli sull’hosting: [DA CONFERMARE].", demo: true },
  { question: "Quanto tempo serve per partire?", answer: "L’onboarding guidato dura 45 minuti. Durante l’incontro puoi importare il tuo file Excel." },
] satisfies { question: string; answer?: string; pending?: string; demo?: boolean }[];

export function Faq() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="shell split-section faq-layout">
        <SectionHeading label="FAQ" id="faq-title" title="Domande frequenti." description="Le risposte per capire se fa al caso tuo." />
        <TrackedFaq>
          {questions.map(({ question, answer, pending, demo }) => (
            <AccordionItem key={question} value={question}>
              <AccordionTrigger>{question}</AccordionTrigger>
              <AccordionContent>{answer}{answer && (demo || (SHOW_PLACEHOLDERS && pending)) ? " " : null}{SHOW_PLACEHOLDERS && pending ? pending : demo && <TrackedLink className="underline underline-offset-4" href={DEMO_ANCHOR} section="faq" label="Te lo mostriamo nella demo sui tuoi numeri">Te lo mostriamo nella demo sui tuoi numeri</TrackedLink>}</AccordionContent>
            </AccordionItem>
          ))}
        </TrackedFaq>
      </div>
    </section>
  );
}
