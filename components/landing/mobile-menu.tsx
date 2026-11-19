"use client";

import { useId, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { LOGIN_URL, withLandingUtm } from "@/lib/config";
import { navigation } from "./navigation";
import { TrackedLink } from "./TrackedLink";

export function MobileMenu({ trial }: { trial: ReactNode }) {
  const [open, setOpen] = useState(false);
  const id = useId();
  const trigger = useRef<HTMLButtonElement>(null);

  function closeMenu() {
    setOpen(false);
    trigger.current?.focus();
  }

  return (
    <div className="mobile-menu" onKeyDown={(event) => {
      if (event.key === "Escape" && open) closeMenu();
    }}>
      <button ref={trigger} className="menu-toggle" type="button" aria-expanded={open} aria-controls={id} aria-label={open ? "Chiudi menu" : "Apri menu"} onClick={() => setOpen(!open)}>
        {open ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
      </button>
      <nav className="mobile-links" aria-label="Navigazione mobile" id={id} hidden={!open}>
        {navigation.map(({ href, label }) => <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>)}
        <TrackedLink href={withLandingUtm(LOGIN_URL, "header")} label="Accedi" section="header" onClick={closeMenu}>Accedi</TrackedLink>
        <div onClick={closeMenu}>{trial}</div>
      </nav>
    </div>
  );
}
