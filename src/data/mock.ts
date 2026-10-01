import { Product, Category, Order, Customer } from '../types';

export const mockCategories: Category[] = [
  {
    id: 'c1',
    name: 'Professional Diagnostic Scanners',
    slug: 'professional-diagnostic-scanners',
    description: 'Advanced diagnostic tools for workshops and technicians.',
    image: '/images/categories/professional.jpg',
    productCount: 12,
    status: 'Active',
  },
  {
    id: 'c2',
    name: 'OBD2 Scanners',
    slug: 'obd2-scanners',
    description: 'Basic diagnostic tools for DIY and quick checks.',
    image: '/images/categories/obd2.jpg',
    productCount: 8,
    status: 'Active',
  },
  {
    id: 'c3',
    name: 'ECU Diagnostic Tools',
    slug: 'ecu-diagnostic-tools',
    description: 'Tools for ECU coding, programming, and flashing.',
    image: '/images/categories/ecu.jpg',
    productCount: 5,
    status: 'Active',
  }
];

export const mockProducts: Product[] = [
  {
    id: 'p1',
    sku: 'XT-H6-ELITE',
    name: 'XTOOL H6 Elite',
    brand: 'XTOOL',
    categoryId: 'c1',
    slug: 'xtool-h6-elite',
    shortDescription: 'Professional automotive diagnostic scanner designed for workshops, technicians, and advanced vehicle diagnostics.',
    description: 'The XTOOL H6 Elite is a professional-grade automotive diagnostic scanner designed to provide comprehensive diagnostic functions for workshops, technicians, and advanced vehicle diagnostics. It offers full-system diagnostics, ECU diagnostics, live data, and more.',
    price: 89999,
    originalPrice: 99999,
    discount: 10,
    images: ['/images/products/h6-elite.jpg'],
    rating: 4.8,
    reviewCount: 124,
    stock: 15,
    lowStockThreshold: 5,
    status: 'Published',
    features: [
      'Full-system diagnostics',
      'ECU diagnostics',
      'OBD2 support',
      'Live data',
      'Diagnostic reports',
      'Service functions',
      'Vehicle health reports'
    ],
    specifications: {
      'Display': '10.1 inch HD Touchscreen',
      'Operating System': 'Android 10',
      'Battery': '10000mAh',
      'Connectivity': 'Wi-Fi, Bluetooth'
    },
    compatibility: ['Over 10000+ car models from USA, Europe, and Asia'],
    inTheBox: ['H6 Elite Tablet', 'VCI Box', 'OBD2 Cable', 'Power Adapter', 'User Manual', 'Carrying Case'],
    warranty: '2 Years Official Warranty',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'p2',
    sku: 'XT-PS70-PRO',
    name: 'XTOOL PS70 Pro',
    brand: 'XTOOL',
    categoryId: 'c1',
    slug: 'xtool-ps70-pro',
    shortDescription: 'High-end diagnostic tool with advanced programming capabilities.',
    description: 'XTOOL PS70 Pro offers top-tier diagnostic performance, including advanced key programming, ECU coding, and bi-directional control.',
    price: 124999,
    originalPrice: 139999,
    discount: 11,
    images: ['/images/products/ps70-pro.jpg'],
    rating: 4.9,
    reviewCount: 89,
    stock: 8,
    lowStockThreshold: 3,
    status: 'Published',
    features: [
      'Advanced Key Programming',
      'Bi-directional Control',
      'ECU Coding',
      'Full System Diagnostics',
      '30+ Special Functions'
    ],
    specifications: {
      'Display': '10.1 inch IPS',
      'Processor': 'Quad-Core 1.8GHz',
      'Storage': '64GB'
    },
    compatibility: ['Global vehicle coverage'],
    inTheBox: ['PS70 Pro Tablet', 'VCI', 'Connector Kit', 'Hard Case'],
    warranty: '2 Years Official Warranty',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'p3',
    sku: 'XT-D8BT',
    name: 'XTOOL D8BT',
    brand: 'XTOOL',
    categoryId: 'c1',
    slug: 'xtool-d8bt',
    shortDescription: 'Wireless diagnostic tool with extensive system coverage.',
    description: 'The XTOOL D8BT provides wireless convenience with Bluetooth VCI, offering full system diagnosis, bi-directional control, and 31+ services.',
    price: 69999,
    originalPrice: 79999,
    discount: 12.5,
    images: ['/images/products/d8bt.jpg'],
    rating: 4.7,
    reviewCount: 210,
    stock: 25,
    lowStockThreshold: 5,
    status: 'Published',
    features: [
      'Wireless Bluetooth VCI',
      'Full System Diagnostics',
      'Bi-directional Control',
      '31+ Service Functions',
      '3-Year Free Updates'
    ],
    specifications: {
      'Display': '8 inch Touchscreen',
      'Operating System': 'Android 5.1.1',
      'Memory': '2GB RAM, 64GB ROM'
    },
    compatibility: ['Supports 85+ brands'],
    inTheBox: ['D8BT Tablet', 'Bluetooth VCI', 'USB Cable', 'Charger'],
    warranty: '1 Year Warranty',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  },
  {
    id: 'p4',
    sku: 'XT-D7S',
    name: 'XTOOL D7S',
    brand: 'XTOOL',
    categoryId: 'c1',
    slug: 'xtool-d7s',
    shortDescription: 'Compact and powerful diagnostic tool for technicians.',
    description: 'XTOOL D7S is an upgraded version of D7, featuring active tests, 36+ special functions, and OE-level all system diagnostics.',
    price: 44999,
    originalPrice: 49999,
    discount: 10,
    images: ['/images/products/d7s.jpg'],
    rating: 4.6,
    reviewCount: 345,
    stock: 40,
    lowStockThreshold: 10,
    status: 'Published',
    features: [
      'OE-Level All System Diagnostics',
      'Active Test / Bi-directional Control',
      '36+ Special Functions',
      'CAN FD & DOIP Support'
    ],
    specifications: {
      'Display': '7 inch Touchscreen',
      'Battery': '4000mAh',
      'Storage': '32GB'
    },
    compatibility: ['Worldwide vehicle coverage'],
    inTheBox: ['D7S Tablet', 'OBD2 Cable', 'USB Cable', 'Power Adapter'],
    warranty: '1 Year Warranty',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-1001',
    customerName: 'Rahul Sharma',
    email: 'rahul@example.com',
    phone: '9876543210',
    address: '123 Main St',
    city: 'New Delhi',
    state: 'Delhi',
    pinCode: '110001',
    items: [
      { product: mockProducts[0], quantity: 1 }
    ],
    subtotal: 89999,
    shipping: 0,
    gst: 16199.82,
    total: 106198.82,
    paymentMethod: 'UPI',
    paymentStatus: 'Paid',
    orderStatus: 'Delivered',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  },
  {
    id: 'ORD-1002',
    customerName: 'Amit Verma',
    email: 'amit@example.com',
    phone: '9876543211',
    address: '45 Park Ave',
    city: 'Mumbai',
    state: 'Maharashtra',
    pinCode: '400001',
    items: [
      { product: mockProducts[3], quantity: 1 }
    ],
    subtotal: 44999,
    shipping: 500,
    gst: 8099.82,
    total: 53598.82,
    paymentMethod: 'Card',
    paymentStatus: 'Pending',
    orderStatus: 'Pending',
    createdAt: new Date(Date.now() - 86400000 * 1).toISOString(),
  }
];

export const mockCustomers: Customer[] = [
  {
    id: 'CUST-001',
    name: 'Rahul Sharma',
    email: 'rahul@example.com',
    phone: '9876543210',
    ordersCount: 3,
    totalSpent: 250000,
    registrationDate: new Date(Date.now() - 86400000 * 100).toISOString(),
    status: 'Active'
  },
  {
    id: 'CUST-002',
    name: 'Amit Verma',
    email: 'amit@example.com',
    phone: '9876543211',
    ordersCount: 1,
    totalSpent: 53598.82,
    registrationDate: new Date(Date.now() - 86400000 * 20).toISOString(),
    status: 'Active'
  }
];
