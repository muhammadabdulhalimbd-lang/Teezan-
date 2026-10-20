import React, { useState } from 'react';
import { Product, SizeOption, ProductColor } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, TrendingUp, SlidersHorizontal, Info } from 'lucide-react';

interface ProductGridProps {
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: SizeOption, color: ProductColor) => void;
  onOrderNow?: (product: Product, size: SizeOption, color: ProductColor) => void;
  activeFilter: string;
  onFilterChange: (category: string) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  onQuickView,
  onAddToCart,
  onOrderNow,
  activeFilter,
  onFilterChange,
}) => {
  const [showAllProducts, setShowAllProducts] = useState(false);

  // Premiere drops (First line: 4 distinct products)
  const newArrivals = products.slice(0, 4);

  // Signature selection (Second line: next distinct products, zero duplicates)
  const bestSellers = products.slice(4, 8);

  // Filtered list when category filter is active or show all
  const filteredProducts = activeFilter === 'all'
    ? (showAllProducts ? products : products)
    : activeFilter === 'new-arrivals'
    ? products.filter((p) => p.isNew)
    : products.filter((p) => p.category === activeFilter);

  const filterTabs = [
    { id: 'all', labelBn: 'সব পণ্য (All)' },
    { id: 'oversized', labelBn: 'ওভারসাইজড টি-শার্ট' },
    { id: 'typography', labelBn: 'টাইপোগ্রাফি টি-শার্ট' },
    { id: 'regular', labelBn: 'রেগুলার ফিট টি-শার্ট' },
    { id: 'new-arrivals', labelBn: 'নতুন আগমন' },
  ];

  return (
    <div id="products" className="space-y-20 py-16 md:py-24 bg-[#F3F0E8]">
      
      {/* Category Filter Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-[#E0D9CB] pb-5">
          <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#777777] font-english font-medium">
            <SlidersHorizontal className="w-3.5 h-3.5 text-[#C6A36A]" />
            <span>FILTER PRODUCTS:</span>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {filterTabs.map((tab) => {
              const active = activeFilter === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => onFilterChange(tab.id)}
                  className={`px-3.5 py-1.5 text-xs sm:text-sm font-bengali transition-colors cursor-pointer ${
                    active
                      ? 'bg-[#111111] text-[#FFFFFF] font-semibold'
                      : 'bg-[#FFFFFF] text-[#444444] border border-[#DDD6C8] hover:border-[#111111] hover:text-[#111111]'
                  }`}
                >
                  {tab.labelBn}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* If a specific category filter is chosen, show filtered collection directly */}
      {activeFilter !== 'all' ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mb-8">
            <span className="text-xs uppercase tracking-[0.2em] text-[#C6A36A] font-english font-bold">
              FILTERED VIEW
            </span>
            <h2 className="font-bengali text-2xl sm:text-3xl font-bold text-[#111111] mt-1">
              {filterTabs.find((t) => t.id === activeFilter)?.labelBn} ({filteredProducts.length}টি পণ্য)
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onOrderNow={onOrderNow}
              />
            ))}
          </div>
        </section>
      ) : showAllProducts ? (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E2DBD0]">
            <div className="space-y-1">
              <span className="text-xs uppercase tracking-[0.2em] text-[#C6A36A] font-english font-bold">
                COMPLETE COLLECTION
              </span>
              <h2 className="font-bengali text-3xl sm:text-4xl font-bold text-[#111111]">
                TEEZAN সমস্ত কালেকশন ({products.length}টি পণ্য)
              </h2>
              <p className="font-bengali text-sm text-[#555555]">
                আমাদের প্রতিটি প্রিমিয়াম টি-শার্ট ও স্ট্রিটওয়্যার ড্রপ একনজরে দেখে নিন।
              </p>
            </div>
            <div className="mt-4 sm:mt-0">
              <button
                onClick={() => setShowAllProducts(false)}
                className="inline-flex items-center gap-2 text-xs sm:text-sm font-bengali font-semibold text-[#111111] hover:text-[#C6A36A] transition-colors border-b-2 border-[#111111] hover:border-[#C6A36A] pb-0.5 cursor-pointer"
              >
                <span>ফিচার্ড ভিউতে ফিরে যান</span>
                <span>&larr;</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
            {products.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={onQuickView}
                onAddToCart={onAddToCart}
                onOrderNow={onOrderNow}
              />
            ))}
          </div>
        </section>
      ) : (
        <>
          {/* ========================================================================= */}
          {/* SECTION E: NEW ARRIVALS (নতুন এসেছে - ৪টি অনন্য ড্রপ) */}
          {/* ========================================================================= */}
          <section id="new-arrivals" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E2DBD0]">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C6A36A] font-english font-semibold">
                  <Sparkles className="w-3.5 h-3.5 text-[#C6A36A]" />
                  <span>FRESH STREETWEAR DROP</span>
                </div>
                <h2 className="font-bengali text-3xl sm:text-4xl font-bold text-[#111111]">
                  নতুন এসেছে
                </h2>
                <p className="font-bengali text-sm text-[#555555]">
                  আমাদের নতুন কালেকশন থেকে খুঁজে নিন আপনার পছন্দের স্টাইল।
                </p>
              </div>

              <div className="mt-4 sm:mt-0">
                <button
                  onClick={() => setShowAllProducts(true)}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bengali font-semibold text-[#111111] hover:text-[#C6A36A] transition-colors border-b-2 border-[#111111] hover:border-[#C6A36A] pb-0.5 cursor-pointer"
                >
                  <span>সব পণ্য দেখুন ({products.length}টি)</span>
                  <span>&rarr;</span>
                </button>
              </div>
            </div>

            {/* Responsive 4-card product grid on desktop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {newArrivals.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  onOrderNow={onOrderNow}
                />
              ))}
            </div>

            {/* "সব পণ্য দেখুন" Secondary Centered Button */}
            <div className="mt-12 text-center">
              <button
                onClick={() => setShowAllProducts(true)}
                className="px-8 py-3.5 bg-transparent border-2 border-[#111111] text-[#111111] font-bengali text-sm font-semibold hover:bg-[#111111] hover:text-[#FFFFFF] transition-all cursor-pointer"
              >
                সব পণ্য দেখুন ({products.length}টি কালেকশন)
              </button>
            </div>
          </section>

          {/* ========================================================================= */}
          {/* SECTION F: BEST SELLERS (জনপ্রিয় কালেকশন - ৪টি স্বতন্ত্র ড্রপ) */}
          {/* ========================================================================= */}
          <section id="best-sellers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 pb-4 border-b border-[#E2DBD0]">
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest text-[#C6A36A] font-english font-semibold">
                  <TrendingUp className="w-3.5 h-3.5 text-[#C6A36A]" />
                  <span>SIGNATURE SELECTION</span>
                </div>
                <h2 className="font-bengali text-3xl sm:text-4xl font-bold text-[#111111]">
                  জনপ্রিয় কালেকশন
                </h2>
                <div className="flex items-center gap-2 pt-0.5 text-xs text-[#666666] font-bengali">
                  <Info className="w-3.5 h-3.5 text-[#C6A36A]" />
                  <span>TEEZAN ব্র্যান্ডের নির্বাচিত সিগনেচার কালেকশন (কোনো ডুপ্লিকেট ছাড়া)।</span>
                </div>
              </div>
            </div>

            {/* 4 Cards for Best Sellers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {bestSellers.map((prod) => (
                <ProductCard
                  key={prod.id}
                  product={prod}
                  onQuickView={onQuickView}
                  onAddToCart={onAddToCart}
                  onOrderNow={onOrderNow}
                />
              ))}
            </div>
          </section>
        </>
      )}

    </div>
  );
};
