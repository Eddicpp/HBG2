# CashKing Tesoreria per PMI

Landing statica Next.js per la tesoreria previsionale. L’unica pagina pubblica è `/`.

## Avvio locale

Con Node.js 22 o successivo:

```sh
npm ci
npm run dev
```

Apri `http://localhost:3000`. Per verificare la versione di produzione, esegui `npm run build` e poi `npm start`.

Le anteprime nelle Funzioni cambiano con la voce selezionata su desktop; sugli schermi più stretti sono mostrate sotto ciascuna voce. Importi, date e controparti nei mockup sono fittizi.

## Pubblicazione su Vercel

Carica il progetto in un repository GitHub e importalo su Vercel con il preset **Next.js**. Mantieni il comando di build predefinito (`npm run build`): la route `/` è prerenderizzata. Non occorrono variabili d’ambiente.

Prima di pubblicare, imposta gli URL di prova, demo e accesso in [`lib/config.ts`](./lib/config.ts), sostituisci i link legali provvisori e completa i segnaposto tra parentesi quadre. Il bollino «Più scelto» è in attesa di conferma; non pubblicarlo come affermazione senza un riscontro.
