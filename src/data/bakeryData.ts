import type { CakeImageKey } from './cakeImages';

export type CakeMenuCategory =
  | 'All Cakes'
  | 'Chocolate Cakes'
  | 'Birthday Cakes'
  | 'Designer Cakes'
  | 'Anniversary Cakes'
  | 'Pastries'
  | 'Special Occasion Cakes';

export type GalleryCategory =
  | 'All'
  | 'Birthday Cakes'
  | 'Chocolate Cakes'
  | 'Designer Cakes'
  | 'Anniversary Cakes'
  | 'Celebration Cakes'
  | 'Pastries & Desserts';

export interface CakeItem {
  id: string;
  name: string;
  menuCategories: Exclude<CakeMenuCategory, 'All Cakes'>[];
  displayCategory: string;
  shortDescription: string;
  detailsDescription: string;
  image: string;
  alt: string;
  featured: boolean;
}

export interface FeaturedCategoryCard {
  id: string;
  title: string;
  subtitle: string;
  targetMenuCategory: CakeMenuCategory;
  image: string;
  alt: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, 'All'>;
  caption: string;
  image: string;
  alt: string;
  aspectClass: string;
}

export const BUSINESS_INFO = {
  name: 'Mr. Cakes Vadodara',
  shortBrand: 'Mr. Cakes',
  phoneRaw: '7802880555',
  phoneDisplay: '+91 78028 80555',
  phoneTel: 'tel:+917802880555',
  whatsappNumber: '917802880555',
  fullAddress:
    'First Floor, Siddheshwar Plaza, Stairs Chadke Piche Ki Side Par, FF07 Mr Cakes, 07 Back Side, New VIP Road, Above Tata Motors Back Side, Vadodara, Gujarat 390019, India',
  shortAddress:
    'First Floor, Siddheshwar Plaza, FF07, New VIP Road, Vadodara, Gujarat 390019',
  rating: '4.9',
  reviewCount: 518,
  directionsUrl:
    'https://www.google.com/maps/dir/?api=1&destination=Siddheshwar+Plaza+New+VIP+Road+Vadodara+Gujarat+390019',
  googleReviewsUrl:
    'https://www.google.com/maps/search/?api=1&query=Mr+Cakes+Siddheshwar+Plaza+New+VIP+Road+Vadodara+Gujarat+390019',
  mapEmbedUrl:
    'https://maps.google.com/maps?q=Siddheshwar%20Plaza%2C%20New%20VIP%20Road%2C%20Vadodara%2C%20Gujarat%20390019&t=&z=16&ie=UTF8&iwloc=&output=embed',
} as const;

export const IMAGES: Record<CakeImageKey, CakeImageKey> = {
  heroSignature: 'heroSignature',
  belgianChocolate: 'belgianChocolate',
  blackForest: 'blackForest',
  redVelvet: 'redVelvet',
  butterscotch: 'butterscotch',
  pineapple: 'pineapple',
  strawberry: 'strawberry',
  designerTiered: 'designerTiered',
  anniversaryFloral: 'anniversaryFloral',
  pastries: 'pastries',
  craftStory: 'craftStory',
  birthdayCelebration: 'birthdayCelebration',
} as const;

export const FEATURED_CATEGORIES: FeaturedCategoryCard[] = [
  {
    id: 'cat-birthday',
    title: 'Birthday Cakes',
    subtitle: 'Centrepieces crafted for milestone candles and joyful toasts.',
    targetMenuCategory: 'Birthday Cakes',
    image: IMAGES.birthdayCelebration,
    alt: 'Birthday celebration cake with swirled caramel and chocolate rosettes at Mr. Cakes Vadodara',
  },
  {
    id: 'cat-chocolate',
    title: 'Chocolate Cakes',
    subtitle: 'Rich cocoa layers and velvety ganache for true chocolate lovers.',
    targetMenuCategory: 'Chocolate Cakes',
    image: IMAGES.belgianChocolate,
    alt: 'Belgian chocolate truffle cake with glossy mirror glaze',
  },
  {
    id: 'cat-designer',
    title: 'Designer Cakes',
    subtitle: 'Bespoke silhouettes tailored to your celebration theme and palette.',
    targetMenuCategory: 'Designer Cakes',
    image: IMAGES.designerTiered,
    alt: 'Two-tier designer celebration cake with caramel sugar florals',
  },
  {
    id: 'cat-anniversary',
    title: 'Anniversary Cakes',
    subtitle: 'Romantic, refined creations designed for cherished years together.',
    targetMenuCategory: 'Anniversary Cakes',
    image: IMAGES.anniversaryFloral,
    alt: 'Romantic espresso and caramel anniversary cake adorned with roses',
  },
  {
    id: 'cat-photo',
    title: 'Photo Cakes',
    subtitle: 'Personalised edible prints framed with delicate buttercream piping.',
    targetMenuCategory: 'Special Occasion Cakes',
    image: IMAGES.redVelvet,
    alt: 'Personalised celebration cake prepared for photo and theme customisation',
  },
  {
    id: 'cat-pastries',
    title: 'Pastries & Desserts',
    subtitle: 'Single-serve indulgence for intimate gatherings and sweet cravings.',
    targetMenuCategory: 'Pastries',
    image: IMAGES.pastries,
    alt: 'Assortment of chocolate ganache tarts, opera slices, and berry mousse verrines',
  },
];

