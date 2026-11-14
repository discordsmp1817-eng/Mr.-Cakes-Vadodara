import test from 'node:test';
import assert from 'node:assert/strict';
import { CAKES_CATALOG, GALLERY_ITEMS } from '../data/bakeryData';
import { buildWhatsAppEnquiryUrl, buildWhatsAppProductUrl } from './whatsapp';
import { filterCakes, filterGallery, validateEnquiryForm, type CakeEnquiryInput } from './validation';

const validInput: CakeEnquiryInput = {
  fullName: 'Aarav Patel',
  phone: '9876543210',
  email: 'aarav@example.com',
  cakeType: 'Designer Cake',
  occasion: 'Birthday',
  preferredFlavour: 'Belgian Chocolate',
  cakeSize: '1 kg',
  deliveryDate: '2026-12-20',
  instructions: 'Write Happy Birthday in gold lettering.',
};

test('validateEnquiryForm rejects missing required fields', () => {
  const result = validateEnquiryForm(
    {
      fullName: '',
      phone: '123',
      email: 'not-an-email',
      cakeType: '',
      occasion: '',
      preferredFlavour: '',
      cakeSize: '',
      deliveryDate: '',
      instructions: '',
    },
    '2026-11-14'
  );

  assert.equal(result.valid, false);
  assert.ok(result.errors.fullName);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.email);
  assert.ok(result.errors.cakeType);
  assert.ok(result.errors.occasion);
  assert.ok(result.errors.deliveryDate);
});

test('validateEnquiryForm rejects past delivery date', () => {
  const result = validateEnquiryForm(
    { ...validInput, deliveryDate: '2026-11-10' },
    '2026-11-14'
  );
  assert.equal(result.valid, false);
  assert.match(result.errors.deliveryDate ?? '', /past/i);
});

test('validateEnquiryForm accepts valid input with optional email blank', () => {
  const result = validateEnquiryForm(
    { ...validInput, email: '' },
    '2026-11-14'
  );
  assert.equal(result.valid, true);
  assert.deepEqual(result.errors, {});
});

test('filterCakes filters by category and search query', () => {
  const chocolateCakes = filterCakes(CAKES_CATALOG, 'Chocolate Cakes');
  assert.ok(chocolateCakes.length >= 3);
  assert.ok(chocolateCakes.every((c) => c.menuCategories.includes('Chocolate Cakes')));

  const redVelvetSearch = filterCakes(CAKES_CATALOG, 'All Cakes', 'velvet');
  assert.equal(redVelvetSearch.length, 1);
  assert.equal(redVelvetSearch[0].id, 'red-velvet');
});

test('filterGallery returns all or filtered subset', () => {
  const all = filterGallery(GALLERY_ITEMS, 'All');
  assert.equal(all.length, GALLERY_ITEMS.length);

  const designer = filterGallery(GALLERY_ITEMS, 'Designer Cakes');
  assert.ok(designer.length >= 1);
  assert.ok(designer.every((item) => item.category === 'Designer Cakes'));
});

test('WhatsApp URL builders target 917802880555 with encoded details', () => {
  const productUrl = buildWhatsAppProductUrl('Belgian Chocolate Cake', 'Chocolate Signature');
  assert.ok(productUrl.startsWith('https://wa.me/917802880555?text='));
  assert.ok(decodeURIComponent(productUrl).includes('Belgian Chocolate Cake'));

  const enquiryUrl = buildWhatsAppEnquiryUrl(validInput);
  assert.ok(enquiryUrl.startsWith('https://wa.me/917802880555?text='));
  const decoded = decodeURIComponent(enquiryUrl);
  assert.ok(decoded.includes('Aarav Patel'));
  assert.ok(decoded.includes('9876543210'));
  assert.ok(decoded.includes('2026-12-20'));
});
