import Button from "./Button";
import { contact } from "../data/content";

/**
 * The one CTA that must be the loudest thing on every screen.
 * Links to the external booking portal.
 */
export default function BookNowButton({ size = "md", variant = "booknow", className = "" }) {
  return (
    <Button
      href={contact.bookingHref}
      target="_blank"
      rel="noopener noreferrer"
      variant={variant}
      size={size}
      arrow
      className={className}
      aria-label={`Book now on our online portal`}
    >
      Book Now
    </Button>
  );
}
