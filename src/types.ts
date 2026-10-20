export type SizeOption = 'S' | 'M' | 'L' | 'XL' | 'XXL';

export interface ProductColor {
  nameBn: string;
  nameEn: string;
  hex: string;
}

export interface Product {
  id: string;
  nameBn: string;
  nameEn: string;
  category: 'oversized' | 'typography' | 'regular' | 'new-arrivals';
  categoryBn: string;
  price: number;
  originalPrice?: number;
  isNew?: boolean;
  isBestSeller?: boolean;
  image: string;
  secondaryImage?: string;
  descriptionBn: string;
  fabricBn: string;
  gsm: number;
  colors: ProductColor[];
  availableSizes: SizeOption[];
  fitBn: string;
  tagBn?: string;
  isSampleData: boolean;
}

export interface CartItem {
  id: string; // unique item id based on product id + size + color
  product: Product;
  selectedSize: SizeOption;
  selectedColor: ProductColor;
  quantity: number;
}

export interface Category {
  id: 'all' | 'oversized' | 'typography' | 'regular' | 'new-arrivals';
  titleBn: string;
  titleEn: string;
  descriptionBn: string;
  image: string;
  badgeBn: string;
}

export interface FAQItem {
  id: string;
  questionBn: string;
  answerBn: string;
  noteBn?: string;
}

export interface CustomerDetails {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  deliveryArea: 'inside_dhaka' | 'outside_dhaka';
  paymentMethod: 'cod' | 'bkash';
  transactionId?: string;
  notes?: string;
}

export interface Order {
  id: string;
  createdAt: string;
  customer: CustomerDetails;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'confirmed';
}
