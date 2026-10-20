import React from 'react';
import { X, Shield, FileText, Mail, RotateCcw } from 'lucide-react';

interface PolicyModalProps {
  type: 'privacy' | 'terms' | 'contact' | 'returns' | null;
  onClose: () => void;
}

export const PolicyModal: React.FC<PolicyModalProps> = ({ type, onClose }) => {
  if (!type) return null;

  const contentMap = {
    privacy: {
      title: 'গোপনীয়তা নীতি (Privacy Policy)',
      icon: Shield,
      body: (
        <div className="space-y-4 font-bengali text-sm text-[#444444] leading-relaxed">
          <p>
            TEEZAN ক্রেতাদের ব্যক্তিগত তথ্যের সুরক্ষাকে সর্বোচ্চ অগ্রাধিকার দেয়।
          </p>
          <div className="space-y-2">
            <h4 className="font-bold text-[#111111]">১. তথ্যের ব্যবহার:</h4>
            <p>
              অর্ডার প্রক্রিয়াকরণ ও গ্রাহক সেবা প্রদানের স্বার্থে শুধুমাত্র প্রয়োজনীয় তথ্য (যেমন নাম, যোগাযোগের নম্বর ও ডেলিভারি ঠিকানা) সংগ্রহ করা হবে।
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-[#111111]">২. তথ্য সুরক্ষা:</h4>
            <p>
              গ্রাহকের কোনো ব্যক্তিগত তথ্য কোনো তৃতীয় পক্ষের কাছে বাণিজ্যিক উদ্দেশ্যে বিক্রি বা হস্তান্তর করা হবে না।
            </p>
          </div>
          <div className="p-3 bg-[#FAF8F3] border border-[#DDD5C5] text-xs text-[#666666]">
            <strong>প্রতিষ্ঠাতা তথ্য:</strong> TEEZAN এর প্রতিষ্ঠাতা <strong>Abdul Halim</strong>।
          </div>
        </div>
      ),
    },
    terms: {
      title: 'ব্যবহারের শর্তাবলি (Terms & Conditions)',
      icon: FileText,
      body: (
        <div className="space-y-4 font-bengali text-sm text-[#444444] leading-relaxed">
          <p>
            TEEZAN প্ল্যাটফর্ম ব্যবহারের সাধারণ শর্তাবলি:
          </p>
          <div className="space-y-2">
            <h4 className="font-bold text-[#111111]">১. পণ্যের বিবরণ ও প্রদর্শনী:</h4>
            <p>
              ওয়েবসাইটে প্রদর্শিত পণ্যের রঙ ও টেক্সচার ডিভাইসের স্ক্রিন সেটিংসের কারণে সামান্য ভিন্ন লাগতে পারে। আমরা সর্বোচ্চ সঠিক বিবরণ দেওয়ার চেষ্টা করি।
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-[#111111]">২. অর্ডার নিশ্চিতকরণ:</h4>
            <p>
              ওয়েবসাইটে অর্ডার প্লেস করার পর স্টক প্রাপ্যতা যাচাই সাপেক্ষে গ্রাহককে চূড়ান্ত নিশ্চিতকরণ মেসেজ বা কল দেওয়া হবে।
            </p>
          </div>
          <div className="p-3 bg-[#FAF8F3] border border-[#DDD5C5] text-xs text-[#666666]">
            <strong>প্রতিষ্ঠাতা তথ্য:</strong> TEEZAN এর প্রতিষ্ঠাতা <strong>Abdul Halim</strong>।
          </div>
        </div>
      ),
    },
    returns: {
      title: 'রিটার্ন ও এক্সচেঞ্জ পলিসি (Return & Exchange)',
      icon: RotateCcw,
      body: (
        <div className="space-y-4 font-bengali text-sm text-[#444444] leading-relaxed">
          <p>
            TEEZAN গ্রাহকদের কেনাকাটার পূর্ণ সন্তুষ্টি নিশ্চিত করতে সহজ রিটার্ন ও এক্সচেঞ্জ সুবিধা প্রদান করে:
          </p>
          <div className="space-y-2">
            <h4 className="font-bold text-[#111111]">১. সাইজ পরিবর্তন (৭ দিনের মধ্যে):</h4>
            <p>
              সাইজ মিসম্যাচ হলে পণ্য হাতে পাওয়ার ৭ দিনের মধ্যে সাইজ পরিবর্তনের অনুরোধ করতে পারবেন। টি-শার্টটি অব্যবহৃত, অপ্রক্ষালিত এবং মূল ট্যাগসহ থাকতে হবে।
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-[#111111]">২. ডিফেক্ট বা ত্রুটিপূর্ণ পণ্য:</h4>
            <p>
              ফ্যাব্রিক বা প্রিন্টে কোনো ত্রুটি থাকলে অথবা ভুল পণ্য প্রেরিত হলে TEEZAN নিজস্ব খরচে দ্রুততম সময়ে সঠিক পণ্য এক্সচেঞ্জ করে দেবে।
            </p>
          </div>
          <div className="space-y-2">
            <h4 className="font-bold text-[#111111]">৩. পার্সেল যাচাই করার সুযোগ:</h4>
            <p>
              ক্যাশ অন ডেলিভারিতে ডেলিভারিম্যানের সামনে পার্সেলটি দেখে বুঝে নেওয়ার সুযোগ রয়েছে।
            </p>
          </div>
          <div className="p-3 bg-[#FAF8F3] border border-[#DDD5C5] text-xs text-[#666666]">
            <strong>সহায়তার জন্য যোগাযোগ:</strong> রিটার্ন বা এক্সচেঞ্জের যেকোনো প্রয়োজনে অর্ডার নম্বরসহ আমাদের হেল্পলাইন <strong>01605529912</strong> (WhatsApp)-এ যোগাযোগ করুন।
          </div>
        </div>
      ),
    },
    contact: {
      title: 'যোগাযোগ ও কাস্টমার কেয়ার',
      icon: Mail,
      body: (
        <div className="space-y-4 font-bengali text-sm text-[#444444] leading-relaxed">
          <p>
            TEEZAN-এর সাথে যুক্ত হওয়া বা যেকোনো তথ্য জানার জন্য:
          </p>
          <div className="p-4 bg-[#FAF8F3] border border-[#DDD5C5] space-y-3">
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#111111]">ব্র্যান্ড নাম:</span>
              <span className="font-english font-semibold">TEEZAN</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#111111]">ট্যাগলাইন:</span>
              <span className="font-english text-xs text-[#C6A36A] font-bold">Wear Your Identity.</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#111111]">প্রতিষ্ঠাতা:</span>
              <span className="font-english font-medium">Abdul Halim</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#111111]">হোয়াটসঅ্যাপ হেল্পলাইন:</span>
              <a
                href="https://wa.me/8801605529912?text=Hello%20TEEZAN"
                target="_blank"
                rel="noopener noreferrer"
                className="font-english font-bold text-[#25D366] hover:underline flex items-center gap-1.5"
              >
                <span>01605529912</span>
                <span className="text-[10px] bg-[#25D366] text-[#FFFFFF] px-1.5 py-0.5 rounded-xs font-bengali">সরাসরি চ্যাট</span>
              </a>
            </div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-[#111111]">অবস্থান:</span>
              <span>ঢাকা, বাংলাদেশ</span>
            </div>
          </div>
          <div className="pt-2">
            <a
              href="https://wa.me/8801605529912?text=Hello%20TEEZAN"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 bg-[#25D366] hover:bg-[#20ba59] text-[#FFFFFF] font-bengali text-sm font-bold flex items-center justify-center gap-2 transition-colors"
            >
              <span>হোয়াটসঅ্যাপে সরাসরি মেসেজ পাঠান (01605529912)</span>
            </a>
          </div>
        </div>
      ),
    },
  };

  const current = contentMap[type];
  const IconComp = current.icon;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#111111]/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-xl bg-[#FFFFFF] shadow-2xl border border-[#D5CDBD] p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-150">
          
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5]">
            <div className="flex items-center gap-2">
              <IconComp className="w-5 h-5 text-[#C6A36A]" />
              <h3 className="font-bengali text-xl font-bold text-[#111111]">
                {current.title}
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#777777] hover:text-[#111111] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="pt-5">
            {current.body}
          </div>

          <div className="mt-6 pt-4 border-t border-[#E8E2D5] flex justify-end">
            <button
              onClick={onClose}
              className="px-5 py-2 bg-[#111111] text-[#FFFFFF] text-xs font-bengali font-semibold hover:bg-[#2B2B2B] transition-colors"
            >
              বন্ধ করুন
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};
