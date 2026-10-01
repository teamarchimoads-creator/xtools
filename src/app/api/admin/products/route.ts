import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Product from '../../../../models/Product';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    
    // Auto-generate slug if not provided
    if (!body.slug && body.name) {
      body.slug = body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    }
    
    // Ensure numeric fields are properly parsed
    if (body.price) body.price = Number(body.price);
    if (body.originalPrice) body.originalPrice = Number(body.originalPrice);
    if (body.stock) body.stock = Number(body.stock);
    
    const product = await Product.create(body);
    
    return NextResponse.json(
      { message: 'Product created successfully', product },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Failed to create product:', error);
    return NextResponse.json({ error: error.message || 'Failed to create product' }, { status: 500 });
  }
}
