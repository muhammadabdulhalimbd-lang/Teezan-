import React, { useState } from 'react';
import { X, Ruler, HelpCircle } from 'lucide-react';
import { SIZE_CHART } from '../data/products';

interface SizeGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SizeGuideModal: React.FC<SizeGuideModalProps> = ({ isOpen, onClose }) => {
  const [unit, setUnit] = useState<'inches' | 'cm'>('inches');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-2xl bg-[#FFFFFF] shadow-2xl border border-[#D5CDBD] p-6 sm:p-8 animate-in fade-in zoom-in-95 duration-150">
          
          {/* Header */}
          <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5]">
            <div className="flex items-center gap-2">
              <Ruler className="w-5 h-5 text-[#C6A36A]" />
              <h3 className="font-bengali text-xl font-bold text-[#111111]">
                TEEZAN সাইজ গাইড (Size Guide)
              </h3>
            </div>
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#777777] hover:text-[#111111] transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Unit Toggle & Description */}
          <div className="py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-bengali text-[#555555]">
            <p>
              সঠিক সাইজ নিশ্চিত করতে আপনার বুক ও দৈর্ঘ্যের মাপ মিলিয়ে নিন।
            </p>
            <div className="flex items-center gap-1 bg-[#F3F0E8] p-1 border border-[#DDD5C5]">
              <button
                onClick={() => setUnit('inches')}
                className={`px-3 py-1 font-english font-semibold text-xs transition-colors ${
                  unit === 'inches' ? 'bg-[#111111] text-[#FFFFFF]' : 'text-[#666666]'
                }`}
              >
                Inches (ইঞ্চি)
              </button>
              <button
                onClick={() => setUnit('cm')}
                className={`px-3 py-1 font-english font-semibold text-xs transition-colors ${
                  unit === 'cm' ? 'bg-[#111111] text-[#FFFFFF]' : 'text-[#666666]'
                }`}
              >
                Centimeters (সেমি)
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-[#E0D9CB]">
            <table className="w-full text-left text-sm">
              <thead className="bg-[#111111] text-[#FFFFFF] font-english text-xs uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4 font-bold">Size</th>
                  <th className="py-3 px-4">Chest ({unit === 'inches' ? 'in' : 'cm'})</th>
                  <th className="py-3 px-4">Length (in)</th>
                  <th className="py-3 px-4">Sleeve (in)</th>
                  <th className="py-3 px-4">Fit Type</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EBE5D8] font-english text-xs sm:text-sm">
                {SIZE_CHART.map((row) => (
                  <tr key={row.size} className="hover:bg-[#FAF8F3]">
                    <td className="py-3 px-4 font-bold text-[#111111] bg-[#F7F5F0]">
                      {row.size}
                    </td>
                    <td className="py-3 px-4 text-[#333333]">
                      {unit === 'inches' ? row.chestInches : row.chestCm}
                    </td>
                    <td className="py-3 px-4 text-[#333333]">{row.lengthInches}</td>
                    <td className="py-3 px-4 text-[#333333]">{row.sleeveInches}</td>
                    <td className="py-3 px-4 font-bengali text-xs text-[#666666]">
                      ড্রপ-শোল্ডার রিল্যাক্সড
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Helpful Tips */}
          <div className="mt-5 p-4 bg-[#FAF8F5] border border-[#E5DFD1] text-xs font-bengali text-[#555555] space-y-2">
            <div className="flex items-center gap-1.5 font-bold text-[#111111]">
              <HelpCircle className="w-4 h-4 text-[#C6A36A]" />
              <span>ওভারসাইজড ফিট পরামর্শ:</span>
            </div>
            <p className="leading-relaxed">
              TEEZAN-এর ওভারসাইজড কালেকশন স্বাভাবিক সাইজের চেয়ে কিছুটা চওড়া ও ড্রপ-শোল্ডার কাটে তৈরি। আপনি যদি স্বাভাবিক ওভারসাইজড লুক চান, আপনার নিয়মিত সাইজটিই (যেমন L) নির্বাচন করুন। আরও ঢিলেঢালা লুক চাইলে এক সাইজ বড় নিতে পারেন।
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
