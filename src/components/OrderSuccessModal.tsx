import React from 'react';
import { CheckCircle2, MessageCircle, Printer, ShoppingBag, X, Phone, MapPin, Calendar } from 'lucide-react';
import { Order } from '../types';

interface OrderSuccessModalProps {
  order: Order | null;
  onClose: () => void;
  onContinueShopping: () => void;
}

export const OrderSuccessModal: React.FC<OrderSuccessModalProps> = ({
  order,
  onClose,
  onContinueShopping,
}) => {
  if (!order) return null;

  const orderDate = new Date(order.createdAt).toLocaleDateString('bn-BD', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  // Pre-formatted WhatsApp confirmation message
  const whatsappMsg = encodeURIComponent(
    `*TEEZAN নতুন অর্ডার কনফার্মেশন*\n` +
    `অর্ডার আইডি: #${order.id}\n` +
    `তারিখ: ${new Date(order.createdAt).toLocaleDateString('en-GB')}\n\n` +
    `*গ্রাহকের তথ্য:*\n` +
    `নাম: ${order.customer.fullName}\n` +
    `মোবাইল: ${order.customer.phone}\n` +
    `ঠিকানা: ${order.customer.address}, ${order.customer.city}\n` +
    `পেমেন্ট: ${order.customer.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি (COD)' : 'বিকাশ/নগদ'}\n\n` +
    `*অর্ডারকৃত পণ্যসমূহ:*\n` +
    order.items
      .map(
        (item, i) =>
          `${i + 1}. ${item.product.nameBn} - সাইজ: ${item.selectedSize}, রং: ${item.selectedColor.nameBn} (${item.quantity}টি x ৳${item.product.price})`
      )
      .join('\n') +
    `\n\nডেলিভারি চার্জ: ৳${order.deliveryFee}\n` +
    `*সর্বমোট প্রদেয়: ৳${order.total}*`
  );

  const whatsappUrl = `https://wa.me/8801605529912?text=${whatsappMsg}`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#111111]/85 backdrop-blur-xs transition-opacity"
        onClick={onClose}
      />

      <div className="flex min-h-full items-center justify-center p-3 sm:p-6 py-8">
        <div className="relative w-full max-w-2xl bg-[#FFFFFF] shadow-2xl border border-[#D5CDBD] overflow-hidden animate-in fade-in zoom-in-95 duration-200">
          
          {/* Top Green Accent Bar */}
          <div className="h-2 bg-[#25D366]"></div>

          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1.5 rounded-full text-[#888888] hover:text-[#111111] transition-colors cursor-pointer"
            aria-label="বন্ধ করুন"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="p-6 sm:p-8 space-y-6">
            
            {/* Header Success Section */}
            <div className="text-center space-y-2">
              <div className="w-16 h-16 rounded-full bg-[#E8F5E9] text-[#2E7D32] flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-10 h-10" />
              </div>
              <span className="font-english text-xs font-bold uppercase tracking-widest text-[#C6A36A]">
                ORDER PLACED SUCCESSFULLY
              </span>
              <h2 className="font-bengali text-2xl sm:text-3xl font-bold text-[#111111]">
                ধন্যবাদ! আপনার অর্ডারটি নিশ্চিত হয়েছে
              </h2>
              <p className="font-bengali text-xs sm:text-sm text-[#555555] max-w-md mx-auto">
                আমাদের ডেলিভারি টিম শীঘ্রই আপনার মোবাইল নম্বরে (<span className="font-english font-bold text-[#111111]">{order.customer.phone}</span>) কল বা এসএমএস করে ডেলিভারি নিশ্চিত করবে।
              </p>
            </div>

            {/* Order Invoice Box */}
            <div className="bg-[#FAF8F5] border border-[#E0D9CB] p-5 space-y-4">
              
              {/* Order Meta Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#E8E2D5] text-xs font-bengali">
                <div>
                  <span className="text-[#888888]">অর্ডার আইডি:</span>{' '}
                  <span className="font-english font-bold text-base text-[#111111]">
                    #{order.id}
                  </span>
                </div>
                <div className="text-[#666666] flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-[#C6A36A]" />
                  <span>{orderDate}</span>
                </div>
              </div>

              {/* Customer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-bengali text-[#444444]">
                <div>
                  <p className="font-bold text-[#111111]">ডেলিভারি প্রাপক:</p>
                  <p>{order.customer.fullName}</p>
                  <p className="font-english font-semibold text-[#111111]">{order.customer.phone}</p>
                </div>
                <div>
                  <p className="font-bold text-[#111111]">ডেলিভারি ঠিকানা:</p>
                  <p>{order.customer.address}, {order.customer.city}</p>
                  <p className="text-[11px] text-[#C6A36A] font-semibold mt-0.5">
                    পেমেন্ট: {order.customer.paymentMethod === 'cod' ? 'ক্যাশ অন ডেলিভারি' : 'বিকাশ / নগদ'}
                  </p>
                </div>
              </div>

              {/* Items List */}
              <div className="pt-2 border-t border-[#E8E2D5] space-y-2">
                <p className="font-bengali text-xs font-bold text-[#111111]">পণ্যসমূহ:</p>
                <div className="space-y-2">
                  {order.items.map((item) => (
                    <div key={item.id} className="flex items-center justify-between text-xs font-bengali">
                      <div className="flex items-center gap-2">
                        <img
                          src={item.product.image}
                          alt={item.product.nameBn}
                          className="w-8 h-10 object-cover border border-[#DDD5C5]"
                        />
                        <div>
                          <p className="font-bold text-[#111111]">{item.product.nameBn}</p>
                          <p className="text-[10px] text-[#666666] font-english">
                            Size: {item.selectedSize} | {item.selectedColor.nameBn} &times; {item.quantity}
                          </p>
                        </div>
                      </div>
                      <span className="font-english font-bold text-[#111111]">
                        ৳ {(item.product.price * item.quantity).toLocaleString('en-US')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Total Calculation */}
              <div className="pt-3 border-t border-[#E8E2D5] space-y-1 text-xs font-bengali">
                <div className="flex justify-between text-[#666666]">
                  <span>সাবটোটাল:</span>
                  <span className="font-english font-semibold">৳ {order.subtotal.toLocaleString('en-US')}</span>
                </div>
                <div className="flex justify-between text-[#666666]">
                  <span>ডেলিভারি চার্জ:</span>
                  <span className="font-english font-semibold">৳ {order.deliveryFee}</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#111111] pt-1.5 border-t border-[#E8E2D5]">
                  <span>সর্বমোট প্রদেয়:</span>
                  <span className="font-english text-base text-[#111111]">
                    ৳ {order.total.toLocaleString('en-US')}
                  </span>
                </div>
              </div>

            </div>

            {/* Quick Actions */}
            <div className="space-y-2.5">
              
              {/* WhatsApp direct confirmation button */}
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 bg-[#25D366] hover:bg-[#20ba59] text-[#FFFFFF] font-bengali text-sm font-bold flex items-center justify-center gap-2 shadow-md transition-colors"
              >
                <MessageCircle className="w-5 h-5" />
                <span>হোয়াটসঅ্যাপে অর্ডারের কপি পাঠান (01605529912)</span>
              </a>

              <div className="grid grid-cols-2 gap-3 pt-1">
                <button
                  type="button"
                  onClick={handlePrint}
                  className="py-2.5 px-4 bg-[#FFFFFF] border border-[#DDD5C5] hover:border-[#111111] text-[#111111] font-bengali text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>রসিদ প্রিন্ট করুন</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onClose();
                    onContinueShopping();
                  }}
                  className="py-2.5 px-4 bg-[#111111] hover:bg-[#262626] text-[#FFFFFF] font-bengali text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <ShoppingBag className="w-3.5 h-3.5 text-[#C6A36A]" />
                  <span>আরও কেনাকাটা করুন</span>
                </button>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
};
