import "./HoursList.css";

export default function HoursList({ rows, closedNote }) {
  return (
    <div className="hours-list">
      {rows.map((row) => (
        <div className="hours-row" key={row.day}>
          <div className="hours-day">{row.day}</div>
          <div className="hours-time">{row.hours}</div>
        </div>
      ))}
      {closedNote && <div className="hours-closed-note">{closedNote}</div>}
    </div>
  );
}
