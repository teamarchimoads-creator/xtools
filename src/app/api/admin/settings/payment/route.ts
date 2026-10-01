import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import PaymentSettings from '@/models/PaymentSettings';

export async function GET() {
  try {
    await connectToDatabase();
    let settings = await PaymentSettings.findOne();
    if (!settings) {
      settings = await PaymentSettings.create({
        enabled: true,
        upiId: 'your-upi-id@okbank',
        accountName: 'Store Name',
        qrCodeUrl: '',
        instructions: 'Scan the QR code using your UPI app and complete the payment.',
        confirmationMessage: 'Your payment details have been submitted successfully. Our team will verify your payment and process your order.'
      });
    }
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    await connectToDatabase();
    let settings = await PaymentSettings.findOne();
    if (settings) {
      Object.assign(settings, data);
      await settings.save();
    } else {
      settings = await PaymentSettings.create(data);
    }
    return NextResponse.json(settings);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
