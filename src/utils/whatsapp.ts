import { BUSINESS_INFO } from '../data/bakeryData';
import type { CakeEnquiryInput } from './validation';

export function buildWhatsAppBaseUrl(message: string): string {
  const encoded = encodeURIComponent(message.trim());
  return `https://wa.me/${BUSINESS_INFO.whatsappNumber}?text=${encoded}`;
}

export function buildWhatsAppGeneralUrl(): string {
  return buildWhatsAppBaseUrl(
    'Hello Mr. Cakes Vadodara! I would like to enquire about ordering a cake for an upcoming celebration.'
  );
}

export function buildWhatsAppProductUrl(cakeName: string, category?: string): string {
  const categoryText = category ? ` (${category})` : '';
  return buildWhatsAppBaseUrl(
    `Hello Mr. Cakes Vadodara! I would like to enquire about ordering the *${cakeName}*${categoryText}. Please share customization and ordering details.`
  );
}

export function buildWhatsAppEnquiryUrl(data: CakeEnquiryInput): string {
  const lines = [
    'Hello Mr. Cakes Vadodara! Here are my cake enquiry details:',
    '',
    `*Name:* ${data.fullName.trim()}`,
    `*Phone:* ${data.phone.trim()}`,
    data.email.trim() ? `*Email:* ${data.email.trim()}` : null,
    `*Cake Type:* ${data.cakeType.trim()}`,
    `*Occasion:* ${data.occasion.trim()}`,
    data.preferredFlavour.trim() ? `*Preferred Flavour:* ${data.preferredFlavour.trim()}` : null,
    data.cakeSize.trim() ? `*Preferred Size / Weight:* ${data.cakeSize.trim()}` : null,
    `*Required Delivery Date:* ${data.deliveryDate.trim()}`,
    data.instructions.trim() ? `*Additional Instructions:* ${data.instructions.trim()}` : null,
  ].filter(Boolean);

  return buildWhatsAppBaseUrl(lines.join('\n'));
}
