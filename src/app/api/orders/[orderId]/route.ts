import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Order from '../../../../models/Order';
import PaymentSettings from '../../../../models/PaymentSettings';

export async function GET(request: Request, props: { params: Promise<{ orderId: string }> }) {
  try {
    await connectToDatabase();
    
    // We await params in nextjs 15+ but if it's an older nextjs it's just params.
    // Assuming standard Next.js app router here.
    const { orderId } = await props.params;

    const order = await Order.findById(orderId);
    if (!order) {
      return NextResponse.json({ error: 'Order not found' }, { status: 404 });
    }

    const settings = await PaymentSettings.findOne();

    return NextResponse.json({ order, paymentSettings: settings });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
