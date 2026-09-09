import { stats } from "../data/content";
import "./StatsBand.css";

export default function StatsBand() {
  return (
    <div className="stats-band">
      {stats.map((s, i) => (
        <div className="stats-item" key={s.label}>
          <div className="stats-value">{s.value}</div>
          <div className="stats-label">{s.label}</div>
        </div>
      ))}
    </div>
  );
}
