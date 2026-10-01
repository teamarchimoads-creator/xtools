import { NextResponse } from 'next/server';
import connectToDatabase from '../../../lib/mongodb';
import Order from '../../../models/Order';
import Product from '../../../models/Product';

async function generateOrderNumber() {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const datePrefix = `${year}${month}${day}`;

  const startOfDay = new Date(date.setHours(0, 0, 0, 0));
  const endOfDay = new Date(date.setHours(23, 59, 59, 999));

  const count = await Order.countDocuments({
    createdAt: { $gte: startOfDay, $lte: endOfDay }
  });

  const sequence = String(count + 1).padStart(4, '0');
  return `ADS-${datePrefix}-${sequence}`;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    await connectToDatabase();
    
    const orderNumber = await generateOrderNumber();
    
    // Create new order
    const orderData = {
      ...body,
      orderNumber,
      paymentStatus: 'pending',
      orderStatus: 'payment_pending',
      payment: {
        method: body.paymentMethod || 'manual_qr',
        status: 'pending'
      }
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
