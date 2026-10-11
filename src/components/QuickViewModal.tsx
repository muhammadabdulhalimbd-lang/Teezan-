import React, { useState } from 'react';
import { X, Check, ShoppingBag, Ruler, ShieldAlert, Sparkles } from 'lucide-react';
import { Product, SizeOption, ProductColor } from '../types';

interface QuickViewModalProps {
  product: Product | null;
  onClose: () => void;
  onAddToCart: (product: Product, size: SizeOption, color: ProductColor, quantity: number) => void;
  onOpenSizeGuide: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({
  product,
  onClose,
  onAddToCart,
  onOpenSizeGuide,
}) => {
  if (!product) return null;

  const [selectedSize, setSelectedSize] = useState<SizeOption>(product.availableSizes[0] || 'L');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [quantity, setQuantity] = useState(1);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize, selectedColor, quantity);
    setIsAdded(true);
    setTimeout(() => {
      setIsAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/75 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-4 sm:p-6">
        <div className="relative w-full max-w-3xl bg-[#FFFFFF] shadow-2xl overflow-hidden border border-[#D5CDBD] animate-in fade-in zoom-in-95 duration-200">
          
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-20 p-2 rounded-full bg-[#FFFFFF]/80 hover:bg-[#111111] hover:text-[#FFFFFF] text-[#111111] transition-colors cursor-pointer"
            aria-label="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="grid grid-cols-1 md:grid-cols-2">
            
            {/* Left: Product Images */}
            <div className="p-6 bg-[#F7F5F0] flex flex-col justify-between">
              <div className="aspect-[3/4] overflow-hidden bg-[#EAE5DA] relative">
                <img
                  src={activeImage}
                  alt={product.nameBn}
                  className="w-full h-full object-cover object-center transition-all duration-300"
                />
                <div className="absolute top-3 left-3 bg-[#111111] text-[#FFFFFF] text-[10px] font-english px-2 py-0.5">
                  TEEZAN EDITORIAL
                </div>
              </div>

              {/* Thumbnail selector if secondary image exists */}
              {product.secondaryImage && (
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={() => setActiveImage(product.image)}
                    className={`w-14 h-16 border overflow-hidden transition-all ${
                      activeImage === product.image ? 'border-[#111111] ring-2 ring-[#C6A36A]' : 'border-[#CCCCCC] opacity-70'
                    }`}
                  >
                    <img src={product.image} alt="Thumbnail 1" className="w-full h-full object-cover" />
                  </button>
                  <button
                    onClick={() => setActiveImage(product.secondaryImage!)}
                    className={`w-14 h-16 border overflow-hidden transition-all ${
                      activeImage === product.secondaryImage ? 'border-[#111111] ring-2 ring-[#C6A36A]' : 'border-[#CCCCCC] opacity-70'
                    }`}
                  >
                    <img src={product.secondaryImage} alt="Thumbnail 2" className="w-full h-full object-cover" />
                  </button>
                </div>
              )}
            </div>

            {/* Right: Product Information & Controls */}
            <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
              
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
                  <h3 className="font-bengali text-2xl font-bold text-[#111111]">
                    {product.nameBn}
                  </h3>
                  <p className="font-english text-xs text-[#7A7A7A] tracking-wider uppercase mt-0.5">
                    {product.nameEn}
                  </p>
                </div>

                {/* Price */}
                <div className="flex items-baseline gap-3">
                  <span className="font-english text-2xl font-bold text-[#111111]">
                    ৳ {product.price.toLocaleString('en-US')}
                  </span>
                  {product.originalPrice && (
                    <span className="font-english text-sm text-[#999999] line-through">
                      ৳ {product.originalPrice.toLocaleString('en-US')}
                    </span>
                  )}
                </div>

                {/* Description */}
                <p className="font-bengali text-sm text-[#444444] leading-relaxed pt-1">
                  {product.descriptionBn}
                </p>

                {/* Fabric & Fit Details */}
                <div className="py-2 border-y border-[#ECE7DA] space-y-1.5 text-xs font-bengali text-[#555555]">
                  <div className="flex justify-between">
                    <span className="text-[#888888]">ফেব্রিক:</span>
                    <span className="font-medium text-[#111111]">{product.fabricBn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#888888]">ফিটিং স্টাইল:</span>
                    <span className="font-medium text-[#111111]">{product.fitBn}</span>
                  </div>
                </div>
              </div>

              {/* Selection Controls */}
              <div className="space-y-4">
                
                {/* Color Selection */}
                <div>
                  <div className="flex justify-between text-xs mb-1.5 font-bengali">
                    <span className="text-[#777777]">রং নির্বাচন করুন:</span>
                    <span className="font-semibold text-[#111111]">{selectedColor.nameBn}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {product.colors.map((c, i) => (
                      <button
                        key={i}
                        onClick={() => setSelectedColor(c)}
                        className={`w-7 h-7 rounded-full border transition-all ${
                          selectedColor.hex === c.hex ? 'ring-2 ring-[#C6A36A] scale-110' : 'border-[#CCCCCC]'
                        }`}
                        style={{ backgroundColor: c.hex }}
                        title={c.nameBn}
                      />
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div>
                  <div className="flex justify-between items-center text-xs mb-1.5 font-bengali">
                    <span className="text-[#777777]">সাইজ নির্বাচন করুন:</span>
                    <button
                      onClick={onOpenSizeGuide}
                      className="text-[#111111] hover:text-[#C6A36A] flex items-center gap-1 underline font-medium cursor-pointer"
                    >
                      <Ruler className="w-3.5 h-3.5" />
                      <span>সাইজ গাইড</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-4 gap-2">
                    {product.availableSizes.map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`py-2 text-xs font-english font-bold border transition-colors cursor-pointer ${
                          selectedSize === sz
                            ? 'bg-[#111111] text-[#FFFFFF] border-[#111111]'
                            : 'bg-[#F9F8F5] text-[#333333] border-[#DDD5C5] hover:border-[#111111]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Add to Cart Action */}
                <div className="pt-2">
                  <button
                    onClick={handleAddToCart}
                    className={`w-full py-3.5 font-bengali text-sm font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer ${
                      isAdded
                        ? 'bg-[#2E7D32] text-[#FFFFFF]'
                        : 'bg-[#111111] hover:bg-[#2B2B2B] text-[#FFFFFF]'
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
