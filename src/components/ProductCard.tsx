import React, { useState } from 'react';
import { Eye, ShoppingBag, Check } from 'lucide-react';
import { Product, SizeOption, ProductColor } from '../types';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: SizeOption, color: ProductColor) => void;
  onOrderNow?: (product: Product, size: SizeOption, color: ProductColor) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onQuickView,
  onAddToCart,
  onOrderNow,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [activeImgKey, setActiveImgKey] = useState<'primary' | 'secondary'>('primary');
  const [selectedSize, setSelectedSize] = useState<SizeOption>(product.availableSizes[0] || 'L');
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);
  const [isAddedRecently, setIsAddedRecently] = useState(false);

  const displayedImage = isHovered && product.secondaryImage
    ? (activeImgKey === 'primary' ? product.secondaryImage : product.image)
    : (activeImgKey === 'primary' ? product.image : (product.secondaryImage || product.image));

  const isModelPhoto = displayedImage.includes('Portrait') ||
    displayedImage.includes('Jibon_Jatra') ||
    displayedImage.includes('Reflective') ||
    displayedImage.includes('Sunlit');

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize, selectedColor);
    setIsAddedRecently(true);
    setTimeout(() => setIsAddedRecently(false), 1800);
  };

  const handleOrder = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onOrderNow) {
      onOrderNow(product, selectedSize, selectedColor);
    } else {
      handleAdd(e);
    }
  };

  return (
    <div
      className="group relative bg-[#FFFFFF] border border-[#E0D9CB] rounded-none overflow-hidden transition-all duration-300 hover:border-[#111111] hover:shadow-xl flex flex-col h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Image Container (Consistent 3:4 aspect ratio) */}
      <div
        className="relative aspect-[3/4] bg-[#F7F5F0] overflow-hidden cursor-pointer"
        onClick={() => onQuickView(product)}
      >
        <img
          src={displayedImage}
          alt={product.nameBn}
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          <span className="bg-[#111111] text-[#F3F0E8] text-[10px] sm:text-[11px] font-bengali font-medium px-2.5 py-0.5 border border-[#333333]">
            {isModelPhoto ? 'মডেলের ছবি (আমার ছবি)' : 'টি-শার্টের ছবি'}
          </span>
          {product.originalPrice && (
            <span className="bg-[#C6A36A] text-[#111111] text-[10px] sm:text-[11px] font-english font-bold px-2 py-0.5">
              SALE
            </span>
          )}
        </div>

        {/* Product Authenticity Badge */}
        <div className="absolute top-3 right-3 z-10">
          <span
            title={product.isSampleData ? "ডেভেলপমেন্ট পর্যায়ের ডেমো স্যাম্পল পণ্য" : "TEEZAN আসল প্রডাক্ট"}
            className={`backdrop-blur-xs text-[9px] font-english font-semibold px-2 py-0.5 border ${
              product.isSampleData
                ? 'bg-[#FFFFFF]/90 text-[#666666] border-[#DCD5C5]'
                : 'bg-[#111111]/90 text-[#C6A36A] border-[#C6A36A]/50'
            }`}
          >
            {product.isSampleData ? 'SAMPLE' : 'ORIGINAL'}
          </span>
        </div>

        {/* View Switcher Pill if product has both views */}
        {product.secondaryImage && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setActiveImgKey((prev) => (prev === 'primary' ? 'secondary' : 'primary'));
            }}
            className="absolute bottom-3 left-3 z-20 px-2 py-1 bg-[#111111]/85 hover:bg-[#111111] text-[#FFFFFF] text-[10px] font-bengali border border-white/20 transition-all flex items-center gap-1.5 cursor-pointer shadow-xs"
            title="ছবি পরিবর্তন করুন (টি-শার্ট / মডেল)"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-[#C6A36A] animate-pulse"></span>
            <span>{activeImgKey === 'primary' ? 'অন্য ভিউ দেখুন' : 'মূল ভিউ'}</span>
            <span className="text-[10px] text-[#C6A36A]">↺</span>
          </button>
        )}

        {/* Quick View Overlay Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onQuickView(product);
          }}
          className="absolute inset-x-4 bottom-4 py-2.5 bg-[#FFFFFF]/95 hover:bg-[#111111] hover:text-[#FFFFFF] text-[#111111] text-xs font-bengali font-semibold transition-all duration-300 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-2 shadow-md z-20 cursor-pointer"
          aria-label={`বিস্তারিত দেখুন - ${product.nameBn}`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>বিস্তারিত ও কুইক ভিউ</span>
        </button>
      </div>

      {/* Product Details Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-grow justify-between bg-[#FFFFFF] space-y-3">
        
        <div className="space-y-1.5">
          {/* Category & Fit */}
          <div className="flex items-center justify-between text-[11px] text-[#737373]">
            <span className="font-bengali font-normal">{product.categoryBn}</span>
            <span className="font-english font-medium">{product.gsm} GSM</span>
          </div>

          {/* Bengali Name & English Subtitle */}
          <h3
            onClick={() => onQuickView(product)}
            className="font-bengali text-base sm:text-lg font-bold text-[#111111] hover:text-[#C6A36A] transition-colors cursor-pointer line-clamp-1"
          >
            {product.nameBn}
          </h3>
          <p className="font-english text-xs text-[#7A7A7A] tracking-wider uppercase truncate">
            {product.nameEn}
          </p>
        </div>

        {/* Pricing in BDT */}
        <div className="flex items-baseline gap-2.5 pt-1">
          <span className="font-english text-lg sm:text-xl font-bold text-[#111111]">
            ৳ {product.price.toLocaleString('en-US')}
          </span>
          {product.originalPrice && (
            <span className="font-english text-xs sm:text-sm text-[#8E8E8E] line-through font-normal">
              ৳ {product.originalPrice.toLocaleString('en-US')}
            </span>
          )}
        </div>

        {/* Color Swatches */}
        <div className="flex items-center gap-1.5 pt-1">
          <span className="text-[10px] text-[#888888] font-english mr-1 uppercase">Color:</span>
          {product.colors.map((c, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColor(c);
              }}
              title={c.nameBn}
              className={`w-4 h-4 rounded-full border transition-all ${
                selectedColor.hex === c.hex ? 'ring-2 ring-[#C6A36A] scale-110' : 'border-[#CCCCCC]'
              }`}
              style={{ backgroundColor: c.hex }}
              aria-label={c.nameBn}
            />
          ))}
          <span className="text-[10px] font-bengali text-[#666666] ml-1 truncate">
            {selectedColor.nameBn}
          </span>
        </div>

        {/* Size Selector Buttons */}
        <div className="flex items-center gap-1 pt-1">
          <span className="text-[10px] text-[#888888] font-english mr-1 uppercase">Size:</span>
          {product.availableSizes.map((sz) => (
            <button
              key={sz}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setSelectedSize(sz);
              }}
              className={`min-w-6 h-6 px-1.5 text-[11px] font-english font-semibold border transition-colors cursor-pointer ${
                selectedSize === sz
                  ? 'bg-[#111111] text-[#FFFFFF] border-[#111111]'
                  : 'bg-[#F9F8F5] text-[#444444] border-[#E0D9CB] hover:border-[#111111]'
              }`}
            >
              {sz}
            </button>
          ))}
        </div>

        {/* Dual Actions: Order Now & Add to Cart */}
        <div className="pt-2 grid grid-cols-2 gap-2">
          <button
            onClick={handleOrder}
            className="w-full py-2.5 px-2 bg-[#111111] hover:bg-[#2A2A2A] text-[#FFFFFF] text-xs font-bengali font-bold transition-all flex items-center justify-center gap-1 cursor-pointer shadow-xs"
            aria-label={`অর্ডার করুন - ${product.nameBn}`}
          >
            <span>অর্ডার করুন</span>
            <span className="text-[#C6A36A] font-english font-bold">&rarr;</span>
          </button>

          <button
            onClick={handleAdd}
            className={`w-full py-2.5 px-2 text-xs font-bengali font-semibold transition-all border flex items-center justify-center gap-1.5 cursor-pointer ${
              isAddedRecently
                ? 'bg-[#2E7D32] text-[#FFFFFF] border-[#2E7D32]'
                : 'bg-[#FAF8F5] hover:bg-[#EAE4D6] text-[#111111] border-[#DDD5C5]'
            }`}
            aria-label={`কার্টে যোগ করুন - ${product.nameBn}`}
          >
            {isAddedRecently ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>যোগ হয়েছে</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5 text-[#C6A36A]" />
                <span>কার্ট</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};
