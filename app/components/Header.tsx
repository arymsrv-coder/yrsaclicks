"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "./Logo";
import { EASE } from "../lib/motion";

/**
 * The mark, centred at the top, with one quiet link under it.
 *
 * Both drop in from above their own clip window as the loading panel hands over,
 * so the header arrives with the page rather than fading in over it.
 */
function Drop({
  children,
  delay,
  ready,
}: {
  children: React.ReactNode;
  delay: number;
  ready: boolean;
}) {
  return (
    <span className="relative inline-block overflow-hidden pointer-events-auto">
      <motion.span
        className="inline-block"
        initial={{ y: "-100%" }}
        animate={{ y: ready ? "0%" : "-100%" }}
        transition={{ duration: 0.9, ease: EASE, delay: ready ? delay : 0 }}
      >
        {children}
      </motion.span>
    </span>
  );
}

export default function Header({ ready = true }: { ready?: boolean }) {
  return (
    // `mix-blend-difference` moved off this element and on to the mark alone.
    // The blend makes contrast a function of whatever video frame happens to be
    // underneath, which a large graphic mark tolerates and a 12px label does
    // not — the label carries a drop shadow instead, the same solution the old
    // scroll cue used.
    <header
      className="fixed top-[20px] lg:top-[28px] left-0 w-full z-[150] px-4 lg:px-10 flex flex-col items-center gap-[10px] pointer-events-none"
      style={{ color: "var(--color-paper)" }}
    >
      <Drop delay={0.08} ready={ready}>
        <Link
          href="/"
          aria-label="yrsaclicks — home"
          className="block cursor-pointer mix-blend-difference opacity-100 transition-opacity duration-200 hover:opacity-60"
        >
          {/* The handwritten mark is nearly four times as wide as it is tall, so
              a given width buys far less height than the old wordmark did — and
              it spells the whole name rather than four letters. These widths are
              deliberately restrained. */}
          <Logo className="w-[150px] md:w-[200px] lg:w-[230px]" />
        </Link>
      </Drop>

      {/* The site's only secondary navigation, and deliberately subordinate to
          the Members button on the footage below: house small-label treatment,
          held at 70% until it is pointed at or focused. It exists so that the
          legitimacy pages are reachable by someone poking around, not so that it
          competes with the one thing this page is for.

          A plain `next/link` rather than `HoverRoll`: HoverRoll renders a bare
          `<a>`, which would not pick up `basePath`, and an internal href that
          skips `basePath` is the failure mode that only shows up on the deploy.
          `/contact` is reached from `/about` rather than from a second link
          here — one quiet link, not a nav bar. */}
      <Drop delay={0.24} ready={ready}>
        <Link
          href="/about"
          className="flex min-h-[44px] items-center px-3 font-[family-name:var(--font-body)] text-[12px] md:text-[14px] uppercase tracking-[0.14em] leading-none opacity-80 transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
          style={{
            // The footage runs from bright sky to pale sand, so paper-on-video
            // cannot be relied on alone at this size.
            filter: "drop-shadow(0 1px 7px rgba(0,0,0,0.6))",
          }}
        >
          About
        </Link>
      </Drop>
    </header>
  );
}
