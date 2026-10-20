import React, { useState, useEffect } from 'react';
import { X, Check, ShoppingBag, Ruler, ArrowRight, AlertCircle } from 'lucide-react';
import { Product, SizeOption, ProductColor } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCartMulti?: (product: Product, color: ProductColor, sizeQuantities: Record<SizeOption, number>) => void;
  onInstantOrderMulti?: (product: Product, color: ProductColor, sizeQuantities: Record<SizeOption, number>) => void;
  onAddToCart?: (product: Product, size: SizeOption, color: ProductColor, quantity: number) => void;
  onInstantOrder?: (product: Product, size: SizeOption, color: ProductColor, quantity: number) => void;
  onOpenSizeGuide: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCartMulti,
  onInstantOrderMulti,
  onAddToCart,
  onInstantOrder,
  onOpenSizeGuide,
}) => {
  const [selectedColor, setSelectedColor] = useState<ProductColor | null>(() => product ? product.colors[0] : null);
  const [activeImage, setActiveImage] = useState<string>(() => product ? product.image : '');
  const [isAdded, setIsAdded] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Size-wise quantities state: { S: 0, M: 1, L: 0, XL: 0, XXL: 0 }
  const [sizeQuantities, setSizeQuantities] = useState<Record<string, number>>(() => {
    const initial: Record<string, number> = {};
    if (product) {
      product.availableSizes.forEach((sz, idx) => {
        initial[sz] = idx === 0 ? 1 : 0;
      });
    }
    return initial;
  });

  // Reset state when product changes
  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setActiveImage(product.image);
      const initial: Record<string, number> = {};
      product.availableSizes.forEach((sz, idx) => {
        initial[sz] = idx === 0 ? 1 : 0;
      });
      setSizeQuantities(initial);
      setValidationError(null);
    }
  }, [product?.id]);

  if (!product) return null;

  const currentColor = selectedColor || product.colors[0];
  const currentImage = activeImage || product.image;
  const totalPieces = Object.values(sizeQuantities).reduce((sum, q) => sum + (q || 0), 0);
  const totalAmount = totalPieces * product.price;

  const handleQuantityChange = (size: string, delta: number) => {
    setValidationError(null);
    setSizeQuantities((prev) => {
      const current = prev[size] || 0;
      const next = Math.max(0, current + delta);
      return { ...prev, [size]: next };
    });
  };

  const handleAddToCartClick = () => {
    if (totalPieces === 0) {
      setValidationError('অনুগ্রহ করে কমপক্ষে একটি সাইজের জন্য পরিমাণ (কমপক্ষে ১ পিস) নির্বাচন করুন।');
      return;
    }

    if (onAddToCartMulti) {
      onAddToCartMulti(product, currentColor, sizeQuantities as Record<SizeOption, number>);
    } else if (onAddToCart) {
      // Fallback for first non-zero size
      const firstEntry = Object.entries(sizeQuantities).find(([_, q]) => q > 0);
      if (firstEntry) {
        onAddToCart(product, firstEntry[0] as SizeOption, currentColor, firstEntry[1]);
      }
    }

    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  const handleInstantBuyClick = () => {
    if (totalPieces === 0) {
      setValidationError('অনুগ্রহ করে কমপক্ষে একটি সাইজের জন্য পরিমাণ (কমপক্ষে ১ পিস) নির্বাচন করুন।');
      return;
    }

    if (onInstantOrderMulti) {
      onInstantOrderMulti(product, currentColor, sizeQuantities as Record<SizeOption, number>);
    } else if (onInstantOrder) {
      const firstEntry = Object.entries(sizeQuantities).find(([_, q]) => q > 0);
      if (firstEntry) {
        onInstantOrder(product, firstEntry[0] as SizeOption, currentColor, firstEntry[1]);
      }
    } else {
      handleAddToCartClick();
    }
  };

  const isModelPhoto = currentImage.includes('Portrait') ||
    currentImage.includes('Jibon_Jatra') ||
    currentImage.includes('Reflective') ||
    currentImage.includes('Sunlit');

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 py-6">
        <div className="relative w-full max-w-3xl bg-[#FFFFFF] shadow-2xl overflow-hidden border border-[#D5CDBD] animate-in fade-in zoom-in-95 duration-200">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#FFFFFF]/90 hover:bg-[#111111] hover:text-[#FFFFFF] text-[#111111] transition-colors cursor-pointer shadow-sm"
            aria-label="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left: Product Images */}
            <div className="p-5 sm:p-6 bg-[#F7F5F0] flex flex-col justify-between border-b md:border-b-0 md:border-r border-[#E8E2D5]">
              <div className="aspect-[3/4] overflow-hidden bg-[#EAE5DA] relative border border-[#DDD5C5]">
                <img
                  src={currentImage}
                  alt={product.nameBn}
                  className={`w-full h-full ${isModelPhoto ? 'object-cover object-top' : 'object-cover object-center'} transition-all duration-300`}
                />
                <div className="absolute top-3 left-3 bg-[#111111] text-[#FFFFFF] text-[10px] font-english px-2 py-0.5">
                  TEEZAN ORIGINAL
                </div>
              </div>

              {/* Thumbnail selector if secondary image exists */}
              {product.secondaryImage && (
                <div className="flex gap-3 mt-3">
                  <button
                    type="button"
                    onClick={() => setActiveImage(product.image)}
                    className={`flex flex-col items-center gap-1 border p-1 transition-all cursor-pointer ${
                      currentImage === product.image ? 'border-[#111111] ring-2 ring-[#C6A36A] bg-[#FFFFFF]' : 'border-[#D5CDBD] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="w-14 h-16 overflow-hidden">
                      <img src={product.image} alt="Thumbnail 1" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bengali text-[#444444] font-medium">
                      {product.image.includes('Portrait') || product.image.includes('Jibon_Jatra') || product.image.includes('Reflective') || product.image.includes('Sunlit')
                        ? 'মডেলের ছবি'
                        : 'টি-শার্ট ভিউ'}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveImage(product.secondaryImage!)}
                    className={`flex flex-col items-center gap-1 border p-1 transition-all cursor-pointer ${
                      currentImage === product.secondaryImage ? 'border-[#111111] ring-2 ring-[#C6A36A] bg-[#FFFFFF]' : 'border-[#D5CDBD] opacity-75 hover:opacity-100'
                    }`}
                  >
                    <div className="w-14 h-16 overflow-hidden">
                      <img src={product.secondaryImage} alt="Thumbnail 2" className="w-full h-full object-cover" />
                    </div>
                    <span className="text-[10px] font-bengali text-[#444444] font-medium">
                      {product.secondaryImage.includes('Portrait') || product.secondaryImage.includes('Jibon_Jatra') || product.secondaryImage.includes('Reflective') || product.secondaryImage.includes('Sunlit')
                        ? 'মডেলের ছবি'
                        : 'টি-শার্ট ভিউ'}
                    </span>
                  </button>
                </div>
              )}
            </div>

            {/* Right: Product Information & Size-wise Controls */}
            <div className="p-5 sm:p-7 flex flex-col justify-between space-y-5 max-h-[85vh] overflow-y-auto">
              
              <div className="space-y-3">
                {/* Badge & Category */}
                <div className="flex items-center justify-between text-xs text-[#777777]">
                  <span className="font-bengali bg-[#F3F0E8] px-2.5 py-0.5 text-[#111111] font-medium border border-[#E0D9CB]">
                    {product.categoryBn}
                  </span>
                  <span className="font-english font-semibold text-[#C6A36A]">
                    {product.gsm} GSM HEAVYWEIGHT
                  </span>
                </div>

                {/* Title */}
                <div>
                  <h3 className="font-bengali text-xl sm:text-2xl font-bold text-[#111111]">
                    {product.nameBn}
                  </h3>
                  <p className="font-english text-xs text-[#7A7A7A] tracking-wider uppercase mt-0.5">
                    {product.nameEn}
                  </p>
                </div>

                {/* Unit Price */}
                <div className="flex items-baseline gap-3">
                  <span className="font-english text-2xl font-bold text-[#111111]">
                    ৳ {product.price.toLocaleString('en-US')}
                  </span>
                  <span className="font-bengali text-xs text-[#666666]">
                    / প্রতি পিস
                  </span>
                  {product.originalPrice && (
                    <span className="font-english text-sm text-[#999999] line-through">
                      ৳ {product.originalPrice.toLocaleString('en-US')}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="font-bengali text-xs sm:text-sm text-[#444444] leading-relaxed">
                  {product.descriptionBn}
                </p>

                {/* Fabric & Fit Details */}
                <div className="py-2 border-y border-[#ECE7DA] space-y-1 text-xs font-bengali text-[#555555]">
                  <div className="flex justify-between">
                    <span className="text-[#888888]">ফেব্রিক:</span>
                    <span className="font-medium text-[#111111]">{product.fabricBn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#888888]">ফিটিং:</span>
                    <span className="font-medium text-[#111111]">{product.fitBn}</span>
                  </div>
                </div>
              </div>

              {/* Controls Section */}
              <div className="space-y-4">
                
                {/* Color Selection */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-bengali">
                    <span className="text-[#777777]">রং নির্বাচন করুন:</span>
                    <span className="font-semibold text-[#111111]">{currentColor.nameBn}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c, i) => (
                      <button
                        key={i}
                        type="button"
                        onClick={() => setSelectedColor(c)}
                        className={`w-7 h-7 rounded-full border transition-all ${
                          currentColor.hex === c.hex ? 'ring-2 ring-[#C6A36A] scale-110' : 'border-[#CCCCCC]'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.nameBn}
                      />
                    ))}
                  </div>
                </div>

                {/* Size-wise Quantities with Plus and Minus Controls */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center text-xs font-bengali">
                    <span className="font-bold text-[#111111]">
                      সাইজ অনুযায়ী পরিমাণ নির্বাচন করুন (+ / -):
                    </span>
                    <button
                      type="button"
                      onClick={onOpenSizeGuide}
                      className="text-[#111111] hover:text-[#C6A36A] flex items-center gap-1 underline font-medium cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5 text-[#C6A36A]" />
                      <span>সাইজ গাইড</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.availableSizes.map((sz) => {
                      const qty = sizeQuantities[sz] || 0;
                      return (
                        <div
                          key={sz}
                          className={`flex items-center justify-between p-2 border transition-all ${
                            qty > 0
                              ? 'bg-[#FAF8F3] border-[#111111] ring-1 ring-[#111111]'
                              : 'bg-[#FFFFFF] border-[#E2DBD0]'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-7 h-7 flex items-center justify-center font-english font-bold text-xs border ${
                                qty > 0
                                  ? 'bg-[#111111] text-[#FFFFFF] border-[#111111]'
                                  : 'bg-[#F5F2EB] text-[#444444] border-[#DDD5C5]'
                              }`}
                            >
                              {sz}
                            </span>
                            <span className="font-bengali text-xs font-semibold text-[#222222]">
                              সাইজ {sz}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            <div className="flex items-center border border-[#DDD5C5] bg-[#FFFFFF]">
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(sz, -1)}
                                disabled={qty === 0}
                                className="w-6 h-6 flex items-center justify-center text-sm font-bold text-[#444444] hover:bg-[#F0EDE6] disabled:opacity-30 disabled:hover:bg-transparent cursor-pointer"
                                aria-label={`Decrease ${sz}`}
                              >
                                -
                              </button>
                              <span className="w-7 text-center font-english font-bold text-xs text-[#111111]">
                                {qty}
                              </span>
                              <button
                                type="button"
                                onClick={() => handleQuantityChange(sz, 1)}
                                className="w-6 h-6 flex items-center justify-center text-sm font-bold text-[#444444] hover:bg-[#F0EDE6] cursor-pointer"
                                aria-label={`Increase ${sz}`}
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {/* Summary of Size Selection */}
                  <div className="p-2.5 bg-[#F5F2EB] border border-[#DDD5C5] flex items-center justify-between text-xs font-bengali">
                    <div className="text-[#444444]">
                      নির্বাচিত মোট: <strong className="font-english text-sm text-[#111111]">{totalPieces}</strong> টি পিস
                    </div>
                    <div className="text-[#111111]">
                      পণ্যের মূল্য: <strong className="font-english text-sm font-bold text-[#111111]">৳ {totalAmount.toLocaleString('en-US')}</strong>
                    </div>
                  </div>

                  {validationError && (
                    <div className="p-2.5 bg-[#FFEBEE] border border-[#FFCDD2] text-[11px] font-bengali text-[#D32F2F] flex items-center gap-1.5">
                      <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                      <span>{validationError}</span>
                    </div>
                  )}
                </div>

                {/* Order & Cart Actions */}
                <div className="pt-2 space-y-2">
                  {/* Primary: Instant Buy / Order Now (Direct Checkout with ONLY this product's variants) */}
                  <button
                    type="button"
                    onClick={handleInstantBuyClick}
                    className="w-full py-3.5 bg-[#111111] hover:bg-[#252525] text-[#FFFFFF] font-bengali text-sm font-bold flex items-center justify-center gap-2 transition-all cursor-pointer shadow-md"
                  >
                    <span>এখনই অর্ডার করুন ({totalPieces}টি পিস - ৳ {totalAmount.toLocaleString('en-US')})</span>
                    <ArrowRight className="w-4 h-4 text-[#C6A36A]" />
                  </button>

                  {/* Secondary: Add to Cart */}
                  <button
                    type="button"
                    onClick={handleAddToCartClick}
                    className={`w-full py-3 font-bengali text-xs font-semibold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                      isAdded
                        ? 'bg-[#2E7D32] text-[#FFFFFF] border-[#2E7D32]'
                        : 'bg-[#F9F8F5] hover:bg-[#EAE4D6] text-[#111111] border-[#DDD5C5]'
                    }`}
                  >
                    {isAdded ? (
                      <>
                        <Check className="w-4 h-4 text-[#FFFFFF]" />
                        <span>কার্টে যোগ করা হয়েছে!</span>
                      </>
                    ) : (
                      <>
                        <ShoppingBag className="w-4 h-4 text-[#C6A36A]" />
                        <span>কার্টে যোগ করুন</span>
                      </>
                    )}
                  </button>
                </div>

              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
