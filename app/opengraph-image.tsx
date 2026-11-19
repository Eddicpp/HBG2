import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { HERO_TITLE } from "@/lib/landing-copy";

export const alt = `CashKing Tesoreria per PMI — ${HERO_TITLE}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  const logo = await readFile(join(process.cwd(), "public", "logo.svg"));
  return new ImageResponse(
    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", width: "100%", height: "100%", padding: "76px 86px", backgroundColor: "#2E1065", color: "#FFFFFF" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={`data:image/svg+xml;base64,${logo.toString("base64")}`} alt="" width={72} height={72} />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <strong style={{ fontSize: 33 }}>CashKing</strong>
          <span style={{ fontSize: 21, color: "#E6DCEF" }}>Tesoreria per PMI</span>
        </div>
      </div>
      <div style={{ display: "flex", fontSize: 65, lineHeight: 1.12, letterSpacing: "-2px", marginTop: 46, maxWidth: 1010 }}>
        {HERO_TITLE}
      </div>
    </div>,
    size,
  );
}
