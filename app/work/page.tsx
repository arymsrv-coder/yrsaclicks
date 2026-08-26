import Link from "next/link";
import Logo from "../components/Logo";
import BranchCard from "../components/BranchCard";
import { asset } from "../lib/asset";

/**
 * The crossroads — the page the landing screen's ENTER opens onto.
 *
 * Two directions and nothing else: the public work, which goes out to the
 * channel, and the private archive, which goes on toward the gate. This page is
 * the reason the site reads as a photographer's site rather than a redirect: a
 * visitor arriving from an Instagram bio lands on a choice between two bodies of
 * work, not one step from an adult-content disclosure.
 *
 * It is also where the two branches stop being equivalent. Field is open and
 * leaves the site immediately; Private Archive is one more page and then a gate.
 * Nothing here says so — the pictures do the work — but that asymmetry is why
 * the gate can afford to be quiet when it finally appears.
 */
export default function WorkPage() {
  return (
    <main
      className="relative min-h-dvh w-full px-5 pb-16 pt-[104px] md:px-8 md:pt-[136px]"
      style={{
        backgroundColor: "var(--color-ink)",
        color: "var(--color-paper)",
      }}
    >
      {/* The mark, back to the landing page. Same layer as every other inner
          route's (the documented 260), so the routes do not disagree about where
          the mark lives. */}
      <div className="absolute top-[20px] lg:top-[28px] left-0 w-full z-[260] flex justify-center px-4">
        <Link
          href="/"
          aria-label="yrsaclicks — back to the landing page"
          className="flex min-h-[44px] cursor-pointer items-center transition-opacity duration-200 hover:opacity-60 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          {/* Same flat ink as the shell's routes, and the same reasoning:
              one known colour in, one known colour out, so neither the contrast
              push nor the edge has anything to do. */}
          <Logo
            variant="invert"
            className="w-[150px] [--logo-contrast:1] [--logo-edge:0] md:w-[200px]"
          />
        </Link>
      </div>

      <div className="mx-auto w-full max-w-[1080px]">
        <header className="mx-auto max-w-[62ch] text-center">
          <p
            className="font-[family-name:var(--font-body)] text-[10px] md:text-[11px] uppercase tracking-[0.26em]"
            style={{ color: "var(--color-pine-light)" }}
          >
            Both sides of the lens
          </p>

          <h1 className="mt-4 font-[family-name:var(--font-body)] font-extrabold uppercase text-[34px] md:text-[52px] leading-[0.98] tracking-[-0.02em]">
            Two ways in
          </h1>
        </header>

        {/* Stacked on a phone so each still gets the full width it deserves,
            side by side from `md` where there is room for both to be read at
            once. Field first in source order, so the open branch is the one a
            visitor meets first on a small screen. */}
        <div className="mt-10 grid grid-cols-1 gap-5 md:mt-14 md:grid-cols-2 md:gap-7">
          <BranchCard
            href="/field"
            eyebrow="Out on location"
            title="Field"
            /* TODO(ryan): confirm or replace copy */
            blurb="Location and adventure work — roadside, coastline and high ground, and the films that come back with it."
            src={asset("/media/reel/reel-02.jpg")}
            alt="yrsaclicks on location beside a disused roadside filling station, camera in hand"
            // She stands about a quarter in from the left of this frame, and
            // this card is a tall crop of a landscape still — a centred crop
            // lands on the empty forecourt and leaves her clipped at the edge.
            // The subject of a card about the field work is the photographer in
            // the field, so the window follows her.
            objectPosition="28% center"
            priority
          />

          <BranchCard
            href="/members"
            eyebrow="18+"
            title="Private Archive"
            /* TODO(ryan): confirm or replace copy */
            blurb="The personal series — unreleased sets, uncut film, and the frames that never make the public page."
            src={asset("/media/members.jpg")}
            alt="A portrait from the yrsaclicks private archive"
            // Portrait still in a landscape frame: a centred crop takes her face
            // off the top of it, so the crop is biased upward. Same reason and
            // same number as the plate on /members.
            objectPosition="center 22%"
          />
        </div>

        {/* Deliberately subordinate to both cards, and the only other navigation
            on the site. `next/link`, so `basePath` is applied. */}
        <nav className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-1">
          {[
            { href: "/about", label: "About" },
            { href: "/contact", label: "Contact" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="flex min-h-[44px] items-center font-[family-name:var(--font-body)] text-[12px] md:text-[13px] uppercase tracking-[0.14em] leading-none opacity-70 transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>
    </main>
  );
}
