import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full">
      {/* Track Shipment Banner */}
     <section className="bg-[#E32027] py-20 px-6 md:px-16 flex flex-col lg:flex-row items-center justify-center gap-100 overflow-hidden">
  {/* Changed px-32 to px-16 and justify-between to justify-center */}
  <div className="max-w-xl text-white">
    <h2 className="font-montserrat font-extrabold text-[44px] leading-tight mb-6">
      Track Your Shipment in Real Time
    </h2>
  <p className="font-montserrat font-light text-white/90 text-[18px] mb-10 whitespace-nowrap">
  Enter your tracking ID to monitor shipment progress from pickup to delivery.
</p>
    
    <div className="bg-white p-1.5 rounded-full flex items-center w-full max-w-md shadow-lg">
      <input 
        type="text" 
        placeholder="Enter your tracking number"
        className="bg-transparent border-none outline-none px-6 py-3 w-full text-[#1a1a2e] placeholder:text-gray-400 font-medium"
      />
      <button className="bg-[#E32027] text-white px-8 py-3 rounded-full font-bold text-[16px] hover:bg-red-700 transition-all flex items-center gap-2 whitespace-nowrap">
        Track <span className="text-lg">→</span>
      </button>
    </div>
  </div>

  {/* Tracking Image */}
  <div className="relative w-full lg:w-[450px]"> {/* Slightly reduced width */}
    <Image 
      src="/assets/pictures/package.png" 
      alt="Delivery person with packages" 
      width={500} 
      height={400}
      className="rounded-[16px] object-cover shadow-2xl" 
    />
  </div>
</section>

      {/* Main Footer Links */}
      <section className="bg-[#0B112B] text-white pt-20 pb-10 px-6 md:px-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
            {/* Company Column */}
            <div>
              <h5 className="font-bold text-[18px] mb-8">Company</h5>
              <ul className="flex flex-col gap-4 text-[#878FA4] text-[15px] font-medium">
                <li className="hover:text-white cursor-pointer transition-colors">About Cargoland</li>
                <li className="hover:text-white cursor-pointer transition-colors">Get a Quote</li>
                <li className="hover:text-white cursor-pointer transition-colors">Our Network</li>
                <li className="hover:text-white cursor-pointer transition-colors">Partners</li>
                <li className="hover:text-white cursor-pointer transition-colors">News & Updates</li>
              </ul>
            </div>

            {/* Services Column */}
            <div>
              <h5 className="font-bold text-[18px] mb-8">Services</h5>
              <ul className="flex flex-col gap-4 text-[#878FA4] text-[15px] font-medium">
                <li className="hover:text-white cursor-pointer transition-colors">Air Freight</li>
                <li className="hover:text-white cursor-pointer transition-colors">Ocean Freight</li>
                <li className="hover:text-white cursor-pointer transition-colors">Road Freight</li>
                <li className="hover:text-white cursor-pointer transition-colors">Get a quote</li>
                <li className="hover:text-white cursor-pointer transition-colors">Domestic Shipping</li>
              </ul>
            </div>

            {/* Shipment Tools Column */}
            <div>
              <h5 className="font-bold text-[18px] mb-8">Shipment Tools</h5>
              <ul className="flex flex-col gap-4 text-[#878FA4] text-[15px] font-medium">
                <li className="hover:text-white cursor-pointer transition-colors">Book Shipment</li>
                <li className="hover:text-white cursor-pointer transition-colors">Track Shipment</li>
                <li className="hover:text-white cursor-pointer transition-colors">Shipping Guidelines</li>
              </ul>
            </div>

            {/* Customer Support Column */}
            <div>
              <h5 className="font-bold text-[18px] mb-8">Customer Support</h5>
              <ul className="flex flex-col gap-4 text-[#878FA4] text-[15px] font-medium">
                <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  <Link href="/contact-support">Contact Support</Link>
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">
                  <Link href="/faq">FAQs</Link>
                </li>
                <li className="hover:text-white cursor-pointer transition-colors">Report an Issue</li>
              </ul>
            </div>
          </div>

          {/* Address Bar */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pb-12 text-[#878FA4] text-[13px] leading-relaxed">
            <p><strong>Address 1:-</strong> 303B Sahco Business Complex Cargo Terminal MMIA (Muritala Muhamemed International Airport) Lagos Nigeria (HQ)</p>
            <p><strong>Address 2:-</strong> Warehouse Office 185 Akowonjo Road Shobo Busstop Lagos Nigeria</p>
            <p><strong>Address 3:-</strong> Adajudge Road River State, PortHacourt</p>
          </div>

          {/* Bottom Legal Bar */}
          <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[#878FA4] text-[14px]">© 2026 Cargoland Africa. All rights reserved.</p>
            
            {/* Social Icons Placeholder */}
            <div className="flex gap-4">
              {[1,2,3,4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-[#0B112B] transition-all cursor-pointer">
                  {/* Replace with Lucide icons like <Facebook /> */}
                </div>
              ))}
            </div>

            <div className="flex gap-6 text-[#878FA4] text-[14px]">
              <Link href="/privacy-policy" className="hover:text-white cursor-pointer transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms-conditions" className="hover:text-white cursor-pointer transition-colors">
                Terms & Conditions
              </Link>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
