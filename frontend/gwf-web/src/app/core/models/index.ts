export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface FounderInfo {
  name: string;
  title: string;
  bio: string;
  mission: string;
  vision: string;
  values: string[];
}

export interface ContactMessage {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface ContactResponse {
  success: boolean;
  message: string;
}

export interface OrderRequest {
  customerName: string;
  customerEmail: string;
  shippingAddress: string;
  items: {
    productId: number;
    productName: string;
    quantity: number;
    unitPrice: number;
  }[];
}

export interface OrderResponse {
  success: boolean;
  orderId: string;
  total: number;
  message: string;
}
