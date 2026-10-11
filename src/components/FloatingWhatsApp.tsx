import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';

export const FloatingWhatsApp: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const phoneNumber = '8801605529912';
  const displayPhone = '01605529912';

  const defaultMessage = encodeURIComponent('হ্যালো TEEZAN, আমি আপনাদের পোশাক কালেকশন সম্পর্কে জানতে চাই।');
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${defaultMessage}`;

  return (
    <div className="fixed bottom-6 left-6 z-40 flex flex-col items-start gap-3">
      {/* Mini popup card when opened or clicked */}
      {isOpen && (
        <div className="bg-[#FFFFFF] text-[#111111] p-4 border border-[#D5CDBD] shadow-2xl max-w-xs animate-in slide-in-from-bottom-3 duration-200">
          <div className="flex items-start justify-between gap-3 pb-2 border-b border-[#EDE7DB]">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#25D366] animate-pulse"></span>
              <span className="font-english font-bold text-xs uppercase tracking-wider text-[#111111]">
                TEEZAN WHATSAPP
              </span>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-[#888888] hover:text-[#111111] p-0.5 cursor-pointer"
              aria-label="বন্ধ করুন"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="pt-2.5 space-y-2">
            <p className="font-bengali text-xs text-[#444444] leading-relaxed">
              সরাসরি অর্ডার, সাইজ পরামর্শ বা যেকোনো তথ্যের জন্য আমাদের হোয়াটসঅ্যাপে মেসেজ দিন:
            </p>
            <div className="p-2 bg-[#F3F0E8] border border-[#E0D9CB] flex items-center justify-between">
              <span className="font-english font-bold text-sm text-[#111111]">
                {displayPhone}
              </span>
              <span className="text-[10px] font-bengali font-semibold text-[#25D366] bg-[#FFFFFF] px-2 py-0.5 border border-[#25D366]/30">
                অনলাইন
              </span>
            </div>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full mt-1 py-2.5 bg-[#25D366] hover:bg-[#20ba59] text-[#FFFFFF] font-bengali text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-sm"
            >
              <MessageCircle className="w-4 h-4" />
              <span>হোয়াটসঅ্যাপে চ্যাট শুরু করুন</span>
            </a>
          </div>
        </div>
      )}

      {/* Floating Action Trigger Button */}
      <div className="flex items-center gap-2">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-2.5 px-4 py-3 bg-[#111111] hover:bg-[#222222] text-[#FFFFFF] border border-[#333333] shadow-2xl transition-all duration-300 hover:scale-105 cursor-pointer"
          aria-label={`WhatsApp Helpline ${displayPhone}`}
          title="WhatsApp এ সরাসরি চ্যাট করুন"
        >
          <div className="w-7 h-7 rounded-full bg-[#25D366] flex items-center justify-center text-[#FFFFFF] shadow-sm">
            <MessageCircle className="w-4 h-4" />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-[10px] font-english uppercase tracking-widest text-[#C6A36A] font-bold">
              WHATSAPP
            </span>
            <span className="font-english text-xs font-bold text-[#FFFFFF]">
              {displayPhone}
            </span>
          </div>
        </a>

        {/* Info toggle helper */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-8 h-8 rounded-full bg-[#FFFFFF] border border-[#D5CDBD] text-[#111111] hover:bg-[#F3F0E8] flex items-center justify-center shadow-md text-xs font-bold cursor-pointer transition-colors"
          title="বিস্তারিত দেখুন"
          aria-label="হোয়াটসঅ্যাপ হেল্পলাইন তথ্য"
        >
          {isOpen ? '✕' : '?'}
        </button>
      </div>
    </div>
  );
};
