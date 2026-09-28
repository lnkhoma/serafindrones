# Serafin Drones: Marketing Website

The marketing site for **Serafin Drones**, an agricultural drone company based in
Lilongwe, Malawi. Built with Next.js 14 (App Router), TypeScript, Tailwind CSS
and Framer Motion. Demo and office-visit requests from the contact form are
stored in Google Sheets.

## Quick start

```bash
npm install
cp .env.local.example .env.local   # then fill in the Google Sheets values
npm run dev                        # http://localhost:3000
```

The site runs without the env vars. Only form submissions will fail, with a
friendly error message, until Google Sheets is connected.

| Script | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` / `npm start` | Production build / serve |
| `npm run lint` | ESLint (next/core-web-vitals) |
| `npm run typecheck` | TypeScript check |

## Project structure

```
app/
  layout.tsx              Fonts, metadata, Navbar + Footer shell
  page.tsx                Homepage (composes the sections below)
  contact/page.tsx        /contact: form + sidebar; reads ?type=
  api/contact/route.ts    POST: validate → append row to Google Sheets
components/
  Navbar.tsx, Footer.tsx, CTASection.tsx
  home/                   Hero, StatsBar, Services + ServiceCard, HowItWorks +
                          ProcessStep, Benefits (About), Fleet, Gallery,
                          Testimonials + TestimonialCard
  contact/                ContactForm, FormSection, DistrictSelect, Sidebar, fields
  ui/                     Photo, Logo, Reveal, SectionHeading, ButtonLink, Decor, SocialIcons
lib/
  schema.ts               Shared zod schema (client + server) + Sheets column mapping
  districts.ts            Malawi's 28 districts, grouped by region, de-duplicated
  sheets.ts               Server-only Google Sheets client
  site.ts                 Phone, email, address, hours, socials, nav links
public/
  logo.png                Brand logo (navbar + footer)
  images/                 Real photography (see docs/photos.md)
