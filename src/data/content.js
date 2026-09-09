// Single source of truth for real venue content (per the brief — no invented facts).

export const contact = {
  email: "conny@gracelandvenues.co.za",
  phone: "072 264 4009",
  phoneHref: "tel:+27722644009",
  bookingHref: "https://droplet-headless-karaoke.ngrok-free.dev/",
  address: ["Lustigan Road", "Paarl, Western Cape"],
  officeHours: "Mon–Fri 09h00–16h30",
};

export const nav = [
  { label: "Water Park", to: "/water-park" },
  { label: "Parties", to: "/parties" },
  { label: "Weddings", to: "/weddings" },
  { label: "Visit", to: "/visit" },
];

export const dayVisitorHours = [
  { day: "Tuesday – Friday", hours: "10h00 – 16h00" },
  { day: "Saturday", hours: "9h00 – 17h00" },
  { day: "Sunday and Public Holidays", hours: "10h00 – 17h00 (open Oct – end April, excluding Easter weekend and Christmas day. Open April and September government school holidays.)" },
  { day: "Monday", hours: "Closed school term, open school holidays" },
  { day: "School holidays", hours: "Open daily, closed Christmas day and Easter weekend" },
];

export const partyHours = [
  { day: "Tue–Fri", hours: "14h30–16h30" },
  { day: "Saturday", hours: "09h00–11h00 · 11h30–13h30 · 14h00–16h00" },
  { day: "Sun & public holidays (Oct–Apr)", hours: "10h00–12h00 · 12h30–14h30" },
];

export const closedNote = "Pools close 15 minutes before closing time. Closed Christmas Day and Easter weekend.";

export const ratesWet = {
  title: "Including water",
  subtitle:
    "4 waterslides · rock, bath & beach pools · splash pad · both villages",
  rows: [
    { label: "Children under 1", price: "Free", free: true },
    { label: "Toddlers 1 & 2", price: "R110" },
    { label: "Children 3–17", price: "R210" },
    { label: "Adults", price: "R230" },
    { label: "Pensioners", price: "R210" },
  ],
};

export const ratesDry = {
  title: "Dry activities only",
  subtitle: "Kingdom Village and Fantasy Village only",
  rows: [
    { label: "Children under 1", price: "Free", free: true },
    { label: "Toddlers 1 & 2", price: "Free", free: true },
    { label: "Children 3–17", price: "R100" },
    { label: "Adults", price: "R120" },
    { label: "Pensioners", price: "R100" },
  ],
};

export const rules = [
  { tone: "yes", text: "Picnic baskets welcome." },
  { tone: "no", text: "No alcohol, music, braais, gas, glass or hookah pipes." },
  { tone: "warn", text: "Children must be supervised by an adult at all times." },
  { tone: "warn", text: "Equipment used entirely at your own risk." },
  { tone: "warn", text: "Please obey the lifeguards." },
  { tone: "yes", text: "Suitable swimwear required." },
  { tone: "yes", text: "Right of admission reserved." },
];

export const attractions = [
  {
    number: "01",
    title: "Four waterslides",
    body: "The big ones. Obey the lifeguards, wait your turn at the top, and go. Suitable swimwear required.",
    image: "/assets/waterslide.jpg",
    alt: "Waterslide",
    bg: "teal",
    imageFirst: false,
  },
  {
    number: "02",
    title: "Rock pool & beach pool",
    body: "Shallow shelving into the beach pool for the little ones, the rock pool deeper and cooler under the trees.",
    image: "/assets/beach-rock-pool.jpg",
    alt: "Rock and beach pool",
    bg: "yellow",
    imageFirst: true,
  },
  {
    number: "03",
    title: "Bath pool & splash pad",
    body: "Warm, shallow and slow. The toddler splash pad has its own miniature boat slide. Children must be supervised at all times.",
    image: "/assets/toddler-boat.jpg",
    alt: "Toddler boat slide",
    bg: "tangerine",
    imageFirst: false,
  },
  {
    number: "04",
    title: "The dry villages",
    body: "Fantasy Village for ages 1–6, Kingdom Village for 1–10, and the gladiator obstacle jumping castle. Picnic lawns all around.",
    image: "/assets/park.jpg",
    alt: "Play villages",
    bg: "tan",
    imageFirst: true,
  },
];

