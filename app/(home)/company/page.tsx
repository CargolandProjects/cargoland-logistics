import Image from "next/image";

export default function ContactPage() {
  return (
    <div className="w-full bg-white font-sans text-[#1a1a2e]">
      {/* Hero Section */}
      <div className="flex items-center w-full bg-[#FCFCFC]">
        {/* Left Content */}
        <div className="flex-1 px-32 py-16">
          <div className="max-w-2xl">
            <h1 className="font-montserrat font-extrabold text-[60px] leading-[72px] tracking-[-2%] text-[#1a1a2e] mb-2">Fast, Reliable</h1>
            <h2 className="font-montserrat font-extrabold text-[60px] leading-[72px] tracking-[-2%] text-[#1a1a2e] mb-6">
              <span className="text-[#EF3B36]">Global</span> Shipping Solutions
            </h2>
            <p className="font-montserrat font-light text-[18px] leading-[28px] text-gray-600 mb-8">
              Cargoland Africa is a trusted logistics platform providing fast,<br></br> 
              secure, and reliable shipping solutions across Africa and globally,<br></br>
               offering air, ocean, and road freight with real-time tracking and  seamless booking experience. We are committed to delivering excellence in every shipment.
            </p>
            <p className="font-montserrat font-light text-[18px] leading-[28px] text-gray-600 mb-8">
              Cargoland Africa delivers fast, secure logistics across Africa and beyond, offering air, ocean, and road freight with real-time tracking. Our dedicated team ensures your packages arrive safely and on time, every time.
            </p>

           
          </div>
        </div>

        {/* Right Image - Using black_woman image */}
        <div className="pr-24">
          <Image 
            src="/assets/pictures/black_woman.png" 
            alt="Woman with packages" 
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

      {/* White Space Below Stats */}
      <div className="bg-white py-12"></div>

      {/* Vision and Mission Section */}
      <section className="bg-[#FCFCFC] py-20 px-6 md:px-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
            {/* Vision Column */}
            <div>
              <p className="text-[#0B112B] font-bold text-[14px] uppercase tracking-widest mb-4">
                OUR <span className="text-[#E32027]">VISION</span>
              </p>
              <h3 className="font-montserrat font-extrabold text-[32px] text-[#0B112B] mb-6 leading-tight">
                To build Africa's most trusted logistics infrastructure.
              </h3>
              <p className="font-montserrat font-normal text-[16px] text-[#878FA4] leading-relaxed">
                Cargoland Africa is a trusted logistics platform providing fast,
                 <br></br> secure, and reliable shipping solutions across Africa and globally,<br></br>
                 offering air, ocean, and road freight with real-time tracking and<br></br> seamless booking experience.
              </p>
            </div>

            {/* Mission Column */}
            <div>
              <p className="text-[#0B112B] font-bold text-[14px] uppercase tracking-widest mb-4">
                OUR <span className="text-[#E32027]">MISSION</span>
              </p>
              <h3 className="font-montserrat font-extrabold text-[32px] text-[#0B112B] mb-6 leading-tight">
                To build Africa's most trusted logistics infrastructure.
              </h3>
              <p className="font-montserrat font-normal text-[16px] text-[#878FA4] leading-relaxed">
                Cargoland Africa is a trusted logistics platform providing fast,<br></br> 
                secure, and reliable shipping solutions across Africa and globally,<br></br>
                 offering air, ocean, and road freight with real-time tracking and <br></br>seamless booking experience.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Add this section at the very bottom of your file, before the closing </div> */}
<section className="px-6 md:px-32 pb-32 bg-white">
  <div className="max-w-7xl mx-auto">
    <div className="relative w-full aspect-[16/7] md:aspect-[21/7] overflow-hidden rounded-[32px]">
      <Image 
        src="/assets/pictures/delivery_man.png" // Replace with your actual image path
        alt="Cargoland Delivery Personnel"
        fill
        className="object-cover"
        priority
      />
    </div>
  </div>
</section>
    </div>
  );
}
