import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface EditorialBannerProps {
  onExplore: () => void;
}

export const EditorialBanner: React.FC<EditorialBannerProps> = ({ onExplore }) => {
  return (
    <section className="relative overflow-hidden bg-[#111111] text-[#FFFFFF] py-20 md:py-28 border-b border-[#222222]">
      {/* Background Subtle Streetwear Imagery Overlay */}
      <div className="absolute inset-0 z-0 opacity-25 mix-blend-luminosity">
        <img
          src="https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1600&auto=format&fit=crop"
          alt="TEEZAN Editorial Streetwear Mood"
          className="w-full h-full object-cover object-center"
          loading="lazy"
        />
      </div>

      {/* Subtle Gold Ambient Gradients */}
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#C6A36A]/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-[#C6A36A]/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        {/* Label */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 border border-[#333333] bg-[#1A1A1A]/90 text-[#C6A36A]">
          <Sparkles className="w-3.5 h-3.5" />
          <span className="font-english text-xs uppercase font-bold tracking-[0.25em]">
            LIMITED EDITION &bull; DROP 01
          </span>
        </div>

        {/* Heading */}
        <h2 className="font-bengali text-3xl sm:text-5xl md:text-6xl font-bold tracking-tight text-[#FFFFFF] leading-tight max-w-3xl mx-auto">
          নিজের স্টাইলকে <span className="text-[#C6A36A]">নতুনভাবে</span> প্রকাশ করুন।
        </h2>

        {/* Supporting Copy */}
        <p className="font-bengali text-base sm:text-xl text-[#D0CBC0] max-w-2xl mx-auto font-light leading-relaxed">
          TEEZAN-এর কালেকশন থেকে খুঁজে নিন আপনার নিজস্ব লুক। প্রিমিয়াম ফ্যাব্রিক, আধুনিক কাট এবং স্বাতন্ত্র্যবোধ।
        </p>

        {/* Tagline pill */}
        <div className="pt-2">
          <span className="font-english text-xs sm:text-sm tracking-[0.3em] uppercase text-[#A89675] font-semibold">
            &mdash; WEAR YOUR IDENTITY &mdash;
          </span>
        </div>

        {/* Action Button */}
        <div className="pt-4">
          <button
            onClick={onExplore}
            className="group px-9 py-4 bg-[#FFFFFF] hover:bg-[#C6A36A] text-[#111111] hover:text-[#FFFFFF] font-bengali text-base font-semibold transition-all duration-300 inline-flex items-center gap-3 shadow-xl cursor-pointer"
          >
            <span>এখনই এক্সপ্লোর করুন</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

      </div>
    </section>
  );
};