export const weddingRates = {
  period: "1 Sept 2025 – 31 Aug 2026",
  reception: { price: "R210", unit: "per person", minimum: "Minimum spend R10 500." },
  ceremony: { price: "R50", unit: "per person", minimum: "Minimum spend R4 000." },
  extras: [
    { value: "R4 000", label: "Refundable damage deposit." },
    { value: "50%", label: "Deposit secures the booking." },
    { value: "No corkage", label: "No in-house catering. Bring your own beverages." },
  ],
  capacity: [
    { value: "180", label: "Venue Hall seated · 150 with a dance floor" },
    { value: "60", label: "Lapa seated" },
  ],
};

export const marqueeItems = [
  "4 waterslides",
  "Rock pool",
  "Beach pool",
  "Bath pool",
  "Toddler splash pad",
  "Kingdom Village",
  "Fantasy Village",
  "Gladiator castle",
];

export const stats = [
  { value: "4", label: "Waterslides" },
  { value: "200", label: "Guests" },
  { value: "2012", label: "Family-owned since" },
];

export const story =
  "A serene sanctuary with a lush garden sprinkled with mystical rocks, handpicked by the owner herself. Family-owned since 2012, expanded in 2014 to add wedding, corporate and private venue facilities.";

// Approximate — Lustigan Road, Paarl. The venue's own site was unreachable
// from this environment to confirm an exact pin; centred on a confirmed
// Lustigan Road address (Avondale Wine Estate) as the closest verifiable
// anchor. Swap for the exact coordinates when confirmed.
export const mapCenter = { lat: -33.7655, lng: 19.0013 };

export const partyPackages = {
  title: "Party Packages (1-17 years)",
  subtitle: "Valid 1 Sept 2026 – 31 Aug 2027. Min 10 children.",
  rows: [
    { label: "Package 1", price: "R200", unit: "per child" },
    { label: "Package 2 (incl. hotdog)", price: "R225", unit: "per child" },
    { label: "Party Packs (optional)", price: "R50", unit: "per pack" },
  ],
};

export const partyAddons = {
  title: "Additional Guests",
  subtitle: "Summer months (Sept–April) water activities are R180/adult and R200/child.",
  rows: [
    { label: "Adults (Dry)", price: "R80", unit: "per adult" },
    { label: "Additional Children (Dry)", price: "R100", unit: "per child" },
    { label: "Adults (Wet)", price: "R180", unit: "per adult" },
    { label: "Additional Children (Wet)", price: "R200", unit: "per child" },
  ],
};

export const seatingOptions = {
  title: "Optional Seating",
  subtitle: "Available to book for your visit.",
  rows: [
    { label: "Hut (seats 14–16)", price: "R400", unit: "per hut" },
    { label: "Table on grass with umbrella (seats 6)", price: "R250", unit: "per table" },
  ],
};

export const partyIncludes = [
  "Unlimited rides on 4 waterslides (open Sept – end April)",
  "Unlimited access to rock pool & bath pool",
  "Toddler splash pad access (1–6 years)",
  "Fantasy Village access (1–6 years)",
  "Kingdom Village access (1–10 years)",
  "Free party hut with 2 annexed tables (4m x 1m) and seating",
];

export const partyRules = [
  { tone: "yes", text: "Welcome to bring your own cake, food, soft drinks & tablecloths." },
  { tone: "no", text: "No alcohol, braais/gas, music, pets, or glassware." },
  { tone: "warn", text: "Bring your own cutlery, crockery, side plates and cake knife." },
  { tone: "warn", text: "Please arrive only 10 minutes prior and leave 10 minutes after your slot." },
  { tone: "warn", text: "Adults to refrain from kiddie playpark activities." },
  { tone: "yes", text: "Platters available for pre-order (5 days prior)." },
  { tone: "warn", text: "Confirm guest numbers 4 days prior to the function." },
];
