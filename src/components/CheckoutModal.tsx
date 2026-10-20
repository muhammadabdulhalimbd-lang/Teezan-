import React, { useState, useEffect, useMemo } from 'react';
import { X, Truck, ShieldCheck, Phone, MapPin, User, ArrowRight, AlertCircle, Banknote, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { CartItem, CustomerDetails, Order, SizeOption, ProductColor } from '../types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  items: CartItem[];
  onOrderSuccess: (order: Order) => void;
  onItemsChange?: (updatedItems: CartItem[]) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  items,
  onOrderSuccess,
  onItemsChange,
}) => {
  // Local editable checkout items initialized from props
  const [checkoutItems, setCheckoutItems] = useState<CartItem[]>(items);

  // Form Fields
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('ঢাকা');
  const [deliveryArea, setDeliveryArea] = useState<'inside_dhaka' | 'outside_dhaka'>('inside_dhaka');
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'bkash'>('cod');
  const [transactionId, setTransactionId] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  // Sync with incoming items when modal opens or items prop updates
  useEffect(() => {
    if (isOpen) {
      setCheckoutItems(items);
      setErrors({});
      setSubmitError(null);
    }
  }, [isOpen, items]);

  // Notify parent of items change if needed
  const updateItems = (newItems: CartItem[]) => {
    setCheckoutItems(newItems);
    if (onItemsChange) {
      onItemsChange(newItems);
    }
  };

  // Group items by product & color to allow intuitive size-wise quantity adjustments
  const groupedProducts = useMemo(() => {
    const groups: {
      productId: string;
      colorHex: string;
      product: CartItem['product'];
      color: ProductColor;
      variants: {
        id: string;
        size: SizeOption;
        quantity: number;
      }[];
      totalQuantity: number;
      subtotal: number;
    }[] = [];

    checkoutItems.forEach((item) => {
      const groupKey = `${item.product.id}_${item.selectedColor.hex}`;
      let group = groups.find((g) => `${g.productId}_${g.colorHex}` === groupKey);

      if (!group) {
        group = {
          productId: item.product.id,
          colorHex: item.selectedColor.hex,
          product: item.product,
          color: item.selectedColor,
          variants: [],
          totalQuantity: 0,
          subtotal: 0,
        };
        groups.push(group);
      }

      group.variants.push({
        id: item.id,
        size: item.selectedSize,
        quantity: item.quantity,
      });
      group.totalQuantity += item.quantity;
      group.subtotal += item.product.price * item.quantity;
    });

    return groups;
  }, [checkoutItems]);

  const totalPieces = checkoutItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = checkoutItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const deliveryFee = deliveryArea === 'inside_dhaka' ? 60 : 120;
  const grandTotal = subtotal + deliveryFee;

  // Handle size-wise quantity increment/decrement
  const handleUpdateSizeQty = (productId: string, colorHex: string, size: SizeOption, delta: number) => {
    const itemKey = `${productId}-${size}-${colorHex}`;
    const existingIndex = checkoutItems.findIndex(
      (it) => it.product.id === productId && it.selectedColor.hex === colorHex && it.selectedSize === size
    );

    if (existingIndex >= 0) {
      const currentQty = checkoutItems[existingIndex].quantity;
      const nextQty = currentQty + delta;

      if (nextQty <= 0) {
        // Remove this size variant
        const updated = checkoutItems.filter((_, idx) => idx !== existingIndex);
        updateItems(updated);
      } else {
        // Update quantity
        const updated = [...checkoutItems];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: nextQty,
        };
        updateItems(updated);
      }
    } else if (delta > 0) {
      // Add new size variant for this product
      const targetGroup = groupedProducts.find((g) => g.productId === productId && g.colorHex === colorHex);
      if (targetGroup) {
        const newItem: CartItem = {
          id: itemKey,
          product: targetGroup.product,
          selectedSize: size,
          selectedColor: targetGroup.color,
          quantity: delta,
        };
        updateItems([...checkoutItems, newItem]);
      }
    }
  };

  // Remove all size variants of a product design
  const handleRemoveProduct = (productId: string, colorHex: string) => {
    const updated = checkoutItems.filter(
      (it) => !(it.product.id === productId && it.selectedColor.hex === colorHex)
    );
    updateItems(updated);
  };

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!fullName.trim() || fullName.trim().length < 2) {
      newErrors.fullName = 'আপনার সম্পূর্ণ নাম লিখুন (কমপক্ষে ২ অক্ষর)';
    }

    const cleanPhone = phone.trim().replace(/\D/g, '');
    const validPrefixes = ['013', '014', '015', '016', '017', '018', '019'];
    const hasValidPrefix = validPrefixes.some((p) => cleanPhone.startsWith(p));

    if (!cleanPhone) {
      newErrors.phone = 'সঠিক মোবাইল নম্বর লিখুন';
    } else if (cleanPhone.length !== 11 || !hasValidPrefix) {
      newErrors.phone = '১১ ডিজিটের সঠিক বাংলাদেশি নম্বর দিন (যেমন: 017XXXXXXXX)';
    }

    if (!address.trim() || address.trim().length < 8) {
      newErrors.address = 'ডেলিভারির সম্পূর্ণ ঠিকানা লিখুন (বাসা নং, রোড, এলাকা/থানা ও জেলা)';
    }

    if (checkoutItems.length === 0 || totalPieces === 0) {
      newErrors.cart = 'আপনার অর্ডার তালিকায় কোনো পণ্য নেই। অনুগ্রহ করে পণ্য ও সাইজ নির্বাচন করুন।';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (isSubmitting) return; // Prevent duplicate submission
    if (!validate()) return;
    if (checkoutItems.length === 0 || totalPieces === 0) return;

    setIsSubmitting(true);

    try {
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
          transactionId: paymentMethod === 'bkash' ? transactionId.trim() : undefined,
          notes: notes.trim(),
        },
        items: checkoutItems,
        subtotal,
        deliveryFee,
        total: grandTotal,
        status: 'pending',
      };

      // Save order in localStorage safely
      try {
        const existing = JSON.parse(localStorage.getItem('teezan_orders') || '[]');
        localStorage.setItem('teezan_orders', JSON.stringify([newOrder, ...existing]));
      } catch (storageErr) {
        console.warn('LocalStorage save warning:', storageErr);
      }

      setTimeout(() => {
        setIsSubmitting(false);
        onOrderSuccess(newOrder);
      }, 500);
    } catch (err) {
      setIsSubmitting(false);
      setSubmitError('অর্ডার প্রসেস করতে সাময়িক সমস্যা হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন বা সরাসরি হোয়াটসঅ্যাপে যোগাযোগ করুন।');
    }
  };

  // WhatsApp order text builder with exact size quantities breakdown
  const whatsappOrderMessage = useMemo(() => {
    let msg = `*TEEZAN নতুন সরাসরি অর্ডার*\n\n`;
    msg += `গ্রাহকের নাম: ${fullName.trim() || 'প্রযোজ্য নয়'}\n`;
    msg += `মোবাইল নম্বর: ${phone.trim() || 'প্রযোজ্য নয়'}\n`;
    msg += `ডেলিভারির ঠিকানা: ${address.trim() || 'প্রযোজ্য নয়'}, ${city}\n`;
    msg += `ডেলিভারি এলাকা: ${deliveryArea === 'inside_dhaka' ? 'ঢাকার ভেতরে (৳৬০)' : 'ঢাকার বাইরে (৳১২০)'}\n`;
    msg += `পেমেন্ট পদ্ধতি: ${paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি (COD)' : `বিকাশ/নগদ (Send Money TrxID: ${transactionId || 'অর্ডারের পর জানাব'})`}\n\n`;
    
    msg += `*অর্ডারকৃত টি-শার্টের তালিকা:*\n`;
    groupedProducts.forEach((group, idx) => {
      const sizeList = group.variants.map((v) => `${v.size}: ${v.quantity} পিস`).join(', ');
      msg += `${idx + 1}. ${group.product.nameBn} [${sizeList}] (${group.color.nameBn}) — ৳${group.subtotal}\n`;
    });

    msg += `\nমোট পিস: ${totalPieces}টি\n`;
    msg += `পণ্যের মোট মূল্য: ৳${subtotal}\n`;
    msg += `ডেলিভারি চার্জ: ৳${deliveryFee}\n`;
    msg += `*সর্বমোট প্রদেয়: ৳${grandTotal}*\n\n`;
    if (notes.trim()) {
      msg += `বিশেষ নোট: ${notes.trim()}\n\n`;
    }
    msg += `অনুগ্রহ করে আমার অর্ডারটি কনফার্ম করুন। ধন্যবাদ!`;
    return msg;
  }, [fullName, phone, address, city, deliveryArea, paymentMethod, transactionId, notes, groupedProducts, totalPieces, subtotal, deliveryFee, grandTotal]);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/80 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 py-8">
        <div className="relative w-full max-w-4xl bg-[#FFFFFF] shadow-2xl border border-[#D5CDBD] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="p-5 sm:p-6 bg-[#111111] text-[#FFFFFF] flex items-center justify-between border-b border-[#222222]">
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
                    <div className="p-3.5 bg-[#FFF5F7] border border-[#F5C2D0] text-xs font-bengali text-[#99153C] space-y-2.5">
                      <div className="space-y-1">
                        <p className="font-bold flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-[#D12053]"></span>
                          <span>ম্যানুয়াল বিকাশ / নগদ পেমেন্ট নির্দেশিকা (Send Money):</span>
                        </p>
                        <p className="text-[11px] leading-relaxed text-[#7A122E]">
                          আমাদের অফিশিয়াল পার্সোনাল নম্বর <strong>01605529912</strong>-এ মোট <strong>৳{grandTotal}</strong> টাকা Send Money করুন। এটি কোনো স্বয়ংক্রিয় পেমেন্ট গেটওয়ে নয়; টাকা পাঠানোর পর ট্রানজেকশন আইডি প্রদান করুন অথবা অর্ডার প্লেস করার পর আমাদের প্রতিনিধি আপনাকে কল করে নিশ্চিত করে নেবেন।
                        </p>
                      </div>

                      <div className="space-y-1 pt-1 border-t border-[#F5C2D0]/60">
                        <label className="block text-[11px] font-bold text-[#7A122E]">
                          ট্রানজেকশন আইডি (TrxID) বা প্রেরক নম্বরের শেষ ৪ ডিজিট:
                        </label>
                        <input
                          type="text"
                          value={transactionId}
                          onChange={(e) => setTransactionId(e.target.value)}
                          placeholder="যেমন: BL9X1234 বা 9912"
                          className="w-full px-3 py-2 bg-[#FFFFFF] border border-[#E0AAB7] text-xs font-english text-[#111111] focus:outline-none focus:border-[#D12053]"
                        />
                      </div>
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

                {errors.cart && (
                  <div className="p-3 bg-[#FFEBEE] border border-[#FFCDD2] text-xs text-[#D32F2F] font-bengali flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errors.cart}</span>
                  </div>
                )}

                {submitError && (
                  <div className="p-3 bg-[#FFEBEE] border border-[#FFCDD2] text-xs text-[#D32F2F] font-bengali flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{submitError}</span>
                  </div>
                )}

              </div>

              {/* Right Column: Order Items Summary & Size-Wise Controls (5 cols) */}
              <div className="lg:col-span-5 bg-[#FAF8F5] p-5 border border-[#E0D9CB] space-y-5">
                
                <div className="border-b border-[#E5DFD1] pb-3 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] font-english uppercase tracking-widest text-[#C6A36A] font-bold block">
                      ORDER SUMMARY
                    </span>
                    <h4 className="font-bengali text-base font-bold text-[#111111]">
                      অর্ডার তালিকা ({groupedProducts.length}টি ডিজাইন • {totalPieces}টি পিস)
                    </h4>
                  </div>
                  {checkoutItems.length > 0 && (
                    <span className="text-xs font-english font-bold bg-[#111111] text-[#FFFFFF] px-2 py-0.5">
                      {totalPieces} PCS
                    </span>
                  )}
                </div>

                {/* Selected Products List */}
                {groupedProducts.length === 0 ? (
                  <div className="py-8 text-center space-y-3">
                    <ShoppingBag className="w-10 h-10 text-[#AAAAAA] mx-auto" />
                    <p className="font-bengali text-sm font-semibold text-[#555555]">
                      আপনার কোনো পণ্য নির্বাচিত নেই!
                    </p>
                    <button
                      type="button"
                      onClick={onClose}
                      className="px-4 py-2 bg-[#111111] text-[#FFFFFF] text-xs font-bengali font-semibold hover:bg-[#252525] transition-colors cursor-pointer"
                    >
                      পণ্য ব্রাউজ করুন
                    </button>
                  </div>
                ) : (
                  <div className="max-h-80 overflow-y-auto space-y-4 pr-1 divide-y divide-[#EBE5D8]">
                    {groupedProducts.map((group) => {
                      // Find available sizes that are NOT yet selected for this product
                      const unselectedSizes = group.product.availableSizes.filter(
                        (sz) => !group.variants.some((v) => v.size === sz)
                      );

                      return (
                        <div key={`${group.productId}_${group.colorHex}`} className="pt-3 first:pt-0 space-y-2">
                          {/* Product Header */}
                          <div className="flex gap-3 items-start">
                            <img
                              src={group.product.image}
                              alt={group.product.nameBn}
                              className="w-14 h-18 object-cover bg-[#EAE5DC] shrink-0 border border-[#DDD5C5]"
                            />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-1">
                                <h5 className="font-bengali text-xs font-bold text-[#111111] line-clamp-1">
                                  {group.product.nameBn}
                                </h5>
                                <button
                                  type="button"
                                  onClick={() => handleRemoveProduct(group.productId, group.colorHex)}
                                  className="text-[#999999] hover:text-[#D32F2F] p-0.5 transition-colors cursor-pointer"
                                  title="ডিজাইনটি সম্পূর্ণ বাদ দিন"
                                >
                                  <Trash2 className="w-3.5 h-3.5" />
                                </button>
                              </div>
                              <p className="text-[11px] font-english text-[#777777] uppercase truncate">
                                {group.product.nameEn}
                              </p>
                              <div className="flex items-center gap-1.5 text-[11px] font-bengali text-[#555555] mt-0.5">
                                <span
                                  className="w-2.5 h-2.5 rounded-full inline-block border border-[#BBB]"
                                  style={{ backgroundColor: group.color.hex }}
                                />
                                <span>{group.color.nameBn}</span>
                                <span className="text-[#888888]">•</span>
                                <span className="font-english font-semibold text-[#111111]">
                                  ৳ {group.product.price} / পিস
                                </span>
                              </div>
                            </div>
                          </div>

                          {/* Size-wise Quantities with Plus and Minus Controls */}
                          <div className="space-y-1.5 pl-2 border-l-2 border-[#C6A36A]">
                            <div className="text-[10px] font-bengali text-[#777777] font-semibold">
                              সাইজ অনুযায়ী পরিমাণ (+ / -):
                            </div>
                            {group.variants.map((v) => (
                              <div
                                key={v.id}
                                className="flex items-center justify-between bg-[#FFFFFF] px-2.5 py-1.5 border border-[#E2DBD0] text-xs"
                              >
                                <div className="flex items-center gap-2">
                                  <span className="font-english font-bold text-xs bg-[#111111] text-[#FFFFFF] w-6 h-5 flex items-center justify-center">
                                    {v.size}
                                  </span>
                                  <span className="font-bengali text-[11px] text-[#666666]">
                                    (৳{group.product.price} × {v.quantity})
                                  </span>
                                </div>

                                <div className="flex items-center gap-2">
                                  <div className="flex items-center border border-[#DDD5C5] bg-[#FAF8F5]">
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateSizeQty(group.productId, group.colorHex, v.size, -1)}
                                      className="w-5 h-5 flex items-center justify-center text-xs font-bold text-[#444444] hover:bg-[#EAE4D6] cursor-pointer"
                                      title="পরিমাণ কমান"
                                    >
                                      -
                                    </button>
                                    <span className="w-6 text-center font-english font-bold text-xs text-[#111111]">
                                      {v.quantity}
                                    </span>
                                    <button
                                      type="button"
                                      onClick={() => handleUpdateSizeQty(group.productId, group.colorHex, v.size, 1)}
                                      className="w-5 h-5 flex items-center justify-center text-xs font-bold text-[#444444] hover:bg-[#EAE4D6] cursor-pointer"
                                      title="পরিমাণ বাড়ান"
                                    >
                                      +
                                    </button>
                                  </div>
                                  <span className="w-14 text-right font-english font-bold text-xs text-[#111111]">
                                    ৳ {(group.product.price * v.quantity).toLocaleString('en-US')}
                                  </span>
                                </div>
                              </div>
                            ))}

                            {/* Option to add other available sizes for this product */}
                            {unselectedSizes.length > 0 && (
                              <div className="flex items-center gap-1.5 pt-1">
                                <span className="text-[10px] font-bengali text-[#777777]">
                                  + অন্য সাইজ যোগ করুন:
                                </span>
                                {unselectedSizes.map((sz) => (
                                  <button
                                    key={sz}
                                    type="button"
                                    onClick={() => handleUpdateSizeQty(group.productId, group.colorHex, sz, 1)}
                                    className="px-1.5 py-0.5 bg-[#FFFFFF] hover:bg-[#111111] hover:text-[#FFFFFF] text-[#444444] text-[10px] font-english font-semibold border border-[#DDD5C5] transition-colors cursor-pointer"
                                    title={`সাইজ ${sz} যোগ করুন`}
                                  >
                                    + {sz}
                                  </button>
                                ))}
                              </div>
                            )}
                          </div>

                          {/* Product Line Subtotal */}
                          <div className="flex items-center justify-between text-xs font-bengali text-[#555555] pt-1">
                            <span>এই ডিজাইনের সাবটোটাল ({group.totalQuantity} পিস):</span>
                            <span className="font-english font-bold text-[#111111]">
                              ৳ {group.subtotal.toLocaleString('en-US')}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Cost Breakdown */}
                <div className="space-y-2 pt-3 border-t border-[#E5DFD1] text-xs font-bengali">
                  <div className="flex justify-between text-[#666666]">
                    <span>মোট পিস (Total Pieces):</span>
                    <span className="font-english font-bold text-[#111111]">
                      {totalPieces} টি
                    </span>
                  </div>

                  <div className="flex justify-between text-[#666666]">
                    <span>পণ্যের মোট মূল্য (Subtotal):</span>
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

                {/* Submit Buttons */}
                <div className="pt-3 space-y-2.5">
                  <button
                    type="submit"
                    disabled={isSubmitting || checkoutItems.length === 0 || totalPieces === 0}
                    className="w-full py-4 bg-[#111111] hover:bg-[#252525] text-[#FFFFFF] font-bengali text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg disabled:opacity-40 disabled:cursor-not-allowed"
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

                  {/* Direct WhatsApp Order Submission with Dynamic URL */}
                  <a
                    href={`https://wa.me/8801605529912?text=${encodeURIComponent(whatsappOrderMessage)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`w-full py-2.5 px-3 bg-[#25D366] hover:bg-[#20ba59] text-[#FFFFFF] font-bengali text-xs font-bold flex items-center justify-center gap-2 transition-colors shadow-xs ${
                      checkoutItems.length === 0 || totalPieces === 0 ? 'pointer-events-none opacity-50' : ''
                    }`}
                    title="হোয়াটসঅ্যাপে সরাসরি অর্ডার পাঠান"
                  >
                    <span>হোয়াটসঅ্যাপে দ্রুত অর্ডার পাঠান (01605529912)</span>
                  </a>
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
