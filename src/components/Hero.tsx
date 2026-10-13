import React, { useState } from 'react';
import { ArrowDownRight, Sparkles, Check, ShoppingBag } from 'lucide-react';

interface HeroProps {
  onExploreClick: () => void;
  onAboutClick: () => void;
}

const HERO_DROPS = [
  {
    id: 'tz-001',
    badge: 'EXCLUSIVE HERO DROP 🔥',
    tagBn: 'সিগনেচার আর্টওয়ার্ক',
    shortNameBn: 'সানলিট বাংলা টি',
    titleBn: 'বাংলা গ্রাফিক টি - সানলিট ফিল্ড এডিশন',
    titleEn: 'Bengali Graphic Tee in a Sunlit Field',
    price: '৳ ৫৯০',
    originalPrice: '৳ ৭৫০',
    fitBn: 'বক্সি ওভারসাইজড কাট • ১০০% প্রিমিয়াম সুতি',
    image: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791695520/Bengali_Graphic_Tee_in_a_Sunlit_Field.png',
  },
  {
    id: 'tz-002',
    badge: 'জীবনযাত্রা সিগনেচার 🔥',
    tagBn: 'জীবনযাত্রা স্পেশাল',
    shortNameBn: 'জীবনযাত্রা টি',
    titleBn: 'জীবনযাত্রা প্রিমিয়াম কটন টি',
    titleEn: 'Premium Cotton Jibon Jatra T-Shirt',
    price: '৳ ৫৯০',
    originalPrice: '৳ ৭০০',
    fitBn: 'বক্সি ওভারসাইজড কাট • ১০০% প্রিমিয়াম সুতি',
    image: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791695534/Premium_Cotton_Jibon_Jatra_T-Shirt.png',
  },
  {
    id: 'tz-012',
    badge: 'DISTRESSED DROP 🔥',
    tagBn: 'ডিসট্রেসড',
    shortNameBn: 'ডিসট্রেসড টি',
    titleBn: 'ডিসট্রেসড বাংলা গ্রাফিক ওভারসাইজড টি',
    titleEn: 'Distressed Bengali Graphic Tee',
    price: '৳ ৫৮০',
    originalPrice: '৳ ৭২০',
    fitBn: 'রিল্যাক্সড ড্রপ-শোল্ডার কাট',
    image: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791719939/Distressed_Bengali_Graphic_Tee_Mockup.png',
  },
  {
    id: 'tz-009',
    badge: 'TOP DROP 🔥',
    tagBn: 'রিফ্লেক্টিভ',
    shortNameBn: 'রিফ্লেক্টিভ টি',
    titleBn: 'রিফ্লেক্টিভ পোর্ট্রেট ওভারসাইজড টি',
    titleEn: 'Reflective Portrait Oversized Tee',
    price: '৳ ৬০০',
    originalPrice: '৳ ৭৫০',
    fitBn: 'ড্রপ-শোল্ডার ওভারসাইজড ফিট',
    image: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791726644/Reflective_Portrait_by_Calm_Waters.png',
  },
];

