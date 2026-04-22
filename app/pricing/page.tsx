"use client";

import { useState } from 'react';
import Image from "next/image";

export default function PricingPage() {
  const [filters, setFilters] = useState({
    origin: '',
    destination: '',
    method: '',
    trend: ''
  });

  const popularRoutes = [
    { from: "Nigeria (NG)", to: "Ghana (GH)", time: "Delivery 2-3 Business Days" },
    { from: "Nigeria (NG)", to: "Ghana (GH)", time: "Delivery 2-3 Business Days" },
    { from: "Nigeria (NG)", to: "Ghana (GH)", time: "Delivery 2-3 Business Days" },
    { from: "Nigeria (NG)", to: "Ghana (GH)", time: "Delivery 2-3 Business Days" },
  ];

  const pricingData = Array(10).fill({ 
    route: 'Nigeria → Ghana', 
    origin: 'Nigeria', 
    destination: 'Ghana', 
    air: '$10.5', 
    land: '$10.5', 
    ocean: '$10.5', 
    trend: '+3.2%', 
    trendUp: true 
  });

  return (
    <div className="w-full bg-white font-montserrat">

      <section className="px-4 md:px-16 pb-32 pt-20 bg-white">
  <div className="max-w-[1440px] mx-auto">
    <div className="relative w-full aspect-[16/6] md:aspect-[21/6] overflow-hidden rounded-[16px]">
      <Image 
        src="/assets/pictures/pricing_image.png" 
        alt="Cargoland Delivery Personnel"
        fill
        className="object-cover"
        priority
      />
    </div>
  </div>
</section>
      
  {/* Popular Routes Section */}
<section className="bg-[#E32027] pt-20 pb-32 px-6 md:px-32 text-center text-white relative">
  {/* Header Text */}
  <h2 className="text-[42px] md:text-[48px] font-extrabold mb-3">Popular Routes</h2>
  <p className="text-[16px] opacity-90 mb-6">Most active routes for fast shipping decisions</p>

  {/* Floating White Container */}
  <div className="max-w-7xl mx-auto bg-white rounded-[20px] p-10 shadow-xl relative z-10 translate-y-6">
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      
      {/* Route Card Template - Repeat this 4 times */}
      {[1, 2, 3, 4].map((_, i) => (
        <div key={i} className="bg-[#F8F9FA] border border-[#EDF0F2] rounded-[16px] py-8 px-4 flex flex-col items-center justify-center">
          <div className="text-[#0B112B] font-bold text-[17px] mb-2 flex items-center gap-2">
            Nigeria (NG) <span className="text-[#878FA4] font-normal">→</span> Ghana (GH)
          </div>
          <div className="text-[#878FA4] text-[13px] font-medium uppercase tracking-wide">
            Delivery 2-3 Business Days
          </div>
        </div>
      ))}

    </div>
  </div>
</section>

{/* Spacer to account for the overlapping container's height */}
<div className="h-24 bg-white"></div>

      {/* 2. PRICING TABLE SECTION */}
      <section className="py-20 px-6 md:px-32 bg-white -mt-10 rounded-t-[40px] relative z-10">
        <div className="max-w-7xl mx-auto">
          
          {/* Header Title */}
          <div className="mb-12">
            <h1 className="text-[40px] md:text-[48px] font-extrabold text-[#0B112B] mb-2">Live Prices Today</h1>
            <p className="text-[#878FA4] text-[16px]">Real-time shipping rates per kilogram across popular international routes.</p>
          </div>

          {/* Filter Controls */}
          <div className="mb-8 flex flex-wrap gap-4 items-center">
            <span className="font-bold text-[#0B112B] text-[14px]">Filter by :</span>
            {['Origin', 'Destination', 'Method', 'Trend'].map((filter) => (
              <select key={filter} className="px-4 py-2 border border-[#DEE3E7] rounded-lg bg-[#F9FAFB] text-[#878FA4] text-[14px] focus:outline-none min-w-[140px]">
                <option>{filter}</option>
              </select>
            ))}
            <div className="text-[13px] text-[#878FA4] ml-auto font-medium">
              Updated: 10:40:57 PM
            </div>
          </div>

          {/* Pricing Table */}
          <div className="overflow-hidden rounded-[16px] border border-[#DEE3E7] shadow-sm">
            <table className="w-full">
              <thead>
                <tr className="bg-[#FFF5F5] border-b border-[#DEE3E7]">
                  <th className="px-6 py-5 text-left font-bold text-[#0B112B] text-[13px] uppercase tracking-wider">Route</th>
                  <th className="px-6 py-5 text-left font-bold text-[#0B112B] text-[13px] uppercase tracking-wider">Air /KG</th>
                  <th className="px-6 py-5 text-left font-bold text-[#0B112B] text-[13px] uppercase tracking-wider">Land /KG</th>
                  <th className="px-6 py-5 text-left font-bold text-[#0B112B] text-[13px] uppercase tracking-wider">Ocean /KG</th>
                  <th className="px-6 py-5 text-left font-bold text-[#0B112B] text-[13px] uppercase tracking-wider">Trend</th>
                  <th className="px-6 py-5"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DEE3E7]">
                {pricingData.map((item, index) => (
                  <tr key={index} className="hover:bg-[#F9FAFB] transition-colors group">
                    <td className="px-6 py-5">
                      <div className="font-bold text-[#0B112B] text-[15px]">{item.route}</div>
                      <div className="text-[#878FA4] text-[12px] mt-1 font-medium">Air: 2-4 days • Ocean 18-25 days</div>
                    </td>
                    <td className="px-6 py-5 font-bold text-[#0B112B] text-[15px]">{item.air}</td>
                    <td className="px-6 py-5 font-bold text-[#0B112B] text-[15px]">{item.land}</td>
                    <td className="px-6 py-5 font-bold text-[#0B112B] text-[15px]">{item.ocean}</td>
                    <td className="px-6 py-5">
                      <div className={`font-bold flex items-center gap-1 text-[14px] ${item.trendUp ? 'text-[#1DB954]' : 'text-[#E32027]'}`}>
                        <span className="text-[18px] leading-none">↗</span> {item.trend}
                      </div>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <button className="border border-[#E32027] text-[#E32027] px-8 py-2 rounded-lg font-bold text-[14px] hover:bg-[#E32027] hover:text-white transition-all shadow-sm">
                        Book
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

    </div>
  );
}