```

## Editing content

- **Contact details, address, hours, socials:** `lib/site.ts` (used by the navbar, footer and contact sidebar).
- **Section copy:** each section keeps its copy in constants at the top of its file
  (for example `SERVICES` in `components/home/Services.tsx` or `FLEET` in `components/home/Fleet.tsx`).
- **Photos:** drop files into `public/images/` using the names listed in
  [`docs/photos.md`](docs/photos.md), or change the `*_IMAGE`
  constant at the top of the component. Missing photos show a branded placeholder.
- **Logo:** `public/logo.png` (teal/green, for light backgrounds), `public/logo-light.png`
  (white/green, for the dark footer) and `app/icon.png` / `app/apple-icon.png` (drone mark
  favicons). All are transparent PNGs cropped from the master logo. Swap in new files with the same names.
- **Brand colours:** `teal-brand` (#194649) and `green-brand` (#4AA44C), sampled from the
  logo, are in `tailwind.config.ts`.
- **Typography:** the whole site uses **Inter**, a standard sans-serif, loaded in
  `app/layout.tsx` via `next/font`. Headings use bold weights; body text is regular.
  To change the heading font later, point `fontFamily.display` in `tailwind.config.ts` at a new font.

> Stats, testimonials, fleet specs, the office address and phone numbers are
> **placeholders**. Replace them with real, verified details before launch.

### Contact form deep links

Both CTA buttons link to `/contact` with a query parameter that pre-selects the request type:

- `/contact?type=farm-demo` pre-selects **Request a demo on my farm**
- `/contact?type=office-visit` pre-selects **Visit your office in Lilongwe**

---

## Connecting the Contact Form to Google Sheets

Every submission to `/api/contact` is validated against the shared zod schema
(`lib/schema.ts`) and then appended as one row to a Google Sheet using a
**service account**. Credentials come only from environment variables and are
never shipped to the browser.

### 1. Create a Google Cloud project and enable the Sheets API

1. Go to <https://console.cloud.google.com/> and create a project (e.g. `serafin-website`), or pick an existing one.
2. Open **APIs & Services → Library**, search for **Google Sheets API**, and click **Enable**.

### 2. Create a service account and key

1. Open **IAM & Admin → Service Accounts → Create service account**.
2. Give it a name (e.g. `serafin-contact-form`). You don't need to grant any project roles, so click **Done**.
3. Open the new service account, go to the **Keys** tab, and choose **Add key → Create new key → JSON**.
   A `.json` file downloads. Treat it like a password: don't commit it or email it around.
4. From that JSON file you need two values:
   - `client_email` goes into `GOOGLE_SHEETS_CLIENT_EMAIL`
   - `private_key` goes into `GOOGLE_SHEETS_PRIVATE_KEY`

### 3. Create and share the spreadsheet

1. Create a new Google Sheet (e.g. **Serafin Website Requests**).
2. Paste this header row into **row 1** of the first tab (one value per column, A → T):

   ```
   Timestamp	Request Type	Full Name	Job Title	Phone	Email	Preferred Contact Method	Farm/Org Name	District	Total Farm Size	Total Farm Size Unit	Cultivated Area	Cultivated Area Unit	Crops	Other Crop Detail	Water Source	Irrigation Type	Services Interested	Preferred Date	Notes
   ```

   The values are tab-separated, so pasting them into cell A1 fills A1:T1. The
   same list lives in `SHEET_HEADERS` in `lib/schema.ts`.
3. Click **Share** and add the service account's `client_email` as an **Editor**.
   Untick "Notify people".
4. Copy the spreadsheet ID from the URL into `GOOGLE_SHEETS_SPREADSHEET_ID`:

   ```
   https://docs.google.com/spreadsheets/d/1AbCdEfGhIjKlMnOpQrStUvWxYz0123456789/edit#gid=0
                                          └────────────── spreadsheet ID ──────────────┘
   ```

Rows go into the **first tab** of the spreadsheet. Values are written with
`valueInputOption: "RAW"`, so phone numbers like `+265…` stay as text and
nothing a visitor types can run as a spreadsheet formula.

### 4. Set the environment variables

#### Local development (`.env.local`)

```bash
cp .env.local.example .env.local
```

Then fill in the three values. The private key must stay on **one line**, in
**double quotes**, with each line break written as `\n`. That's the format it
already has inside the JSON file, so copy it as-is:

```dotenv
GOOGLE_SHEETS_CLIENT_EMAIL=serafin-contact-form@serafin-website.iam.gserviceaccount.com
GOOGLE_SHEETS_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nPASTE_YOUR_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SHEETS_SPREADSHEET_ID=1AbCdEfGhIjKlMnOpQrStUvWxYz0123456789
```

Restart `npm run dev` after editing `.env.local`.

#### Deployed environments (e.g. Vercel)

1. In your Vercel project, open **Settings → Environment Variables**.
2. Add the same three variables for **Production** (and **Preview** if you want forms to work on preview deploys).
3. For `GOOGLE_SHEETS_PRIVATE_KEY`, either format works:
   - paste the single-line value **with literal `\n`** sequences (quotes optional), or
   - paste the key **with real line breaks** (the multi-line PEM block).

   `lib/sheets.ts` converts `\n` sequences into real newlines and strips wrapping
   quotes, so both formats produce a valid key.
4. Redeploy so the new variables take effect.

Other hosts (Netlify, Render, Docker, etc.) work the same way. Set the three
variables in the host's environment settings.

### 5. Test it

1. Run `npm run dev`, open <http://localhost:3000/contact>, and submit the form.
2. A new row should appear in the sheet within a second or two.
3. If it fails, check the terminal running Next.js. The API logs the reason server-side:

| Symptom (server log) | Fix |
| --- | --- |
| `Google Sheets is not configured. Missing env: …` | A variable is missing. Check `.env.local` and restart the dev server. |
| `error:1E08010C:DECODER routines::unsupported` or `invalid_grant` | Private key is malformed. Keep the `\n` sequences and the `BEGIN`/`END` lines, and wrap it in double quotes. |
| `The caller does not have permission` (403) | Share the sheet with the service account email as **Editor**. |
| `Requested entity was not found` (404) | Wrong `GOOGLE_SHEETS_SPREADSHEET_ID`. |
| `Google Sheets API has not been used in project…` | Enable the Sheets API for the same Cloud project as the service account. |

### API responses

| Status | Body | When |
| --- | --- | --- |
| `200` | `{ "ok": true }` | Row appended |
| `400` | `{ "ok": false, "error": "…" }` | Body wasn't valid JSON |
| `422` | `{ "ok": false, "error": "…", "fieldErrors": { "email": ["…"] } }` | Failed zod validation (shown inline on the form) |
| `503` | `{ "ok": false, "error": "…" }` | Env vars not set |
| `500` | `{ "ok": false, "error": "…" }` | Google Sheets API error |

### Security notes

- Secrets are read only from `process.env`, in `lib/sheets.ts`, which is imported only by API routes. They never reach the client bundle.
- `.env.local` is git-ignored. Never commit it or the downloaded JSON key.
- The form includes a hidden honeypot field to filter basic spam bots. For
  heavier traffic, consider adding rate limiting (e.g. Vercel WAF or Upstash)
  or a CAPTCHA such as Cloudflare Turnstile.
- If a key is ever leaked, delete it in **Service Accounts → Keys** and create a new one.
