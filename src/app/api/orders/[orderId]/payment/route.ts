import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../../lib/mongodb';
import Order from '../../../../../models/Order';

export async function POST(request: Request, { params }: { params: { orderId: string } }) {
  try {
    const { orderId } = await Promise.resolve(params);
    const body = await request.json();
    await connectToDatabase();

    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    if (order.paymentStatus !== 'pending' && order.paymentStatus !== 'failed') {
      return NextResponse.json({ error: 'Order payment is already submitted or processed' }, { status: 400 });
    }

    order.paymentStatus = 'verification_pending';
    order.orderStatus = 'payment_verification';
    order.payment = {
      ...order.payment,
      method: 'manual_qr',
      status: 'verification_pending',
      transactionId: body.transactionId,
      paymentDate: body.paymentDate,
      paymentTime: body.paymentTime,
      screenshotUrl: body.screenshotUrl,
      note: body.note
    };

    await order.save();

    return NextResponse.json({ message: 'Payment details submitted successfully', order });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
