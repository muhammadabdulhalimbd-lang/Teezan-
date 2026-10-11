import React from 'react';
import { ArrowUp } from 'lucide-react';

interface FooterProps {
  onNavigate: (sectionId: string, categoryFilter?: string) => void;
  onOpenPolicy: (type: 'privacy' | 'terms' | 'contact') => void;
  onOpenSizeGuide: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenPolicy,
  onOpenSizeGuide,
}) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#111111] text-[#FFFFFF] pt-16 pb-12 border-t border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-14 border-b border-[#262626]">
          
          {/* Brand Info (Cols 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="space-y-1">
              <div className="flex items-baseline gap-2">
                <span className="font-english text-3xl font-black tracking-[0.25em] text-[#FFFFFF]">
                  TEEZAN
                </span>
                <span className="w-2 h-2 rounded-full bg-[#C6A36A]"></span>
              </div>
              <p className="font-english text-xs tracking-[0.3em] uppercase text-[#C6A36A] font-medium">
                Wear Your Identity.
              </p>
            </div>

            <p className="font-bengali text-sm text-[#A8A8A8] max-w-sm font-light leading-relaxed">
              TEEZAN আধুনিক বাংলাদেশি ফ্যাশন প্রেমীদের জন্য প্রিমিয়াম স্ট্রিটওয়্যার, ওভারসাইজড এবং টাইপোগ্রাফি টি-শার্টের একটি স্বতন্ত্র ব্র্যান্ড। নিজের স্টাইল ও পরিচয়কে আত্মবিশ্বাসের সাথে প্রকাশ করুন।
            </p>

            <div className="pt-2 text-xs font-bengali text-[#888888] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A36A]"></span>
              <span>ঢাকা, বাংলাদেশ ভিত্তিক স্ট্রিট ফ্যাশন উদ্যোগ</span>
            </div>
          </div>

          {/* Quick Links (Cols 6-7) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-english text-xs tracking-[0.2em] uppercase text-[#C6A36A] font-bold">
              QUICK LINKS
            </h4>
            <ul className="space-y-2 font-bengali text-sm text-[#CCCCCC]">
              <li>
                <button
                  onClick={() => onNavigate('hero')}
                  className="hover:text-[#FFFFFF] hover:underline cursor-pointer transition-colors"
                >
                  হোম
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products', 'all')}
                  className="hover:text-[#FFFFFF] hover:underline cursor-pointer transition-colors"
                >
                  সব পণ্য
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('products', 'new-arrivals')}
                  className="hover:text-[#FFFFFF] hover:underline cursor-pointer transition-colors"
                >
                  নতুন কালেকশন
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('categories')}
                  className="hover:text-[#FFFFFF] hover:underline cursor-pointer transition-colors"
                >
                  ক্যাটাগরি
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('brand-story')}
                  className="hover:text-[#FFFFFF] hover:underline cursor-pointer transition-colors"
                >
                  আমাদের দর্শন
                </button>
              </li>
            </ul>
          </div>

          {/* Customer Service (Cols 8-9) */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-english text-xs tracking-[0.2em] uppercase text-[#C6A36A] font-bold">
              CUSTOMER CARE
            </h4>
            <ul className="space-y-2 font-bengali text-sm text-[#CCCCCC]">
              <li>
                <a
                  href="https://wa.me/8801605529912?text=Hello%20TEEZAN"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#25D366] hover:underline flex items-center gap-1.5 font-english font-semibold"
                  title="হোয়াটসঅ্যাপে সরাসরি কথা বলুন"
                >
                  <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
                  <span>WhatsApp: 01605529912</span>
                </a>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('faq')}
                  className="hover:text-[#FFFFFF] hover:underline cursor-pointer transition-colors"
                >
                  সচরাচর জিজ্ঞাসা (FAQ)
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenSizeGuide}
                  className="hover:text-[#FFFFFF] hover:underline cursor-pointer transition-colors"
                >
                  সাইজ গাইড (Size Guide)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('contact')}
                  className="hover:text-[#FFFFFF] hover:underline cursor-pointer transition-colors"
                >
                  যোগাযোগ ও সহায়তা
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('terms')}
                  className="hover:text-[#FFFFFF] hover:underline cursor-pointer transition-colors"
                >
                  ব্যবহারের শর্তাবলি
                </button>
              </li>
              <li>
                <button
                  onClick={() => onOpenPolicy('privacy')}
                  className="hover:text-[#FFFFFF] hover:underline cursor-pointer transition-colors"
                >
                  গোপনীয়তা নীতি
                </button>
              </li>
            </ul>
          </div>

          {/* Development Status & Transparency (Cols 10-12) */}
          <div className="lg:col-span-3 space-y-3 bg-[#181818] p-5 border border-[#2B2B2B]">
            <h4 className="font-english text-xs tracking-[0.2em] uppercase text-[#C6A36A] font-bold">
              OFFICIAL CONTACT
            </h4>
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-english text-[#888888] block">
                WHATSAPP ORDER & INQUIRY:
              </span>
              <a
                href="https://wa.me/8801605529912?text=Hello%20TEEZAN"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-sm font-english font-bold text-[#FFFFFF] hover:text-[#25D366] transition-colors"
              >
                <span className="w-2 h-2 rounded-full bg-[#25D366]"></span>
                <span>01605529912</span>
              </a>
            </div>
            <div className="pt-2 border-t border-[#262626]">
              <span className="text-[11px] font-english text-[#888888] block">
                LEADERSHIP ATTRIBUTION:
              </span>
              <span className="text-xs font-english text-[#FFFFFF] font-semibold">
                Founded by Abdul Halim
              </span>
            </div>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#888888]">
          <div className="space-y-1 text-center sm:text-left">
            <p className="font-english">
              &copy; {new Date().getFullYear()} TEEZAN. All rights reserved.
            </p>
            <p className="font-bengali text-[11px] text-[#777777]">
              ব্র্যান্ড প্রতিষ্ঠাতা: <span className="text-[#C6A36A] font-medium">Abdul Halim</span>
            </p>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-[#FFFFFF] transition-colors"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-[#FFFFFF] transition-colors"
            >
              Terms & Conditions
            </button>
            <button
              onClick={scrollToTop}
              className="p-2 bg-[#222222] hover:bg-[#C6A36A] hover:text-[#111111] text-[#FFFFFF] transition-colors rounded-none flex items-center justify-center cursor-pointer"
              aria-label="উপরে যান"
              title="উপরে যান"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
