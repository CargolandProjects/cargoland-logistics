"use client";

import { useState } from 'react';

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "How can I track my shipment on Cargoland Africa?",
      answer: "You can track your shipment by entering your tracking ID on our tracking page. You'll receive real-time updates on your package's location and delivery status."
    },
    {
      question: "What shipping options are available (Air, Land, or Ocean freight)?",
      answer: "We offer three main shipping options: Air Freight for fast delivery, Ocean Freight for cost-effective international shipping, and Road Freight for reliable land transportation."
    },
    {
      question: "How is the shipping cost calculated for my package?",
      answer: "Shipping costs are calculated based on the weight of your package, the shipping method chosen, the destination country, and current market rates."
    },
    {
      question: "Which countries does Cargoland Africa deliver to?",
      answer: "Cargoland Africa delivers to multiple countries across Africa and internationally. Check our network page or contact our support team for a complete list."
    },
    {
      question: "How long does it take for a shipment to be delivered?",
      answer: "Delivery times vary depending on the shipping method: Air Freight (2-4 days), Ocean Freight (18-25 days), and Road Freight (5-10 days)."
    },
    {
      question: "Can I get a real-time quote before booking a shipment?",
      answer: "Yes! You can get a real-time quote by entering your shipment details on our platform. Our pricing is transparent and updated regularly."
    },
    {
      question: "What should I do if my shipment is delayed or lost?",
      answer: "If your shipment is delayed or lost, please contact our support team immediately with your tracking ID. We'll investigate and work to resolve the issue."
    }
  ];

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full bg-white font-montserrat">
      {/* Header Section */}
      <section className="bg-[#FCE9E9] py-24 px-6 text-center">
        <h1 className="font-extrabold text-[48px] md:text-[56px] text-[#0B112B] mb-4">
          Frequently Asked Questions
        </h1>
        <p className="font-normal text-[16px] md:text-[18px] text-[#878FA4] max-w-2xl mx-auto leading-relaxed">
          Everything you need to know about our shipping, pricing and platform.
        </p>
      </section>

      {/* FAQ Items with simple divider lines */}
      <section className="py-20 px-6 md:px-32">
        <div className="max-w-4xl mx-auto">
          <div className="divide-y divide-gray-200">
            {faqs.map((faq, index) => (
              <div key={index} className="py-2">
                <button
                  onClick={() => toggleAccordion(index)}
                  className="w-full py-6 flex items-center justify-between bg-white transition-colors"
                >
                  <h3 className="font-bold text-[18px] md:text-[20px] text-[#0B112B] text-left pr-4">
                    {faq.question}
                  </h3>
                  <div className="flex-shrink-0 w-10 h-10 bg-[#FDF2F2] rounded-lg flex items-center justify-center">
                    <svg
                      width="14"
                      height="8"
                      viewBox="0 0 14 8"
                      fill="none"
                      className={`text-[#E32027] transition-transform duration-300 ${
                        openIndex === index ? 'rotate-180' : ''
                      }`}
                    >
                      <path
                        d="M1 1L7 7L13 1"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </button>

                {/* Answer Content */}
                {openIndex === index && (
                  <div className="pb-6 bg-white">
                    <p className="font-normal text-[16px] text-[#878FA4] leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}