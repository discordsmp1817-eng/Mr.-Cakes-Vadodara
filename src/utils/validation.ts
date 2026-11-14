import type { CakeItem, CakeMenuCategory, GalleryCategory, GalleryItem } from '../data/bakeryData';

export interface CakeEnquiryInput {
  fullName: string;
  phone: string;
  email: string;
  cakeType: string;
  occasion: string;
  preferredFlavour: string;
  cakeSize: string;
  deliveryDate: string;
  instructions: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof CakeEnquiryInput, string>>;
}

export function validateEnquiryForm(
  input: CakeEnquiryInput,
  todayIso?: string
): ValidationResult {
  const errors: Partial<Record<keyof CakeEnquiryInput, string>> = {};

  if (!input.fullName || input.fullName.trim().length < 2) {
    errors.fullName = 'Please enter your full name (at least 2 characters).';
  }

  const normalizedDigits = input.phone.replace(/[\s\-()+]/g, '');
  if (!normalizedDigits) {
    errors.phone = 'Please enter your phone number so we can reach you.';
  } else if (!/^\d{10,13}$/.test(normalizedDigits)) {
    errors.phone = 'Please enter a valid 10-digit phone number.';
  }

  if (input.email.trim()) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(input.email.trim())) {
      errors.email = 'Please enter a valid email address or leave this field blank.';
    }
  }

  if (!input.cakeType || !input.cakeType.trim()) {
    errors.cakeType = 'Please choose the type of cake you are looking for.';
  }

  if (!input.occasion || !input.occasion.trim()) {
    errors.occasion = 'Please select or enter the celebration occasion.';
  }

  if (!input.deliveryDate || !input.deliveryDate.trim()) {
    errors.deliveryDate = 'Please select your required delivery or pickup date.';
  } else {
    const referenceDate = todayIso ?? new Date().toISOString().slice(0, 10);
    if (input.deliveryDate < referenceDate) {
      errors.deliveryDate = 'Delivery date cannot be in the past.';
    }
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}

export function filterCakes(
  cakes: CakeItem[],
  category: CakeMenuCategory,
  searchQuery = ''
): CakeItem[] {
  const query = searchQuery.trim().toLowerCase();
  return cakes.filter((cake) => {
    const matchesCategory =
      category === 'All Cakes' || cake.menuCategories.includes(category);
    if (!matchesCategory) return false;
    if (!query) return true;
    return (
      cake.name.toLowerCase().includes(query) ||
      cake.shortDescription.toLowerCase().includes(query) ||
      cake.displayCategory.toLowerCase().includes(query)
    );
  });
}

export function filterGallery(
  items: GalleryItem[],
  category: GalleryCategory
): GalleryItem[] {
  if (category === 'All') return items;
  return items.filter((item) => item.category === category);
}
