import { Product, Category, FAQItem } from '../types';

/**
 * =========================================================================
 * TEEZAN SAMPLE PRODUCT REPOSITORY
 * NOTE: These products and prices (in BDT ৳) are development sample items
 * created for design, layout testing, and initial stage presentation.
 * They are clearly marked as sample data and can be easily modified before launch.
 * =========================================================================
 */

export const SAMPLE_PRODUCTS: Product[] = [
  // --- New Arrivals (নতুন এসেছে) ---
  {
    id: 'tz-001',
    nameBn: 'বাংলা গ্রাফিক ওভারসাইজড টি',
    nameEn: 'Bengali Graphic Oversized Tee',
    category: 'oversized',
    categoryBn: 'ওভারসাইজড টি-শার্ট',
    price: 950,
    originalPrice: 1150,
    isNew: true,
    isBestSeller: false,
    image: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791695520/Bengali_Graphic_Tee_in_a_Sunlit_Field.png',
    secondaryImage: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791694657/file_00000000e77c8207a5e24a9e9757ed80.png',
    descriptionBn: 'আরামদায়ক ড্রপ-শোল্ডার ফিট এবং ১০০% প্রিমিয়াম কম্বড কটনে তৈরি। মিনিমালিস্ট আধুনিক কাট ও বাংলা গ্রাফিক আর্টওয়ার্ক।',
    fabricBn: '১০০% কম্বড কটন (Combed Cotton)',
    gsm: 220,
    colors: [
      { nameBn: 'জেট ব্ল্যাক', nameEn: 'Jet Black', hex: '#111111' },
      { nameBn: 'ওয়ার্ম অফ-হোয়াইট', nameEn: 'Warm Off-White', hex: '#F3F0E8' },
      { nameBn: 'অলিভ গ্রিন', nameEn: 'Olive Green', hex: '#4A5340' }
    ],
    availableSizes: ['M', 'L', 'XL', 'XXL'],
    fitBn: 'রিলাক্সড ড্রপ-শোল্ডার ওভারসাইজড ফিট',
    tagBn: 'নতুন আগমন',
    isSampleData: false
  },
  {
    id: 'tz-002',
    nameBn: 'আইডেন্টিটি টাইপোগ্রাফি টি',
    nameEn: 'Identity Typography Tee',
    category: 'typography',
    categoryBn: 'টাইপোগ্রাফি টি-শার্ট',
    price: 990,
    originalPrice: 1200,
    isNew: true,
    isBestSeller: true,
    image: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791694640/file_00000000d07482079a240bc432fb8dcd.png',
    secondaryImage: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791694657/file_000000000228821184cd55433005f71f.png',
    descriptionBn: 'TEEZAN-এর মূল দর্শন "Wear Your Identity" ধারণ করে তৈরি ফ্রন্ট ও ব্যাক টাইপোগ্রাফিক আর্ট। হাই-ডেনসিটি সিল্ক স্ক্রিন প্রিন্ট যা সহজে বিবর্ণ হয় না।',
    fabricBn: '১০০% হেভিওয়েট প্রিমিয়াম কটন',
    gsm: 230,
    colors: [
      { nameBn: 'জেট ব্ল্যাক', nameEn: 'Jet Black', hex: '#111111' },
      { nameBn: 'ক্লাউড হোয়াইট', nameEn: 'Cloud White', hex: '#FFFFFF' }
    ],
    availableSizes: ['M', 'L', 'XL', 'XXL'],
    fitBn: 'বক্সি ওভারসাইজড কাট',
    tagBn: 'ব্র্যান্ড আইকনিক',
    isSampleData: false
  },
  {
    id: 'tz-003',
    nameBn: 'ক্লাসিক ব্ল্যাক স্ট্রিটওয়্যার টি',
    nameEn: 'Classic Black Streetwear Tee',
    category: 'regular',
    categoryBn: 'রেগুলার ফিট টি-শার্ট',
    price: 890,
    isNew: true,
    isBestSeller: false,
    image: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791694657/file_000000000228821184cd55433005f71f.png',
    secondaryImage: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791694657/file_00000000e77c8207a5e24a9e9757ed80.png',
    descriptionBn: 'দৈনন্দিন স্টাইলিশ ব্যবহারের জন্য নিখুঁত রেগুলার ফিট টি-শার্ট। রিপ-নিট কলার এবং টেকসই ডাবল স্টিচিং সম্বলিত খাঁটি কালো রঙের প্রিমিয়াম কাপড়।',
    fabricBn: '১০০% প্রিমিয়াম সুতি কম্প্যাক্ট ইয়ার্ন',
    gsm: 200,
    colors: [
      { nameBn: 'জেট ব্ল্যাক', nameEn: 'Jet Black', hex: '#111111' },
      { nameBn: 'চারকোল গ্রে', nameEn: 'Charcoal Grey', hex: '#2C2C2C' }
    ],
    availableSizes: ['M', 'L', 'XL', 'XXL'],
    fitBn: 'স্মার্ট রেগুলার ফিট',
    tagBn: 'অল ডে কমফোর্ট',
    isSampleData: false
  },
  {
    id: 'tz-004',
    nameBn: 'মিনিমাল গ্রাফিক টি',
    nameEn: 'Minimal Graphic Tee',
    category: 'oversized',
    categoryBn: 'ওভারসাইজড টি-শার্ট',
    price: 850,
    originalPrice: 1050,
    isNew: true,
    isBestSeller: false,
    image: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791694657/file_00000000e77c8207a5e24a9e9757ed80.png',
    secondaryImage: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791694657/file_000000000228821184cd55433005f71f.png',
    descriptionBn: 'সামনে পরিমিত মিনিমালিস্ট বুক-প্রিন্ট এবং পেছনে সূক্ষ্ম জ্যামিতিক নকশা। সাবলীল এবং মার্জিত ব্যক্তিত্বের জন্য দারুণ পছন্দ।',
    fabricBn: 'সফট-ওয়াশ বায়ো পলিশড কটন',
    gsm: 210,
    colors: [
      { nameBn: 'ওয়ার্ম অফ-হোয়াইট', nameEn: 'Warm Off-White', hex: '#F3F0E8' },
      { nameBn: 'স্যান্ডস্টোন বেইজ', nameEn: 'Sandstone Beige', hex: '#D2BBA0' },
      { nameBn: 'জেট ব্ল্যাক', nameEn: 'Jet Black', hex: '#111111' }
    ],
    availableSizes: ['M', 'L', 'XL'],
    fitBn: 'ড্রপ-শোল্ডার রিল্যাক্সড ফিট',
    tagBn: 'মিনিমালিস্ট',
    isSampleData: false
  },

  // --- Best Sellers (জনপ্রিয় কালেকশন) ---
  {
    id: 'tz-005',
    nameBn: 'মনোক্রোম ড্রপ শোল্ডার টি',
    nameEn: 'Monochrome Drop Shoulder Tee',
    category: 'oversized',
    categoryBn: 'ওভারসাইজড টি-শার্ট',
    price: 980,
    originalPrice: 1180,
    isNew: false,
    isBestSeller: true,
    image: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791694640/file_00000000d07482079a240bc432fb8dcd.png',
    secondaryImage: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791694657/file_00000000e77c8207a5e24a9e9757ed80.png',
    descriptionBn: 'ক্লিন মনোক্রোম টোন এবং প্রশস্ত স্লিভ কাটিং। যেকোনো আধুনিক আর্ট ও স্ট্রিট ফ্যাশনপ্রেমীর জন্য আদর্শ পোশাক।',
    fabricBn: '১০০% হেভিওয়েট সুতি',
    gsm: 230,
    colors: [
      { nameBn: 'জেট ব্ল্যাক', nameEn: 'Jet Black', hex: '#111111' },
      { nameBn: 'অ্যাংলার গ্রে', nameEn: 'Angler Grey', hex: '#737373' }
    ],
    availableSizes: ['M', 'L', 'XL', 'XXL'],
    fitBn: 'ওয়াইড ড্রপ-শোল্ডার',
    tagBn: 'জনপ্রিয় স্টাইল',
    isSampleData: false
  },
  {
    id: 'tz-006',
    nameBn: 'বাংলা ক্যালিগ্রাফি ওভারসাইজড টি',
    nameEn: 'Bangla Calligraphy Oversized Tee',
    category: 'typography',
    categoryBn: 'টাইপোগ্রাফি টি-শার্ট',
    price: 1050,
    isNew: false,
    isBestSeller: true,
    image: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791694657/file_000000000228821184cd55433005f71f.png',
    secondaryImage: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791694640/file_00000000d07482079a240bc432fb8dcd.png',
    descriptionBn: 'আমাদের মাতৃভাষার নান্দনিক ক্যালিগ্রাফি সম্বলিত বিশেষ সংস্করণ। আধুনিক স্ট্রিট আর্ট এবং বাংলা লিপির মেলবন্ধনে তৈরি বিশেষ টি-শার্ট।',
    fabricBn: '১০০% কম্বড প্রিমিয়াম কটন',
    gsm: 240,
    colors: [
      { nameBn: 'জেট ব্ল্যাক', nameEn: 'Jet Black', hex: '#111111' },
      { nameBn: 'ওয়ার্ম অফ-হোয়াইট', nameEn: 'Warm Off-White', hex: '#F3F0E8' }
    ],
    availableSizes: ['M', 'L', 'XL', 'XXL'],
    fitBn: 'ড্রপ-শোল্ডার ওভারসাইজড',
    tagBn: 'বিশেষ সংস্করণ',
    isSampleData: false
  },
  {
    id: 'tz-007',
    nameBn: 'র এজ হেভিওয়েট টি',
    nameEn: 'Raw Edge Heavyweight Tee',
    category: 'regular',
    categoryBn: 'রেগুলার ফিট টি-শার্ট',
    price: 1100,
    originalPrice: 1300,
    isNew: false,
    isBestSeller: true,
    image: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791694657/file_00000000e77c8207a5e24a9e9757ed80.png',
    secondaryImage: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791694640/file_00000000d07482079a240bc432fb8dcd.png',
    descriptionBn: 'হেভি জিএসএম ফ্যাব্রিকে তৈরি টেকসই ও প্রিমিয়াম ফিনিশিং। আধুনিক স্ট্রিট ফ্যাশনের রুচিশীল আউটলুক তৈরি করতে তৈরি।',
    fabricBn: '২৪০ জিএসএম আল্ট্রা-কম্প্যাক্ট কটন',
    gsm: 240,
    colors: [
      { nameBn: 'অলিভ গ্রিন', nameEn: 'Olive Green', hex: '#4A5340' },
      { nameBn: 'জেট ব্ল্যাক', nameEn: 'Jet Black', hex: '#111111' }
    ],
    availableSizes: ['M', 'L', 'XL'],
    fitBn: 'স্ট্রাকচার্ড রেগুলার কাট',
    tagBn: 'হেভি জিএসএম',
    isSampleData: false
  },
  {
    id: 'tz-008',
    nameBn: 'সিলুয়েট বক্সি ফিট টি',
    nameEn: 'Silhouette Boxy Fit Tee',
    category: 'oversized',
    categoryBn: 'ওভারসাইজড টি-শার্ট',
    price: 920,
    isNew: false,
    isBestSeller: true,
    image: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791694640/file_00000000d07482079a240bc432fb8dcd.png',
    secondaryImage: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791694657/file_000000000228821184cd55433005f71f.png',
    descriptionBn: 'বক্সি ফিটের আধুনিক স্কয়ার সিলুয়েট। স্বাধীন ও স্বাচ্ছন্দ্যময় চলাফেরার জন্য তরুণদের পছন্দের এক নম্বর ডিজাইন।',
    fabricBn: '১০০% শ্বাসপ্রশ্বাসযোগ্য কটন',
    gsm: 215,
    colors: [
      { nameBn: 'ওয়ার্ম অফ-হোয়াইট', nameEn: 'Warm Off-White', hex: '#F3F0E8' },
      { nameBn: 'জেট ব্ল্যাক', nameEn: 'Jet Black', hex: '#111111' }
    ],
    availableSizes: ['M', 'L', 'XL', 'XXL'],
    fitBn: 'বক্সি কাট (Boxy Fit)',
    tagBn: 'সিগনেচার লুক',
    isSampleData: false
  }
];

