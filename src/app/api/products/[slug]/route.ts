import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Product from '../../../../models/Product';

export async function GET(request: Request, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  try {
    await connectToDatabase();
    
    // Could be ID or slug depending on how it's called
    const isObjectId = slug.match(/^[0-9a-fA-F]{24}$/);
    
    let product;
    if (isObjectId) {
      product = await Product.findById(slug).lean();
    } else {
      product = await Product.findOne({ slug: slug }).lean();
    }
    
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }

    const formattedProduct = {
      ...product,
      id: product._id.toString(),
      _id: undefined,
      categoryId: product.category?.toString()
    };

    return NextResponse.json({ product: formattedProduct }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch product:', error);
    return NextResponse.json({ error: 'Failed to fetch product' }, { status: 500 });
  }
}