export const Hero: React.FC<HeroProps> = ({ onExploreClick, onAboutClick }) => {
  const [activeDropIndex, setActiveDropIndex] = useState(0);
  const activeDrop = HERO_DROPS[activeDropIndex];

  return (
    <section id="hero" className="relative overflow-hidden bg-[#F3F0E8] border-b border-[#E0D9CB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Left Column: Text & Editorial Typography */}
          <div className="lg:col-span-6 space-y-6 sm:space-y-7">
            
            {/* Small Label */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-[#EAE4D6] border border-[#D5CDBD] text-[#111111]">
              <span className="w-2 h-2 rounded-full bg-[#C6A36A] animate-pulse"></span>
              <span className="font-english text-[11px] sm:text-xs font-bold tracking-[0.2em] uppercase text-[#111111]">
                TEEZAN PREMIUM COLLECTION
              </span>
              <span className="text-xs text-[#C6A36A] font-semibold">|</span>
              <span className="text-[11px] font-english font-medium text-[#666666] tracking-wider">
                DROP 2026
              </span>
            </div>

            {/* Main Heading in Hind Siliguri */}
            <div className="space-y-2">
              <h1 className="font-bengali text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#111111] leading-[1.18]">
                আপনার স্টাইলেই <br className="hidden sm:inline" />
                <span className="relative inline-block text-[#111111]">
                  আপনার পরিচয়
                  <span className="absolute left-0 -bottom-1 w-full h-[3px] bg-[#C6A36A] rounded-full"></span>
                </span>
              </h1>
            </div>

            {/* Supporting Text */}
            <p className="font-bengali text-lg sm:text-xl text-[#3A3A3A] max-w-xl font-normal leading-relaxed">
              আধুনিক স্ট্রিটওয়্যার, মিনিমাল ডিজাইন আর নিজের মতো করে নিজেকে প্রকাশ করার গল্প। প্রিমিয়াম কম্বড কটন ফ্যাব্রিকে তৈরি আত্মবিশ্বাসের পোশাক।
            </p>

            {/* Tagline Badge */}
            <div className="flex items-center gap-3 pt-1">
              <div className="h-[1px] w-8 bg-[#C6A36A]"></div>
              <p className="font-english text-xs sm:text-sm font-semibold tracking-[0.25em] text-[#C6A36A] uppercase">
                Wear Your Identity.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onExploreClick}
                className="group px-7 py-4 rounded-none bg-[#111111] text-[#FFFFFF] font-bengali text-base font-semibold hover:bg-[#262626] transition-all flex items-center gap-3 shadow-md hover:shadow-lg cursor-pointer"
              >
                <span>কালেকশন দেখুন</span>
                <ArrowDownRight className="w-4 h-4 text-[#C6A36A] group-hover:translate-x-0.5 group-hover:translate-y-0.5 transition-transform" />
              </button>

              <button
                onClick={onAboutClick}
                className="px-7 py-4 rounded-none bg-transparent border border-[#111111] text-[#111111] font-bengali text-base font-semibold hover:bg-[#111111] hover:text-[#FFFFFF] transition-all cursor-pointer"
              >
                আমাদের সম্পর্কে
              </button>
            </div>

            {/* Key Quality Pillars */}
            <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#DED7C8]">
              <div>
                <p className="font-english font-bold text-lg sm:text-xl text-[#111111]">100%</p>
                <p className="font-bengali text-xs sm:text-sm text-[#555555]">কম্বড কটন ফেব্রিক</p>
              </div>
              <div>
                <p className="font-english font-bold text-lg sm:text-xl text-[#111111]">220+ GSM</p>
                <p className="font-bengali text-xs sm:text-sm text-[#555555]">হেভিওয়েট স্ট্রাকচার্ড</p>
              </div>
              <div>
                <p className="font-english font-bold text-lg sm:text-xl text-[#111111]">DROP</p>
                <p className="font-bengali text-xs sm:text-sm text-[#555555]">ড্রপ শোল্ডার কাট</p>
              </div>
            </div>

          </div>

          {/* Right Column: Featured Product Imagery with Instant Drop Selector */}
          <div className="lg:col-span-6 flex justify-center lg:justify-end">
            <div className="w-full max-w-md lg:max-w-lg">
              
              {/* Main Fashion Photo Container */}
              <div className="relative aspect-[3/4] w-full bg-[#FFFFFF] border border-[#D5CDBD] shadow-xl overflow-hidden group">
                <img
                  key={activeDrop.id}
                  src={activeDrop.image}
                  alt={activeDrop.titleBn}
                  className="w-full h-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03] animate-in fade-in duration-300"
                  loading="eager"
                />

                {/* Minimal Luxury Corner Badge */}
                <div className="absolute top-3.5 left-3.5 z-10 flex items-center gap-2">
                  <span className="bg-[#111111]/90 backdrop-blur-md text-[#F3F0E8] text-[10px] font-english font-bold tracking-widest uppercase px-3 py-1 border border-[#333333]">
                    {activeDrop.badge}
                  </span>
                </div>

                {/* Instant Order Button Overlay on Hover */}
                <div className="absolute bottom-3 right-3 z-10">
                  <button
                    onClick={onExploreClick}
                    className="px-4 py-2 bg-[#111111]/90 backdrop-blur-sm hover:bg-[#111111] text-[#FFFFFF] text-xs font-bengali font-semibold shadow-lg flex items-center gap-1.5 transition-all cursor-pointer border border-[#444444]"
                  >
                    <ShoppingBag className="w-3.5 h-3.5 text-[#C6A36A]" />
                    <span>অর্ডার করুন</span>
                  </button>
                </div>
              </div>

              {/* Clean Bottom Product Summary Bar */}
              <div className="mt-3 p-4 bg-[#FFFFFF] border border-[#E0D9CB] shadow-xs flex items-center justify-between">
                <div>
                  <span className="text-[10px] tracking-[0.2em] text-[#C6A36A] uppercase font-english font-bold block">
                    FEATURED SPOTLIGHT • {activeDrop.tagBn}
                  </span>
                  <span className="font-bengali text-sm font-bold text-[#111111]">
                    {activeDrop.titleBn}
                  </span>
                  <span className="block text-[11px] text-[#666666] font-bengali">
                    {activeDrop.fitBn}
                  </span>
                </div>
                <div className="text-right">
                  <span className="font-english text-base font-bold text-[#111111] block">
                    {activeDrop.price}
                  </span>
                  <span className="font-english text-xs text-[#999999] line-through block">
                    {activeDrop.originalPrice}
                  </span>
                </div>
              </div>

              {/* Top Featured Drops Selector Pills */}
              <div className="mt-3 grid grid-cols-2 sm:grid-cols-4 gap-2">
                {HERO_DROPS.map((drop, idx) => {
                  const isCurrent = activeDropIndex === idx;
                  return (
                    <button
                      key={drop.id}
                      onClick={() => setActiveDropIndex(idx)}
                      className={`p-2 text-left border transition-all cursor-pointer flex items-center gap-2 ${
                        isCurrent
                          ? 'bg-[#111111] text-[#FFFFFF] border-[#111111] shadow-sm ring-1 ring-[#C6A36A]'
                          : 'bg-[#FFFFFF] text-[#333333] border-[#E0D9CB] hover:border-[#111111]'
                      }`}
                    >
                      <img
                        src={drop.image}
                        alt=""
                        className="w-8 h-8 object-cover rounded-none shrink-0"
                      />
                      <div className="min-w-0 flex-1">
                        <span className={`block text-[10px] truncate font-bengali font-bold ${isCurrent ? 'text-[#C6A36A]' : 'text-[#111111]'}`}>
                          {drop.shortNameBn}
                        </span>
                        <span className={`block text-[10px] font-english ${isCurrent ? 'text-[#E0D9CB]' : 'text-[#777777]'}`}>
                          {drop.price}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
