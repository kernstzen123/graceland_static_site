import { stats } from "../data/content";
import LiquidBackdrop from "./LiquidBackdrop";
import "./StatsBand.css";

export default function StatsBand() {
  return (
    <div className="stats-band has-liquid">
      <LiquidBackdrop palette="pine" bubbles={false} />
      {stats.map((s, i) => (
        <div className="stats-item" key={s.label}>
          <div className="stats-value">{s.value}</div>
          <div className="stats-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
