import React, { useState } from 'react';
import { X, Check, Truck, ShieldCheck, Phone, MapPin, User, ArrowRight, AlertCircle, CreditCard, Banknote } from 'lucide-react';
import { CartItem, CustomerDetails, Order } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (order: Order) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
}) => {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('ঢাকা');
  const [deliveryArea, setDeliveryArea] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash'>('cod');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = deliveryArea === 'inside_dhaka' ? 60 : 120;
  const grandTotal = subtotal + deliveryFee;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim()) {
      newErrors.fullName = 'আপনার সম্পূর্ণ নাম লিখুন';
    }

    const cleanPhone = phone.trim().replace(/\D/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'সঠিক মোবাইল নম্বর লিখুন';
    } else if (cleanPhone.length !== 11 || !cleanPhone.startsWith('01')) {
      newErrors.phone = '১১ ডিজিটের সঠিক নম্বর দিন (যেমন: 017XXXXXXXX)';
    }

    if (!address.trim() || address.trim().length < 8) {
      newErrors.address = 'ডেলিভারির সম্পূর্ণ ঠিকানা লিখুন (বাসা, রোড, এলাকা/থানা)';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;
    if (items.length === 0) return;

    setIsSubmitting(true);

    const randomSuffix = Math.floor(1000 + Math.random() * 9000);
    const orderId = `TZ-${randomSuffix}`;

    const newOrder: Order = {
      id: orderId,
      createdAt: new Date().toISOString(),
      customer: {
        fullName: fullName.trim(),
        phone: phone.trim(),
        address: address.trim(),
        city: city.trim(),
        deliveryArea,
        paymentMethod,
        notes: notes.trim(),
      },
      items,
      subtotal,
      deliveryFee,
      total: grandTotal,
      status: 'pending',
    };

    // Save order in localStorage
    try {
      const existing = JSON.parse(localStorage.getItem('teezan_orders') || '[]');
      localStorage.setItem('teezan_orders', JSON.stringify([newOrder, ...existing]));
    } catch (e) {
      console.error(e);
    }

    setTimeout(() => {
      setIsSubmitting(false);
      onOrderSuccess(newOrder);
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 py-8">
        <div className="relative w-full max-w-3xl bg-[#FFFFFF] shadow-2xl border border-[#D5CDBD] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#111111] text-[#FFFFFF] flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C6A36A]"></span>
                <span className="text-[11px] font-english uppercase tracking-widest text-[#C6A36A] font-bold">
                  FAST & SECURE CHECKOUT
                </span>
              </div>
              <h2 className="font-bengali text-xl sm:text-2xl font-bold mt-1">
                অর্ডার সম্পন্ন করুন
              </h2>
            </div>

            <button
              onClick={onClose}
              className="p-1.5 rounded-full text-[#AAAAAA] hover:text-[#FFFFFF] transition-colors cursor-pointer"
              aria-label="বন্ধ করুন"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Form and Summary Container */}
          <form onSubmit={handleSubmitOrder} className="p-5 sm:p-8 space-y-6">
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Left Column: Customer & Delivery Details (7 cols) */}
              <div className="lg:col-span-7 space-y-5">
                
                <div className="border-b border-[#EBE5D8] pb-2">
                  <h3 className="font-bengali font-bold text-base text-[#111111] flex items-center gap-2">
                    <User className="w-4 h-4 text-[#C6A36A]" />
                    <span>আপনার ডেলিভারি তথ্য দিন</span>
                  </h3>
                  <p className="font-bengali text-xs text-[#777777] mt-0.5">
                    পণ্যটি নির্ভুলভাবে পৌঁছানোর জন্য সঠিক নাম ও মোবাইল নম্বর লিখুন
                  </p>
                </div>

                {/* Full Name */}
                <div className="space-y-1">
                  <label className="block font-bengali text-xs font-semibold text-[#333333]">
                    আপনার পুরো নাম <span className="text-[#D32F2F]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="যেমন: আব্দুল হালিম"
                      className={`w-full px-3.5 py-2.5 bg-[#FAF8F5] border text-sm font-bengali text-[#111111] focus:outline-none focus:bg-[#FFFFFF] ${
                        errors.fullName ? 'border-[#D32F2F] focus:border-[#D32F2F]' : 'border-[#DDD5C5] focus:border-[#111111]'
                      }`}
                    />
                  </div>
                  {errors.fullName && (
                    <p className="text-[11px] text-[#D32F2F] font-bengali flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Phone Number */}
                <div className="space-y-1">
                  <label className="block font-bengali text-xs font-semibold text-[#333333]">
                    মোবাইল নম্বর <span className="text-[#D32F2F]">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="01XXXXXXXXX"
                      className={`w-full px-3.5 py-2.5 bg-[#FAF8F5] border text-sm font-english text-[#111111] focus:outline-none focus:bg-[#FFFFFF] ${
                        errors.phone ? 'border-[#D32F2F] focus:border-[#D32F2F]' : 'border-[#DDD5C5] focus:border-[#111111]'
                      }`}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-[11px] text-[#D32F2F] font-bengali flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.phone}
                    </p>
                  )}
                </div>

                {/* Full Address */}
                <div className="space-y-1">
                  <label className="block font-bengali text-xs font-semibold text-[#333333]">
                    সম্পূর্ণ ঠিকানা <span className="text-[#D32F2F]">*</span>
                  </label>
                  <textarea
                    rows={2}
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="বাড়ি নং, রোড নং, এলাকা/থানা এবং জেলা..."
                    className={`w-full px-3.5 py-2.5 bg-[#FAF8F5] border text-sm font-bengali text-[#111111] focus:outline-none focus:bg-[#FFFFFF] resize-none ${
                      errors.address ? 'border-[#D32F2F] focus:border-[#D32F2F]' : 'border-[#DDD5C5] focus:border-[#111111]'
                    }`}
                  />
                  {errors.address && (
                    <p className="text-[11px] text-[#D32F2F] font-bengali flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.address}
                    </p>
                  )}
                </div>

                {/* Delivery Area Selection */}
                <div className="space-y-2 pt-1">
                  <label className="block font-bengali text-xs font-semibold text-[#333333]">
                    ডেলিভারি এলাকা নির্বাচন করুন:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setDeliveryArea('inside_dhaka');
                        setCity('ঢাকা');
                      }}
                      className={`p-3 text-left border cursor-pointer transition-all ${
                        deliveryArea === 'inside_dhaka'
                          ? 'border-[#111111] bg-[#111111] text-[#FFFFFF] shadow-sm'
                          : 'border-[#DDD5C5] bg-[#FAF8F5] text-[#333333] hover:border-[#111111]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bengali text-xs font-bold">ঢাকার ভেতরে</span>
                        <span className="font-english text-xs font-bold">৳ ৬০</span>
                      </div>
                      <p className={`text-[10px] font-bengali mt-1 ${deliveryArea === 'inside_dhaka' ? 'text-[#C6A36A]' : 'text-[#777777]'}`}>
                        ২-৩ কার্যদিবসের মধ্যে
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        setDeliveryArea('outside_dhaka');
                        if (city === 'ঢাকা') setCity('ঢাকার বাইরে');
                      }}
                      className={`p-3 text-left border cursor-pointer transition-all ${
                        deliveryArea === 'outside_dhaka'
                          ? 'border-[#111111] bg-[#111111] text-[#FFFFFF] shadow-sm'
                          : 'border-[#DDD5C5] bg-[#FAF8F5] text-[#333333] hover:border-[#111111]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-bengali text-xs font-bold">ঢাকার বাইরে</span>
                        <span className="font-english text-xs font-bold">৳ ১২০</span>
                      </div>
                      <p className={`text-[10px] font-bengali mt-1 ${deliveryArea === 'outside_dhaka' ? 'text-[#C6A36A]' : 'text-[#777777]'}`}>
                        ৩-৫ কার্যদিবসের মধ্যে
                      </p>
                    </button>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div className="space-y-2 pt-2">
                  <label className="block font-bengali text-xs font-semibold text-[#333333]">
                    পেমেন্ট মেথড নির্বাচন করুন:
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('cod')}
                      className={`p-3 text-left border cursor-pointer transition-all flex flex-col justify-between ${
                        paymentMethod === 'cod'
                          ? 'border-[#111111] bg-[#FAF8F3] ring-1 ring-[#111111]'
                          : 'border-[#DDD5C5] bg-[#FFFFFF] hover:border-[#111111]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <Banknote className="w-4 h-4 text-[#C6A36A]" />
                        <span className="font-bengali text-xs font-bold text-[#111111]">
                          ক্যাশ অন ডেলিভারি
                        </span>
                      </div>
                      <p className="text-[10px] font-bengali text-[#777777] mt-1">
                        পণ্য হাতে পেয়ে টাকা পরিশোধ
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setPaymentMethod('bkash')}
                      className={`p-3 text-left border cursor-pointer transition-all flex flex-col justify-between ${
                        paymentMethod === 'bkash'
                          ? 'border-[#D12053] bg-[#FFF5F7] ring-1 ring-[#D12053]'
                          : 'border-[#DDD5C5] bg-[#FFFFFF] hover:border-[#D12053]'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#D12053]"></span>
                        <span className="font-bengali text-xs font-bold text-[#111111]">
                          বিকাশ / নগদ
                        </span>
                      </div>
                      <p className="text-[10px] font-english text-[#D12053] font-semibold mt-1">
                        01605529912 (Send Money)
                      </p>
                    </button>
                  </div>

                  {paymentMethod === 'bkash' && (
                    <div className="p-3 bg-[#FFF5F7] border border-[#F5C2D0] text-xs font-bengali text-[#99153C] space-y-1">
                      <p className="font-bold">বিকাশ/নগদ পেমেন্ট নির্দেশিকা:</p>
                      <p>
                        আমাদের অফিশিয়াল পার্সোনাল নম্বর <strong>01605529912</strong>-এ মোট <strong>৳{grandTotal}</strong> টাকা Send Money করুন। অর্ডার কনফার্ম করার পর আমাদের প্রতিনিধি আপনাকে কল করে ট্রানজেকশন আইডি নিশ্চিত করে নেবেন।
                      </p>
                    </div>
                  )}
                </div>

                {/* Optional Notes */}
                <div className="space-y-1 pt-1">
                  <label className="block font-bengali text-xs font-medium text-[#666666]">
                    ডেলিভারি নোট বা সাইজ নিয়ে কোনো বিশেষ নির্দেশনা (অপশনাল):
                  </label>
                  <input
                    type="text"
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    placeholder="যেমন: দ্রুত ডেলিভারি দিলে উপকৃত হব"
                    className="w-full px-3 py-2 bg-[#FAF8F5] border border-[#DDD5C5] text-xs font-bengali text-[#111111] focus:outline-none focus:bg-[#FFFFFF]"
                  />
                </div>

              </div>

              {/* Right Column: Order Items Summary & Price Breakdown (5 cols) */}
              <div className="lg:col-span-5 bg-[#FAF8F5] p-5 border border-[#E0D9CB] space-y-5">
                
                <div className="border-b border-[#E5DFD1] pb-3">
                  <span className="text-[10px] font-english uppercase tracking-widest text-[#C6A36A] font-bold block">
                    ORDER SUMMARY
                  </span>
                  <h4 className="font-bengali text-base font-bold text-[#111111]">
                    অর্ডার তালিকা ({items.length}টি পণ্য)
                  </h4>
                </div>

                {/* Selected Products List */}
                <div className="max-h-60 overflow-y-auto space-y-3 pr-1 divide-y divide-[#EBE5D8]">
                  {items.map((item) => (
                    <div key={item.id} className="pt-2 first:pt-0 flex gap-3 items-center">
                      <img
                        src={item.product.image}
                        alt={item.product.nameBn}
                        className="w-12 h-15 object-cover bg-[#EAE5DC] shrink-0 border border-[#DDD5C5]"
                      />
                      <div className="flex-1 min-w-0">
                        <p className="font-bengali text-xs font-bold text-[#111111] truncate">
                          {item.product.nameBn}
                        </p>
                        <p className="text-[11px] text-[#666666] font-english">
                          Size: {item.selectedSize} | Qty: {item.quantity}
                        </p>
                        <p className="text-[11px] font-bengali text-[#888888]">
                          {item.selectedColor.nameBn}
                        </p>
                      </div>
                      <div className="text-right">
                        <span className="font-english font-bold text-xs text-[#111111]">
                          ৳ {(item.product.price * item.quantity).toLocaleString('en-US')}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Cost Breakdown */}
                <div className="space-y-2 pt-3 border-t border-[#E5DFD1] text-xs font-bengali">
                  <div className="flex justify-between text-[#666666]">
                    <span>পণ্যের মোট মূল্য:</span>
                    <span className="font-english font-medium text-[#111111]">
                      ৳ {subtotal.toLocaleString('en-US')}
                    </span>
                  </div>

                  <div className="flex justify-between text-[#666666]">
                    <span>ডেলিভারি চার্জ ({deliveryArea === 'inside_dhaka' ? 'ঢাকা' : 'ঢাকার বাইরে'}):</span>
                    <span className="font-english font-medium text-[#111111]">
                      ৳ {deliveryFee}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[#E0D9CB] flex justify-between font-bold text-base text-[#111111]">
                    <span>সর্বমোট প্রদেয়:</span>
                    <span className="font-english text-lg text-[#111111]">
                      ৳ {grandTotal.toLocaleString('en-US')}
                    </span>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-3">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-[#111111] hover:bg-[#252525] text-[#FFFFFF] font-bengali text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg disabled:opacity-50"
                  >
                    {isSubmitting ? (
                      <span>অর্ডার প্রসেস হচ্ছে...</span>
                    ) : (
                      <>
                        <span>অর্ডার নিশ্চিত করুন (৳ {grandTotal.toLocaleString('en-US')})</span>
                        <ArrowRight className="w-4 h-4 text-[#C6A36A]" />
                      </>
                    )}
                  </button>
                </div>

                {/* Guarantee Notes */}
                <div className="pt-2 space-y-1.5 text-[11px] text-[#777777] font-bengali">
                  <div className="flex items-center gap-1.5">
                    <ShieldCheck className="w-3.5 h-3.5 text-[#2E7D32]" />
                    <span>১০০% অরিজিনাল কটন ফ্যাব্রিক গ্যারান্টি</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Truck className="w-3.5 h-3.5 text-[#C6A36A]" />
                    <span>ক্যাশ অন ডেলিভারিতে পার্সেল চেক করে গ্রহণের সুযোগ</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-[#25D366]" />
                    <span>হেল্পলাইন: 01605529912 (WhatsApp Support)</span>
                  </div>
                </div>

              </div>

            </div>

          </form>

        </div>
      </div>
    </div>
  );
};
