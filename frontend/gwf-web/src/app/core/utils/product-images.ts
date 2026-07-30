import { Product } from '../models';

/** Local product images served from Angular public/images/products/ */
const PRODUCT_IMAGES: Record<number, string> = {
  1: '/images/products/lavender-calm-soap.png',
  2: '/images/products/eucalyptus-mint-soap.png',
  3: '/images/products/honey-oat-soap.png',
  4: '/images/products/wellness-gift-set.png',
};

export function resolveProductImageUrl(product: Product): string {
  if (product.imageUrl?.startsWith('/images/')) {
    return product.imageUrl;
  }

  return PRODUCT_IMAGES[product.id] ?? '/images/products/lavender-calm-soap.png';
}

export function withLocalProductImages(products: Product[]): Product[] {
  return products.map(product => ({
    ...product,
    imageUrl: resolveProductImageUrl(product),
  }));
}
