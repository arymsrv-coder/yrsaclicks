import type { Metadata } from "next";

// Indexable, for the same reason as `/about`.
export const metadata: Metadata = {
  title: "Contact — yrsaclicks",
  description:
    "Get in touch with yrsaclicks — commissions, collaborations and location enquiries.",
};

export default function ContactLayout({ children }: LayoutProps<"/contact">) {
  return children;
}
