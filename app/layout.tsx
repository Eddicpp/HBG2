import type { Metadata } from "next";
import { DM_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-dm-sans",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  variable: "--font-instrument-serif",
});

const title = "CashKing – Tesoreria previsionale per PMI";
const description =
  "Prevedi la cassa delle prossime 8 settimane, tieni sotto controllo incassi e pagamenti e collabora con il commercialista. Prova gratis per 30 giorni.";

export const metadata: Metadata = {
  title,
  description,
  openGraph: { title, description, locale: "it_IT", type: "website", siteName: "CashKing Tesoreria per PMI" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${dmSans.variable} ${instrumentSerif.variable}`}>
      <body>{children}</body>
    </html>
  );
}
