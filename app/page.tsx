"use client";

import { useState } from "react";
import { MotionConfig } from "framer-motion";
import Header from "./components/Header";
import Hero from "./components/Hero";
import Loader from "./components/Loader";

/**
 * The landing page, and it is one screen.
 *
 * Loading reel → the footage, with the way in laid over it. There is no second
 * panel and nothing below the fold, because there is no fold: the scroll
 * subsystem this page used to be built around — a Lenis container, a scrubbed
 * aperture and a plate that rode up through a tall track — is gone. The visitor
 * sees the film and the button in the same glance, which is the whole of what
 * this site is for.
 *
 * `fixed inset-0` on the main is what actually makes it not scroll, rather than
 * `overflow: hidden` on `html, body`. Two reasons: it is scoped to this route,
 * so `/about` and `/contact` can still scroll like ordinary pages; and it pins
 * the hero to the real viewport box on the browsers that fall back from `dvh`
 * to `vh` (§4.5) — there, `100vh` is *taller* than the visible area whenever a
 * mobile toolbar is out, which would have handed back exactly the stray
 * toolbar-height scroll this task exists to remove.
 */
export default function Home() {
  const [ready, setReady] = useState(false);

  // Where the loading reel's footage had got to as the panel came away, so the
  // hero continues it rather than restarting it. Null until the hand-off, which
  // is also the hero's cue to start playing at all.
  const [handoffAt, setHandoffAt] = useState<number | null>(null);

  return (
    // One switch for every transform animation on this route: visitors who ask
    // for reduced motion keep the fades and lose the travel. It used to live
    // inside `ScrollProvider`, which no longer exists — mounted here so it is
    // still above the loader, the header and the hero.
    <MotionConfig reducedMotion="user">
      <Loader onDone={() => setReady(true)} onHandoff={setHandoffAt} />
      <Header ready={ready} />
      <main className="fixed inset-0 overflow-hidden">
        <Hero ready={ready} startAt={handoffAt} />
      </main>
    </MotionConfig>
  );
}