export const CATEGORIES_DATA: Category[] = [
  {
    id: 'oversized',
    titleBn: 'ওভারসাইজড টি-শার্ট',
    titleEn: 'Oversized T-Shirts',
    descriptionBn: 'ড্রপ-শোল্ডার রিল্যাক্সড ফিট ও আধুনিক স্ট্রিটওয়্যার স্টাইল',
    image: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791694657/file_00000000e77c8207a5e24a9e9757ed80.png',
    badgeBn: 'জনপ্রিয়'
  },
  {
    id: 'typography',
    titleBn: 'টাইপোগ্রাফি টি-শার্ট',
    titleEn: 'Typography T-Shirts',
    descriptionBn: 'বাংলা ও ইংরেজি বোল্ড অক্ষরের আত্মপ্রকাশমূলক নান্দনিক নকশা',
    image: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791694640/file_00000000d07482079a240bc432fb8dcd.png',
    badgeBn: 'সিগনেচার'
  },
  {
    id: 'regular',
    titleBn: 'রেগুলার ফিট টি-শার্ট',
    titleEn: 'Regular Fit T-Shirts',
    descriptionBn: 'প্রতিদিনের আরাম ও পরিপাটি ব্যবহারের নিখুঁত ক্লাসিক কাট',
    image: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791694657/file_000000000228821184cd55433005f71f.png',
    badgeBn: 'এসেনশিয়াল'
  },
  {
    id: 'new-arrivals',
    titleBn: 'নতুন কালেকশন',
    titleEn: 'New Arrivals',
    descriptionBn: 'TEEZAN-এর সদ্য অবমুক্ত ড্রপ এবং এক্সক্লুসিভ ডিজাইন',
    image: 'https://res.cloudinary.com/daqyowoz/image/upload/v1791694657/file_00000000e77c8207a5e24a9e9757ed80.png',
    badgeBn: 'নতুন ড্রপ'
  }
];

