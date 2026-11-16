import heroSignature from '../assets/images/hero_signature_cake_1794667076902.jpg';
import belgianChocolate from '../assets/images/cake_belgian_chocolate_1794667076205.jpg';
import blackForest from '../assets/images/cake_black_forest_1794667076763.jpg';
import redVelvet from '../assets/images/cake_red_velvet_1794667077230.jpg';
import butterscotch from '../assets/images/cake_butterscotch_1794667077595.jpg';
import pineapple from '../assets/images/cake_pineapple_1794667076899.jpg';
import strawberry from '../assets/images/cake_strawberry_1794667078173.jpg';
import designerTiered from '../assets/images/cake_designer_tiered_1794667077947.jpg';
import anniversaryFloral from '../assets/images/cake_anniversary_floral_1794667077834.jpg';
import pastries from '../assets/images/pastries_assortment_1794667079064.jpg';
import craftStory from '../assets/images/bakery_craft_story_1794667080371.jpg';
import birthdayCelebration from '../assets/images/birthday_celebration_cake_1794667080013.jpg';

export const CAKE_IMAGES = {
  heroSignature,
  belgianChocolate,
  blackForest,
  redVelvet,
  butterscotch,
  pineapple,
  strawberry,
  designerTiered,
  anniversaryFloral,
  pastries,
  craftStory,
  birthdayCelebration,
} as const;

export type CakeImageKey = keyof typeof CAKE_IMAGES;

export function getCakeImage(key: CakeImageKey): string {
  return CAKE_IMAGES[key];
}
