import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Order from '../../../models/Order';
import Product from '../../../models/Product';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    
    // Create new order
    const orderData = {
      ...body,
      orderNumber: `ORD-${Math.floor(100000 + Math.random() * 900000)}`,
      paymentStatus: body.paymentMethod === 'COD' ? 'pending' : 'paid',
      orderStatus: 'pending',
    };
    
    const order = await Order.create(orderData);
    
    // Decrement stock for each item
    for (const item of body.items) {
      if (item.productId) {
        await Product.findByIdAndUpdate(item.productId, {
          $inc: { stock: -item.quantity }
        });
      }
    }
    
    return NextResponse.json(
      { message: 'Order created successfully', order },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Failed to create order:', error);
    return NextResponse.json({ error: error.message || 'Failed to create order' }, { status: 500 });
  }
}
