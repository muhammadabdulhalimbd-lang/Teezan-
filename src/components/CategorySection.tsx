import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { CATEGORIES_DATA } from '../data/products';

interface CategorySectionProps {
  onSelectCategory: (categoryId: string) => void;
  activeCategory: string;
}

export const CategorySection: React.FC<CategorySectionProps> = ({
  onSelectCategory,
  activeCategory,
}) => {
  return (
    <section id="categories" className="py-16 md:py-24 bg-[#F3F0E8] border-b border-[#E0D9CB]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div className="space-y-2">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C6A36A] font-english font-bold">
              CATEGORIES & STYLES
            </span>
            <h2 className="font-bengali text-3xl sm:text-4xl md:text-5xl font-bold text-[#111111]">
              আপনার পছন্দের কালেকশন
            </h2>
          </div>
          <p className="mt-3 md:mt-0 font-bengali text-sm sm:text-base text-[#555555] max-w-md">
            আপনার শারীরিক অবয়ব ও ব্যক্তিত্বের সাথে সামঞ্জস্যপূর্ণ সেরা স্ট্রিটওয়্যার ফিট বেছে নিন।
          </p>
        </div>

        {/* Categories Grid (4 cards) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CATEGORIES_DATA.map((cat) => {
            const isSelected = activeCategory === cat.id;

            return (
              <div
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`group relative overflow-hidden bg-[#FFFFFF] border cursor-pointer transition-all duration-300 ${
                  isSelected
                    ? 'border-[#C6A36A] ring-2 ring-[#C6A36A]/50 shadow-lg'
                    : 'border-[#E0D9CB] hover:border-[#111111] hover:shadow-xl'
                }`}
              >
                {/* Image Container with Consistent Ratio (4:5) */}
                <div className="aspect-[4/5] overflow-hidden bg-[#E8E2D6] relative">
                  <img
                    src={cat.image}
                    alt={cat.titleBn}
                    className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111111]/80 via-[#111111]/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity"></div>
                  
                  {/* Badge */}
                  <div className="absolute top-3 left-3">
                    <span className="bg-[#111111]/90 backdrop-blur-sm text-[#F3F0E8] text-[11px] font-bengali px-2.5 py-1 border border-[#333333]">
                      {cat.badgeBn}
                    </span>
                  </div>

                  {/* Corner Arrow */}
                  <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#FFFFFF]/90 flex items-center justify-center text-[#111111] group-hover:bg-[#C6A36A] group-hover:text-[#FFFFFF] transition-colors shadow-sm">
                    <ArrowUpRight className="w-4 h-4" />
                  </div>

                  {/* Card Content Overlay */}
                  <div className="absolute bottom-0 inset-x-0 p-5 text-[#FFFFFF] space-y-1">
                    <p className="font-english text-[11px] font-semibold tracking-wider text-[#C6A36A] uppercase">
                      {cat.titleEn}
                    </p>
                    <h3 className="font-bengali text-xl font-bold text-[#FFFFFF] group-hover:text-[#F3F0E8] transition-colors">
                      {cat.titleBn}
                    </h3>
                    <p className="font-bengali text-xs text-[#CCCCCC] line-clamp-2 pt-1 font-light leading-relaxed">
                      {cat.descriptionBn}
                    </p>
                  </div>
                </div>

                {/* Bottom interactive action bar */}
                <div className="p-3 bg-[#FFFFFF] border-t border-[#F0ECE2] flex items-center justify-between text-xs">
                  <span className="font-bengali font-medium text-[#111111] group-hover:text-[#C6A36A] transition-colors">
                    পণ্য দেখুন
                  </span>
                  <span className="font-english text-[11px] text-[#777777]">
                    Explore &rarr;
                  </span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
