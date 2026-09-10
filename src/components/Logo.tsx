import logoWhite from "@/imports/mrx-logo-white.png";
import logoColor from "@/imports/mrx-logo-color.png";

type LogoProps = {
  className?: string;
  /** "light" = white knockout for dark backgrounds; "color" = original black + red slash. */
  tone?: "light" | "color";
};

/** Official MRX Sports & Nutrition wordmark. */
export function Logo({ className = "h-8", tone = "light" }: LogoProps) {
  return (
    <img
      src={tone === "light" ? logoWhite : logoColor}
      alt="MRX Sports & Nutrition"
      className={`w-auto object-contain ${className}`}
    />
  );
}
