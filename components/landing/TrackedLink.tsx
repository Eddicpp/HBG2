"use client";

import { track } from "@vercel/analytics";
import type { ComponentProps } from "react";
import { Accordion } from "@/components/ui/accordion";

type Props = ComponentProps<"a"> & { label: string; section: string };

export function TrackedLink({ label, section, onClick, onAuxClick, ...props }: Props) {
  return <a {...props} onClick={(event) => {
    track("cta_click", { label, section });
    onClick?.(event);
  }} onAuxClick={(event) => {
    if (event.button === 1) track("cta_click", { label, section });
    onAuxClick?.(event);
  }} />;
}

export function TrackedFaq({ children }: { children: React.ReactNode }) {
  return <Accordion type="single" collapsible onValueChange={(question) => {
    if (question) track("faq_open", { question });
  }}>{children}</Accordion>;
}
