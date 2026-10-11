import React from 'react';
import { ArrowUp, Facebook, ExternalLink } from 'lucide-react';

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

  const facebookPageUrl = 'https://www.facebook.com/profile.php?id=61573665329826&mibextid=ZbWKwL';

  return (
    <footer className="bg-[#111111] text-[#FFFFFF] pt-16 pb-12 border-t border-[#222222]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-10 border-b border-[#262626]">
          
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

            <div className="pt-1 text-xs font-bengali text-[#888888] flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C6A36A]"></span>
              <span>ঢাকা, বাংলাদেশ ভিত্তিক স্ট্রিট ফ্যাশন উদ্যোগ</span>
            </div>

            {/* Direct Facebook Link in Brand Column */}
            <div className="pt-2">
              <a
                href={facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-3.5 py-2 bg-[#1877F2]/15 hover:bg-[#1877F2] text-[#60A5FA] hover:text-[#FFFFFF] border border-[#1877F2]/40 text-xs font-bengali font-semibold transition-all group"
                title="TEEZAN ফেসবুক পেজে যান"
              >
                <Facebook className="w-4 h-4 fill-current text-[#1877F2] group-hover:text-[#FFFFFF] transition-colors" />
                <span>আমাদের ফেসবুক পেজ ভিজিট করুন</span>
                <ExternalLink className="w-3 h-3 opacity-70" />
              </a>
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

          {/* Official Contact & Social Media (Cols 10-12) */}
          <div className="lg:col-span-3 space-y-3.5 bg-[#181818] p-5 border border-[#2B2B2B]">
            <h4 className="font-english text-xs tracking-[0.2em] uppercase text-[#C6A36A] font-bold">
              OFFICIAL CONTACT
            </h4>
            
            {/* WhatsApp */}
            <div className="space-y-1">
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

            {/* Facebook Page */}
            <div className="space-y-1 pt-2 border-t border-[#262626]">
              <span className="text-[11px] font-english text-[#888888] block">
                OFFICIAL FACEBOOK PAGE:
              </span>
              <a
                href={facebookPageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-bengali font-semibold text-[#FFFFFF] hover:text-[#1877F2] transition-colors"
              >
                <Facebook className="w-4 h-4 text-[#1877F2] fill-current" />
                <span>TEEZAN অফিসিয়াল পেজ</span>
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

        {/* Dedicated Facebook Connect Banner at the bottom of the site */}
        <div className="my-8 p-5 sm:p-6 bg-gradient-to-r from-[#111827] via-[#161F30] to-[#111827] border border-[#1E293B] flex flex-col md:flex-row items-center justify-between gap-5 shadow-inner">
          <div className="flex items-center gap-4 text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-[#1877F2] text-[#FFFFFF] flex items-center justify-center shrink-0 shadow-lg shadow-[#1877F2]/20">
              <Facebook className="w-6 h-6 fill-current" />
            </div>
            <div>
              <div className="flex items-center gap-2 justify-center md:justify-start">
                <h4 className="font-bengali text-base font-bold text-[#FFFFFF]">
                  TEEZAN অফিসিয়াল ফেসবুক পেজ
                </h4>
                <span className="text-[10px] bg-[#1877F2]/25 text-[#93C5FD] px-2 py-0.5 border border-[#1877F2]/50 font-english uppercase tracking-wider font-semibold">
                  Official Page
                </span>
              </div>
              <p className="font-bengali text-xs text-[#9CA3AF] mt-1">
                নতুন কালেকশনের ছবি, অফার ও সরাসরি বার্তার জন্য আমাদের ফেসবুক পেজে লাইক ও ফলো দিয়ে সঙ্গে থাকুন।
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <a
              href={facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-2.5 bg-[#1877F2] hover:bg-[#166FE5] text-[#FFFFFF] text-xs font-bengali font-bold tracking-wider transition-all shadow-md hover:shadow-lg hover:brightness-105 active:scale-95"
              title="TEEZAN ফেসবুক পেজ খুলুন"
            >
              <Facebook className="w-4 h-4 fill-current" />
              <span>ফেসবুক পেজে যান</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-4 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#888888]">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-english">
              &copy; {new Date().getFullYear()} TEEZAN. All rights reserved.
            </p>
            <p className="font-bengali text-[11px] text-[#777777]">
              ব্র্যান্ড প্রতিষ্ঠাতা: <span className="text-[#C6A36A] font-medium">Abdul Halim</span>
            </p>
          </div>

          {/* Social Media Link Pill at the very bottom */}
          <div className="flex items-center gap-3">
            <a
              href={facebookPageUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1877F2]/20 hover:bg-[#1877F2] text-[#93C5FD] hover:text-[#FFFFFF] text-xs font-bengali font-medium border border-[#1877F2]/40 transition-all group"
              title="TEEZAN Facebook Page"
            >
              <Facebook className="w-3.5 h-3.5 fill-current text-[#1877F2] group-hover:text-[#FFFFFF]" />
              <span>Facebook Page: TEEZAN</span>
              <ExternalLink className="w-3 h-3 opacity-70 group-hover:opacity-100" />
            </a>
          </div>

          <div className="flex items-center gap-6">
            <button
              onClick={() => onOpenPolicy('privacy')}
              className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onOpenPolicy('terms')}
              className="hover:text-[#FFFFFF] transition-colors cursor-pointer"
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
