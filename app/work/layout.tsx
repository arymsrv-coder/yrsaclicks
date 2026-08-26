import type { Metadata } from "next";

// Indexable, and the most important page on the site to have indexed: it is the
// one that shows yrsaclicks is a working photographer with public work, rather
// than a single link behind a gate.
export const metadata: Metadata = {
  title: "Work — yrsaclicks",
  description:
    "The work of yrsaclicks — location and adventure photography in the field, and the private archive.",
};

export default function WorkLayout({ children }: LayoutProps<"/work">) {
  return children;
}
