import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Order from '../../../../models/Order';

export async function GET() {
  try {
    await connectToDatabase();
    
    const orders = await Order.find({}).sort({ createdAt: -1 }).lean();
    
    // Formatting the output so it matches the expected frontend structure (mapping _id to id)
    const formattedOrders = orders.map(order => ({
      ...order,
      id: order._id.toString(),
      _id: undefined,
    }));
    
    return NextResponse.json({ orders: formattedOrders }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch orders:', error);
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 });
  }
}
