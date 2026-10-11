import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Ruler } from 'lucide-react';
import { FAQ_DATA } from '../data/products';

interface FAQSectionProps {
  onOpenSizeGuide: () => void;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ onOpenSizeGuide }) => {
  // Default open first question
  const [openIds, setOpenIds] = useState<string[]>(['faq-1', 'faq-2']);

  const toggleItem = (id: string) => {
    setOpenIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  return (
    <section id="faq" className="py-20 md:py-24 bg-[#FFFFFF] border-b border-[#E0D9CB]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="text-center mb-12 space-y-2">
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-[#C6A36A] font-english font-bold">
            <HelpCircle className="w-3.5 h-3.5 text-[#C6A36A]" />
            <span>CUSTOMER ASSISTANCE</span>
          </div>
          <h2 className="font-bengali text-3xl sm:text-4xl font-bold text-[#111111]">
            সচরাচর জিজ্ঞাসিত প্রশ্ন (FAQ)
          </h2>
          <p className="font-bengali text-sm sm:text-base text-[#555555]">
            অর্ডার, সাইজ, পেমেন্ট ও ডেলিভারি সংক্রান্ত প্রয়োজনীয় তথ্যাবলি
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_DATA.map((faq) => {
            const isOpen = openIds.includes(faq.id);

            return (
              <div
                key={faq.id}
                className="border border-[#E2DBD0] bg-[#FAF8F3] transition-colors overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => toggleItem(faq.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 font-bengali text-base sm:text-lg font-bold text-[#111111] hover:text-[#C6A36A] transition-colors cursor-pointer focus:outline-none"
                >
                  <span>{faq.questionBn}</span>
                  <div className={`p-1 rounded-full bg-[#FFFFFF] border border-[#DDD6C8] transition-transform duration-300 ${
                    isOpen ? 'rotate-180 bg-[#111111] text-[#FFFFFF]' : 'text-[#111111]'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#444444] font-bengali font-normal leading-relaxed border-t border-[#EDE7DB] space-y-3">
                    <p>{faq.answerBn}</p>
                    
                    {/* If question 2 (Size selection), provide trigger to size guide */}
                    {faq.id === 'faq-2' && (
                      <div className="pt-2">
                        <button
                          type="button"
                          onClick={onOpenSizeGuide}
                          className="inline-flex items-center gap-2 px-4 py-2 bg-[#111111] text-[#FFFFFF] text-xs font-bengali font-semibold hover:bg-[#2B2B2B] transition-colors cursor-pointer"
                        >
                          <Ruler className="w-3.5 h-3.5 text-[#C6A36A]" />
                          <span>বিস্তারিত সাইজ গাইড দেখুন (Size Guide)</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
