import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../lib/mongodb';
import Product from '../../../../models/Product';
import Category from '../../../../models/Category';
import Order from '../../../../models/Order';

export async function GET() {
  try {
    await connectToDatabase();
    
    const [productCount, categoryCount] = await Promise.all([
      Product.countDocuments(),
      Category.countDocuments()
    ]);

    const orderStats = await Order.aggregate([
      {
        $group: {
          _id: null,
          totalOrders: { $sum: 1 },
          totalRevenue: { 
            $sum: { $cond: [{ $eq: ["$paymentStatus", "paid"] }, "$total", 0] } 
          },
          paymentPending: { $sum: { $cond: [{ $eq: ["$paymentStatus", "pending"] }, 1, 0] } },
          paymentVerificationPending: { $sum: { $cond: [{ $eq: ["$paymentStatus", "verification_pending"] }, 1, 0] } },
          paidOrders: { $sum: { $cond: [{ $eq: ["$paymentStatus", "paid"] }, 1, 0] } },
          rejectedPayments: { $sum: { $cond: [{ $eq: ["$paymentStatus", "rejected"] }, 1, 0] } },
          confirmedOrders: { $sum: { $cond: [{ $eq: ["$orderStatus", "confirmed"] }, 1, 0] } },
          processingOrders: { $sum: { $cond: [{ $eq: ["$orderStatus", "processing"] }, 1, 0] } },
          shippedOrders: { $sum: { $cond: [{ $eq: ["$orderStatus", "shipped"] }, 1, 0] } },
          deliveredOrders: { $sum: { $cond: [{ $eq: ["$orderStatus", "delivered"] }, 1, 0] } },
        }
      }
    ]);

    const stats = orderStats[0] || {
      totalOrders: 0,
      totalRevenue: 0,
      paymentPending: 0,
      paymentVerificationPending: 0,
      paidOrders: 0,
      rejectedPayments: 0,
      confirmedOrders: 0,
      processingOrders: 0,
      shippedOrders: 0,
      deliveredOrders: 0
    };
    
    return NextResponse.json({
      stats: {
        products: productCount,
        categories: categoryCount,
        ...stats
      }
    }, { status: 200 });
  } catch (error) {
    console.error('Failed to fetch stats:', error);
    return NextResponse.json({ error: 'Failed to fetch stats' }, { status: 500 });
  }
}
