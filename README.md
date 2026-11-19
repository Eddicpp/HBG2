# CashKing Tesoreria per PMI

Landing statica Next.js per la tesoreria previsionale. L’unica pagina pubblica è `/`.

## Avvio locale

Con Node.js 22 o successivo:

```sh
npm ci
npm run dev
```

Apri `http://localhost:3000`. Per verificare la versione di produzione, esegui `npm run build` e poi `npm start`.

Le anteprime nelle Funzioni cambiano con la voce selezionata su desktop; sugli schermi più stretti si aprono sotto la relativa descrizione con il controllo «Anteprima». Importi, date e controparti nei mockup sono fittizi.

## Pubblicazione su Vercel

Carica il progetto in un repository GitHub e importalo su Vercel con il preset **Next.js**. Mantieni il comando di build predefinito (`npm run build`): la route `/` è prerenderizzata. Non occorrono variabili d’ambiente.

Il file [`vercel.json`](./vercel.json) imposta il preset Next.js. In **Settings → Build and Deployment** lascia **Output Directory** senza override e verifica che **Root Directory** punti alla cartella con `package.json` e `vercel.json`. Se un deploy cerca una cartella `public` (`STATIC_BUILD_NO_OUT_DIR`), rimuovi l’eventuale override e avvia un nuovo deploy del commit che contiene `vercel.json`. Non serve creare `public` né caricare i file della build su GitHub.

### Contatti, CTA e misurazione

Imposta le variabili in **Vercel → Settings → Environment Variables** e avvia un nuovo deploy:

- `NEXT_PUBLIC_TRIAL_URL`, `NEXT_PUBLIC_DEMO_URL`, `NEXT_PUBLIC_LOGIN_URL`: destinazioni HTTP(S) assolute facoltative. Senza impostazioni, le CTA puntano al modulo `#demo`. I link esterni ricevono `utm_source=landing` e `utm_content` con l’ID della sezione.
- `NEXT_PUBLIC_PRIVACY_URL`: URL dell’informativa pubblica. Configuralo prima di raccogliere contatti reali.
- `LEAD_WEBHOOK_URL`: endpoint HTTPS privato che riceve JSON via `POST`. Tienilo lato server, senza prefisso `NEXT_PUBLIC_`. Attivalo dopo aver pubblicato l’informativa e verificato chi riceve e gestisce i contatti.
- `NEXT_PUBLIC_SHOW_PLACEHOLDERS=true`: riattiva i contenuti da confermare, ad esempio in un deploy di anteprima. È spento per impostazione predefinita.

Il webhook riceve `source` (`demo` o `ocr_waitlist`), `email`, `privacyAccepted` e `submittedAt` in ISO 8601. Per `demo` riceve anche `name`, `employees` e `cashManagement`. Con un webhook configurato, la conferma appare solo dopo una risposta HTTP 2xx. Senza webhook, in locale il form scrive il lead in console per lo sviluppo; su Vercel scrive solo il tipo di richiesta senza dati personali e non conferma la presa in carico.

Abilita **Web Analytics** per il progetto Vercel e verifica che il piano supporti gli eventi personalizzati. Nel deploy, prova una CTA, una FAQ, il simulatore e un invio riuscito per ciascun modulo. Gli eventi attesi sono `cta_click`, `faq_open`, `simulator_used`, `demo_submit` e `waitlist_submit`. Gli eventi non contengono i dati inseriti nei form né i saldi del simulatore.
