import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "./shared";

const questions = [
  ["Quali banche si collegano?", "[DA CONFERMARE: banche supportate]"],
  ["Funziona con lo SDI?", "[DA CONFERMARE: integrazione con lo SDI]"],
  ["Posso disdire quando voglio?", "Sì, non ci sono vincoli."],
  ["Il commercialista paga?", "Il commercialista accede in sola lettura. Eventuale costo per lo studio: [DA CONFERMARE]."],
  ["I miei dati sono al sicuro?", "Lo studio accede in sola lettura e il DPA è disponibile. Misure di sicurezza e dettagli sull’hosting: [DA CONFERMARE]."],
  ["Quanto tempo serve per partire?", "L’onboarding guidato dura 45 minuti. Durante l’incontro puoi importare il tuo file Excel."],
];

export function Faq() {
  return (
    <section className="section" id="faq" aria-labelledby="faq-title">
      <div className="shell split-section faq-layout">
        <SectionHeading label="FAQ" id="faq-title" title="Domande frequenti." description="Le risposte per capire se fa al caso tuo." />
        <Accordion type="single" collapsible>
          {questions.map(([question, answer], index) => <AccordionItem key={question} value={`domanda-${index + 1}`}><AccordionTrigger>{question}</AccordionTrigger><AccordionContent>{answer}</AccordionContent></AccordionItem>)}
        </Accordion>
      </div>
    </section>
  );
}
