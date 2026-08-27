import Image from "next/image";
import Link from "next/link";

/**
 * One of the two directions the crossroads offers.
 *
 * A still under a wash, a label, and a line of context. The whole card is the
 * target — not a button sitting on top of a picture — because at this point in
 * the journey the picture *is* the argument for the branch, and asking someone
 * to hit a small control inside it on a phone is worse in every way.
 *
 * Internal branches take `href` through `next/link`, which applies `basePath`;
 * an external one is a plain anchor in a new tab, which wants no prefix.
 */
export default function BranchCard({
  href,
  external = false,
  eyebrow,
  title,
  blurb,
  src,
  alt,
  objectPosition = "center",
  priority = false,
}: {
  href: string;
  external?: boolean;
  eyebrow: string;
  title: string;
  blurb: string;
  src: string;
  alt: string;
  objectPosition?: string;
  priority?: boolean;
}) {
  const inner = (
    <>
      <Image
        src={src}
        alt={alt}
        fill
        className="branch-still object-cover"
        style={{ objectPosition }}
        // Both cards are above the fold on desktop and the first is on a phone.
        // `priority` is deprecated in 16; eager loading with a raised fetch
        // priority is the documented replacement.
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        draggable={false}
      />

      {/* The wash. It is what makes paper type legible over an unknown part of a
          photograph, and it lifts as the card is pointed at, so the picture
          answers before the label does. */}
      <div
        className="branch-veil absolute inset-0"
        style={{ backgroundColor: "var(--color-ink)" }}
      />

      <div className="relative flex h-full flex-col justify-end gap-2 p-6 md:p-8">
        <p
          className="font-[family-name:var(--font-body)] text-[10px] md:text-[11px] uppercase tracking-[0.26em]"
          style={{ color: "var(--color-pine-light)" }}
        >
          {eyebrow}
        </p>

        <h2 className="font-[family-name:var(--font-body)] font-extrabold uppercase text-[30px] md:text-[38px] leading-[0.98] tracking-[-0.02em]">
          {title}
        </h2>

        <p className="max-w-[34ch] font-[family-name:var(--font-body)] text-[13px] md:text-[14px] leading-relaxed opacity-80">
          {blurb}
        </p>
      </div>
    </>
  );

  const className =
    "branch-card group relative block aspect-[4/5] w-full overflow-hidden rounded-[10px] border md:aspect-[3/4] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-bone)]";

  const style = {
    borderColor: "color-mix(in srgb, var(--color-paper) 22%, transparent)",
    color: "var(--color-paper)",
  };

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
        style={style}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link href={href} className={className} style={style}>
      {inner}
    </Link>
  );
}
