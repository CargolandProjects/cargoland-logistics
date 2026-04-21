"use client";

import { useState } from 'react';
import Image from "next/image";

export default function ContactSupportPage() {
  const [formData, setFormData] = useState({
    inquiryType: '',
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="w-full bg-white">
      {/* Header Section with Specific BG Color */}
      <section className="bg-[#FCE9E9] py-24 px-6 text-center">
        <h1 className="font-montserrat font-extrabold text-[48px] md:text-[56px] text-[#0B112B] mb-4">
          Contact Support
        </h1>
        <p className="font-montserrat font-light text-[16px] md:text-[18px] text-[#878FA4] max-w-2xl mx-auto leading-relaxed">
          Our support team is always ready to assist you with any questions, concerns, or shipping needs anytime.
        </p>
      </section>

      {/* Form Section - max-w-7xl for Wider Fields */}
      <section className="py-20 px-6 md:px-32 max-w-7xl mx-auto">
        <form onSubmit={handleSubmit} className="space-y-10">
          
          {/* First Row: Wider Grid spacing */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="block text-[#0B112B] font-bold text-[16px] mb-4">
                Select inquiry type
              </label>
              <div className="relative">
                <select
                  name="inquiryType"
                  value={formData.inquiryType}
                  onChange={handleChange}
                  className="w-full px-6 py-4 border border-[#DEE3E7] rounded-xl bg-white text-[#878FA4] focus:outline-none focus:ring-2 focus:ring-[#E32027] appearance-none cursor-pointer"
                >
                  <option value="">Local Deliveries</option>
                  <option value="air-freight">Air Freight</option>
                  <option value="ocean-freight">Ocean Freight</option>
                </select>
                <div className="absolute right-6 top-1/2 -translate-y-1/2 pointer-events-none">
                   <svg width="14" height="8" viewBox="0 0 14 8" fill="none"><path d="M1 1L7 7L13 1" stroke="#878FA4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[#0B112B] font-bold text-[16px] mb-4">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                className="w-full px-6 py-4 border border-[#DEE3E7] rounded-xl bg-white text-[#0B112B] placeholder:text-[#878FA4] focus:outline-none focus:ring-2 focus:ring-[#E32027]"
              />
            </div>
          </div>

          {/* Second Row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div>
              <label className="block text-[#0B112B] font-bold text-[16px] mb-4">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                className="w-full px-6 py-4 border border-[#DEE3E7] rounded-xl bg-white text-[#0B112B] placeholder:text-[#878FA4] focus:outline-none focus:ring-2 focus:ring-[#E32027]"
              />
            </div>

            <div>
              <label className="block text-[#0B112B] font-bold text-[16px] mb-4">
                Phone number
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Your Phone Number"
                className="w-full px-6 py-4 border border-[#DEE3E7] rounded-xl bg-white text-[#0B112B] placeholder:text-[#878FA4] focus:outline-none focus:ring-2 focus:ring-[#E32027]"
              />
            </div>
          </div>

          {/* Message Field */}
          <div>
            <label className="block text-[#0B112B] font-bold text-[16px] mb-4">
              Message
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Write us what you are really concerned about..."
              rows={10}
              className="w-full px-6 py-4 border border-[#DEE3E7] rounded-xl bg-white text-[#0B112B] placeholder:text-[#878FA4] focus:outline-none focus:ring-2 focus:ring-[#E32027] resize-none"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full md:max-w-7xl bg-[#E32027] text-white py-5 rounded-xl font-bold text-[18px] hover:bg-red-700 transition-all shadow-lg active:scale-[0.98]"
            >
              Submit
            </button>
          </div>
        </form>
      </section>

      {/* Cards Section */}
      <section className="pb-24 px-6 md:px-32">
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Email Card */}
          <div className="bg-[#FDF2F2] rounded-[20px] p-10">
            <div className="w-14 h-14 bg-[#E32027] rounded-full flex items-center justify-center mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8L10.89 13.26C11.5475 13.7154 12.4525 13.7154 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <h3 className="font-montserrat font-bold text-[20px] text-[#0B112B] mb-2">
              Send us an Email
            </h3>
            <p className="text-[#878FA4] text-[14px] mb-4 font-normal">
              We're here to help.
            </p>
            <a 
              href="mailto:info@cargoland.africa" 
              className="text-[#E32027] font-bold text-[15px] hover:underline"
            >
              info@cargoland.africa
            </a>
          </div>

          {/* Call Card */}
          <div className="bg-[#FDF2F2] rounded-[20px] p-10">
            <div className="w-14 h-14 bg-[#E32027] rounded-full flex items-center justify-center mb-6">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
              </svg>
            </div>
            <h3 className="font-montserrat font-bold text-[20px] text-[#0B112B] mb-2">
              Call Us
            </h3>
            <p className="text-[#878FA4] text-[14px] mb-4 font-normal">
              Mon - Fri from 8am to 5pm.
            </p>
            <a 
              href="tel:+2348127631001" 
              className="text-[#E32027] font-bold text-[15px] hover:underline"
            >
              (081) 2763-1001, (080) 3923-1045
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}