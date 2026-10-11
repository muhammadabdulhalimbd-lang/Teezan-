import React, { useState } from 'react';
import { Mail, CheckCircle2, AlertCircle } from 'lucide-react';

export const Newsletter: React.FC = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'valid_preview' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!email || !emailRegex.test(email)) {
      setStatus('error');
      setErrorMessage('অনুগ্রহ করে একটি সঠিক ইমেইল এড্রেস প্রদান করুন।');
      return;
    }

    // Honest development-stage behavior
    setStatus('valid_preview');
    setErrorMessage('');
  };

  return (
    <section className="py-20 bg-[#F3F0E8] border-b border-[#E0D9CB]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        
        <div className="w-12 h-12 mx-auto rounded-full bg-[#111111] flex items-center justify-center text-[#C6A36A]">
          <Mail className="w-5 h-5" />
        </div>

        <div className="space-y-2">
          <span className="text-xs uppercase tracking-[0.25em] text-[#C6A36A] font-english font-bold">
            NEWSLETTER & UPDATES
          </span>
          <h2 className="font-bengali text-3xl sm:text-4xl font-bold text-[#111111]">
            TEEZAN-এর সঙ্গে যুক্ত থাকুন
          </h2>
          <p className="font-bengali text-base text-[#555555] max-w-lg mx-auto">
            নতুন কালেকশন ও ব্র্যান্ড আপডেট সম্পর্কে জানতে আমাদের সঙ্গে থাকুন।
          </p>
        </div>

        {status === 'valid_preview' ? (
          <div className="p-6 bg-[#FFFFFF] border border-[#2E7D32]/40 max-w-xl mx-auto text-left space-y-2">
            <div className="flex items-center gap-2 text-[#2E7D32]">
              <CheckCircle2 className="w-5 h-5" />
              <span className="font-bengali font-bold text-base">ইমেইল ফরম্যাট সঠিক হয়েছে!</span>
            </div>
            <p className="font-bengali text-xs sm:text-sm text-[#444444] leading-relaxed">
              [ডেভেলপমেন্ট নোটিশ]: আপনার প্রদত্ত ইমেইল ({email}) ভ্যালিডেট করা হয়েছে। বর্তমান ডেভেলপমেন্ট সংস্করণে কোনো ব্যাকএন্ড সার্ভার বা ডাটাবেজ যুক্ত না থাকায় তথ্যটি সংরক্ষণ করা হয়নি। মূল স্টোর লঞ্চের পর স্বয়ংক্রিয় নিউজলেটার সাবস্ক্রিপশন সক্রিয় হবে।
            </p>
            <button
              onClick={() => {
                setStatus('idle');
                setEmail('');
              }}
              className="mt-2 text-xs font-bengali text-[#111111] underline hover:text-[#C6A36A]"
            >
              পুনরায় চেষ্টা করুন
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="আপনার ইমেইল অ্যাড্রেস লিখুন"
                className="flex-grow px-4 py-3 bg-[#FFFFFF] border border-[#D5CDBD] text-[#111111] placeholder-[#888888] font-bengali text-sm focus:outline-none focus:border-[#111111]"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-[#111111] hover:bg-[#2B2B2B] text-[#FFFFFF] font-bengali text-sm font-semibold transition-colors cursor-pointer whitespace-nowrap"
              >
                সাবস্ক্রাইব করুন
              </button>
            </div>

            {status === 'error' && (
              <div className="flex items-center justify-center gap-1.5 text-xs text-[#D32F2F] font-bengali pt-1">
                <AlertCircle className="w-4 h-4" />
                <span>{errorMessage}</span>
              </div>
            )}

            <p className="text-[11px] font-bengali text-[#777777]">
              আমরা আপনার গোপনীয়তাকে সম্মান করি। কোনো স্প্যাম পাঠানো হবে না।
            </p>
          </form>
        )}

      </div>
    </section>
  );
};
