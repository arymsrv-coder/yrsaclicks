import PageShell, { ShellNav } from "../components/PageShell";
import HoverRoll from "../components/HoverRoll";

/**
 * `/field` — the public branch of the crossroads.
 *
 * The channel is the destination, but it is reached through a page rather than
 * straight from the card, so there is something on this domain that describes
 * the work and can be indexed. A site whose only public surface is an outbound
 * link has no public surface.
 *
 * ⚠️ `YOUTUBE_URL` below is a placeholder and is NOT a confirmed address. It is
 * the one string on this route that cannot be guessed correctly, so it is
 * isolated here rather than inlined: correcting it is a one-line change.
 */
// TODO(ryan): confirm the real channel URL. This is inferred from the Instagram
// handle and has not been verified — it must be checked before this ships.
const YOUTUBE_URL = "https://www.youtube.com/@yrsaclicks";

export default function FieldPage() {
  return (
    <PageShell eyebrow="Out on location" title="Field">
      {/* TODO(ryan): confirm or replace copy */}
      <p>
        The field work is the half of this that happens outdoors and mostly on
        the move — roadside stops, coastline, forest and high ground, and
        whatever weather turns up on the day.
      </p>

      {/* TODO(ryan): confirm or replace copy */}
      <p>
        The films are cut from the same trips as the stills: small kit, natural
        light, no crew, and a lot of walking. New work goes up on the channel
        first.
      </p>

      <div className="mt-2">
        <HoverRoll
          href={YOUTUBE_URL}
          external
          text="watch on youtube"
          className="inline-flex min-h-[44px] items-center font-[family-name:var(--font-body)] uppercase tracking-[0.14em] text-[13px] md:text-[15px]"
        />
      </div>

      <ShellNav
        links={[
          { href: "/work", label: "Back to work" },
          { href: "/about", label: "About" },
          { href: "/contact", label: "Contact" },
        ]}
      />
    </PageShell>
  );
}
