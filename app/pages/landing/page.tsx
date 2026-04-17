"use client";

import { useState } from 'react';
import Image from "next/image";

export default function LandingPage() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full bg-[#FCFCFC] min-h-screen font-sans text-[#1a1a2e]">
      {/* Top Red Bar */}
      <div className="bg-[#EF3B36] text-white py-2 px-4 md:px-12 flex justify-between items-center text-xs md:text-sm">
        <div className="flex gap-6">
          <a href="mailto:info@cargoland.africa" className="flex items-center gap-2 hover:opacity-90">
            <Image src="/assets/icons/mailIcon.png" alt="Mail" width={16} height={16} />
            <span>info@cargoland.africa</span>
          </a>
          <a href="tel:+2348037631001" className="flex items-center gap-2 hover:opacity-90">
            <Image src="/assets/icons/callIcon.png" alt="Call" width={16} height={16} />
            <span>(081) 2763-1001, (080) 3923-1045</span>
          </a>
        </div>
        <div className="flex items-center gap-2">
          <Image src="/assets/icons/tabler_world-filled.png" alt="Location" width={16} height={16} />
          <span>Lagos, NG ▾</span>
        </div>
      </div>

      {/* Navigation Bar */}
      <nav className="px-6 md:px-12 py-4 flex justify-between items-center bg-white">
        <div className="flex items-center">
          {/* Logo size: 151x48 */}
          <Image src="/assets/pictures/cargoLandLogo.png" alt="CargoLand Logo" width={151} height={48} />
        </div>

        <div className="hidden md:flex gap-8 items-center font-medium">
          <button className="hover:text-[#EF3B36]">Services</button>
          <button className="hover:text-[#EF3B36]">Tracking</button>
          <button className="hover:text-[#EF3B36]">Get a Quote</button>
          <button className="hover:text-[#EF3B36]">Pricing</button>
          <button className="hover:text-[#EF3B36]">Company</button>
          <button className="flex items-center gap-2 hover:text-[#EF3B36]">
            <Image src="/assets/icons/userProfile.png" alt="User" width={20} height={20} />
            Login/Register
          </button>
        </div>

        <button className="md:hidden text-2xl" onClick={() => setIsMenuOpen(!isMenuOpen)}>☰</button>
      </nav>

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
    </div>
  );
}