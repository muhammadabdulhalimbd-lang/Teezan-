import React, { useState } from 'react';
import { SAMPLE_PRODUCTS } from './data/products';
import { Product, CartItem, SizeOption, ProductColor } from './types';

// Sections
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { CategorySection } from './components/CategorySection';
import { ProductGrid } from './components/ProductGrid';
import { BrandStory } from './components/BrandStory';
import { BrandBenefits } from './components/BrandBenefits';
import { EditorialBanner } from './components/EditorialBanner';
import { CustomerReviews } from './components/CustomerReviews';
import { FAQSection } from './components/FAQSection';
import { Newsletter } from './components/Newsletter';
import { Footer } from './components/Footer';

// Modals & Drawers
import { CartDrawer } from './components/CartDrawer';
import { QuickViewModal } from './components/QuickViewModal';
import { SearchModal } from './components/SearchModal';
import { SizeGuideModal } from './components/SizeGuideModal';
import { PolicyModal } from './components/PolicyModal';
import { FloatingWhatsApp } from './components/FloatingWhatsApp';
import { CheckoutModal } from './components/CheckoutModal';
import { OrderSuccessModal } from './components/OrderSuccessModal';
import { Order } from './types';

export default function App() {
  // --- Cart State ---
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // --- Checkout & Order States ---
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [placedOrder, setPlacedOrder] = useState<Order | null>(null);

  // --- Modal States ---
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [policyType, setPolicyType] = useState<'privacy' | 'terms' | 'contact' | 'returns' | null>(null);

  // --- Filter State ---
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');

  // --- Toast Notification State ---
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 2500);
  };

  // Add to cart handler
  const handleAddToCart = (
    product: Product,
    size: SizeOption,
    color: ProductColor,
    quantity = 1
  ) => {
    const itemKey = `${product.id}-${size}-${color.hex}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: itemKey,
            product,
            selectedSize: size,
            selectedColor: color,
            quantity,
          },
        ];
      }
    });

    showToast(`"${product.nameBn}" কার্টে যোগ করা হয়েছে!`);
  };

  // Instant Buy / Direct Order Now handler
  const handleDirectOrderNow = (
    product: Product,
    size: SizeOption,
    color: ProductColor,
    quantity = 1
  ) => {
    const itemKey = `${product.id}-${size}-${color.hex}`;

    setCartItems((prev) => {
      const existing = prev.find((item) => item.id === itemKey);
      if (existing) {
        return prev.map((item) =>
          item.id === itemKey
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      } else {
        return [
          ...prev,
          {
            id: itemKey,
            product,
            selectedSize: size,
            selectedColor: color,
            quantity,
          },
        ];
      }
    });

    setQuickViewProduct(null);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  // Handle successful order completion
  const handleOrderSuccess = (order: Order) => {
    setPlacedOrder(order);
    setCartItems([]);
    setIsCheckoutOpen(false);
    showToast(`ধন্যবাদ! আপনার অর্ডার #${order.id} সফল হয়েছে!`);
  };

  // Update item quantity in cart
  const handleUpdateQuantity = (itemId: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === itemId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Remove item from cart
  const handleRemoveItem = (itemId: string) => {
    setCartItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  // Clear cart
  const handleClearCart = () => {
    setCartItems([]);
  };

  // Navigation scroll helper
  const handleNavigate = (sectionId: string, categoryFilter?: string) => {
    if (categoryFilter !== undefined) {
      setActiveCategoryFilter(categoryFilter);
    }
    const elem = document.getElementById(sectionId);
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Handle category card click
  const handleSelectCategory = (categoryId: string) => {
    setActiveCategoryFilter(categoryId);
    const elem = document.getElementById('products');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalCartCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen flex flex-col bg-[#F3F0E8] text-[#111111]">
      
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111111] text-[#FFFFFF] px-5 py-3 border-l-4 border-[#C6A36A] shadow-2xl flex items-center gap-3 font-bengali text-sm animate-in slide-in-from-bottom-5 duration-200">
          <span className="w-2 h-2 rounded-full bg-[#C6A36A]"></span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* SECTION A: Announcement Bar */}
      <AnnouncementBar />

      {/* SECTION B: Main Navigation Header */}
      <Header
        cartCount={totalCartCount}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onNavigate={handleNavigate}
        activeCategory={activeCategoryFilter}
      />

      {/* Main Content Area */}
      <main className="flex-grow">
        {/* SECTION C: Hero Banner */}
        <Hero
          onExploreClick={() => handleNavigate('products')}
          onAboutClick={() => handleNavigate('brand-story')}
        />

        {/* SECTION D: Shop by Category */}
        <CategorySection
          onSelectCategory={handleSelectCategory}
          activeCategory={activeCategoryFilter}
        />

        {/* SECTION E: New Arrivals & SECTION F: Best Sellers */}
        <ProductGrid
          products={SAMPLE_PRODUCTS}
          onQuickView={(p) => setQuickViewProduct(p)}
          onAddToCart={handleAddToCart}
          onOrderNow={handleDirectOrderNow}
          activeFilter={activeCategoryFilter}
          onFilterChange={(cat) => setActiveCategoryFilter(cat)}
        />

        {/* SECTION G: Brand Story */}
        <BrandStory
          onLearnMore={() => {
            const faqEl = document.getElementById('faq');
            if (faqEl) faqEl.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* SECTION H: Brand Benefits */}
        <BrandBenefits />

        {/* SECTION I: Promotional Editorial Banner */}
        <EditorialBanner
          onExplore={() => {
            setActiveCategoryFilter('all');
            handleNavigate('products');
          }}
        />

        {/* SECTION J: Customer Reviews */}
        <CustomerReviews />

        {/* SECTION K: FAQ Accordion */}
        <FAQSection onOpenSizeGuide={() => setIsSizeGuideOpen(true)} />

        {/* SECTION L: Newsletter */}
        <Newsletter />
      </main>

      {/* SECTION M: Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenPolicy={(type) => setPolicyType(type)}
        onOpenSizeGuide={() => setIsSizeGuideOpen(true)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        onClearCart={handleClearCart}
        onOpenCheckout={() => {
          setIsCartOpen(false);
          setIsCheckoutOpen(true);
        }}
      />

      {/* Quick View Modal */}
      <QuickViewModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
        onInstantOrder={handleDirectOrderNow}
        onOpenSizeGuide={() => {
          setIsSizeGuideOpen(true);
        }}
      />

      {/* Checkout Form Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderSuccess={handleOrderSuccess}
      />

      {/* Order Success Invoice Modal */}
      <OrderSuccessModal
        order={placedOrder}
        onClose={() => setPlacedOrder(null)}
        onContinueShopping={() => setPlacedOrder(null)}
      />

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={SAMPLE_PRODUCTS}
        onSelectProduct={(p) => setQuickViewProduct(p)}
      />

      {/* Size Guide Modal */}
      <SizeGuideModal
        isOpen={isSizeGuideOpen}
        onClose={() => setIsSizeGuideOpen(false)}
      />

      {/* Policy & Info Modal */}
      <PolicyModal
        type={policyType}
        onClose={() => setPolicyType(null)}
      />

      {/* Floating WhatsApp Quick Chat Button */}
      <FloatingWhatsApp />

    </div>
  );
}
