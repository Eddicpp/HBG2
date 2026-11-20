"use client";

import Image from "next/image";
import { useState, useSyncExternalStore } from "react";

const directory = "/video";
const poster = `${directory}/poster-mobile.jpg`;
const label = "Video: come CashKing usa un assistente AI esterno solo sulle fatture dubbie";
const mobileQuery = "(width < 768px)";
const motionQuery = "(prefers-reduced-motion: reduce)";

function subscribe(onChange: () => void) {
  const queries = [window.matchMedia(mobileQuery), window.matchMedia(motionQuery)];
  queries.forEach((query) => query.addEventListener("change", onChange));
  return () => queries.forEach((query) => query.removeEventListener("change", onChange));
}

function getSnapshot() {
  const mobile = window.matchMedia(mobileQuery).matches;
  const reduced = window.matchMedia(motionQuery).matches;
  return mobile ? (reduced ? "mobile-reduced" : "mobile") : (reduced ? "desktop-reduced" : "desktop");
}

export default function CashKingExplainer() {
  const mode = useSyncExternalStore(subscribe, getSnapshot, () => null);
  const [manualPlay, setManualPlay] = useState(false);
  const mobile = mode?.startsWith("mobile");
  const reduced = mode?.endsWith("-reduced");

  return (
    <div className="invoice-scene explainer-frame">
      {mode === null || (reduced && !manualPlay) ? (
        <>
          <Image src={poster} alt={label} fill unoptimized />
          {reduced && <button className="button button-primary explainer-play" type="button" onClick={() => setManualPlay(true)}>Guarda il video</button>}
        </>
      ) : (
        <video key={mode} autoPlay muted loop playsInline preload="metadata" poster={poster} controls aria-label={label}>
          {!mobile && <source src={`${directory}/cashking-api-explainer.webm`} type="video/webm" />}
          <source src={`${directory}/${mobile ? "cashking-api-explainer-mobile.mp4" : "cashking-api-explainer.mp4"}`} type="video/mp4" />
          <track kind="captions" src={`${directory}/cashking-api-explainer.it.vtt`} srcLang="it" label="Italiano" />
        </video>
      )}
    </div>
  );
}
