import ContactPageContent from "@/components/websitePages/ContactPageContent";

export const metadata = {
  title: "Contact Us",
  description:
    "Reach out to Cargoland Logistics for freight quotes, parcel tracking, or customer support. We respond within 24 hours.",
  keywords: [
    "contact logistics",
    "freight inquiry Nigeria",
    "Cargoland phone number",
  ],
  openGraph: {
    title: "Contact Cargoland Logistics",
    description: "Get a free quote for your air, sea, or road freight today.",
  },
};

export default function ContactPage() {
  return <ContactPageContent />;
}
