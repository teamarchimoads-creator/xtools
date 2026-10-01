import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Product from '../../../../models/Product';
import Category from '../../../../models/Category';

export async function GET() {
  try {
    await connectToDatabase();
    
    const [productCount, categoryCount] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments()
    ]);
    
    return NextResponse.json({
      stats: {
        products: productCount,
        categories: categoryCount,
        orders: 0, // Pending orders implementation
        customers: 0,
        revenue: 0
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
