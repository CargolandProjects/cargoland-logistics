import { ReactNode } from 'react';
import AuthNavbar from '@/components/layout/AuthNavbar';

interface AuthLayoutProps {
  children: ReactNode;
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <AuthNavbar />
      <main className="flex-1">
        {children}
      </main>
      <AuthFooter />
    </div>
  );
}

function AuthFooter() {
  return (
    <footer className="w-full">
      {/* Main Footer Links (excluding Track Shipment Banner) */}
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
                <li className="hover:text-white cursor-pointer transition-colors">Contact Support</li>
                <li className="hover:text-white cursor-pointer transition-colors">FAQs</li>
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
              <a href="/privacy-policy" className="hover:text-white cursor-pointer transition-colors">
                Privacy Policy
              </a>
              <a href="/terms-conditions" className="hover:text-white cursor-pointer transition-colors">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </section>
    </footer>
  );
}
