"use client";

import { useEffect, useState } from "react";
import { DEMO_URL, TRIAL_URL, withLandingUtm } from "@/lib/config";
import { TrackedLink } from "./TrackedLink";

export function MobileCtaBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("inizio");
    const demo = document.getElementById("demo");
    if (!hero || !demo || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(() => {
      const demoBounds = demo.getBoundingClientRect();
      const demoVisible = demoBounds.top < window.innerHeight && demoBounds.bottom > 0;
      setVisible(hero.getBoundingClientRect().bottom <= 0 && !demoVisible);
    });
    observer.observe(hero);
    observer.observe(demo);
    return () => observer.disconnect();
  }, []);

  return (
    <nav id="cta-mobile" className="mobile-cta-bar" aria-label="Azioni rapide" hidden={!visible}>
      <TrackedLink className="button button-primary" href={withLandingUtm(TRIAL_URL, "cta-mobile")} label="Prova gratis" section="cta-mobile">Prova gratis</TrackedLink>
      <TrackedLink className="button button-secondary" href={withLandingUtm(DEMO_URL, "cta-mobile")} label="Demo" section="cta-mobile">Demo</TrackedLink>
    </nav>
  );
}
