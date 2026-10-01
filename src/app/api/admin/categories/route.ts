import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Category from '../../../../models/Category';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    
    // Auto-generate slug if not provided
    if (!body.slug && body.name) {
      body.slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    
    const category = await Category.create(body);
    
    return NextResponse.json(
      { message: 'Category created successfully', category },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Failed to create category:', error);
    return NextResponse.json({ error: error.message || 'Failed to create category' }, { status: 500 });
  }
}
