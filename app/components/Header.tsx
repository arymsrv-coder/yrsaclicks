"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Logo from "./Logo";
import { EASE } from "../lib/motion";

/**
 * The mark, centred at the top, and nothing else.
 *
 * It drops in from above its own clip window as the loading panel hands over, so
 * the header arrives with the page rather than fading in over it.
 */
export default function Header({ ready = true }: { ready?: boolean }) {
  return (
    <header
      className="fixed top-[18px] lg:top-[26px] left-0 w-full z-[150] px-4 lg:px-10 flex justify-center items-start pointer-events-none"
      style={{
        color: "var(--color-paper)",
        // `mix-blend-difference` used to sit here. It guaranteed legibility over
        // any frame by inverting against it, which a small mark got away with —
        // but at this size the inversion is the first thing you see: over a
        // bright wall the warm off-white mark came out pale blue, which reads as
        // a rendering fault rather than a brand. It now holds its own colour and
        // carries its own separation from whatever is behind it, the same way
        // the mark on /members does, so the mark is one consistent object across
        // every route.
        filter: "drop-shadow(0 1px 12px rgba(0,0,0,0.6))",
      }}
    >
      <span className="relative inline-block overflow-hidden pointer-events-auto">
        <motion.span
          className="inline-block"
          initial={{ y: "-100%" }}
          animate={{ y: ready ? "0%" : "-100%" }}
          transition={{ duration: 0.9, ease: EASE, delay: ready ? 0.08 : 0 }}
        >
          <Link
            href="/"
            aria-label="yrsaclicks — home"
            className="block cursor-pointer opacity-100 transition-opacity duration-200 hover:opacity-60"
          >
            {/* The handwritten mark is nearly four times as wide as it is tall,
                so a given width buys far less height than a wordmark would — at
                340px it stands about 87px tall. It is the only thing at the top
                of the page now, so it can carry the whole width it wants without
                crowding anything: it reads as the title of the picture rather
                than a label pinned to the corner of it. */}
            <Logo className="w-[210px] md:w-[290px] lg:w-[340px]" />
          </Link>
        </motion.span>
      </span>
    </header>
  );
}
