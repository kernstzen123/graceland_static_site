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

## Design: "Pool day"

The site is designed as the swimming pool itself.

- **Palette** (`src/styles/tokens.css`): foam white `#f3fbff`, pool blue
  `#27c1ee`, deep-end navy `#07305a`, lilo pink `#ff5c8a` (every Book Now)
  and lemon `#ffe14d`.
- **Type**: Bagel Fat One for headlines (inflatable-looking letters),
  Bricolage Grotesque for text, DM Mono for times, prices and labels.
- **Pool vernacular as structure**: section labels are painted pool-wall
  signs, sections meet at a soft drifting water line (`WaterEdge.jsx`), prices are
  gate tickets with a tear line, rules are round poolside signs, and pool
  sections use plain pool blue or deep-end navy (`.bg-pool`, `.bg-deep`).

### Interactive pieces

- **The splashable pool** (`PoolSurface.jsx`): the Home hero and every
  page's closing section. A small wave-equation simulation holds the water
  surface and a WebGL shader draws the water (refraction,
  sunlight caustics, glints). On Home the water sits over a real photo of
  the pool (`beach-rock-pool.jpg`). Click or tap to splash;
  the headline letters float on the water and rock on the waves.
- **Day planner** (`DayPlanner.jsx`): add who's coming, switch between a
  water day and the dry villages, and see the gate total from the real
  rate card.
- **"Can we swim on…"** (`HoursPicker.jsx`): pick a weekday to see its gate
  times, worked out by `lib/hours.js`.
- **Photo deck** (Gallery): with a mouse you can pick photos up, drag them
  around and tidy them back.
- Smaller touches: jelly-wobble buttons that squish when pressed, a depth
  gauge that fills as you scroll (desktop), bubbles off the pointer over
  water, and a pool-noodle marquee.

### Motion system

- **Smooth scroll — [Lenis](https://lenis.dev)**, synced to GSAP
  ScrollTrigger (`src/lib/motion.js`).
- **Scroll choreography** (`src/lib/pageAnimations.js`): letter-by-letter
  headline reveals (`SplitText.jsx`), staggered cards and rows, image
  curtain reveals with parallax, count-up numbers.
- Inner-page hero photos ripple under the cursor (`ShaderCanvas.jsx`).
- A once-per-session "filling the pool" intro and a pool-blue curtain on
  route changes.
- **Reduced motion** is respected everywhere: no smooth scroll, intro or
  reveals, and the pool renders as a still frame.

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
