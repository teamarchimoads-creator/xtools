import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IPaymentSettings extends Document {
  enabled: boolean;
  upiId: string;
  accountName: string;
  qrCodeUrl: string;
  instructions: string;
  confirmationMessage: string;
  createdAt: Date;
  updatedAt: Date;
}

const PaymentSettingsSchema: Schema<IPaymentSettings> = new Schema({
  enabled: { type: Boolean, default: true },
  upiId: { type: String, required: true },
  accountName: { type: String, required: true },
  qrCodeUrl: { type: String, required: true },
  instructions: { type: String, default: 'Scan the QR code using your UPI app and complete the payment.' },
  confirmationMessage: { type: String, default: 'Your payment details have been submitted successfully. Our team will verify your payment and process your order.' }
}, {
  timestamps: true
});

const PaymentSettings: Model<IPaymentSettings> = mongoose.models.PaymentSettings || mongoose.model<IPaymentSettings>('PaymentSettings', PaymentSettingsSchema);

export default PaymentSettings;
