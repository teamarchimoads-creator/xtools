import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../../lib/mongodb';
import Order from '../../../../../models/Order';

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    await connectToDatabase();
    const { id } = await Promise.resolve(params);
    const order = await Order.findById(id).lean();
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }
    return NextResponse.json({ order: { ...order, id: order._id.toString(), _id: undefined } }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch order' }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { id } = await Promise.resolve(params);
    const body = await request.json();
    await connectToDatabase();

    const order = await Order.findById(id);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (body.action === 'approve_payment') {
      order.paymentStatus = 'paid';
      order.orderStatus = 'confirmed';
      if (!order.payment) order.payment = {} as any;
      order.payment!.status = 'paid';
      order.payment!.verifiedAt = new Date();
    } else if (body.action === 'reject_payment') {
      order.paymentStatus = 'rejected';
      order.orderStatus = 'payment_failed';
      if (!order.payment) order.payment = {} as any;
      order.payment!.status = 'rejected';
      order.payment!.rejectionReason = body.rejectionReason;
    } else if (body.action === 'update_status') {
      if (body.orderStatus) order.orderStatus = body.orderStatus;
    }

    await order.save();
    return NextResponse.json({ message: 'Order updated', order }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
