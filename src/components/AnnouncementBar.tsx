import React from 'react';

export const AnnouncementBar: React.FC = () => {
  return (
    <div className="bg-[#111111] text-[#F3F0E8] border-b border-[#222222] text-xs sm:text-sm py-2 px-4 transition-all">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex-1 text-center font-bengali font-normal tracking-wide flex items-center justify-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#C6A36A] animate-pulse"></span>
          <span>TEEZAN-এ স্বাগতম — আপনার স্টাইল, আপনার পরিচয়।</span>
        </div>
        <div className="hidden md:flex items-center gap-3 text-[11px] text-[#A0A0A0] font-english font-medium">
          <span className="tracking-widest uppercase">STREETWEAR DHAKA</span>
        </div>
      </div>
    </div>
  );
};
