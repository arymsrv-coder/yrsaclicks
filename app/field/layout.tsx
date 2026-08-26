import type { Metadata } from "next";

// Indexable. This is the public half of the site and the half a search result
// should land on.
export const metadata: Metadata = {
  title: "Field — yrsaclicks",
  description:
    "Location and adventure photography by yrsaclicks — roadside, coastline and high ground, and the films that come back with it.",
};

export default function FieldLayout({ children }: LayoutProps<"/field">) {
  return children;
}
