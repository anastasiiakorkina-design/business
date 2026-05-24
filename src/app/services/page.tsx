import type { Metadata } from "next";
import ServicesClient from "./ServicesClient";

export const metadata: Metadata = {
  title: "Elite Programs & Services",
  description:
    "Explore Apex Coaching's premium programs—from 1-on-1 intensives to group accelerators. Proven frameworks that scale entrepreneurs from six to eight figures.",
  openGraph: {
    title: "Elite Programs & Services | Apex Coaching",
    description:
      "Premium coaching programs for ambitious entrepreneurs. Clarity, systems, and uncommon execution.",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}
