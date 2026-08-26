"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { EASE_OUT } from "../lib/motion";
import { asset } from "../lib/asset";

/**
 * The opening plate: the footage, corner to corner. No overlay, no tint, no
 * type — the header's mark and the one way in are the only things over it.
 *
 * It used to be `sticky top-0` at the head of a scroll stack, with a cue at the
 * foot pointing at a plate further down. There is no further down now, so the
 * section simply fills its parent and the action that used to live on that plate
 * sits here instead.
 */
export default function Hero({
  ready = false,
  startAt = null,
}: {
  ready?: boolean;
  /**
   * Where the loading reel's copy of the footage had got to as it handed over.
   * Null while the loader still owns the screen — which is also what keeps this
   * video from playing behind it.
   */
  startAt?: number | null;
}) {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Picks the footage up where the loading reel left it, and only then starts
  // playing.
  //
  // It used to autoplay from page load, alongside the reel's own copy of the same
  // file — two decoders running the same footage, and worse, running it out of
  // step. The reel's copy sits inside a fully collapsed clip until its frame
  // opens, and a video that is clipped to nothing does not count as rendered, so
  // the browser declines to autoplay it. It only started once its iris opened, by
  // which point this one had been running for the whole loading sequence. The
  // hand-off the loader is built around — the frame growing until it *is* the hero
  // — was landing on a three-and-a-half second jump cut.
  useEffect(() => {
    const v = videoRef.current;
    if (!v || startAt === null) return;
    // A seek past the end would be rejected; the reel loops, so wrap it.
    if (Number.isFinite(v.duration) && v.duration > 0) {
      v.currentTime = startAt % v.duration;
    }
    void v.play().catch(() => {});
  }, [startAt]);

  // There is deliberately no unmute here any more. `public/media/hero.mp4`
  // carries no audio stream at all — it was encoded with `-an` — so the
  // first-interaction unmute that used to sit at this point was twenty lines
  // that could not do anything. Worse, it was armed: it fired on `wheel` and
  // `touchstart`, so re-encoding the file with sound would have started audio on
  // a stray gesture inside Instagram's in-app browser, which is one of the more
  // reliable ways to lose that visitor. If the footage is ever given a soundtrack
  // it needs an explicit, visible unmute control, not a blanket listener.

  return (
    <section id="hero" className="relative h-full w-full overflow-hidden z-0">
      {/* The page's one heading, and it is for machines and screen readers only:
          the design is a full-bleed film with a single button over it, and any
          visible heading would be competing with the footage. Audit finding C5 —
          the landing page is indexable and had no `h1` at all, which is a gap
          both for search and for anyone navigating by heading. */}
      <h1 className="sr-only">yrsaclicks — both sides of the lens</h1>

      <video
        ref={videoRef}
        src={asset("/media/hero.mp4")}
        poster={asset("/media/hero-poster.jpg")}
        muted
        loop
        playsInline
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* The way in, over the footage and visible from the first frame the hero
          owns the screen — no scrolling, no second panel, nothing to find.

          Lower-centre rather than dead centre: it sits clear of the header's
          mark at the top and clear of the middle of the frame, where the footage
          actually is. `bottom-[8dvh]` is a unit the `@supports` block in
          globals.css already covers. */}
      <motion.div
        className="pointer-events-none absolute inset-x-0 bottom-[8dvh] z-10 flex justify-center px-6"
        initial={{ opacity: 0, y: 14 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 14 }}
        // The header's arrival curve and a comparable delay, so the button lands
        // with the page rather than fading in over a page that already arrived.
        transition={{ duration: 0.9, ease: EASE_OUT, delay: ready ? 0.6 : 0 }}
      >
        <Link
          href="/members"
          // Big, and deliberately so: this is the whole purpose of the page and
          // it is competing with a full-bleed film for attention. The old box
          // was 180×57 on desktop with type *smaller* there than on mobile,
          // which is backwards for the one thing a visitor is meant to reach —
          // it now grows with the viewport instead of shrinking.
          //
          // Full width on a phone, up to the measure the page's own gutters
          // allow. A primary action on a 390px screen has no reason to be
          // narrower than the screen — it is the largest thumb target the layout
          // can offer and there is nothing beside it to share the row with. On
          // desktop it goes back to sizing from its own padding, because a
          // 1440px-wide button is not a button.
          //
          // Radius stays small: softened, not round. The bone outline is what
          // lifts the fill off the photograph, and the wide tracking is what
          // makes a five-letter word occupy the width it needs to read as a
          // destination rather than a tag.
          //
          // `next/link`, which applies `basePath` itself — this must not go
          // through `asset()`.
          className="cta-hero pointer-events-auto relative inline-flex w-full max-w-[340px] items-center justify-center rounded-[8px] md:w-auto md:max-w-none border-2 border-[var(--color-bone)] px-[46px] py-[23px] md:px-[60px] md:py-[28px] font-[family-name:var(--font-body)] text-[21px] md:text-[26px] font-extrabold uppercase tracking-[0.22em] text-[var(--color-paper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-[var(--color-bone)]"
        >
          {/* Behind the label and outside the button's own box, so it never
              draws over the fill. Decorative — the link already names itself. */}
          <span
            aria-hidden="true"
            className="cta-halo pointer-events-none absolute -inset-[7px] rounded-[13px] border-2"
            style={{ borderColor: "var(--color-bone)" }}
          />
          Members
        </Link>
      </motion.div>
    </section>
  );
}
