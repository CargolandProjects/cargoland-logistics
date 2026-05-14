"use client";

import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function AuthNavbar() {
  const pathname = usePathname();
  const isRegister = pathname.includes('/register') || 
    pathname.includes('/verify-email') || 
    pathname.includes('/account-created') ||
    pathname.includes('/auth-success');

  return (
    <>
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

      {/* Navigation Bar — logo + single auth link only */}
      <nav className="px-6 md:px-12 py-4 flex justify-between items-center bg-white">
        <Link href="/" className="flex items-center cursor-pointer">
          <Image src="/assets/pictures/cargoLandLogo.png" alt="CargoLand Logo" width={151} height={48} />
        </Link>

        <div className="flex items-center font-medium text-[#1a1a2e]">
          {isRegister ? (
            <Link href="/login" className="flex items-center gap-2 hover:text-[#EF3B36] transition-colors">
              <Image src="/assets/icons/userProfile.png" alt="User" width={20} height={20} />
              Login
            </Link>
          ) : (
            <Link href="/register" className="flex items-center gap-2 hover:text-[#EF3B36] transition-colors">
              <Image src="/assets/icons/userProfile.png" alt="User" width={20} height={20} />
              Register
            </Link>
          )}
        </div>
      </nav>
    </>
  );
}
