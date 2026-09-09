# Graceland Venues — site

A production React implementation of `project/Graceland Screens.dc.html`
(Claude Design export, direction 1a "Sun-bleached Poolside") — the Home,
Water Park, Weddings and Visit pages, plus the shared component library
(buttons, nav, mobile overlay, rate tables, gallery, footer, wave dividers).

## Run it

```sh
npm install
npm run dev       # dev server
npm run build     # production build to dist/
npm run preview   # serve the production build locally
```

## Structure

- `src/data/content.js` — every real fact from the brief (rates, hours,
  contact, copy) in one place. Nothing here is invented.
- `src/lib/hours.js` — computes "today's hours" from the real hours table
  instead of hardcoding a day, so the Home page never goes stale.
- `src/components/` — the design's component sheet, built as real
  components: `Button`/`BookNowButton`, `Nav` + `MobileNavOverlay`,
  `WaveDivider` (the three-amplitude authored SVG wave family), `Hero`,
  `RateTable`, `HoursList`, `RulesList`, `AttractionRow`, `GalleryGrid`,
  `StatsBand`, `Marquee`, `Footer`, `StickyBookNow`, `WeatherWidget`.
- `src/pages/` — Home, WaterPark, Parties, Weddings, Visit, Gallery, PrivacyPolicy, Terms.

## Decisions worth knowing about

- **Book Now everywhere.** The brief's explicit rule is that Book Now is
  the loudest element on *every* screen (header, hero, page bottom, mobile
  pill). The design export's Weddings hero (2c) didn't actually include one
  — the source chat transcript cuts off mid "Found issues — fixing…", so
  this was likely a known bug in flight. I added it to match the stated
  rule rather than reproduce the gap.
- **Book Now's destination.** All "Book Now" buttons point securely to the external headless booking portal. The URL is centralized in `src/data/content.js`.
- **Visit page map.** Uses the official Graceland Venues Google Maps embed.
- **Live Weather Widget.** The homepage features a live weather widget for Paarl, fetching data dynamically via the free, keyless Open-Meteo API.
- **"Today's hours" is computed, not hardcoded** — see `lib/hours.js`.
  Gates-close/last-slide times are derived generically (30/15 min before
  closing) from the one example the brief gave, since no other day's
  gate-close time was specified.
