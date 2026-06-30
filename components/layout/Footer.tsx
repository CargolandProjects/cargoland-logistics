import Link from "next/link";
import TikTok from "../icons/TikTok";
import FaceBook from "../icons/FaceBook";
import Instagram from "../icons/Instagram";
import Youtube from "../icons/Youtube";

const footer = [
  {
    title: "Company",
    links: [
      { title: "About Cargoland", href: "/company" },
      { title: "Book Shipment", href: "#" },
      { title: "Get a Quote", href: "#" },
      { title: "Track", href: "#" },
    ],
  },
  {
    title: "Services",
    links: [
      {
        title: "Air Freight",
        href: "#",
      },
      { title: "Ocean Freight", href: "#" },
      { title: "Road Freight", href: "#" },
      { title: "Get a Quote", href: "#" },
      { title: "Domestic Shipping", href: "#" },
    ],
  },
  {
    title: "Customer Support",
    links: [
      { title: "Help Center", href: "#" },
      { title: "Contact Support", href: "#" },
      { title: "FAQs", href: "#" },
    ],
  },
];

const socialIcons = [
  {
    icon: FaceBook,
    href: "#",
  },
  {
    icon: TikTok,
    href: "#",
  },
  {
    icon: Instagram,
    href: "#",
  },
  {
    icon: Youtube,
    href: "#",
  },
];

export default function Footer() {
  return (
    <footer className="w-full max-md:px-6 md:pl-[86px] md:pr-[101px] pt-15 pb-12 bg-secondary text-white">
      <div className="flex flex-wrap gap-6 justify-between md:grid md:grid-cols-4">
        {footer.map((section, idx) => (
          <div key={idx} className="min-w-[140px]">
            <h3 className="text-xl font-bold leading-7.5 font-roboto">
              {section.title}
            </h3>
            <ul className="space-y-3 mt-4.5">
              {section.links.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.href}
                    className="text-xs font-medium leading-4.5"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="max-md:mt-6 space-y-6 max-md:col-span-2">
          <p className="text-xs font-medium leading-4.5 text-[#D7D7D799]">
            <span className="text-xs font-semibold leading-4.5 text-white/90">
              Address 1:- {" "}
            </span>
            303B Sahco Business Complex Cargo Terminal MMIA (Muritala Muhamemed
            International Airport) Lagos Nigeria (HQ)
          </p>
          <p className="text-xs font-medium leading-4.5 text-[#D7D7D799]">
            <span className="text-xs font-semibold leading-4.5 text-white/90">
              Address 2:- {" "}
            </span>
            Warehouse Office 185 Akowonjo Road Shobo Busstop Lagos Nigeria
          </p>
          <p className="text-xs font-medium leading-4.5 text-[#D7D7D799]">
            <span className="text-xs font-semibold leading-4.5 text-white/90">
              Address 3:- {" "}
            </span>
            Adajudge Road River State, PortHacourt{" "}
          </p>
        </div>
      </div>

      <div className="mt-10 h-px w-full bg-gray-400" />

      <div className="mt-4.5 flex max-md:flex-col gap-5 justify-between items-center">
        <p className="text-xs font-medium leading-4.5">
          © {new Date().getFullYear()} Cargoland Africa. All rights reserved.
        </p>

        <div className="flex gap-2.5">
          {socialIcons.map((icon, idx) => (
            <Link
              href={icon.href}
              key={idx}
              className="size-12.5 rounded-full border border-white flex items-center justify-center"
            >
              <icon.icon className="size-6 text-white" />
            </Link>
          ))}
        </div>

        <div className="flex gap-2 items-center">
          <Link href="#" className="text-xs font-medium leading-4.5">
            Privacy Policy
          </Link>
          <div className="h-[13.5px] w-px bg-gray-400" />
          <Link href="#" className="text-xs font-medium leading-4.5">
            Terms & Conditions
          </Link>
        </div>
      </div>
    </footer>
  );
}
