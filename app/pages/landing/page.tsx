import Image from "next/image";
import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="w-full bg-[#FCFCFC] font-sans text-[#1a1a2e]">

      {/* Hero Section */}
      <div className="flex items-center w-full bg-[#FCFCFC]">
        {/* Left Content */}
        <div className="flex-1 px-32 py-16">
          <div className="max-w-lg">
            <h1 className="font-montserrat font-extrabold text-[60px] leading-[72px] tracking-[-2%] text-[#1a1a2e] mb-2">Fast & Reliable</h1>
            <h2 className="font-montserrat font-extrabold text-[60px] leading-[72px] tracking-[-2%] text-[#1a1a2e] mb-6">
              <span className="text-[#EF3B36]">Global</span> Shipping
            </h2>
            <p className="font-montserrat font-light text-[18px] leading-[28px] text-gray-600 mb-8">Ship packages across countries via Air, Ocean, or Road freight with real-time tracking and transparent pricing.</p>

            <div className="flex gap-2 mb-8">
              <input type="text" placeholder="Enter your tracking number" className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#EF3B36] outline-none" />
              <button className="bg-[#EF3B36] text-white px-6 py-3 rounded-lg font-semibold hover:bg-red-600 transition">Track →</button>
            </div>
          </div>
        </div>

        {/* Right Image - Exact size: 675x569 */}
        <div className="pr-24">
          <Image 
            src="/assets/pictures/package.png" 
            alt="Person holding box" 
            width={675}
            height={569}
            className="rounded-lg object-cover"
          />
        </div>
      </div>

      {/* White Space Above Stats */}
      <div className="bg-white py-8"></div>

      {/* Stats Section */}
      <div className="bg-[#EF3B36] text-white py-12 px-12 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
        <div>
          <div className="text-4xl font-bold mb-2">10,000+</div>
          <div className="text-base font-medium">Shipments Monthly</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2">99.2%</div>
          <div className="text-base font-medium">On-time Delivery</div>
        </div>
        <div>
          <div className="text-4xl font-bold mb-2">4.8/5</div>
          <div className="text-base font-medium">Customer Rating</div>
        </div>
      </div>


    {/* Choose Your Freight Section */}
<section className="py-24 px-6 md:px-32 bg-[#FCFCFC]">
  <div className="text-center mb-16">
    <h2 className="font-montserrat font-extrabold text-[44px] tracking-tight text-[#1a1a2e] mb-4">
      Choose Your Freight
    </h2>
    <p className="font-montserrat font-light text-gray-500 max-w-2xl mx-auto text-[18px]">
      Flexible shipping solutions tailored to your needs — from express air to economical ocean freight.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
    {[
      {
        title: "Air Freight",
        desc: "Fast air freight shipping with secure handling globally.",
        link: "Ship Via Air",
        icon: "/assets/icons/air-icon-white.png",
        watermark: "/assets/vectors/air-bg-faint.png",
      },
      {
        title: "Ocean Freight",
        desc: "Reliable ocean freight shipping with large capacity and affordability.",
        link: "Ship Via Ocean",
        icon: "/assets/icons/ocean-icon-white.png",
        watermark: "/assets/vectors/ocean-bg-faint.png",
      },
      {
        title: "Road Freight",
        desc: "Reliable road freight with tracked vehicles and delivery.",
        link: "Ship Via Road",
        icon: "/assets/icons/road-icon-white.png",
        watermark: "/assets/vectors/road-bg-faint.png",
      },
    ].map((item, index) => (
      <div 
        key={index}
        className="relative overflow-hidden bg-[#FBDEDF] rounded-[32px] p-10 flex flex-col items-start min-h-[420px] transition-transform hover:-translate-y-1 duration-300"
      >
        {/* Top Icon Circle */}
        <div className="w-16 h-16 bg-[#E32027] rounded-full flex items-center justify-center mb-8 relative z-10 shadow-sm">
          <Image 
            src={item.icon} 
            alt={item.title} 
            width={28} 
            height={28} 
          />
        </div>

        {/* Text Content */}
        <div className="relative z-10 flex-1">
          <h3 className="font-montserrat font-extrabold text-[32px] text-[#1a1a2e] mb-4 tracking-tight">
            {item.title}
          </h3>
          <p className="font-montserrat font-normal text-[17px] leading-[26px] text-[#1a1a2e]/80 mb-10 max-w-[280px]">
            {item.desc}
          </p>
          
          {/* Specific Pill Button from Image */}
          <button className="bg-[#fcf0f0] hover:bg-white transition-colors py-3 px-7 rounded-xl flex items-center gap-3 text-[#E32027] font-bold text-[16px]">
            {item.link} <span className="text-xl">→</span>
          </button>
        </div>

        {/* Watermark Image - Positioned to bleed off the edge */}
        <div className="absolute bottom-[-15%] right-[-10%] w-[260px] h-[260px] pointer-events-none opacity-[0.15]">
          <Image 
            src={item.watermark} 
            alt="" 
            width={260}
            height={260}
            className="object-contain"
          />
        </div>
      </div>
    ))}
  </div>
