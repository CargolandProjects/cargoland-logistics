"use client";

interface PricingItem {
  route: string;
  origin: string;
  destination: string;
  air: string;
  land: string;
  ocean: string;
  trend: string;
  trendUp: boolean;
}

interface PricingTableProps {
  data: PricingItem[];
  variant?: 'landing' | 'pricing';
}

export default function PricingTable({ data, variant = 'landing' }: PricingTableProps) {
  if (variant === 'landing') {
    return (
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
            {data.map((item, index) => (
              <tr 
                key={index} 
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-0"
              >
                <td className="px-8 py-6">
                  <div className="flex items-center gap-3 font-bold text-lg">
                    {item.route.split(' → ')[0]} <span className="text-[#E32027]">→</span> {item.route.split(' → ')[1]}
                  </div>
                  <div className="text-[#878FA4] text-xs mt-1 font-medium">
                    Air: 2-4 days • Ocean 18-25 days
                  </div>
                </td>
                <td className="px-8 py-6 font-extrabold text-lg">{item.air}</td>
                <td className="px-8 py-6 font-extrabold text-lg">{item.land}</td>
                <td className="px-8 py-6 font-extrabold text-lg">{item.ocean}</td>
                <td className="px-8 py-6">
                  <div className={`flex items-center gap-1 font-bold ${item.trendUp ? 'text-[#1DB954]' : 'text-[#E32027]'}`}>
                    <span className="text-xl">{item.trendUp ? '↗' : '↘'}</span>
                    {item.trend}
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
    );
  }

  // Pricing page variant with horizontal scroll on mobile
  return (
    <div className="overflow-hidden rounded-[16px] border border-[#DEE3E7] shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-max">
          <thead>
            <tr className="bg-[#FFF5F5] border-b border-[#DEE3E7]">
              <th className="px-6 py-5 text-left font-bold text-[#0B112B] text-[13px] uppercase tracking-wider whitespace-nowrap">Route</th>
              <th className="px-6 py-5 text-left font-bold text-[#0B112B] text-[13px] uppercase tracking-wider whitespace-nowrap">Air /KG</th>
              <th className="px-6 py-5 text-left font-bold text-[#0B112B] text-[13px] uppercase tracking-wider whitespace-nowrap">Land /KG</th>
              <th className="px-6 py-5 text-left font-bold text-[#0B112B] text-[13px] uppercase tracking-wider whitespace-nowrap">Ocean /KG</th>
              <th className="px-6 py-5 text-left font-bold text-[#0B112B] text-[13px] uppercase tracking-wider whitespace-nowrap">Trend</th>
              <th className="px-6 py-5 whitespace-nowrap"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#DEE3E7]">
            {data.map((item, index) => (
              <tr key={index} className="hover:bg-[#F9FAFB] transition-colors group">
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className="font-bold text-[#0B112B] text-[15px]">{item.route}</div>
                  <div className="text-[#878FA4] text-[12px] mt-1 font-medium">Air: 2-4 days • Ocean 18-25 days</div>
                </td>
                <td className="px-6 py-5 font-bold text-[#0B112B] text-[15px] whitespace-nowrap">{item.air}</td>
                <td className="px-6 py-5 font-bold text-[#0B112B] text-[15px] whitespace-nowrap">{item.land}</td>
                <td className="px-6 py-5 font-bold text-[#0B112B] text-[15px] whitespace-nowrap">{item.ocean}</td>
                <td className="px-6 py-5 whitespace-nowrap">
                  <div className={`font-bold flex items-center gap-1 text-[14px] ${item.trendUp ? 'text-[#1DB954]' : 'text-[#E32027]'}`}>
                    <span className="text-[18px] leading-none">{item.trendUp ? '↗' : '↘'}</span> {item.trend}
                  </div>
                </td>
                <td className="px-6 py-5 text-right whitespace-nowrap">
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
  );
}