export const MENU_CATEGORIES: CakeMenuCategory[] = [
  'All Cakes',
  'Chocolate Cakes',
  'Birthday Cakes',
  'Designer Cakes',
  'Anniversary Cakes',
  'Pastries',
  'Special Occasion Cakes',
];

export const CAKES_CATALOG: CakeItem[] = [
  {
    id: 'belgian-chocolate',
    name: 'Belgian Chocolate Cake',
    menuCategories: ['Chocolate Cakes', 'Birthday Cakes', 'Special Occasion Cakes'],
    displayCategory: 'Chocolate Signature',
    shortDescription:
      'Deep cocoa sponge layered with silky dark ganache and a glossy mirror finish.',
    detailsDescription:
      'A classic favourite crafted for chocolate enthusiasts in Vadodara. Multi-layered dark sponge balanced with rich ganache rosettes and fine cocoa accents, suited for birthdays, dinner parties, and celebratory evenings.',
    image: IMAGES.belgianChocolate,
    alt: 'Belgian Chocolate Cake with dark ganache rosettes on a ceramic platter',
    featured: true,
  },
  {
    id: 'black-forest',
    name: 'Black Forest Cake',
    menuCategories: ['Chocolate Cakes', 'Birthday Cakes'],
    displayCategory: 'Classic Patisserie',
    shortDescription:
      'Fluffy chocolate sponge, airy vanilla cream, cherries, and dark chocolate curls.',
    detailsDescription:
      'Timeless elegance in every slice. Soft cocoa layers paired with whipped cream, juicy dark cherries, and hand-shaved chocolate curls for family celebrations.',
    image: IMAGES.blackForest,
    alt: 'Black Forest Cake layered with cherries, whipped cream, and chocolate curls',
    featured: true,
  },
  {
    id: 'red-velvet',
    name: 'Red Velvet Cake',
    menuCategories: ['Anniversary Cakes', 'Birthday Cakes', 'Special Occasion Cakes'],
    displayCategory: 'Velvet Collection',
    shortDescription:
      'Tender crimson sponge finished with smooth cream cheese style frosting.',
    detailsDescription:
      'Striking in presentation and balanced in flavour. Soft crimson layers enveloped in velvety ivory frosting, popular for anniversaries, engagements, and intimate milestones.',
    image: IMAGES.redVelvet,
    alt: 'Red Velvet Cake topped with cream swirls and white chocolate accents',
    featured: true,
  },
  {
    id: 'chocolate-truffle',
    name: 'Chocolate Truffle Cake',
    menuCategories: ['Chocolate Cakes', 'Anniversary Cakes'],
    displayCategory: 'Rich Ganache',
    shortDescription:
      'Dense, indulgent chocolate layers glazed in smooth truffle and gold leaf accents.',
    detailsDescription:
      'Rich, smooth, and deeply satisfying. Crafted with layered truffle ganache and sculpted chocolate curls, ideal when the occasion calls for unmistakable chocolate decadence.',
    image: IMAGES.heroSignature,
    alt: 'Chocolate Truffle Cake garnished with sculpted curls and roasted hazelnuts',
    featured: true,
  },
  {
    id: 'butterscotch-cake',
    name: 'Butterscotch Cake',
    menuCategories: ['Birthday Cakes', 'Special Occasion Cakes'],
    displayCategory: 'Caramel Crunch',
    shortDescription:
      'Warm caramelized drip over praline cream and crisp golden honeycomb crunch.',
    detailsDescription:
      'A beloved celebration flavour with comforting caramel notes and delightful crunch. Finished with golden caramel drizzle and toasted praline accents.',
    image: IMAGES.butterscotch,
    alt: 'Butterscotch Cake with golden caramel drip and honeycomb crunch',
    featured: true,
  },
  {
    id: 'pineapple-cake',
    name: 'Pineapple Cake',
    menuCategories: ['Birthday Cakes', 'Special Occasion Cakes'],
    displayCategory: 'Light & Fruity',
    shortDescription:
      'Delicate vanilla sponge with whipped cream rosettes and caramelized pineapple.',
    detailsDescription:
      'Light, refreshing, and universally loved across generations. Layered with bright pineapple notes and airy vanilla frosting for daytime gatherings and family birthdays.',
    image: IMAGES.pineapple,
    alt: 'Pineapple Cake crowned with vanilla rosettes and golden pineapple slices',
    featured: true,
  },
  {
    id: 'strawberry-cake',
    name: 'Strawberry Cake',
    menuCategories: ['Birthday Cakes', 'Anniversary Cakes'],
    displayCategory: 'Berry Fresh',
    shortDescription:
      'Soft sponge layered with whipped cream and vibrant sweet strawberry finish.',
    detailsDescription:
      'Bright, fragrant, and visually inviting. Crafted for cheerful celebrations, baby showers, and anyone who enjoys fruity freshness balanced with delicate cream.',
    image: IMAGES.strawberry,
    alt: 'Strawberry fresh cream cake topped with ripe red strawberries',
    featured: true,
  },
  {
    id: 'premium-designer-cake',
    name: 'Premium Designer Cake',
    menuCategories: ['Designer Cakes', 'Special Occasion Cakes', 'Anniversary Cakes'],
    displayCategory: 'Bespoke Tiered',
    shortDescription:
      'Custom tiered centrepiece finished with handcrafted florals and gold leaf detail.',
    detailsDescription:
      'Designed around your event theme, colour story, and guest count. Share your celebration vision with our team via enquiry or WhatsApp to customise flavours and detailing.',
    image: IMAGES.designerTiered,
    alt: 'Two-tier Premium Designer Cake with caramel florals and gold accents',
    featured: true,
  },
  {
    id: 'floral-anniversary-cake',
    name: 'Floral Anniversary Cake',
    menuCategories: ['Anniversary Cakes', 'Designer Cakes'],
    displayCategory: 'Milestone Romance',
    shortDescription:
      'Textured espresso-caramel buttercream styled with fresh roses and chocolate sails.',
    detailsDescription:
      'An expressive centrepiece crafted for anniversaries and romantic dinners, pairing refined floral styling with rich celebration flavours.',
    image: IMAGES.anniversaryFloral,
    alt: 'Floral Anniversary Cake with textured caramel frosting and blush roses',
    featured: false,
  },
  {
    id: 'signature-birthday-cake',
    name: 'Signature Celebration Cake',
    menuCategories: ['Birthday Cakes', 'Designer Cakes', 'Chocolate Cakes'],
    displayCategory: 'Milestone Birthday',
    shortDescription:
      'Two-tone caramel and chocolate buttercream rosettes crafted for grand birthdays.',
    detailsDescription:
      'Built to anchor the celebration table with warm caramel swirls, rich chocolate piping, and customisable message plaques.',
    image: IMAGES.birthdayCelebration,
    alt: 'Signature Celebration Birthday Cake with caramel and chocolate rosettes',
    featured: false,
  },
  {
    id: 'patisserie-pastries',
    name: 'Artisanal Pastries & Desserts',
    menuCategories: ['Pastries'],
    displayCategory: 'Boutique Desserts',
    shortDescription:
      'Curated selection of chocolate ganache tarts, opera slices, and mousse verrines.',
    detailsDescription:
      'Perfect for dessert tables, gifting boxes, or elevating an intimate evening at home. Enquire with our Vadodara shop for daily pastry selections.',
    image: IMAGES.pastries,
    alt: 'Artisanal chocolate tarts, layered opera pastry, and berry mousse cups',
    featured: false,
  },
];

