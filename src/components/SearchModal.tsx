import React, { useState, useEffect } from 'react';
import { Search, X, ArrowRight, Eye } from 'lucide-react';
import { Product } from '../types';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onSelectProduct: (product: Product) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  products,
  onSelectProduct,
}) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const results = searchTerm.trim() === ''
    ? []
    : products.filter((p) => {
        const query = searchTerm.toLowerCase();
        return (
          p.nameBn.toLowerCase().includes(query) ||
          p.nameEn.toLowerCase().includes(query) ||
          p.categoryBn.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.fabricBn.toLowerCase().includes(query)
        );
      });

  const popularTags = [
    { label: 'ওভারসাইজড', query: 'ওভারসাইজড' },
    { label: 'টাইপোগ্রাফি', query: 'টাইপোগ্রাফি' },
    { label: 'রেগুলার ফিট', query: 'রেগুলার' },
    { label: 'হেভিওয়েট টি', query: 'হেভিওয়েট' },
    { label: 'কালো টি-শার্ট', query: 'ব্ল্যাক' },
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-start justify-center p-4 sm:p-6 pt-16 sm:pt-24">
        <div className="relative w-full max-w-2xl bg-[#FFFFFF] shadow-2xl border border-[#D5CDBD] overflow-hidden animate-in fade-in zoom-in-95 duration-150">
          
          {/* Search Input Bar */}
          <div className="p-4 sm:p-6 border-b border-[#E8E2D5] flex items-center gap-3 bg-[#FAF8F3]">
            <Search className="w-5 h-5 text-[#888888] shrink-0" />
            <input
              type="text"
              autoFocus
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="পণ্য বা ক্যাটাগরি খুঁজুন (যেমন: ওভারসাইজড, টাইপোগ্রাফি, black)..."
              className="flex-1 bg-transparent text-[#111111] font-bengali text-base sm:text-lg focus:outline-none placeholder-[#999999]"
            />
            {searchTerm && (
              <button
                onClick={() => setSearchTerm('')}
                className="p-1 text-[#888888] hover:text-[#111111]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#777777] hover:text-[#111111]"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Suggestions when input is empty */}
          {searchTerm.trim() === '' && (
            <div className="p-6 space-y-4">
              <span className="text-xs uppercase tracking-widest text-[#888888] font-english font-semibold">
                POPULAR SEARCHES
              </span>
              <div className="flex flex-wrap gap-2">
                {popularTags.map((tag, i) => (
                  <button
                    key={i}
                    onClick={() => setSearchTerm(tag.query)}
                    className="px-3 py-1.5 bg-[#F3F0E8] hover:bg-[#111111] hover:text-[#FFFFFF] text-xs font-bengali text-[#333333] transition-colors border border-[#DDD5C5]"
                  >
                    {tag.label}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Search Results List */}
          {searchTerm.trim() !== '' && (
            <div className="max-h-96 overflow-y-auto p-4 sm:p-6 divide-y divide-[#EBE5D8]">
              {results.length === 0 ? (
                <div className="text-center py-8 font-bengali text-sm text-[#777777] space-y-1">
                  <p>দুঃখিত, &ldquo;{searchTerm}&rdquo; দিয়ে কোনো পণ্য পাওয়া যায়নি।</p>
                  <p className="text-xs text-[#999999]">অন্য কোনো কি-ওয়ার্ড দিয়ে আবার চেষ্টা করুন।</p>
                </div>
              ) : (
                results.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                    className="py-3 flex items-center justify-between gap-4 hover:bg-[#F7F5F0] px-3 cursor-pointer transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={product.image}
                        alt={product.nameBn}
                        className="w-12 h-14 object-cover bg-[#E8E2D6]"
                      />
                      <div>
                        <h4 className="font-bengali text-sm font-bold text-[#111111]">
                          {product.nameBn}
                        </h4>
                        <p className="font-english text-xs text-[#777777]">
                          {product.nameEn}
                        </p>
                        <span className="font-english font-bold text-xs text-[#111111]">
                          ৳ {product.price.toLocaleString('en-US')}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1 text-xs font-bengali text-[#C6A36A] font-semibold">
                      <span>দেখুন</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
