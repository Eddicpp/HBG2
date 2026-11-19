import { LOGIN_URL } from "@/lib/config";
import { navigation } from "./navigation";
import { MobileMenu } from "./mobile-menu";
import { Brand, TrialLink } from "./shared";

export function Header() {
  return (
    <header className="site-header">
      <a className="skip-link" href="#contenuto">Vai al contenuto</a>
      <div className="shell header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navigazione principale">
          {navigation.map(({ label, href }) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="header-actions"><a href={LOGIN_URL}>Accedi</a><TrialLink /></div>
        <MobileMenu trial={<TrialLink />} />
      </div>
    </header>
  );
}
