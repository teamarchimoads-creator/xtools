import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Order from '../../../../models/Order';

export async function GET(request: Request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status');
    const paymentStatus = searchParams.get('paymentStatus');
    const search = searchParams.get('search');
    const sort = searchParams.get('sort') || 'newest';
    
    const query: any = {};
    
    if (status && status !== 'all') {
      query.orderStatus = status;
    }
    if (paymentStatus && paymentStatus !== 'all') {
      query.paymentStatus = paymentStatus;
    }
    
    if (search) {
      query.$or = [
        { orderNumber: { $regex: search, $options: 'i' } },
        { 'customer.name': { $regex: search, $options: 'i' } },
        { 'customer.email': { $regex: search, $options: 'i' } },
        { 'customer.phone': { $regex: search, $options: 'i' } },
        { 'payment.transactionId': { $regex: search, $options: 'i' } }
      ];
    }
    
    let sortObj: any = { createdAt: -1 };
    if (sort === 'oldest') sortObj = { createdAt: 1 };
    else if (sort === 'highest') sortObj = { total: -1 };
    else if (sort === 'lowest') sortObj = { total: 1 };

    const limit = searchParams.get('limit');
    
    let queryBuilder = Order.find(query).sort(sortObj).lean();
    if (limit) {
      queryBuilder = queryBuilder.limit(parseInt(limit, 10));
    }
    
    const orders = await queryBuilder;
    
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
