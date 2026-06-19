import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How can I track my shipment on Cargoland Africa?",
    answer:
      "You can track your shipment by entering your tracking ID on the tracking page of the platform. This provides real-time updates on the status and location of your shipment.",
  },
  {
    question:
      "What shipping options are available (Air, Land, or Ocean freight)?",
    answer:
      "Cargoland Africa offers multiple shipping options including air freight for speed, ocean freight for cost efficiency, and land freight for regional deliveries.",
  },
  {
    question: "How is the shipping cost calculated for my package?",
    answer:
      "Shipping costs are calculated based on factors like weight, dimensions, destination, shipping method, and any additional services such as insurance or express delivery.",
  },
  {
    question: "Which countries does Cargoland Africa deliver to?",
    answer:
      "Cargoland Africa delivers to multiple countries across Africa and internationally, depending on the selected shipping route and service availability.",
  },
  {
    question: "How long does it take for a shipment to be delivered?",
    answer:
      "Delivery time depends on the shipping method and destination. Air freight is typically the fastest, while ocean and land freight may take longer depending on distance and logistics.",
  },
  {
    question: "Can I get a real-time quote before booking a shipment?",
    answer:
      "Yes, you can get a real-time shipping quote by entering your shipment details such as origin, destination, weight, and dimensions before confirming your booking.",
  },
  {
    question: "What should I do if my shipment is delayed or lost?",
    answer:
      "If your shipment is delayed or lost, you should contact customer support immediately with your tracking ID so they can investigate and provide updates or initiate a resolution process.",
  },
];

const Faqs = () => {
  return (
    <section className="padding-x padding-y">
      <div className="grid md:grid-cols-2 gap-6 md:gap-8 lg:gap-15">
        <div className="max-md:flex flex-col max-w-[453px] max-md:mx-auto">
          <h2 className="sec-heading md:text-left!">
            Frequently Asked Questions
          </h2>
          <p className="sec-paragraph md:text-left!">
            Everything you need to know about our shipping, pricing and
            platform.
          </p>
        </div>

        <Accordion type="single" collapsible>
          {faqs.map((faq, idx) => (
            <AccordionItem
              value={faq.question}
              key={idx}
              className=" border-0!"
            >
              <AccordionTrigger className="group p-0 text-xl font-normal leading-8 [&>svg]:hidden! gap-8 md:gap-3">
                {faq.question}
                <div className="size-10 shrink-0 rounded-lg bg-primary-light flex items-center justify-center">
                  <ChevronDown className="size-6 text-primary-dark group-data-[state=open]:rotate-180 transition-transform duration-200" />
                </div>
              </AccordionTrigger>
              <AccordionContent className="pt-1 leading-5 font-roboto font-light">{faq.answer}</AccordionContent>
              
              <div
                className={`${
                  idx !== faqs.length - 1 ? "" : "hidden"
                } h-px w-full bg-neutral-300 mt-4 mb-10 `}
              />
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default Faqs;
