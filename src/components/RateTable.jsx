import "./RateTable.css";

/** headTone: "teal" | "tan" — matches the two rate cards in the design. */
export default function RateTable({ title, subtitle, rows, headTone = "teal" }) {
  return (
    <div className="rate-table">
      <div className={`rate-table-head rate-table-head--${headTone}`}>
        <div className="rate-table-title">{title.toUpperCase()}</div>
        <div className="rate-table-subtitle">{subtitle}</div>
      </div>
      <div className="rate-table-rows">
        {rows.map((row) => (
          <div className="rate-table-row" key={row.label}>
            <div>{row.label}</div>
            <div
              className={
                "rate-table-price" + (row.free ? " rate-table-price--free" : "")
              }
            >
              {row.price}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