export const FAQ_DATA: FAQItem[] = [
  {
    id: 'faq-1',
    questionBn: '১. কীভাবে অর্ডার করব?',
    answerBn: 'ওয়েবসাইট থেকে আপনার পছন্দের টি-শার্ট নির্বাচন করে কাঙ্ক্ষিত সাইজ ও কালার বেছে নিয়ে "কার্টে যোগ করুন" বাটনে ক্লিক করুন। কার্ট অপশন থেকে অর্ডার প্রক্রিয়ার বিস্তারিত পদক্ষেপসমূহ অনুসরণ করতে পারবেন। বর্তমান ডেভেলপমেন্ট সংস্করণে প্রদর্শিত প্রক্রিয়াটি টেস্ট করার ব্যবস্থা রয়েছে; অফিসিয়াল লঞ্চের পর সরাসরি অর্ডার সম্পন্ন করা যাবে।'
  },
  {
    id: 'faq-2',
    questionBn: '২. পণ্যের সাইজ কীভাবে নির্বাচন করব?',
    answerBn: 'প্রতিটি পণ্যের পেজে এবং কুইক ভিউতে আমাদের সাইজ গাইড (Size Guide) সংযুক্ত রয়েছে। আপনি আপনার বুকের মাপ (Chest) ও দৈর্ঘ্য (Length) ইঞ্চি অথবা সেন্টিমিটারে পরিমাপ করে আপনার মানানসই সাইজ (M, L, XL, XXL) সহজেই নির্বাচন করতে পারবেন। ওভারসাইজড কালেকশনে অতিরিক্ত আরামদায়ক ও ড্রপ-শোল্ডার ফিট দেওয়া হয়েছে।'
  },
  {
    id: 'faq-3',
    questionBn: '৩. কীভাবে পেমেন্ট করা যাবে?',
    answerBn: 'TEEZAN স্টোর পুরোপুরি লাইভ হওয়ার পর বিকাশ, নগদ, রকেট, কার্ড এবং ক্যাশ অন ডেলিভারি (Cash on Delivery) পেমেন্ট মেথড চালুর পরিকল্পনা রয়েছে। চূড়ান্ত চালুর সময় নির্দিষ্ট পেমেন্ট গেটওয়ে এবং চার্জ সম্পর্কিত তথ্য আনুষ্ঠানিকভাবে নিশ্চিত করা হবে।'
  },
  {
    id: 'faq-4',
    questionBn: '৪. ডেলিভারি সম্পর্কে কীভাবে জানব?',
    answerBn: 'ঢাকা এবং সারা বাংলাদেশে নির্ভরযোগ্য কুরিয়ার পার্টনারদের মাধ্যমে ডেলিভারি সেবা পরিচালনা করা হবে। পণ্য পাঠানোর পর কাস্টমারদের এসএমএস বা ট্র্যাকিং লিংক প্রদান করা হবে। পূর্ণাঙ্গ ডেলিভারি সময়সূচি ও চার্জ স্টোরের মূল উদ্বোধনের সময় চূড়ান্ত করা হবে।'
  },
  {
    id: 'faq-5',
    questionBn: '৫. পণ্য পরিবর্তন বা রিটার্নের নিয়ম কী?',
    answerBn: 'গ্রাহকদের সন্তুষ্টি TEEZAN-এর সর্বোচ্চ অগ্রাধিকার। সাইজ মিসম্যাচ কিংবা ম্যানুফ্যাকচারিং ত্রুটির ক্ষেত্রে নির্ধারিত সময়ের মধ্যে সহজ এক্সচেঞ্জ সুবিধা দেওয়ার নীতি প্রণয়ন করা হচ্ছে। পূর্ণাঙ্গ রিটার্ন ও রিফান্ড নীতিমালা TEEZAN কর্তৃপক্ষ কর্তৃক অফিশিয়াল লঞ্চের পূর্বে বিস্তারিত প্রকাশ করা হবে।'
  }
];

export const SIZE_CHART = [
  { size: 'M', chestInches: '38 - 40', chestCm: '96 - 101', lengthInches: '28', sleeveInches: '8.5' },
  { size: 'L', chestInches: '41 - 43', chestCm: '104 - 109', lengthInches: '29', sleeveInches: '9.0' },
  { size: 'XL', chestInches: '44 - 46', chestCm: '111 - 116', lengthInches: '30', sleeveInches: '9.5' },
  { size: 'XXL', chestInches: '47 - 49', chestCm: '119 - 124', lengthInches: '31', sleeveInches: '10.0' },
];
