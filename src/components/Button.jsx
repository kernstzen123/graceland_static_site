import "./Button.css";

/**
 * Shared pill button. `variant`: primary | booknow | secondary | ghost.
 * `size`: sm | md (default) | lg | hero.
 * Renders an <a> when `href`/`to` is given, else a <button>.
 */
export default function Button({
  variant = "primary",
  size = "md",
  href,
  arrow = false,
  className = "",
  children,
  ...rest
}) {
  const classes = [
    "btn",
    `btn-${variant}`,
    size !== "md" ? `btn-${size}` : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const content = (
    <>
      {children}
      {arrow ? " →" : ""}
    </>
  );

  if (href) {
    return (
      <a className={classes} href={href} {...rest}>
        {content}
      </a>
    );
  }
  return (
    <button className={classes} {...rest}>
      {content}
    </button>
  );
}
