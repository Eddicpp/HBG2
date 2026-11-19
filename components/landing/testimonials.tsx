import { SectionHeading } from "./shared";
import { SHOW_PLACEHOLDERS } from "@/lib/config";

export function Testimonials() {
  if (!SHOW_PLACEHOLDERS) return null;

  return (
    <section className="section section-tint" aria-labelledby="testimonianze">
      <div className="shell">
        <SectionHeading label="TESTIMONIANZE" id="testimonianze" title="I casi pilota sono in arrivo." />
        <div className="pilot-list">
          {[1, 2, 3].map((id) => <article className="pilot-card" key={id}><p>[Caso pilota in arrivo: ore risparmiate e scarto tra cassa prevista e reale]</p></article>)}
        </div>
      </div>
    </section>
  );
}
