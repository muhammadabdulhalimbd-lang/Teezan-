import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Info } from 'lucide-react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  items,
  onUpdateQuantity,
  onRemoveItem,
  onClearCart,
}) => {
  if (!isOpen) return null;

  const totalAmount = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#111111]/70 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#F3F0E8] shadow-2xl flex flex-col border-l border-[#D5CDBD]">
          
          {/* Header */}
          <div className="p-5 bg-[#111111] text-[#FFFFFF] flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-[#C6A36A]" />
              <h2 className="font-bengali text-lg font-bold">শপিং কার্ট</h2>
              <span className="text-xs font-english bg-[#2A2A2A] text-[#C6A36A] px-2 py-0.5 ml-1">
                {items.length} {items.length === 1 ? 'আইটেম' : 'আইটেম'}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-1 rounded-full text-[#AAAAAA] hover:text-[#FFFFFF] transition-colors cursor-pointer"
              aria-label="কার্ট বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Development Stage Notice Banner */}
          <div className="bg-[#E7E0D2] px-4 py-2.5 border-b border-[#D8CEBD] flex items-start gap-2 text-xs font-bengali text-[#444444]">
            <Info className="w-4 h-4 text-[#C6A36A] shrink-0 mt-0.5" />
            <span>
              <strong>ডেভেলপমেন্ট মোড:</strong> এটি ক্লায়েন্ট-সাইড কার্ট সিমুলেশন। কোনো আসল চার্জ বা পেমেন্ট গেটওয়ে এখনো সক্রিয় নয়।
            </span>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4 text-[#777777]">
                <div className="w-16 h-16 rounded-full bg-[#E5DFD1] flex items-center justify-center text-[#999999]">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-bengali text-lg font-bold text-[#111111]">
                    আপনার কার্ট খালি রয়েছে
                  </h3>
                  <p className="font-bengali text-xs text-[#666666]">
                    কালেকশন থেকে পছন্দের টি-শার্ট নির্বাচন করে কার্টে যোগ করুন।
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 bg-[#111111] text-[#FFFFFF] font-bengali text-xs font-semibold hover:bg-[#2A2A2A] transition-colors"
                >
                  পণ্য ব্রাউজ করুন
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-[#FFFFFF] border border-[#DDD5C5] shadow-xs"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.product.image}
                    alt={item.product.nameBn}
                    className="w-20 h-24 object-cover object-center bg-[#F0EDE6] shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between">
                        <h4 className="font-bengali text-sm font-bold text-[#111111] line-clamp-1">
                          {item.product.nameBn}
                        </h4>
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="text-[#999999] hover:text-[#D32F2F] p-1 transition-colors"
                          title="মুছে ফেলুন"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Size & Color Info */}
                      <div className="flex items-center gap-2 text-xs text-[#666666] pt-1">
                        <span className="font-english bg-[#F3F0E8] px-1.5 py-0.5 border border-[#E0D9CB]">
                          Size: {item.selectedSize}
                        </span>
                        <span className="flex items-center gap-1 font-bengali">
                          <span
                            className="w-2.5 h-2.5 rounded-full inline-block border border-[#BBB]"
                            style={{ backgroundColor: item.selectedColor.hex }}
                          />
                          {item.selectedColor.nameBn}
                        </span>
                      </div>
                    </div>

                    {/* Price & Quantity Controls */}
                    <div className="flex items-center justify-between pt-2">
                      <span className="font-english text-sm font-bold text-[#111111]">
                        ৳ {(item.product.price * item.quantity).toLocaleString('en-US')}
                      </span>

                      <div className="flex items-center border border-[#DDD5C5] bg-[#FAF8F5]">
                        <button
                          onClick={() => onUpdateQuantity(item.id, -1)}
                          disabled={item.quantity <= 1}
                          className="p-1 hover:bg-[#EBE5D8] disabled:opacity-30 disabled:hover:bg-transparent"
                          aria-label="পরিমাণ কমান"
                        >
                          <Minus className="w-3.5 h-3.5 text-[#111111]" />
                        </button>
                        <span className="font-english text-xs font-semibold px-2.5 text-[#111111]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => onUpdateQuantity(item.id, 1)}
                          className="p-1 hover:bg-[#EBE5D8]"
                          aria-label="পরিমাণ বাড়ান"
                        >
                          <Plus className="w-3.5 h-3.5 text-[#111111]" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer Checkout Summary */}
          {items.length > 0 && (
            <div className="p-5 bg-[#FFFFFF] border-t border-[#DDD5C5] space-y-4">
              <div className="space-y-2 text-sm font-bengali">
                <div className="flex justify-between text-[#666666]">
                  <span>সাবটোটাল</span>
                  <span className="font-english font-medium text-[#111111]">
                    ৳ {totalAmount.toLocaleString('en-US')}
                  </span>
                </div>
                <div className="flex justify-between text-[#666666]">
                  <span>আনুমানিক ডেলিভারি চার্জ</span>
                  <span className="text-xs text-[#888888] font-bengali">অর্ডারের সময় নির্ধারিত হবে</span>
                </div>
                <div className="pt-2 border-t border-[#E8E2D5] flex justify-between font-bold text-base text-[#111111]">
                  <span>সর্বমোট মূল্য</span>
                  <span className="font-english text-lg text-[#111111]">
                    ৳ {totalAmount.toLocaleString('en-US')}
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    alert('ধন্যবাদ! TEEZAN বর্তমানে স্টেজ-১ ডেভেলপমেন্ট প্রিভিউতে রয়েছে। মূল চালুর পর সরাসরি বিকাশ, কার্ড ও সিওডি পেমেন্ট সক্রিয় হবে।');
                  }}
                  className="w-full py-3.5 bg-[#111111] hover:bg-[#2B2B2B] text-[#FFFFFF] font-bengali text-sm font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                >
                  <span>অর্ডার সম্পন্ন করতে এগিয়ে যান</span>
                  <ArrowRight className="w-4 h-4 text-[#C6A36A]" />
                </button>

                <button
                  onClick={onClearCart}
                  className="w-full text-center text-xs text-[#888888] hover:text-[#D32F2F] font-bengali transition-colors py-1"
                >
                  কার্ট খালি করুন
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
