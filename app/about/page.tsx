import PageShell, { ShellNav } from "../components/PageShell";

/**
 * `/about` — one of the two static pages that give the site a shape beyond the
 * funnel. No motion, no media, no client JavaScript of its own: type on the ink
 * ground, which is also why it costs almost nothing to serve on the connection
 * this site's visitors actually arrive on.
 *
 * ⚠️ The prose below is scaffolding, not approved copy. Every block Ryan has not
 * signed off carries a `TODO(ryan)` marker — the Instagram handles on `/contact`
 * are the only client-approved content in this pair of pages.
 */
export default function AboutPage() {
  return (
    <PageShell eyebrow="Both sides of the lens" title="About">
      {/* TODO(ryan): confirm or replace copy */}
      <p>
        yrsaclicks is an adventure photographer and model working on both sides
        of the lens — behind it on commissions and location work, in front of it
        for the personal series that make up most of what gets published.
      </p>

      {/* TODO(ryan): confirm or replace copy */}
      <p>
        The work is mostly made outdoors and mostly on the move: coastlines,
        forest, high ground, and whatever weather turns up on the day. Shooting
        alone in those places is what shaped the way the pictures look — small
        kit, natural light, and a lot of walking.
      </p>

      {/* TODO(ryan): confirm or replace copy */}
      <p>
        Commissions, collaborations and location enquiries are all welcome. The
        quickest way to reach me is a direct message on Instagram.
      </p>

      {/* TODO(ryan): decide whether a privacy policy and terms page are wanted
          (spec §6.E1 / Q8). This is an adult-adjacent site with a
          European-reachable audience and currently no legal pages at all; a
          short privacy note would most naturally live here or on a third
          route. */}

      <ShellNav
        links={[
          { href: "/contact", label: "Contact" },
          { href: "/watch", label: "Watch" },
          { href: "/", label: "Back to home" },
        ]}
      />
    </PageShell>
  );
}
