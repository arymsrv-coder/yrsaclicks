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
          // The plate's CTA treatment, carried over intact from the scroll
          // section this replaced. A filled button, not an outline: the outlined
          // version was legible only once you found it — it read as a border
          // drawn over a photo until you hovered, and on touch there is no hover
          // at all. Solid ink carries its own contrast against the footage, so it
          // reads as a button before anything is pointed at it.
          //
          // Radius is deliberately small — softened, not round. The bone outline
          // is what lifts the fill off the photograph. The padding is not a round
          // number because the box was scaled 1.04 on both axes and the 2px
          // border does not scale with it — 2.08px is not something a screen can
          // draw — so the padding absorbs that remainder for the outer box to
          // land where it was measured. Type scales with the box, so the label
          // grows with the button instead of drifting inside it.
          //
          // `next/link`, which applies `basePath` itself — this must not go
          // through `asset()`.
          className="pointer-events-auto inline-block rounded-[6px] border-2 border-[var(--color-bone)] bg-[var(--color-ink)] px-[25.4px] py-[14.9px] font-[family-name:var(--font-body)] text-[18.5px] md:text-[15.6px] font-extrabold uppercase tracking-[0.2em] text-[var(--color-paper)] transition-colors duration-300 hover:bg-[var(--color-brass)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-bone)]"
          style={{
            // Static, not animated — a box-shadow keyframe would repaint on the
            // main thread every frame.
            boxShadow: "0 2px 12px color-mix(in srgb, #000 22%, transparent)",
          }}
        >
          Members
        </Link>
      </motion.div>
    </section>
  );
}
