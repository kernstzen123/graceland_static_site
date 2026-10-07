import { useEffect, useRef, useState } from "react";
import { ratesWet, ratesDry } from "../data/content";
import { gsap, prefersReducedMotion } from "../lib/motion";
import BookNowButton from "./BookNowButton";
import "./DayPlanner.css";

const PLANS = [
  { key: "wet", label: "Water + slides", rates: ratesWet },
  { key: "dry", label: "Dry villages only", rates: ratesDry },
];

const priceOf = (p) => (/free/i.test(p) ? 0 : Number(p.replace(/[^\d]/g, "")));
const rand = (n) => "R" + Math.round(n).toLocaleString("en-ZA").replace(/[,  ]/g, " ");

/** Add who's coming, see what the day costs — straight from the rate card. */
export default function DayPlanner() {
  const [plan, setPlan] = useState("wet");
  const [counts, setCounts] = useState({ Adults: 2, "Children 3–17": 2 });
  const totalRef = useRef(null);
  const shown = useRef(0);

  const rates = PLANS.find((p) => p.key === plan).rates;
  const total = rates.rows.reduce((sum, r) => sum + (counts[r.label] || 0) * priceOf(r.price), 0);
  const people = Object.values(counts).reduce((a, b) => a + b, 0);

  useEffect(() => {
    const el = totalRef.current;
    if (!el) return;
    if (prefersReducedMotion()) {
      el.textContent = rand(total);
      shown.current = total;
      return;
    }
    const o = { v: shown.current };
    const tw = gsap.to(o, {
      v: total,
      duration: 0.7,
      ease: "power3.out",
      onUpdate: () => (el.textContent = rand(o.v)),
      onComplete: () => (shown.current = total),
    });
    gsap.fromTo(el, { scale: 1.12, rotate: -3 }, { scale: 1, rotate: 0, duration: 0.6, ease: "elastic.out(1, 0.45)" });
    return () => {
      shown.current = o.v;
      tw.kill();
    };
  }, [total]);

  const bump = (label, d) =>
    setCounts((c) => ({ ...c, [label]: Math.max(0, Math.min(40, (c[label] || 0) + d)) }));

  return (
    <div className="planner-card">
      <div className="planner-toggle" role="radiogroup" aria-label="Type of ticket">
        {PLANS.map((p) => (
          <button
            key={p.key}
            type="button"
            role="radio"
            aria-checked={plan === p.key}
            className={"planner-toggle-btn" + (plan === p.key ? " is-on" : "")}
            onClick={() => setPlan(p.key)}
          >
            {p.label}
          </button>
        ))}
      </div>
      <p className="planner-includes">{rates.subtitle}</p>

      <ul className="planner-rows">
        {rates.rows.map((r) => {
          const n = counts[r.label] || 0;
          return (
            <li className="planner-row" key={r.label}>
              <div>
                <div className="planner-who">{r.label}</div>
                <div className="planner-each">{r.free ? "Free" : `${r.price} each`}</div>
              </div>
              <div className="planner-stepper">
                <button type="button" onClick={() => bump(r.label, -1)} disabled={n === 0} aria-label={`One fewer: ${r.label}`}>
                  −
                </button>
                <output aria-live="polite" aria-label={`${r.label}: ${n}`}>{n}</output>
                <button type="button" onClick={() => bump(r.label, 1)} aria-label={`One more: ${r.label}`}>
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="planner-total">
        <div>
          <div className="planner-total-label">
            {people === 1 ? "1 person" : `${people} people`} · entry total
          </div>
          <div className="planner-total-value" ref={totalRef} aria-live="polite">
            {rand(total)}
          </div>
        </div>
        <BookNowButton size="md" />
      </div>
      <p className="planner-fine">Gate prices from the current rate card. Huts and tables are booked separately.</p>
    </div>
  );
}
