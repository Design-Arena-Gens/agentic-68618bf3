export interface Cake {
  id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  category: string;
  flavor: string;
  occasion: string;
  sizes: CakeSize[];
  frostingOptions: string[];
  inStock: boolean;
  featured: boolean;
}

export interface CakeSize {
  size: string;
  servings: number;
  priceMultiplier: number;
}

export interface CartItem {
  cakeId: string;
  quantity: number;
  size: string;
  frosting: string;
  message?: string;
  price: number;
}

export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: 'customer' | 'admin';
  addresses: Address[];
  createdAt: Date;
}

export interface Address {
  id: string;
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  isDefault: boolean;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  shippingAddress: Address;
  paymentIntentId?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Testimonial {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: Date;
}
