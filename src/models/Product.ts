import mongoose, { Schema, Document, Model } from 'mongoose';

export interface IProduct extends Document {
  name: string;
  slug: string;
  sku: string;
  brand: string;
  category: mongoose.Types.ObjectId;
  shortDescription: string;
  description: string;
  price: number;
  originalPrice: number;
  discount: number;
  images: {
    url: string;
    alt: string;
    isMain: boolean;
  }[];
  rating: number;
  reviewCount: number;
  stock: number;
  lowStockThreshold: number;
  status: 'published' | 'draft' | 'archived' | 'in_stock' | 'out_of_stock';
  features: string[];
  specifications: {
    name: string;
    value: string;
  }[];
  compatibility: string[];
  inTheBox: string[];
  warranty: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProductSchema: Schema<IProduct> = new Schema({
  name: { type: String, required: true, index: true },
  slug: { type: String, required: true, unique: true, index: true },
  sku: { type: String, required: true, unique: true, index: true },
  brand: { type: String, required: true },
  category: { type: Schema.Types.ObjectId, ref: 'Category', required: true, index: true },
  shortDescription: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  originalPrice: { type: Number, required: true },
  discount: { type: Number, default: 0 },
  images: [{
    url: { type: String, required: true },
    alt: { type: String },
    isMain: { type: Boolean, default: false }
  }],
  rating: { type: Number, default: 0 },
  reviewCount: { type: Number, default: 0 },
  stock: { type: Number, required: true, default: 0 },
  lowStockThreshold: { type: Number, default: 5 },
  status: { 
    type: String, 
    enum: ['published', 'draft', 'archived', 'in_stock', 'out_of_stock'], 
    default: 'in_stock',
    index: true
  },
  features: [{ type: String }],
  specifications: [{
    name: { type: String },
    value: { type: String }
  }],
  compatibility: [{ type: String }],
  inTheBox: [{ type: String }],
  warranty: { type: String }
}, {
  timestamps: true
});

const Product: Model<IProduct> = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export default Product;
