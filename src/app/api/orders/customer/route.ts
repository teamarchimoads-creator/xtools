import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Order from '../../../../models/Order';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const email = searchParams.get('email');
    
    if (!email) {
      return NextResponse.json({ error: 'Email is required' }, { status: 400 });
    }
    
    await connectToDatabase();
    
    const orders = await Order.find({ 'customer.email': email }).sort({ createdAt: -1 }).lean();
    
    const formattedOrders = orders.map(order => ({
      ...order,
      id: order._id.toString(),
      _id: undefined,
    }));
    
    return NextResponse.json({ orders: formattedOrders }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch customer orders' }, { status: 500 });
  }
}
