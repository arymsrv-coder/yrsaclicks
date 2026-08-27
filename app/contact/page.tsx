import PageShell, { ShellNav } from "../components/PageShell";
import HoverRoll from "../components/HoverRoll";

/**
 * `/contact`.
 *
 * The two handles below are the one piece of genuinely approved content in this
 * pair of pages — they were harvested from the old `Footer`, which was mounted
 * nowhere and has since been deleted, and they are the only real contact details
 * anywhere in the repository. The prose around them is scaffolding and is marked
 * as such.
 *
 * No form, deliberately: a form needs somewhere to post to, and this is a static
 * export with no server. A direct message is also what the audience is already
 * holding the app for.
 */
export default function ContactPage() {
  return (
    <PageShell eyebrow="Get in touch" title="Contact">
      {/* TODO(ryan): confirm or replace copy */}
      <p>
        Commissions, collaborations, prints and location enquiries — a direct
        message is the fastest route, and it usually gets a reply within a day
        or two.
      </p>

      {/* Approved content: both handles came from the client. `HoverRoll` is the
          house link treatment and already handles the roll, the underline sweep,
          touch devices, focus and `sr-only` labelling. It renders a plain `<a>`,
          which is correct here precisely because both destinations are external
          and want no `basePath`. */}
      <dl className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <dt
            className="font-[family-name:var(--font-body)] text-[10px] md:text-[11px] uppercase tracking-[0.26em]"
            style={{ color: "var(--color-pine-light)" }}
          >
            Enquiries
          </dt>
          <dd>
            <HoverRoll
              href="https://instagram.com/yrsaclicks"
              external
              text="dm @yrsaclicks"
              className="inline-flex min-h-[44px] items-center font-[family-name:var(--font-body)] uppercase tracking-[0.14em] text-[13px] md:text-[15px]"
            />
          </dd>
        </div>

        <div className="flex flex-col gap-2">
          <dt
            className="font-[family-name:var(--font-body)] text-[10px] md:text-[11px] uppercase tracking-[0.26em]"
            style={{ color: "var(--color-pine-light)" }}
          >
            Follow
          </dt>
          <dd>
            <HoverRoll
              href="https://instagram.com/yrsasjourney"
              external
              text="@yrsasjourney"
              className="inline-flex min-h-[44px] items-center font-[family-name:var(--font-body)] uppercase tracking-[0.14em] text-[13px] md:text-[15px]"
            />
          </dd>
        </div>
      </dl>

      {/* TODO(ryan): confirm or replace copy — and confirm whether a business
          email should be listed here alongside the handles. */}
      <p className="opacity-70">
        Based in the UK, travelling for work. Enquiries in English, please.
      </p>

      <ShellNav
        links={[
          { href: "/about", label: "About" },
          { href: "/watch", label: "Watch" },
          { href: "/", label: "Back to home" },
        ]}
      />
    </PageShell>
  );
}
