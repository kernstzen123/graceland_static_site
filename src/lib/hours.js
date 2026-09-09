// Derives "today's hours" from the real day-visitor hours table, so the
// homepage never carries a stale hardcoded day/time.
//
// Source hours (see data/content.js `dayVisitorHours`):
//   Tue–Fri 10h00–16h00 · Sat 09h00–17h00 · Sun (Oct–Apr) 10h00–17h00
//   Mon 10h00–16h00, government school holidays only
//
// Gates-close / last-slide times aren't separately specified per day in the
// brief — the one example given (Wed, 10h00–16h00 → gates close 15h30, last
// slide 15h45) is 30 / 15 minutes before closing, so that rule is applied
// generically to whatever the closing time is.

const DAY_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function formatSA(totalMinutes) {
  const h = Math.floor(totalMinutes / 60);
  const m = totalMinutes % 60;
  return `${String(h).padStart(2, "0")}h${String(m).padStart(2, "0")}`;
}

function parseRange(str) {
  const m = str.match(/(\d{1,2})h(\d{2})[–-](\d{1,2})h(\d{2})/);
  if (!m) return null;
  return {
    openMin: Number(m[1]) * 60 + Number(m[2]),
    closeMin: Number(m[3]) * 60 + Number(m[4]),
  };
}

function isOctToApr(date) {
  const month = date.getMonth(); // 0 = Jan
  return month >= 9 || month <= 3; // Oct(9)..Dec(11), Jan(0)..Apr(3)
}

export function getTodayHours(date = new Date()) {
  const day = date.getDay(); // 0 Sun .. 6 Sat
  const dayName = DAY_NAMES[day];
  let hours = null;
  let note = null;

  if (day === 0) {
    if (isOctToApr(date)) {
      hours = "10h00–17h00";
    } else {
      note = "Sunday hours run October–April. Call to confirm today's hours.";
    }
  } else if (day === 1) {
    hours = "10h00–16h00";
    note = "Government school holidays only — call to confirm.";
  } else if (day >= 2 && day <= 5) {
    hours = "10h00–16h00";
  } else if (day === 6) {
    hours = "09h00–17h00";
  }

  const range = hours ? parseRange(hours) : null;
  const gatesClose = range ? formatSA(range.closeMin - 30) : null;
  const lastSlide = range ? formatSA(range.closeMin - 15) : null;

  return { dayName, hours, note, gatesClose, lastSlide, isOpenDay: !!hours };
}
