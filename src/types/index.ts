// Database and API types
export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  shortDesc: string;
  price: number;
  comparePrice?: number;
  sku: string;
  stock: number;
  images: string[];
  categoryId: string;
  category: Category;
  features?: Record<string, any>;
  dosage?: string;
  benefits: string[];
  rating?: number;
  reviewCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  products: Product[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerEmail: string;
  customerName: string;
  totalAmount: number;
  status: OrderStatus;
  paymentMethod: string;
  paymentId?: string;
  shipping?: Record<string, any>;
  items: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
}

export interface OrderItem {
  id: string;
  orderId: string;
  productId: string;
  product: Product;
  quantity: number;
  price: number;
}

export interface Review {
  id: string;
  productId: string;
  product: Product;
  name: string;
  email: string;
  rating: number;
  comment?: string;
  approved: boolean;
  createdAt: Date;
}

export interface CartSession {
  id: string;
  email?: string;
  items: CartItem[];
  expires: Date;
  createdAt: Date;
}

export interface CartItem {
  productId: string;
  quantity: number;
  price: number;
  product: Product;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

// UI Types
export interface CartContextType {
  items: CartItem[];
  total: number;
  itemCount: number;
  addItem: (product: Product, quantity: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

export interface ProductFilters {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  sortBy?: 'price' | 'rating' | 'newest' | 'name';
  sortOrder?: 'asc' | 'desc';
}

export interface ContactForm {
  name: string;
  email: string;
  subject: string;
  message: string;
}

export interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  company?: string;
  address: string;
  city: string;
  postalCode: string;
  country: string;
  phone: string;
  paymentMethod: 'stripe' | 'paypal' | 'invoice';
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> extends ApiResponse<T[]> {
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}