"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EASE, EASE_OUT } from "../lib/motion";
import { useIsMetaWebview } from "../lib/useIsMetaWebview";

/**
 * Self-declared age confirmation, as a sheet rising from the base of the archive.
 *
 * It used to be a near-opaque panel thrown over the whole route, and it used to
 * be the second thing a visitor ever saw. Neither is true now: by the time this
 * appears they have passed the landing page, chosen the private branch at the
 * crossroads, and pressed a button on the archive itself. The confrontation has
 * already happened three times over, so the gate's job here is to be unmissable
 * and answerable rather than to block the page — it never covers the photograph
 * it is gating, and it lands under the thumb instead of in the middle of the
 * screen.
 *
 * Nothing identifying is asked for and nothing is kept. Confirming navigates
 * off-site, so there is no flag to store; declining closes the sheet and leaves
 * the visitor on the archive, which is a real page they chose to be on. That is
 * the difference from the version that navigated back to the landing page — then
 * there was nothing behind the gate, and now there is.
 */
export default function AgeGate({
  open,
  confirmHref,
  onClose,
}: {
  open: boolean;
  /**
   * Where confirming leads. Rendered as the anchor's own `href` rather than
   * navigated to from a click handler: the destination is off-site, and a plain
   * anchor is the one thing that survives Instagram's in-app browser —
   * `window.open` there is either swallowed or treated as a popup, and a
   * scripted navigation loses the user gesture.
   */
  confirmHref: string;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {open && <GateSheet confirmHref={confirmHref} onClose={onClose} />}
    </AnimatePresence>
  );
}

/**
 * Mounted only while the sheet is up, so the checkbox starts unticked every time
 * without an effect reaching in to reset it.
 */
