import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Category from '../../../models/Category';

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find({}).sort({ createdAt: -1 }).lean();
    
    // Return formatted categories where _id is mapped to id
    const formattedCategories = categories.map(cat => ({
      ...cat,
      id: cat._id.toString(),
      _id: undefined
    }));

    return NextResponse.json({ categories: formattedCategories }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
