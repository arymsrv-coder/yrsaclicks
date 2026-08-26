import type { Metadata } from "next";

// Deliberately indexable, unlike `/members`. The whole reason these two routes
// exist is that the site should read as a real photographer's site to anyone
// who looks it up — a `noindex` here would defeat the point of building them.
export const metadata: Metadata = {
  title: "About — yrsaclicks",
  description:
    "yrsaclicks — adventure photographer and model, working on both sides of the lens.",
};

export default function AboutLayout({ children }: LayoutProps<"/about">) {
  return children;
}
