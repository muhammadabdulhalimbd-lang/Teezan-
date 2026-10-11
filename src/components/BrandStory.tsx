import React from 'react';
import { Quote } from 'lucide-react';

interface BrandStoryProps {
  onLearnMore?: () => void;
}

export const BrandStory: React.FC<BrandStoryProps> = ({ onLearnMore }) => {
  return (
    <section id="brand-story" className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E0D9CB] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left: Editorial Image */}
          <div className="lg:col-span-5 relative order-2 lg:order-1">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Frame */}
              <div className="absolute -top-4 -left-4 w-full h-full border-2 border-[#111111]/15 pointer-events-none"></div>
              
              <div className="aspect-[4/5] bg-[#FFFFFF] overflow-hidden relative shadow-lg">
                <img
                  src="https://res.cloudinary.com/daqyowoz/image/upload/v1791694640/file_00000000d07482079a240bc432fb8dcd.png"
                  alt="TEEZAN Streetwear Philosophy"
                  className="w-full h-full object-cover object-center"
                  loading="lazy"
                />
                
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/60 via-transparent to-transparent"></div>
                
                {/* Brand Monogram in Corner */}
                <div className="absolute bottom-5 left-5 bg-[#111111]/90 backdrop-blur-sm p-3 text-[#FFFFFF]">
                  <p className="font-english text-[11px] font-bold tracking-[0.25em] text-[#C6A36A]">
                    DHAKA, BANGLADESH
                  </p>
                  <p className="font-bengali text-xs text-[#E0DCD4]">
                    স্ট্রিট কালচার ও স্বকীয়তা
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Brand Philosophy & Story Content */}
          <div className="lg:col-span-7 space-y-7 order-1 lg:order-2">
            
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.25em] text-[#C6A36A] font-english font-bold">
                OUR PHILOSOPHY
              </span>
              <h2 className="font-bengali text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111] leading-tight">
                স্টাইলের বাইরে, নিজের পরিচয়ে।
              </h2>
            </div>

            {/* Quote Icon */}
            <Quote className="w-10 h-10 text-[#C6A36A]/50 rotate-180" />

            {/* Official Specified Bengali Copy */}
            <p className="font-bengali text-lg sm:text-xl text-[#2B2B2B] leading-relaxed font-normal">
              TEEZAN শুধু পোশাক নয়—এটি নিজের ব্যক্তিত্ব, আত্মবিশ্বাস এবং নিজস্ব স্টাইল প্রকাশের একটি মাধ্যম। আধুনিক ফ্যাশন ও মিনিমাল ডিজাইনের সমন্বয়ে আমরা এমন পোশাক উপস্থাপন করতে চাই, যা আপনাকে আপনার মতো করে প্রকাশ করতে সাহায্য করে।
            </p>

            {/* Brand Core Values */}
            <div className="pt-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 bg-[#F7F5F0] border-l-2 border-[#111111]">
                <h4 className="font-bengali font-semibold text-[#111111] text-base">স্বকীয় প্রকাশ</h4>
                <p className="font-bengali text-xs text-[#666666] mt-1">
                  পোশাকের মাধ্যমে নিজের চিন্তাধারা ও আত্মবিশ্বাস তুলে ধরা।
                </p>
              </div>
              <div className="p-4 bg-[#F7F5F0] border-l-2 border-[#C6A36A]">
                <h4 className="font-bengali font-semibold text-[#111111] text-base">মিনিমাল নান্দনিকতা</h4>
                <p className="font-bengali text-xs text-[#666666] mt-1">
                  অপ্রয়োজনীয় জটিলতা বাদ দিয়ে সূক্ষ্ম ও আধুনিক কারুকাজ।
                </p>
              </div>
            </div>

            {/* Founder Signature Area */}
            <div className="pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-6 border-t border-[#E8E2D5]">
              <div>
                <p className="font-english text-xs uppercase tracking-widest text-[#777777]">
                  BRAND LEADERSHIP
                </p>
                <p className="font-english text-lg font-bold text-[#111111] tracking-wide mt-0.5">
                  Founded by Abdul Halim
                </p>
                <p className="font-bengali text-xs text-[#666666]">
                  প্রতিষ্ঠাতা ও ক্রিয়েটিভ হেড, TEEZAN
                </p>
              </div>

              <div>
                <button
                  onClick={onLearnMore}
                  className="px-6 py-3 bg-[#111111] text-[#FFFFFF] font-bengali text-sm font-semibold hover:bg-[#2A2A2A] transition-colors cursor-pointer"
                >
                  TEEZAN সম্পর্কে জানুন
                </button>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
