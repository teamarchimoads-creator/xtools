import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
dotenv.config({path: '.env.local'});
mongoose.connect(process.env.MONGODB_URI!).then(async () => {
  const Product = require('./src/models/Product').default;
  const p = await Product.findOne({ sku: 'XT-ANYSCAN-A30X' });
  console.log(JSON.stringify(p?.images, null, 2));
  process.exit(0);
}).catch(console.error);
