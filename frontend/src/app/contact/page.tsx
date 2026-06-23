import type { Metadata } from "next";
import { ContactClient } from "@/components/contact/ContactClient";
import { business, siteName } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: `Contact ${siteName} for Jaganmathe gold and silver artwork commissions. Visit us in Udupi, Karnataka or call ${business.phoneDisplay}.`,
  alternates: { canonical: "/contact" },
  openGraph: {
    title: `Contact | ${siteName}`,
    description: "Get in touch for gold and silver artwork commissions at Shri Jaganmathe, Udupi.",
    url: "/contact",
  },
};

export default function ContactPage() {
  return <ContactClient />;
}
