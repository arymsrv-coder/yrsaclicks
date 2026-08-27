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
        // Inherited by the mark only as the `@supports` fallback — where the
        // browser can do the real thing, the mark takes its value by inverting
        // the footage and this colour is never painted. See `.logo-invert`.
        color: "var(--color-paper)",

        // Two treatments have been and gone here. `mix-blend-difference`
        // guaranteed legibility by inverting against the frame, which a small
        // mark got away with — but at this size the inversion is the first
        // thing you see, and over a bright wall the warm off-white came out
        // pale blue, which reads as a rendering fault rather than a brand. The
        // flat off-white that replaced it had the opposite problem: one fixed
        // colour asserted over footage that runs from bright sky to dark
        // interior, and a frosted pass after that vanished into the bright end
        // of it. The mark now inverts the footage rather than blending with it,
        // so it has no colour of its own to be wrong.
        //
        // ⚠️ No `filter` here, and none on anything above the mark. A filtered
        // ancestor is a backdrop root, and the mark would sample an empty
        // backdrop and paint nothing. The `drop-shadow` that used to sit on
        // this line is exactly what that rule forbids.
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
            <Logo
              variant="invert"
              className="w-[210px] md:w-[290px] lg:w-[340px]"
            />
          </Link>
        </motion.span>
      </span>
    </header>
  );
}
