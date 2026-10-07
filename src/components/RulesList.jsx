import "./RulesList.css";

const ICON = { yes: "✓", no: "✕", warn: "!" };
const LABEL = { yes: "Allowed", no: "Not allowed", warn: "Please note" };

/** Rules as round pool-side signs: green go, red no, yellow heads-up. */
export default function RulesList({ rules }) {
  return (
    <ul className="rules-list">
      {rules.map((rule, i) => (
        <li className="rules-row" key={i}>
          <span className={`rules-icon rules-icon--${rule.tone}`} role="img" aria-label={LABEL[rule.tone]}>
            {ICON[rule.tone]}
          </span>
          <span>{rule.text}</span>
        </li>
      ))}
    </ul>
  );
}
