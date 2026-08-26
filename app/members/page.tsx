"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MotionConfig } from "framer-motion";
import AgeGate from "./AgeGate";
import Logo from "../components/Logo";
import { asset } from "../lib/asset";

/** Where the paid work lives. The gate's Continue is a link straight to it. */
const OF_URL = "https://onlyfans.com/yrsaclicks";

/**
 * The private archive — the last page, and the last step before the gate.
 *
 * This route used to *be* the gate: arriving here put a near-opaque panel over
 * the screen immediately, and there was nothing behind it. It is now a page in
 * its own right, and the gate is a sheet that rises only when the button below
 * is pressed.
 *
 * That is the whole shape of the change. A visitor reaching this point has
 * pressed ENTER on the landing page and chosen the private branch at the
 * crossroads, so they have already said twice what they came for. The gate has
 * stopped being the site's front door and become what it should have been: the
 * last thing between someone who has decided and the thing they decided on.
 *
 * Nothing is stored, here or in the gate. Declining closes the sheet and leaves
 * the visitor here rather than throwing them back to the landing page, because
 * unlike before, here is somewhere.
 */
export default function MembersPage() {
  const [gateOpen, setGateOpen] = useState(false);

  // Focus has to come back to the control that opened the sheet, or a keyboard
  // visitor who presses Escape is returned to the top of the document with no
  // idea where they were.
  const triggerRef = useRef<HTMLButtonElement | null>(null);

  // Restoring focus has to wait for the commit that removes `inert` from the
  // wrapper below. Calling `focus()` straight after `setGateOpen(false)` looks
  // right and silently does nothing: at that moment the trigger is still inside
  // an inert subtree, and focusing into one is a no-op — the visitor lands back
  // at the top of the document with no idea where they were. An effect runs
  // after the DOM has caught up, when the element can actually take focus.
  const wasOpen = useRef(false);
  useEffect(() => {
    if (wasOpen.current && !gateOpen) triggerRef.current?.focus();
    wasOpen.current = gateOpen;
  }, [gateOpen]);

  return (
    <MotionConfig reducedMotion="user">
      <main
        className="relative min-h-dvh w-full overflow-hidden"
        style={{
          backgroundColor: "var(--color-ink)",
          color: "var(--color-paper)",
        }}
      >
        {/* Everything the sheet sits over, in one wrapper so it can be inerted
            as a unit. Without this the page behind an open dialog is reachable
            by a screen reader's virtual cursor and by Tab — the focus trap in
            the gate catches the keyboard, but nothing catches the virtual
            cursor. It mattered less when there was only a photograph back here;
            now there is a page. */}
        <div inert={gateOpen}>
          {/* The plate. Held at full strength and barely veiled, so she reads as
              the photograph this page is about rather than a texture behind it.

              It arrives with a short rise: the plate settles out of a slight
              over-scale as the veil below clears, so following the archive card
              from the crossroads reads as walking into the still that was just
              tapped.

              `object-position` is biased upward because this is a portrait still
              in a landscape viewport: a centred crop puts the fold of her jeans
              in the middle of a desktop screen and takes her face off the top. */}
          <div className="plate-arrive absolute inset-0 z-0">
            <Image
              src={asset("/media/members.jpg")}
              alt=""
              aria-hidden="true"
              fill
              sizes="100vw"
              // This is the LCP element on the route. `priority` is deprecated
              // in Next 16; the documented replacement for an above-the-fold
              // hero is eager loading with a raised fetch priority.
              loading="eager"
              fetchPriority="high"
              className="object-cover object-[center_22%] select-none"
              draggable={false}
            />

            {/* The veil. Deeper at the foot than the head, so the type at the
                bottom has ground to sit on while her face stays clear of it.
                A gradient, not a flat wash — a flat one dark enough to carry the
                copy would have taken the picture down with it. */}
            <div
              className="absolute inset-0"
              style={{
                backgroundImage:
                  "linear-gradient(to bottom, color-mix(in srgb, var(--color-ink) 22%, transparent) 0%, color-mix(in srgb, var(--color-ink) 10%, transparent) 34%, color-mix(in srgb, var(--color-ink) 88%, transparent) 100%)",
              }}
            />
          </div>

          {/* The mark, back to the landing page. Above the plate but below the
              gate — at the documented 260 layer, same as every other inner
              route. */}
          <div className="absolute top-[20px] lg:top-[28px] left-0 w-full z-[260] flex justify-center px-4">
            <Link
              href="/"
              aria-label="yrsaclicks — back to the landing page"
              className="flex min-h-[44px] cursor-pointer items-center transition-opacity duration-200 hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
              // ⚠️ The `drop-shadow` that used to sit here is gone, and must not
              // come back. A filtered ancestor is a backdrop root, and the
              // inverting mark below would sample an empty backdrop and paint
              // nothing.
            >
              {/* The bright end of the plate — her hair and the wall behind
                  her — so the inversion lands dark here and holds. The frosted
                  treatment needed a hand-tuned direction on this route because
                  brightening a near-white backdrop separates nothing; inversion
                  needs no such help, so this is back on the defaults. */}
              <Logo
                variant="invert"
                className="w-[150px] md:w-[200px]"
              />
            </Link>
          </div>

          {/* The content, at the foot where the veil is deepest. */}
          <div className="relative z-10 flex min-h-dvh flex-col justify-end px-5 pb-[9dvh] pt-[104px] md:px-8">
            <div className="mx-auto w-full max-w-[54ch] text-center">
              <p
                className="font-[family-name:var(--font-body)] text-[10px] md:text-[11px] uppercase tracking-[0.26em]"
                style={{ color: "var(--color-pine-light)" }}
              >
                18+ · The personal series
              </p>

              <h1 className="mt-3 font-[family-name:var(--font-body)] font-extrabold uppercase text-[34px] md:text-[48px] leading-[0.98] tracking-[-0.02em]">
                Private Archive
              </h1>

              {/* TODO(ryan): confirm or replace copy */}
              <p className="mx-auto mt-4 max-w-[46ch] font-[family-name:var(--font-body)] text-[14px] md:text-[15px] leading-relaxed opacity-85">
                Unreleased sets, uncut film, and the frames that never make the
                public page. Everything here is published in one place, and it
                is not this one.
              </p>

              <div className="mt-8 flex justify-center">
                <button
                  ref={triggerRef}
                  type="button"
                  onClick={() => setGateOpen(true)}
                  // The weight that used to be on the landing page's button
                  // lives here now. This is the last step before the gate and
                  // the point at which the visitor is actually deciding
                  // something, so it is the one filled, haloed control on the
                  // site — brass, the system's action ground, and the same
                  // colour as the Continue it is about to reveal.
                  //
                  // Named for what it does, and deliberately not "Continue" —
                  // that word belongs to the anchor inside the gate that
                  // actually leaves the site. Two controls one tap apart both
                  // saying "Continue" is ambiguous to read and worse to hear
                  // announced.
                  //
                  // A button and not a link, because it opens a dialog on this
                  // page rather than navigating. The anchor that leaves the site
                  // is inside the gate, and it stays an anchor for the reason
                  // recorded there.
                  aria-haspopup="dialog"
                  aria-expanded={gateOpen}
                  className="cta-solid pointer-events-auto relative inline-flex w-full max-w-[340px] cursor-pointer items-center justify-center rounded-[8px] border-2 border-[var(--color-bone)] px-[40px] py-[21px] font-[family-name:var(--font-body)] text-[17px] md:text-[19px] font-extrabold uppercase tracking-[0.2em] text-[var(--color-paper)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[6px] focus-visible:outline-[var(--color-bone)] md:w-auto md:max-w-none"
                >
                  {/* Behind the label and outside the button's own box, so it
                      never draws over the fill. Decorative. */}
                  <span
                    aria-hidden="true"
                    className="cta-halo pointer-events-none absolute -inset-[7px] rounded-[13px] border-2"
                    style={{ borderColor: "var(--color-bone)" }}
                  />
                  Enter the archive
                </button>
              </div>

              <div className="mt-5">
                <Link
                  href="/work"
                  className="inline-flex min-h-[44px] items-center font-[family-name:var(--font-body)] text-[11px] md:text-[12px] uppercase tracking-[0.18em] leading-none opacity-60 transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
                >
                  Back
                </Link>
              </div>
            </div>
          </div>
        </div>

        <AgeGate
          open={gateOpen}
          confirmHref={OF_URL}
          onClose={() => setGateOpen(false)}
        />

        {/* The arrival. One ink veil over the whole route that clears itself the
            moment the first paint lands, so following the archive card from the
            crossroads dissolves into this instead of cutting to it.

            Deliberately a CSS animation and not a motion component: the veil
            starts opaque, and on this site's actual audience — Instagram's
            in-app browser on a cheap phone — waiting for hydration to clear it
            would mean holding a solid green screen for however long the
            JavaScript takes. Keyframes run off the paint, script or no script. */}
        <div
          aria-hidden="true"
          className="arrival-veil pointer-events-none fixed inset-0 z-[270]"
          style={{ backgroundColor: "var(--color-ink)" }}
        />
      </main>
    </MotionConfig>
  );
}
