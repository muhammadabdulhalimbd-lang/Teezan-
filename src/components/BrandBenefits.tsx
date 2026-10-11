import React from 'react';
import { Palette, Compass, ShoppingBag, Headphones } from 'lucide-react';

export const BrandBenefits: React.FC = () => {
  const benefits = [
    {
      icon: Palette,
      titleBn: 'স্টাইলিশ ডিজাইন',
      descBn: 'আধুনিক স্ট্রিট কালচার ও মিনিমালিস্ট ড্রপ-শোল্ডার কাটের সমন্বয়ে তৈরি ফ্যাশন লুক।',
    },
    {
      icon: Compass,
      titleBn: 'আরামদায়ক ফিট',
      descBn: 'আমাদের লক্ষ্য প্রতিটি পোশাকে নিশ্চিত করা স্বাভাবিক স্বাচ্ছন্দ্য ও দীর্ঘস্থায়ী অনুভূতি।',
    },
    {
      icon: ShoppingBag,
      titleBn: 'সহজ অর্ডার অভিজ্ঞতা',
      descBn: 'ওয়েবসাইট থেকে নির্বিঘ্নে পছন্দের সাইজ নির্বাচন এবং ঝামেলাহীন চেকআউট সুবিধা।',
    },
    {
      icon: Headphones,
      titleBn: 'কাস্টমার সাপোর্ট',
      descBn: 'পণ্য বা সাইজ সংক্রান্ত যেকোনো অনুসন্ধানে আন্তরিক ও সরাসরি পরামর্শ সহায়তা।',
    },
  ];

  return (
    <section className="py-16 md:py-20 bg-[#F3F0E8] border-b border-[#E0D9CB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C6A36A] font-english font-bold">
            OUR COMMITMENT
          </span>
          <h2 className="font-bengali text-2xl sm:text-3xl font-bold text-[#111111]">
            TEEZAN-এর ব্র্যান্ড দর্শন ও সেবা
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div
                key={idx}
                className="p-6 bg-[#FFFFFF] border border-[#E2DBD0] hover:border-[#111111] transition-all duration-300 space-y-3 group shadow-xs hover:shadow-md"
              >
                <div className="w-12 h-12 rounded-none bg-[#F7F5F0] border border-[#E5DFD2] flex items-center justify-center text-[#111111] group-hover:bg-[#111111] group-hover:text-[#C6A36A] transition-colors">
                  <IconComp className="w-5 h-5" strokeWidth={1.75} />
                </div>
                <h3 className="font-bengali text-lg font-bold text-[#111111] group-hover:text-[#C6A36A] transition-colors">
                  {item.titleBn}
                </h3>
                <p className="font-bengali text-xs sm:text-sm text-[#555555] leading-relaxed">
                  {item.descBn}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