function GateSheet({
  confirmHref,
  onClose,
}: {
  confirmHref: string;
  onClose: () => void;
}) {
  const [checked, setChecked] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);

  // Whether the hint below is warranted at all, and whether it has been waved
  // away. Dismissal is per-view on purpose: this route stores nothing, and a
  // hint this small is not worth becoming the one thing the site writes to a
  // visitor's device.
  const inMetaWebview = useIsMetaWebview();
  const [hintDismissed, setHintDismissed] = useState(false);
  const showHint = inMetaWebview && !hintDismissed;

  // Focus moves to the heading rather than to the first control. The checkbox
  // used to take it via `autoFocus`, which announced "I confirm I am 18 or
  // older" before anything had said what was being confirmed or why the page had
  // changed under them.
  useEffect(() => {
    headingRef.current?.focus();
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }
      if (e.key !== "Tab") return;
      // Re-queried on every Tab rather than cached, so the cycle closes over
      // what is actually still mounted — the dismissible hint's own button
      // comes and goes inside this list.
      const focusables = panelRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables?.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[250] flex items-end justify-center">
      {/* The scrim. Dimmed and lightly blurred rather than washed out: the still
          behind stays legible as the photograph this page is about, which is the
          whole reason the sheet does not simply cover it. Tapping it is the same
          answer as "Not now". */}
      <motion.button
        type="button"
        aria-label="Close"
        onClick={onClose}
        className="gate-scrim absolute inset-0 cursor-pointer"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.32, ease: EASE }}
      />

      <motion.div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="age-gate-heading"
        aria-describedby="age-gate-body"
        className="relative w-full max-w-[440px] rounded-t-[14px] border-x border-t px-6 pb-8 pt-5 md:px-8 md:pb-9"
        style={{
          borderColor:
            "color-mix(in srgb, var(--color-paper) 26%, transparent)",
          backgroundColor: "var(--color-ink)",
          color: "var(--color-paper)",
          // Lifts the sheet off the plate rather than relying on the border
          // alone. Static — a box-shadow keyframe repaints every frame.
          boxShadow: "0 -8px 40px color-mix(in srgb, #000 46%, transparent)",
        }}
        initial={{ y: "100%" }}
        animate={{ y: "0%" }}
        exit={{ y: "100%" }}
        // MotionConfig on this route is `reducedMotion="user"`, which turns this
        // travel into a cross-fade for anyone who asked for that.
        transition={{ duration: 0.52, ease: EASE_OUT }}
      >
        {/* The grabber. Purely a signal that this is a sheet and can be sent
            away — it is not a control, and the scrim and "Not now" both are. */}
        <div
          aria-hidden="true"
          className="mx-auto mb-5 h-[3px] w-[40px] rounded-full"
          style={{
            backgroundColor:
              "color-mix(in srgb, var(--color-paper) 28%, transparent)",
          }}
        />

        <p
          className="font-[family-name:var(--font-body)] text-[10px] uppercase tracking-[0.26em]"
          style={{ color: "var(--color-pine-light)" }}
        >
          Age verification
        </p>

        <h2
          id="age-gate-heading"
          ref={headingRef}
          tabIndex={-1}
          className="mt-2 font-[family-name:var(--font-body)] font-extrabold uppercase text-[23px] md:text-[26px] leading-[1.05] tracking-[-0.02em] outline-none"
        >
          You must be 18 or older
        </h2>

        <p
          id="age-gate-body"
          className="mt-2 font-[family-name:var(--font-body)] text-[12px] md:text-[13px] leading-relaxed opacity-75"
        >
          This area contains adult material. By continuing you confirm you are
          of legal age and that viewing is lawful where you are.
        </p>

        <label className="mt-5 flex min-h-[44px] cursor-pointer items-center gap-3 text-left font-[family-name:var(--font-body)] text-[12px] md:text-[13px] leading-snug opacity-90">
          <input
            type="checkbox"
            checked={checked}
            onChange={(e) => setChecked(e.target.checked)}
            className="h-[18px] w-[18px] shrink-0 cursor-pointer accent-[var(--color-brass)]"
          />
          I confirm I am 18 or older.
        </label>

        {/* An anchor, not a button, and the destination is off-site. Until the
            box is ticked it carries no `href` at all, which is what makes it
            un-clickable and un-focusable — the same state a disabled button
            would hold, and the same thing the focus trap above already filters
            on (`a[href]`).

            Same tab, deliberately: this is where the site ends. */}
        <a
          href={checked ? confirmHref : undefined}
          rel="noopener noreferrer"
          aria-disabled={!checked}
          className={`mt-4 flex min-h-[52px] w-full items-center justify-center rounded-[6px] px-7 font-[family-name:var(--font-body)] text-[13px] font-bold uppercase tracking-[0.2em] transition-opacity duration-200 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[3px] focus-visible:outline-[var(--color-bone)] ${
            checked ? "cursor-pointer" : "cursor-not-allowed opacity-40"
          }`}
          style={{
            backgroundColor: "var(--color-brass)",
            color: "var(--color-paper)",
          }}
        >
          Continue
        </a>

        {/* The in-app-browser hint, and only inside a Meta in-app browser.
            Outside one this renders nothing at all — no placeholder, no reserved
            space — because for everyone else there is nothing to explain.

            Informational, and nothing more. It does not touch the link above it:
            no redirect, no `window.location`, no `window.open`, no click handler
            of any kind. The forceful browser-exit pattern was considered and
            rejected on platform-policy grounds, and it is not coming back in
            through a hint. */}
        {showHint && (
          <div
            className="mt-3 flex items-start gap-2 rounded-[6px] border px-3 py-2 text-left"
            style={{
              borderColor:
                "color-mix(in srgb, var(--color-pine-light) 30%, transparent)",
              color: "var(--color-pine-light)",
            }}
          >
            <p className="flex-1 font-[family-name:var(--font-body)] text-[10px] uppercase tracking-[0.12em] leading-[1.5]">
              Opens best outside Instagram — tap ⋯ then Open in Browser.
            </p>
            <button
              type="button"
              onClick={() => setHintDismissed(true)}
              aria-label="Dismiss this tip"
              className="-m-2 shrink-0 cursor-pointer p-2 font-[family-name:var(--font-body)] text-[13px] leading-none opacity-70 transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            >
              ×
            </button>
          </div>
        )}

        <button
          type="button"
          onClick={onClose}
          className="mt-2 flex min-h-[44px] w-full cursor-pointer items-center justify-center font-[family-name:var(--font-body)] text-[11px] uppercase tracking-[0.2em] opacity-60 transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          Not now
        </button>

        <p className="mt-4 font-[family-name:var(--font-body)] text-[10px] leading-relaxed opacity-40">
          Age verification is self-declared — no identifying information is
          collected or stored.
        </p>
      </motion.div>
    </div>
  );
}
