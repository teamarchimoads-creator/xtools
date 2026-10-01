import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import Admin from '../models/Admin';
import Category from '../models/Category';
import Product from '../models/Product';
import connectToDatabase from '../lib/mongodb';
import * as dotenv from 'dotenv';

// Load environment variables from .env.local or .env
dotenv.config({ path: '.env.local' });
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Please define MONGODB_URI in your .env file');
  process.exit(1);
}

const seedDatabase = async () => {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB.');

    // 1. Seed Admin
    const adminEmail = 'admin@autodiagnosticstore.in';
    const existingAdmin = await Admin.findOne({ email: adminEmail });
    if (!existingAdmin) {
      const passwordHash = await bcrypt.hash('Admin@12345', 10);
      await Admin.create({
        name: 'Super Admin',
        email: adminEmail,
        passwordHash,
        role: 'super_admin'
      });
      console.log('Admin account created.');
    } else {
      console.log('Admin account already exists.');
    }

    // 2. Seed Categories
    const categoriesData = [
      {
        name: 'Professional Scanners',
        slug: 'professional-scanners',
        description: 'Advanced diagnostic platforms for workshops, professionals, and heavy-duty repairs.',
      },
      {
        name: 'OBD2 Scanners',
        slug: 'obd2-scanners',
        description: 'Easy-to-use plug-and-play diagnostic tools for DIY enthusiasts and quick checks.',
      },
      {
        name: 'ECU Diagnostics',
        slug: 'ecu-diagnostics',
        description: 'Specialized tools for ECU coding, programming, and flashing operations.',
      },
      {
        name: 'Key Programming',
        slug: 'key-programming',
        description: 'Immobilizer and key programming tools for locksmiths and auto security experts.',
      },
      {
        name: 'TPMS',
        slug: 'tpms',
        description: 'Tire Pressure Monitoring System sensors, activation, and reset tools.',
      },
      {
        name: 'Accessories',
        slug: 'accessories',
        description: 'Cables, adapters, carrying cases, and other essential diagnostic accessories.',
      }
    ];

    for (const catData of categoriesData) {
      await Category.findOneAndUpdate(
        { slug: catData.slug },
        catData,
        { upsert: true, new: true }
      );
    }
    console.log('Categories seeded.');

    // Fetch the ID of the first category for the products
    const profCategory = await Category.findOne({ slug: 'professional-scanners' });

    if (!profCategory) throw new Error('Category not found');

    // 3. Seed Products
    const productsData = [
      {
        name: 'XTOOL H6 Elite',
        slug: 'xtool-h6-elite',
        sku: 'XT-H6-ELITE',
        brand: 'XTOOL',
        category: profCategory._id,
        shortDescription: 'Professional automotive diagnostic scanner designed for workshops, technicians, and advanced vehicle diagnostics.',
        description: 'The XTOOL H6 Elite is a professional-grade automotive diagnostic scanner designed to provide comprehensive diagnostic functions for workshops.',
        price: 89999,
        originalPrice: 99999,
        discount: 10,
        images: [{ url: '/images/products/h6-elite.jpg', isMain: true }],
        rating: 4.8,
        reviewCount: 124,
        stock: 15,
        status: 'published',
        features: [
          'Full-system diagnostics',
          'ECU diagnostics',
          'OBD2 support',
          'Live data',
          'Diagnostic reports'
        ],
        specifications: [
          { name: 'Display', value: '10.1 inch HD Touchscreen' },
          { name: 'Operating System', value: 'Android 10' }
        ],
        compatibility: ['Over 10000+ car models'],
        inTheBox: ['H6 Elite Tablet', 'VCI Box'],
        warranty: '2 Years Official Warranty'
      },
      {
        name: 'XTOOL PS70 Pro',
        slug: 'xtool-ps70-pro',
        sku: 'XT-PS70-PRO',
        brand: 'XTOOL',
        category: profCategory._id,
        shortDescription: 'High-end diagnostic tool with advanced programming capabilities.',
        description: 'XTOOL PS70 Pro offers top-tier diagnostic performance.',
        price: 124999,
        originalPrice: 139999,
        discount: 11,
        images: [{ url: '/images/products/ps70-pro.jpg', isMain: true }],
        rating: 4.9,
        reviewCount: 89,
        stock: 8,
        status: 'published',
        features: ['Advanced Key Programming', 'Bi-directional Control', 'ECU Coding'],
        specifications: [{ name: 'Display', value: '10.1 inch IPS' }],
        compatibility: ['Global vehicle coverage'],
        inTheBox: ['PS70 Pro Tablet', 'VCI'],
        warranty: '2 Years Official Warranty'
      },
      {
        name: 'XTOOL D8BT',
        slug: 'xtool-d8bt',
        sku: 'XT-D8BT',
        brand: 'XTOOL',
        category: profCategory._id,
        shortDescription: 'Wireless diagnostic tool with extensive system coverage.',
        description: 'The XTOOL D8BT provides wireless convenience with Bluetooth VCI.',
        price: 69999,
        originalPrice: 79999,
        discount: 12.5,
        images: [{ url: '/images/products/d8bt.jpg', isMain: true }],
        rating: 4.7,
        reviewCount: 210,
        stock: 25,
        status: 'published',
        features: ['Wireless Bluetooth VCI', 'Full System Diagnostics'],
        specifications: [{ name: 'Display', value: '8 inch Touchscreen' }],
        compatibility: ['Supports 85+ brands'],
        inTheBox: ['D8BT Tablet', 'Bluetooth VCI'],
        warranty: '1 Year Warranty'
      },
      {
        name: 'XTOOL D7S',
        slug: 'xtool-d7s',
        sku: 'XT-D7S',
        brand: 'XTOOL',
        category: profCategory._id,
        shortDescription: 'Compact and powerful diagnostic tool for technicians.',
        description: 'XTOOL D7S is an upgraded version of D7, featuring active tests.',
        price: 44999,
        originalPrice: 49999,
        discount: 10,
        images: [{ url: '/images/products/d7s.jpg', isMain: true }],
        rating: 4.6,
        reviewCount: 345,
        stock: 40,
        status: 'published',
        features: ['OE-Level All System Diagnostics', 'Active Test'],
        specifications: [{ name: 'Display', value: '7 inch Touchscreen' }],
        compatibility: ['Worldwide vehicle coverage'],
        inTheBox: ['D7S Tablet', 'OBD2 Cable'],
        warranty: '1 Year Warranty'
      }
    ];

    for (const prodData of productsData) {
      await Product.findOneAndUpdate(
        { sku: prodData.sku },
        prodData,
        { upsert: true, new: true }
      );
    }
    console.log('Products seeded.');

    console.log('Database seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

seedDatabase();
