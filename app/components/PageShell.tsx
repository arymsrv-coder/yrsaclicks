import Link from "next/link";
import Logo from "./Logo";

/**
 * The shell the two static pages share — `/about` and `/contact`.
 *
 * Deliberately not the landing page's `Header`: that one is fixed over full-bleed
 * footage, blends against it, and drops in on a `ready` flag handed down from the
 * loader. None of that applies to a page that is simply type on the ink ground.
 * What it borrows instead is `/members`' shell — `min-h-dvh` on ink, the mark
 * centred at the top linking home, paper type — so arriving here from either the
 * landing page or the gate reads as the same site.
 *
 * These pages scroll like ordinary documents. The landing page's no-scroll lock
 * is scoped to its own `<main>` for exactly this reason.
 */
export default function PageShell({
  eyebrow,
  title,
  children,
}: {
  /** The small accent line above the heading. */
  eyebrow: string;
  /** Becomes the page's one `<h1>`. */
  title: string;
  children: React.ReactNode;
}) {
  return (
    <main
      className="relative min-h-dvh w-full px-5 pb-16 pt-[104px] md:px-8 md:pt-[136px]"
      style={{
        backgroundColor: "var(--color-ink)",
        color: "var(--color-paper)",
      }}
    >
      {/* The mark, back to the landing page. Same position and z-index as the
          one on `/members` (the documented 260 layer), so the two routes do not
          disagree about where the mark lives. */}
      <div className="absolute top-[20px] lg:top-[28px] left-0 w-full z-[260] flex justify-center px-4">
        <Link
          href="/"
          aria-label="yrsaclicks — back to the landing page"
          // The mark is 33px tall at this width by its own aspect ratio, which
          // is under the 44px floor on its own — the padding is what carries the
          // target, not a larger logo.
          className="group flex min-h-[44px] cursor-pointer items-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-current"
        >
          {/* Flat ink is a single known colour, so the inversion is a single
              known colour too — #2e3b31 comes back as a pale mauve. Nothing to
              rescue from mid-grey here and nothing moving behind the mark, so
              the contrast push and the edge are both switched off. */}
          <Logo
            variant="invert"
            className="w-[130px] [--logo-contrast:1] [--logo-edge:0] transition-opacity duration-200 group-hover:opacity-80 md:w-[180px]"
          />
        </Link>
      </div>

      {/* One measure for the type. A photographer's page is mostly one column of
          reading, and a full-width line on a desktop viewport is unreadable. */}
      <div className="mx-auto w-full max-w-[62ch]">
        <p
          className="font-[family-name:var(--font-body)] text-[10px] md:text-[11px] uppercase tracking-[0.26em]"
          style={{ color: "var(--color-pine-light)" }}
        >
          {eyebrow}
        </p>

        <h1 className="mt-4 font-[family-name:var(--font-body)] font-extrabold uppercase text-[34px] md:text-[52px] leading-[0.98] tracking-[-0.02em]">
          {title}
        </h1>

        <div className="mt-8 flex flex-col gap-6 font-[family-name:var(--font-body)] text-[14px] md:text-[16px] leading-relaxed">
          {children}
        </div>
      </div>
    </main>
  );
}

/**
 * One child let out of the shell's reading measure.
 *
 * `PageShell` clamps everything to `max-w-[62ch]`, which is right for prose and
 * wrong for anything that is looked at rather than read. `/field`'s video rows
 * are the case: a 304px tile inside 62ch leaves barely two across, and the row
 * depends on overflowing — a tile clipped by the right edge is what says it
 * continues sideways. Clamped, there is nothing to clip and the rows read as a
 * short list that happens to be cut off.
 *
 * The negative margin is measured in the shell's own gutters, so the escape
 * lands exactly on the page edges at both breakpoints. It stops at the measure
 * plus those gutters rather than running to the full viewport: on a wide
 * desktop a row spanning 2000px of ink would come adrift from the column of
 * type it belongs to.
 */
export function ShellWide({ children }: { children: React.ReactNode }) {
  return (
    <div className="-mx-5 md:-mx-8">
      <div className="mx-auto w-full max-w-[calc(62ch+2.5rem)] px-5 md:max-w-[calc(62ch+4rem)] md:px-8">
        {children}
      </div>
    </div>
  );
}

/**
 * The quiet row of links at the foot of both pages, in the house small-label
 * treatment. `next/link` throughout, so `basePath` is applied — a literal `<a>`
 * to an internal route is the failure mode that only appears on the deploy.
 */
export function ShellNav({
  links,
}: {
  links: { href: string; label: string }[];
}) {
  return (
    <nav
      className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-1 border-t pt-6"
      style={{
        borderColor: "color-mix(in srgb, var(--color-paper) 18%, transparent)",
      }}
    >
      {links.map((l) => (
        <Link
          key={l.href}
          href={l.href}
          className="flex min-h-[44px] items-center font-[family-name:var(--font-body)] text-[12px] md:text-[13px] uppercase tracking-[0.14em] leading-none opacity-70 transition-opacity duration-200 hover:opacity-100 focus-visible:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-current"
        >
          {l.label}
        </Link>
      ))}
    </nav>
  );
}
