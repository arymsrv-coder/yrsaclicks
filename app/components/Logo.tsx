"use client";

import { asset } from "../lib/asset";

/** Intrinsic proportions of the trimmed mark. */
export const LOGO_RATIO = "1200 / 308";

/**
 * Derived from `logo/logo2.png`, which arrives as a 2000×2000 canvas that is
 * 92% empty and carries a drop shadow. Both had to go: the empty margins would
 * make the element mostly dead space, and a drop shadow inside an alpha mask is
 * not a shadow — it paints as a second, softer copy of the mark in the same flat
 * colour. The source is trimmed to the letters and the ~150-alpha shadow band
 * removed, keeping the edge antialiasing above it.
 */
const LOGO_SRC = asset("/media/logo-yrsa2.png");

/**
 * How the mark is painted inside its mask.
 *
 * `fill` is flat `currentColor` — the mark as a colour, taking whatever it
 * inherits. `invert` gives it no colour at all: the letters are a window onto
 * the page behind, turned inside out, so the mark is always the opposite of
 * whatever it is sitting on. See `.logo-invert` in globals.css for the paint
 * and for what happens on browsers that cannot do it.
 */
export type LogoVariant = "fill" | "invert";

/**
 * The YRSA mark, drawn as a mask rather than an image.
 *
 * The artwork is a single-colour wordmark, so painting it through a mask lets
 * it sit on the ink field, on the paper field and over footage without needing
 * a separate asset for each.
 *
 * The mask itself is written inline because the URL is built at runtime by
 * `asset()`. Everything about the *paint* lives in a class instead — a
 * `@supports` rule has to be able to override it, and it cannot override an
 * inline style.
 *
 * Give it a width; the aspect ratio supplies the height.
 */
/** The mask, which is the same for every layer that draws the letterforms. */
const MASK: React.CSSProperties = {
  maskImage: `url(${LOGO_SRC})`,
  maskSize: "contain",
  maskRepeat: "no-repeat",
  maskPosition: "center",
  WebkitMaskImage: `url(${LOGO_SRC})`,
  WebkitMaskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
};

export default function Logo({
  className = "",
  label,
  variant = "fill",
}: {
  className?: string;
  /** Omit on decorative uses — a nearby link or heading already names it. */
  label?: string;
  variant?: LogoVariant;
}) {
  const a11y = {
    role: label ? "img" : "presentation",
    "aria-label": label,
    "aria-hidden": label ? undefined : true,
  } as const;

  return (
    <span
      {...a11y}
      className={`${variant === "invert" ? "logo-invert" : "logo-fill"} ${className}`}
      style={{ display: "block", aspectRatio: LOGO_RATIO, ...MASK }}
    />
  );
}
