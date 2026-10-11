import React from 'react';
import { MessageSquare, ShieldCheck, Star } from 'lucide-react';

export const CustomerReviews: React.FC = () => {
  return (
    <section id="reviews" className="py-20 bg-[#F3F0E8] border-b border-[#E0D9CB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C6A36A] font-english font-bold">
            <MessageSquare className="w-3.5 h-3.5 text-[#C6A36A]" />
            <span>TRANSPARENCY & COMMUNITY</span>
          </div>
          <h2 className="font-bengali text-3xl sm:text-4xl font-bold text-[#111111]">
            কাস্টমারদের অভিজ্ঞতা
          </h2>
          <p className="font-bengali text-sm text-[#555555]">
            আমাদের সম্মানিত ক্রেতাদের নিরপেক্ষ মতামত ও অভিজ্ঞতা
          </p>
        </div>

        {/* Development Stage Notice & Authentic Layout Structure */}
        <div className="max-w-4xl mx-auto bg-[#FFFFFF] border border-[#DDD6C8] p-8 sm:p-10 shadow-sm relative overflow-hidden">
          
          {/* Subtle Accent Line */}
          <div className="absolute top-0 inset-x-0 h-1 bg-[#C6A36A]"></div>

          <div className="flex flex-col md:flex-row gap-8 items-start">
            
            {/* Left Column: Authentic Policy Note */}
            <div className="md:w-5/12 space-y-4 border-b md:border-b-0 md:border-r border-[#EBE5D8] pb-6 md:pb-0 md:pr-6">
              <div className="w-10 h-10 rounded-full bg-[#F3F0E8] flex items-center justify-center text-[#111111]">
                <ShieldCheck className="w-5 h-5 text-[#C6A36A]" />
              </div>
              <h3 className="font-bengali text-xl font-bold text-[#111111]">
                সততা ও বিশ্বাস আমাদের মূলনীতি
              </h3>
              <p className="font-bengali text-sm text-[#555555] leading-relaxed">
                TEEZAN কোনো কৃত্রিম রিভিউ বা ভুয়া রেটিং প্রদর্শন করে না। অফিশিয়াল লঞ্চের পর আমাদের সম্মানিত ক্রেতাদের সরাসরি যাচাইকৃত রিভিউসমূহ এখানে প্রদর্শিত হবে।
              </p>
              <div className="pt-2">
                <span className="inline-block px-3 py-1 bg-[#F5F2EA] text-[11px] font-english font-medium text-[#777777] border border-[#E0D9CB]">
                  STATUS: REVIEW ENGINE READY
                </span>
              </div>
            </div>

            {/* Right Column: Planned Review Card Preview Structure */}
            <div className="md:w-7/12 space-y-4">
              <div className="p-5 bg-[#FAF8F3] border border-dashed border-[#DCD5C5] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-[#C6A36A]">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#C6A36A]" />
                    ))}
                  </div>
                  <span className="text-[11px] font-english text-[#888888]">
                    VERIFIED PURCHASE SLOT
                  </span>
                </div>
                <p className="font-bengali text-sm text-[#444444] italic">
                  “পণ্য ডেলিভারির পর গ্রাহক তাঁর টি-শার্টের ফিটিং, ফ্যাব্রিকের আরাম ও ডেলিভারির অভিজ্ঞতা সম্পর্কে এখানে সরাসরি রেটিং ও মন্তব্য প্রদান করবেন।”
                </p>
                <div className="pt-2 flex items-center justify-between text-xs text-[#888888]">
                  <span className="font-bengali font-medium text-[#111111]">গ্রাহকের নাম (যাচাইকৃত)</span>
                  <span className="font-english">Dhaka, Bangladesh</span>
                </div>
              </div>

              {/* Second subtle placeholder */}
              <div className="p-4 bg-[#FFFFFF] border border-dashed border-[#E2DBD0] flex items-center justify-between text-xs text-[#777777]">
                <span className="font-bengali">আপনার মতামত আমাদের জন্য গুরুত্বপূর্ণ — অর্ডার ডেলিভারির পর রিভিউ দিন।</span>
                <span className="font-english text-[11px] font-semibold text-[#111111]">TEEZAN CARE</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
