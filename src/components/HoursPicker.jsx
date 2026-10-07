import { useState } from "react";
import { getTodayHours } from "../lib/hours";
import { dayVisitorHours } from "../data/content";
import "./HoursPicker.css";

const DAYS = [1, 2, 3, 4, 5, 6, 0]; // Mon → Sun
const SHORT = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function dateForWeekday(target, now = new Date()) {
  const d = new Date(now);
  d.setDate(now.getDate() + ((target - now.getDay() + 7) % 7));
  return d;
}

/** "Can we swim on…?" — pick a day this week and see its gate times. */
export default function HoursPicker() {
  const today = new Date().getDay();
  const [day, setDay] = useState(today);
  const info = getTodayHours(dateForWeekday(day));
  const holidays = dayVisitorHours.find((r) => /school holidays/i.test(r.day));

  return (
    <div className="hours-picker">
      <div className="hours-picker-days" role="radiogroup" aria-label="Pick a day">
        {DAYS.map((d) => (
          <button
            key={d}
            type="button"
            role="radio"
            aria-checked={day === d}
            className={"hours-day-btn" + (day === d ? " is-on" : "")}
            onClick={() => setDay(d)}
          >
            {SHORT[d]}
            {d === today && <span className="hours-day-today">today</span>}
          </button>
        ))}
      </div>

      <div className="hours-picker-panel" key={day} aria-live="polite">
        <div className="hours-picker-day">{d2label(day, today, info.dayName)}</div>
        {info.isOpenDay ? (
          <>
            <div className="hours-picker-time">{info.hours.replace("–", " – ")}</div>
            <div className="hours-picker-notes">
              <span>Gates close {info.gatesClose}</span>
              <span>Last slide {info.lastSlide}</span>
            </div>
            {info.note && <p className="hours-picker-note">{info.note}</p>}
          </>
        ) : (
          <>
            <div className="hours-picker-time hours-picker-time--closed">Phone first</div>
            <p className="hours-picker-note">{info.note}</p>
          </>
        )}
      </div>
      {holidays && (
        <p className="hours-picker-holidays">
          <strong>{holidays.day}:</strong> {holidays.hours}.
        </p>
      )}
    </div>
  );
}

function d2label(day, today, name) {
  if (day === today) return `Today, ${name}`;
  if (day === (today + 1) % 7) return `Tomorrow, ${name}`;
  return name;
}
