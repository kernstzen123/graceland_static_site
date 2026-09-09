import "./RulesList.css";

const ICON = { yes: "✔", no: "✕", warn: "!" };

export default function RulesList({ rules }) {
  return (
    <div className="rules-list">
      {rules.map((rule, i) => (
        <div className="rules-row" key={i}>
          <div className={`rules-icon rules-icon--${rule.tone}`}>{ICON[rule.tone]}</div>
          <div>{rule.text}</div>
        </div>
      ))}
    </div>
  );
}
