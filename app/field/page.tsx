import PageShell, { ShellNav, ShellWide } from "../components/PageShell";
import VideoRows from "../components/VideoRows";
import { CHANNEL_URL, hasClips, snapshot } from "../lib/youtube";

/**
 * `/field` — the public branch of the crossroads.
 *
 * The channel is the destination, but it is reached through a page rather than
 * straight from the card, so there is something on this domain that describes
 * the work and can be indexed. A site whose only public surface is an outbound
 * link has no public surface.
 *
 * That argument used to end in a link. It was still a page whose entire offer
 * was somewhere else — the copy described the films and then pointed off-site
 * to see any of them, which is the same failure one hop further along. So the
 * work itself is on the page now: the rows are the committed build snapshot,
 * they play in place, and the link at the foot is what it should always have
 * been — the way to the rest, not the way to the whole thing.
 *
 * The rows are the sibling site's, adapted to this page's ink ground. What did
 * not come with them is its arrival — the scrubbed aperture the channel opens
 * through over there — because that belongs to a landing page built out of
 * pinned plates, and this is a document that scrolls.
 */
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

      {/* Belt and braces, and the same guard the sibling section carries: the
          snapshot ships populated, but a build that fetched the channel
          mid-deletion could empty it, and rows over nothing are worse than no
          rows. The link below stands on its own in that case, which is what
          this page used to be. */}
      {hasClips && (
        <ShellWide>
          <div className="mt-2">
            <VideoRows shorts={snapshot.shorts} videos={snapshot.videos} />
          </div>
        </ShellWide>
      )}

      <div className="mt-2">
        {/* The house action ground, matching `/members`' button — brass, paper
            type, 5.14:1. Deliberately without `.cta-solid`'s outline and bloom:
            those exist to lift a button off a full-bleed photograph, and this
            one sits on flat ink where a shadow with no picture under it is
            decoration. Same colour and weight, fewer tricks. */}
        <a
          href={CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex min-h-[44px] items-center rounded-[14px] bg-[var(--color-brass)] px-[28px] py-[16px] font-[family-name:var(--font-body)] text-[13px] font-extrabold uppercase leading-none tracking-[0.2em] text-[var(--color-paper)] transition-colors duration-300 hover:bg-[color-mix(in_srgb,var(--color-brass)_82%,var(--color-bone))] md:text-[15px]"
        >
          Full archive on YouTube
        </a>
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
