import connectToDatabase from '../lib/mongodb';
import Category from '../models/Category';
import Product from '../models/Product';
import * as dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });
dotenv.config();

const seedAdditionalProducts = async () => {
  try {
    await connectToDatabase();
    console.log('Connected to MongoDB.');

    // Fetch a category to assign
    const profCategory = await Category.findOne({ slug: 'professional-scanners' });
    
    if (!profCategory) {
      console.error('Professional Scanners category not found. Will assign to the first available category.');
    }
    
    const fallbackCategory = await Category.findOne();
    const targetCategory = profCategory || fallbackCategory;
    
    if (!targetCategory) {
      console.error('No categories found. Please seed categories first.');
      process.exit(1);
    }

    const targetCategoryId = targetCategory._id;

    const newProducts = [
      {
        name: 'ANYSCAN A30X',
        slug: 'anyscan-a30x',
        sku: 'XT-ANYSCAN-A30X',
        brand: 'XTOOL',
        category: targetCategoryId,
        shortDescription: 'Advanced OBD2 Bi-Directional Scan Tool',
        description: 'The ANYSCAN A30X is an advanced wireless OBD2 bi-directional scan tool designed for mechanics and DIYers.',
        price: 19999,
        originalPrice: 24999,
        images: [{ url: '/placeholder.svg', isMain: true }],
        stock: 50,
        status: 'published'
      },
      {
        name: 'XT50',
        slug: 'xt50',
        sku: 'XT-50',
        brand: 'XTOOL',
        category: targetCategoryId,
        shortDescription: 'Essential Diagnostic System',
        description: 'XT50 provides essential diagnostic functions for daily repair needs.',
        price: 29999,
        originalPrice: 34999,
        images: [{ url: '/placeholder.svg', isMain: true }],
        stock: 40,
        status: 'published'
      },
      {
        name: 'XT60',
        slug: 'xt60',
        sku: 'XT-60',
        brand: 'XTOOL',
        category: targetCategoryId,
        shortDescription: 'Advanced Diagnostic System',
        description: 'XT60 features advanced diagnostic tools with extensive vehicle coverage.',
        price: 39999,
        originalPrice: 44999,
        images: [{ url: '/placeholder.svg', isMain: true }],
        stock: 35,
        status: 'published'
      },
      {
        name: 'XT70 Smart Diagnostic System',
        slug: 'xt70-smart-diagnostic-system',
        sku: 'XT-70-SMART',
        brand: 'XTOOL',
        category: targetCategoryId,
        shortDescription: 'Smart Diagnostic System for Workshops',
        description: 'XT70 offers a smart diagnostic ecosystem designed for modern workshops.',
        price: 54999,
        originalPrice: 59999,
        images: [{ url: '/placeholder.svg', isMain: true }],
        stock: 25,
        status: 'published'
      },
      {
        name: 'XT80 Smart Diagnostic System',
        slug: 'xt80-smart-diagnostic-system',
        sku: 'XT-80-SMART',
        brand: 'XTOOL',
        category: targetCategoryId,
        shortDescription: 'Premium Smart Diagnostic System',
        description: 'XT80 delivers premium diagnostic performance, coding, and programming capabilities.',
        price: 74999,
        originalPrice: 84999,
        images: [{ url: '/placeholder.svg', isMain: true }],
        stock: 20,
        status: 'published'
      },
      {
        name: 'XT90',
        slug: 'xt90',
        sku: 'XT-90',
        brand: 'XTOOL',
        category: targetCategoryId,
        shortDescription: 'Top-tier Professional Diagnostic Platform',
        description: 'XT90 is the top-tier professional diagnostic platform for comprehensive vehicle servicing.',
        price: 99999,
        originalPrice: 114999,
        images: [{ url: '/placeholder.svg', isMain: true }],
        stock: 10,
        status: 'published'
      },
      {
        name: 'COMPASS',
        slug: 'compass',
        sku: 'XT-COMPASS',
        brand: 'XTOOL',
        category: targetCategoryId,
        shortDescription: 'Precision Diagnostic Interface',
        description: 'COMPASS is a highly precise diagnostic interface for critical vehicle programming tasks.',
        price: 89999,
        originalPrice: 99999,
        images: [{ url: '/placeholder.svg', isMain: true }],
        stock: 15,
        status: 'published'
      }
    ];

    for (const prodData of newProducts) {
      await Product.findOneAndUpdate(
        { sku: prodData.sku },
        prodData,
        { upsert: true, new: true }
      );
      console.log(`Seeded: ${prodData.name}`);
    }

    console.log('Additional products seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding additional products:', error);
    process.exit(1);
  }
};

seedAdditionalProducts();
