export interface Product {
  id: string;
  sku: string;
  name: string;
  brand: string;
  categoryId?: string;
  category?: string | any;
  slug: string;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: any[];
  rating: number;
  reviewCount: number;
  stock: number;
  lowStockThreshold: number;
  status: string;
  features: string[];
  specifications: any;
  compatibility: string[];
  inTheBox: string[];
  warranty: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
  status: 'Active' | 'Inactive';
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  customerName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pinCode: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  gst: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'Pending' | 'Paid' | 'Failed' | 'Refunded';
  orderStatus: 'Pending' | 'Confirmed' | 'Processing' | 'Shipped' | 'Out for Delivery' | 'Delivered' | 'Cancelled' | 'Refunded';
  createdAt: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  ordersCount: number;
  totalSpent: number;
  registrationDate: string;
  status: 'Active' | 'Disabled';
}