</section>

{/* Shipping Prices Section */}
<section className="py-24 px-6 md:px-32 bg-[#FCFCFC]">
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-center items-start gap-12 lg:gap-40">
    
    {/* Left Side: Content */}
    <div className="flex-shrink-0">
      <h2 className="font-montserrat font-extrabold text-[44px] leading-tight text-[#1a1a2e] mb-4 whitespace-nowrap">
        Shipping Prices Today
      </h2>
      
      {/* max-w-[420px] ensures the text stays on one line until 
        "international" and then breaks to "routes."
      */}
      <p className="font-montserrat font-light text-gray-500 text-[18px] mb-10 leading-[28px] max-w-[420px]">
        Real-time shipping rates per kilogram across popular international routes.
      </p>
      
      <button className="bg-[#E32027] text-white px-10 py-4 rounded-xl font-medium text-[16px] hover:bg-red-700 transition-all shadow-md shadow-red-200">
        Book Shipment
      </button>
    </div>

    {/* Right Side: Price List */}
    <div className="w-full max-w-[620px] flex flex-col gap-4">
      {[
        { type: "Air Freight Express", route: "NG → GB" },
        { type: "Ocean Freight Express", route: "NG → GB" },
        { type: "Road Freight Express", route: "NG → GB" },
      ].map((price, index) => (
        <div 
          key={index} 
          className="bg-[#F8FAFB] border border-[#DEE3E7] rounded-[12px] p-6 flex items-center justify-between shadow-sm"
        >
          {/* Route & Info Group */}
          <div className="flex items-center gap-10">
            <div className="font-bold text-[#1a1a2e] text-[14px] tracking-widest whitespace-nowrap">
              {price.route}
            </div>
            
            <div className="flex flex-col">
              <h4 className="font-bold text-[#1a1a2e] text-[18px] leading-tight">
                {price.type}
              </h4>
              <p className="text-[#878FA4] text-[13px] mt-1 font-medium">
                Delivery 2-3 Business Days
              </p>
            </div>
          </div>

          {/* Pricing & CTA Group */}
          <div className="flex flex-col items-end gap-3">
            <div className="text-[26px] font-extrabold text-[#1a1a2e] flex items-start">
              <span className="text-[18px] mt-1 mr-0.5 font-bold">₦</span>30,500.50
            </div>
            <button className="border border-[#E32027] text-[#E32027] px-8 py-2 rounded-lg font-normal text-[15px] hover:bg-[#E32027] hover:text-white transition-all">
              Book Now
            </button>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Live Prices Table Section */}
<section className="bg-[#E32027] py-20 px-6 md:px-32 text-white">
  <div className="max-w-7xl mx-auto">
    {/* Header Content */}
    <div className="text-center mb-12">
      <h2 className="font-montserrat font-extrabold text-[44px] mb-4">
        Live Prices Today
      </h2>
      <p className="font-montserrat font-light text-white/80 text-[18px] max-w-2xl mx-auto leading-relaxed">
        Real-time shipping rates per kilogram across popular international routes.
      </p>
    </div>

    {/* Controls Row */}
    <div className="flex flex-col md:flex-row justify-between items-end md:items-center mb-6 gap-4">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium">Filter by origin:</label>
        <select className="bg-[#FDF2F2] text-[#1a1a2e] px-4 py-3 rounded-xl w-48 outline-none appearance-none cursor-pointer font-medium">
          <option>All</option>
          <option>Nigeria</option>
          <option>Ghana</option>
        </select>
      </div>
      <div className="text-sm font-light text-white/90">
        Updated: 10:40:57 PM
      </div>
    </div>

    {/* Table Container */}
    <div className="bg-white rounded-[20px] overflow-hidden shadow-2xl">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="bg-[#FBDEDF] text-[#1a1a2e] font-bold text-sm uppercase tracking-wider">
            <th className="px-8 py-5">Route</th>
            <th className="px-8 py-5">Air /KG</th>
            <th className="px-8 py-5">Land /KG</th>
            <th className="px-8 py-5">Ocean /KG</th>
            <th className="px-8 py-5">Tread</th>
            <th className="px-8 py-5"></th>
          </tr>
        </thead>
        <tbody className="text-[#1a1a2e]">
          {[1, 2, 3, 4, 5, 6].map((row, index) => (
            <tr 
              key={index} 
              className="border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-0"
            >
              <td className="px-8 py-6">
                <div className="flex items-center gap-3 font-bold text-lg">
                  Nigeria <span className="text-[#E32027]">→</span> Ghana
                </div>
                <div className="text-[#878FA4] text-xs mt-1 font-medium">
                  Air: 2-4 days • Ocean 18-25 days
                </div>
              </td>
              <td className="px-8 py-6 font-extrabold text-lg">$10.5</td>
              <td className="px-8 py-6 font-extrabold text-lg">$10.5</td>
              <td className="px-8 py-6 font-extrabold text-lg">$10.5</td>
              <td className="px-8 py-6">
                <div className={`flex items-center gap-1 font-bold ${index % 2 === 0 ? 'text-[#1DB954]' : 'text-[#E32027]'}`}>
                  <span className="text-xl">{index % 2 === 0 ? '↗' : '↘'}</span>
                  +3.2%
                </div>
              </td>
              <td className="px-8 py-6">
                <button className="border border-[#E32027] text-[#E32027] px-6 py-2 rounded-xl font-medium hover:bg-[#E32027] hover:text-white transition-all">
                  Book
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* See More Button */}
    <div className="text-center mt-12">
      <Link href="/pricing" className="inline-block border border-white text-white px-12 py-3 rounded-xl font-medium hover:bg-white hover:text-[#E32027] transition-all">
        See more
      </Link>
    </div>
  </div>
</section>

{/* How It Works Section */}
<section className="py-24 px-6 md:px-32 bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="text-center mb-16">
      <h2 className="font-montserrat font-extrabold text-[44px] text-[#1a1a2e] mb-4">
        How It Works
      </h2>
      <p className="font-montserrat font-light text-gray-500 text-[18px]">
        Get your shipment booked and tracked in four simple steps.
      </p>
    </div>

    <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
      {/* Left Side: Image Container */}
      <div className="w-full lg:w-1/2">
        <div className="relative rounded-[24px] overflow-hidden shadow-xl">
          <Image 
            src="/assets/pictures/black_woman.png" 
            alt="Person packing boxes" 
            width={600} 
            height={500}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Right Side: Vertical Steps */}
      <div className="w-full lg:w-1/2 flex flex-col">
        {[
          {
            title: "Select shipping mode",
            desc: "Choose Air, Ocean, or Road freight.",
          },
          {
            title: "Enter shipment details",
            desc: "Pickup location, destination, weight, package type.",
          },
          {
            title: "Choose carrier & pay",
            desc: "Select available carrier and complete payment.",
          },
          {
            title: "Track shipment",
            desc: "Receive a unique tracking ID and monitor delivery.",
          },
        ].map((step, index, array) => (
          <div key={index} className="flex gap-8">
            {/* Step Indicator Column */}
            <div className="flex flex-col items-center">
              {/* Outer Circle with your specified BG Color */}
              <div className="w-12 h-12 rounded-full bg-[#FBDEDF] flex items-center justify-center relative z-10 flex-shrink-0">
                <Image 
                  src="/assets/vectors/bulls-eye.png" // Replace with your circle icon image path
                  alt="Step icon"
                  width={24}
                  height={24}
                  className="object-contain"
                />
              </div>
              
              {/* Vertical Dashed Line matching image_b9f90c.png */}
              {index !== array.length - 1 && (
                <div className="w-0 h-20 border-l-2 border-dashed border-[#E32027] my-1 opacity-80"></div>
              )}
            </div>

            {/* Step Text Content */}
            <div className="pb-10 pt-1">
              <h3 className="font-montserrat font-bold text-[22px] text-[#1a1a2e] mb-1 leading-tight">
                {step.title}
              </h3>
              <p className="font-montserrat font-normal text-[#878FA4] text-[16px] leading-relaxed">
                {step.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
</section>

{/* FAQ Section */}
<section className="py-24 px-6 md:px-32 bg-white">
  {/* Changed lg:gap-32 to lg:gap-52 for a much larger horizontal gap */}
  <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between gap-16 lg:gap-52">
    
    {/* Left Side: Header Content */}
    <div className="lg:w-1/3 flex-shrink-0">
      <h2 className="font-montserrat font-extrabold text-[44px] leading-tight text-[#1a1a2e] mb-6">
        Frequently Asked <br /> Questions
      </h2>
      <p className="font-montserrat font-light text-[#878FA4] text-[18px] leading-relaxed max-w-[320px]">
        Everything you need to know about our shipping, pricing and platform.
      </p>
    </div>

  

    {/* Right Side: Accordion List */}
    <div className="lg:w-2/3 flex flex-col">
      {[
        "How can I track my shipment on Cargoland Africa?",
        "What shipping options are available (Air, Land, or Ocean freight)?",
        "How is the shipping cost calculated for my package?",
        "Which countries does Cargoland Africa deliver to?",
        "How long does it take for a shipment to be delivered?",
        "Can I get a real-time quote before booking a shipment?",
        "What should I do if my shipment is delayed or lost?"
      ].map((question, index) => (
        <div 
          key={index} 
          className="group flex items-center justify-between py-8 border-b border-gray-100 last:border-0 cursor-pointer"
        >
          {/* Question Text */}
          <h4 className="font-montserrat font-medium text-[18px] text-[#1a1a2e] group-hover:text-[#E32027] transition-colors pr-4">
            {question}
          </h4>

          {/* Toggle Button */}
          <div className="flex-shrink-0 w-10 h-10 bg-[#FBDEDF] rounded-lg flex items-center justify-center transition-transform duration-300">
            <svg 
              width="14" 
              height="8" 
              viewBox="0 0 14 8" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className="text-[#E32027]"
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
        </div>
      ))}
    </div>
  </div>
</section>
    </div>
  );
}
