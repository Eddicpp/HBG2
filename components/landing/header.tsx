import { LOGIN_URL, withLandingUtm } from "@/lib/config";
import { navigation } from "./navigation";
import { MobileMenu } from "./mobile-menu";
import { Brand, TrialLink } from "./shared";
import { TrackedLink } from "./TrackedLink";

export function Header() {
  return (
    <header className="site-header" id="header">
      <a className="skip-link" href="#contenuto">Vai al contenuto</a>
      <div className="shell header-inner">
        <Brand />
        <nav className="desktop-nav" aria-label="Navigazione principale">
          {navigation.map(({ label, href }) => <a key={href} href={href}>{label}</a>)}
        </nav>
        <div className="header-actions"><TrackedLink href={withLandingUtm(LOGIN_URL, "header")} label="Accedi" section="header">Accedi</TrackedLink><TrialLink section="header" /></div>
        <MobileMenu trial={<TrialLink section="header" />} />
      </div>
    </header>
  );
}
