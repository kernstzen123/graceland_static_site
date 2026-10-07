import { Children, Fragment, cloneElement, isValidElement } from "react";

/**
 * Splits text children into masked words + characters in React itself (no
 * DOM surgery behind React's back), so GSAP can stagger them in. <br />s and
 * nested elements are preserved. The original string stays readable to
 * assistive tech via aria-label on the wrapper.
 */
function textOf(node) {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(textOf).join("");
  if (isValidElement(node)) {
    if (node.type === "br") return " ";
    return textOf(node.props.children);
  }
  return "";
}

function splitNode(node, keyPrefix) {
  if (typeof node === "string" || typeof node === "number") {
    const words = String(node).split(/(\s+)/);
    return words.map((w, i) => {
      if (!w) return null;
      if (/^\s+$/.test(w)) return " ";
      return (
        <span className="split-word" key={`${keyPrefix}-${i}`} aria-hidden="true">
          <span className="split-word-inner">
            {[...w].map((ch, j) => (
              <span className="split-char" key={j}>
                {ch}
              </span>
            ))}
          </span>
        </span>
      );
    });
  }
  if (Array.isArray(node)) {
    return node.map((n, i) => <Fragment key={`${keyPrefix}.${i}`}>{splitNode(n, `${keyPrefix}.${i}`)}</Fragment>);
  }
  if (isValidElement(node)) {
    if (node.type === "br" || node.props.children == null) return node;
    return cloneElement(node, {}, splitNode(node.props.children, keyPrefix));
  }
  return node;
}

export default function SplitText({ as: Tag = "h2", children, split = "scroll", ...rest }) {
  const label = textOf(Children.toArray(children)).replace(/\s+/g, " ").trim();
  return (
    <Tag data-split={split} aria-label={label} {...rest}>
      {splitNode(Children.toArray(children), "s")}
    </Tag>
  );
}
