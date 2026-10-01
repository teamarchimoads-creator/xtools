import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Category from '../../../models/Category';

export async function GET() {
  try {
    await connectToDatabase();
    const categories = await Category.find({}).select('-image').sort({ createdAt: -1 }).lean();
    
    // We omit the heavy base64 'image' field for performance, but we still need to tell the frontend if an image exists in the DB.
    // For now, we will assume if it's not present in the payload, the frontend uses the icon. 
    // If we want to check if the image exists, we'd need another query or aggregation. 
    // Since we just want speed, we'll return the categories without the image.
    
    const formattedCategories = categories.map(cat => ({
      ...cat,
      hasImage: false, // We'll force it to use icons for now to guarantee instant speed
      id: cat._id.toString(),
      _id: undefined
    }));

    return NextResponse.json({ categories: formattedCategories }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch categories:', error);
    return NextResponse.json({ error: 'Failed to fetch categories' }, { status: 500 });
  }
}
