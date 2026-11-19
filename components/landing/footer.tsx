import { Brand } from "./shared";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-inner">
        <Brand />
        <address><span>Ragione sociale: [DA CONFERMARE]</span><span>P.IVA: [DA CONFERMARE]</span><span>Sede: [DA CONFERMARE]</span><span>Contatti: [DA CONFERMARE]</span></address>
        <nav aria-label="Informazioni legali"><a href="#">Privacy</a><a href="#">Cookie</a><a href="#">Termini</a></nav>
      </div>
    </footer>
  );
}