export const WHY_CHOOSE_ITEMS = [
  {
    number: '01',
    title: 'Beautifully Crafted Cakes',
    description:
      'Every cake is finished with clean silhouettes, balanced textures, and thoughtful visual artistry worthy of your table.',
  },
  {
    number: '02',
    title: 'Perfect for Every Celebration',
    description:
      'From intimate birthdays and anniversaries to grand milestone gatherings, each creation fits the spirit of your moment.',
  },
  {
    number: '03',
    title: 'Delicious Flavours',
    description:
      'Classic favourites like Belgian chocolate, butterscotch, and fruit gateaux prepared to leave a memorable impression.',
  },
  {
    number: '04',
    title: 'Attention to Detail',
    description:
      'Careful piping, colour harmony, and custom message plaques ensure your cake feels genuinely personal.',
  },
  {
    number: '05',
    title: 'Customer Satisfaction',
    description:
      'Trusted across Vadodara with a 4.9/5 Google rating across 518 customer reviews for warm service and delightful cakes.',
  },
] as const;

export const GALLERY_CATEGORIES: GalleryCategory[] = [
  'All',
  'Birthday Cakes',
  'Chocolate Cakes',
  'Designer Cakes',
  'Anniversary Cakes',
  'Celebration Cakes',
  'Pastries & Desserts',
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Caramel & Chocolate Rosette Tier',
    category: 'Birthday Cakes',
    caption: 'Swirled caramel and dark chocolate buttercream crafted for milestone birthdays.',
    image: IMAGES.birthdayCelebration,
    alt: 'Birthday cake decorated with caramel and chocolate buttercream rosettes',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-2',
    title: 'Gold-Leaf Belgian Ganache',
    category: 'Chocolate Cakes',
    caption: 'Dark chocolate ganache layered with sculpted curls and toasted hazelnuts.',
    image: IMAGES.heroSignature,
    alt: 'Artisanal dark Belgian chocolate ganache cake with edible gold flakes',
    aspectClass: 'aspect-square',
  },
  {
    id: 'gal-3',
    title: 'Ivory & Caramel Sugar Florals',
    category: 'Designer Cakes',
    caption: 'Two-tier ivory designer cake accented with warm caramel floral arrangements.',
    image: IMAGES.designerTiered,
    alt: 'Two-tier ivory designer cake with caramel floral cascade',
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-4',
    title: 'Espresso Rose Anniversary Tier',
    category: 'Anniversary Cakes',
    caption: 'Textured buttercream paired with ivory roses and dark chocolate sails.',
    image: IMAGES.anniversaryFloral,
    alt: 'Anniversary cake with espresso caramel buttercream and fresh roses',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-5',
    title: 'Mirror Glaze Chocolate Truffle',
    category: 'Chocolate Cakes',
    caption: 'Glossy dark mirror glaze topped with piped truffle rosettes.',
    image: IMAGES.belgianChocolate,
    alt: 'Belgian chocolate truffle cake with glossy glaze and piped rosettes',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-6',
    title: 'Golden Butterscotch Crunch',
    category: 'Celebration Cakes',
    caption: 'Caramelized drip and crisp praline honeycomb brittle.',
    image: IMAGES.butterscotch,
    alt: 'Butterscotch cake with caramel drip and honeycomb crunch',
    aspectClass: 'aspect-square',
  },
  {
    id: 'gal-7',
    title: 'Patisserie Dessert Assortment',
    category: 'Pastries & Desserts',
    caption: 'Chocolate ganache tarts, layered opera slices, and berry mousse verrines.',
    image: IMAGES.pastries,
    alt: 'Assortment of chocolate tarts, opera slices, and berry desserts',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-8',
    title: 'Crimson Red Velvet Gateau',
    category: 'Celebration Cakes',
    caption: 'Velvety frosting with delicate crimson sponge and white chocolate curls.',
    image: IMAGES.redVelvet,
    alt: 'Red Velvet cake with cream frosting and white chocolate curls',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-9',
    title: 'Classic Cherry Black Forest',
    category: 'Chocolate Cakes',
    caption: 'Rich chocolate sponge layered with cherries and whipped vanilla cream.',
    image: IMAGES.blackForest,
    alt: 'Black Forest cake with cherries and dark chocolate curls',
    aspectClass: 'aspect-[4/5]',
  },
  {
    id: 'gal-10',
    title: 'Fresh Strawberry Cream Cake',
    category: 'Birthday Cakes',
    caption: 'Ripe strawberries folded into delicate cream and airy sponge layers.',
    image: IMAGES.strawberry,
    alt: 'Strawberry cream cake topped with fresh strawberries',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-11',
    title: 'Golden Pineapple Gateau',
    category: 'Celebration Cakes',
    caption: 'Caramelized pineapple slices crowned on whipped vanilla rosettes.',
    image: IMAGES.pineapple,
    alt: 'Pineapple cream cake garnished with golden pineapple slices',
    aspectClass: 'aspect-[4/3]',
  },
  {
    id: 'gal-12',
    title: 'Hand-Piped Ganache Craft',
    category: 'Designer Cakes',
    caption: 'Careful finishing touches prepared ahead of your celebration.',
    image: IMAGES.craftStory,
    alt: 'Pastry chef hand-piping chocolate ganache onto a tiered celebration cake',
    aspectClass: 'aspect-[16/10]',
  },
];
