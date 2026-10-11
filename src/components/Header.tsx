import React, { useState } from 'react';
import { Search, ShoppingBag, Menu, X, ArrowRight } from 'lucide-react';

interface HeaderProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenSearch: () => void;
  onNavigate: (sectionId: string, categoryFilter?: string) => void;
  activeCategory: string;
}

export const Header: React.FC<HeaderProps> = ({
  cartCount,
  onOpenCart,
  onOpenSearch,
  onNavigate,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { label: 'হোম', action: () => onNavigate('hero') },
    { label: 'সব পণ্য', action: () => onNavigate('products', 'all') },
    { label: 'নতুন কালেকশন', action: () => onNavigate('products', 'new-arrivals') },
    { label: 'টি-শার্ট', action: () => onNavigate('categories') },
    { label: 'আমাদের সম্পর্কে', action: () => onNavigate('brand-story') },
    { label: 'যোগাযোগ', action: () => onNavigate('contact') },
  ];

  const handleMobileNav = (action: () => void) => {
    action();
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-40 bg-[#F3F0E8]/95 backdrop-blur-md border-b border-[#E2DDD2] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 sm:h-20">
          
          {/* Left: Brand Logo & Wordmark */}
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate('hero')}
              className="group flex flex-col text-left focus:outline-none"
              aria-label="TEEZAN হোমপেজ"
            >
              <div className="flex items-baseline gap-1.5">
                <span className="font-english text-2xl sm:text-3xl font-black tracking-[0.25em] text-[#111111] group-hover:text-[#C6A36A] transition-colors">
                  TEEZAN
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#C6A36A] mb-1"></span>
              </div>
              <span className="text-[10px] tracking-[0.3em] uppercase text-[#737373] font-english font-medium -mt-1 hidden sm:block">
                WEAR YOUR IDENTITY
              </span>
            </button>
          </div>

          {/* Center: Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-7" aria-label="প্রধান নেভিগেশন">
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className="font-bengali text-[15px] font-medium text-[#2B2B2B] hover:text-[#111111] relative py-1 transition-colors group cursor-pointer"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-[#C6A36A] transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Right: Actions (Search, Cart, Mobile Toggle) */}
          <div className="flex items-center gap-2 sm:gap-4">
            {/* Search Button */}
            <button
              onClick={onOpenSearch}
              className="p-2 sm:p-2.5 rounded-full text-[#111111] hover:bg-[#E7E2D6] transition-colors cursor-pointer"
              aria-label="পণ্য খুঁজুন (Search)"
              title="খুঁজুন"
            >
              <Search className="w-5 h-5" strokeWidth={1.75} />
            </button>

            {/* Shopping Cart Button */}
            <button
              onClick={onOpenCart}
              className="relative p-2 sm:p-2.5 rounded-full bg-[#111111] text-[#FFFFFF] hover:bg-[#2B2B2B] transition-colors flex items-center gap-2 px-3 sm:px-4 cursor-pointer"
              aria-label={`শপিং কার্ট (${cartCount} আইটেম)`}
            >
              <ShoppingBag className="w-4 h-4 sm:w-4.5 sm:h-4.5" strokeWidth={2} />
              <span className="font-english font-semibold text-xs sm:text-sm">
                {cartCount}
              </span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-[#111111] hover:bg-[#E7E2D6] transition-colors cursor-pointer"
              aria-label={mobileMenuOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন"}
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-18 sm:top-20 bg-[#F3F0E8] border-b border-[#DCD5C6] shadow-xl animate-in slide-in-from-top-4 duration-200">
          <div className="px-5 pt-3 pb-6 space-y-1">
            <div className="text-[11px] uppercase tracking-widest text-[#888888] font-english font-semibold pb-2 border-b border-[#E5DFD1]">
              নেভিগেশন মেনু
            </div>
            {navItems.map((item, idx) => (
              <button
                key={idx}
                onClick={() => handleMobileNav(item.action)}
                className="w-full flex items-center justify-between py-3 text-left font-bengali text-base font-medium text-[#111111] hover:text-[#C6A36A] border-b border-[#ECE7DA] transition-colors"
              >
                <span>{item.label}</span>
                <ArrowRight className="w-4 h-4 text-[#888888]" />
              </button>
            ))}

            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenSearch();
                }}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-md bg-[#E4DDCF] text-[#111111] font-bengali text-sm font-medium hover:bg-[#DCD4C4]"
              >
                <Search className="w-4 h-4" />
                <span>পণ্য অনুসন্ধান করুন</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};
