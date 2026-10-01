import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IOrder extends Document {
  orderNumber: string;
  customer: {
    userId?: mongoose.Types.ObjectId;
    name: string;
    email: string;
    phone: string;
    gstNumber?: string;
    companyName?: string;
  };
  items: {
    productId: mongoose.Types.ObjectId;
    name: string;
    sku: string;
    image: string;
    price: number;
    quantity: number;
    total: number;
  }[];
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    postalCode: string;
  };
  subtotal: number;
  shippingCost: number;
  gst: number;
  total: number;
  paymentMethod: string;
  paymentStatus: 'pending' | 'verification_pending' | 'paid' | 'rejected' | 'failed' | 'refunded';
  orderStatus: 'payment_pending' | 'payment_verification' | 'payment_failed' | 'confirmed' | 'processing' | 'shipped' | 'out_for_delivery' | 'delivered' | 'cancelled' | 'refunded';
  payment?: {
    method: string;
    status: string;
    transactionId?: string;
    paymentDate?: Date;
    paymentTime?: string;
    screenshotUrl?: string;
    screenshotPublicId?: string;
    note?: string;
    verifiedAt?: Date;
    verifiedBy?: mongoose.Types.ObjectId;
    rejectionReason?: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const OrderSchema: Schema<IOrder> = new Schema({
  orderNumber: { type: String, required: true, unique: true, index: true },
  customer: {
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    gstNumber: { type: String },
    companyName: { type: String }
  },
  items: [{
    productId: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
    name: { type: String, required: true },
    sku: { type: String, required: true },
    image: { type: String },
    price: { type: Number, required: true },
    quantity: { type: Number, required: true },
    total: { type: Number, required: true }
  }],
  shippingAddress: {
    name: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    postalCode: { type: String, required: true }
  },
  subtotal: { type: Number, required: true },
  shippingCost: { type: Number, required: true },
  gst: { type: Number, required: true },
  total: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  paymentStatus: { 
    type: String, 
    enum: ['pending', 'verification_pending', 'paid', 'rejected', 'failed', 'refunded'], 
    default: 'pending' 
  },
  orderStatus: { 
    type: String, 
    enum: ['pending', 'payment_pending', 'payment_verification', 'payment_failed', 'confirmed', 'processing', 'shipped', 'out_for_delivery', 'delivered', 'cancelled', 'refunded'], 
    default: 'payment_pending' 
  },
  payment: {
    method: { type: String, default: 'manual_qr' },
    status: { type: String, enum: ['pending', 'verification_pending', 'paid', 'rejected', 'failed', 'refunded'], default: 'pending' },
    transactionId: { type: String },
    paymentDate: { type: Date },
    paymentTime: { type: String },
    screenshotUrl: { type: String },
    screenshotPublicId: { type: String },
    note: { type: String },
    verifiedAt: { type: Date },
    verifiedBy: { type: Schema.Types.ObjectId, ref: 'User' },
    rejectionReason: { type: String }
  }
}, {
  timestamps: true
});

const Order: Model<IOrder> = mongoose.models.Order || mongoose.model<IOrder>('Order', OrderSchema);

export default Order;
