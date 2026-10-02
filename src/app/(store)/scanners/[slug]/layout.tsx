import { Metadata } from 'next';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';

type Props = {
  params: { slug: string };
  children: React.ReactNode;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  try {
    await connectToDatabase();
    const product = await Product.findOne({ slug: params.slug }).lean();

    if (!product) {
      return {
        title: 'Product Not Found - XTOOL Diagnostic Store',
        description: 'The requested product could not be found.',
      };
    }

    return {
      title: `${product.name} | XTOOL Diagnostics`,
      description: product.shortDescription || product.description?.substring(0, 160),
      keywords: `XTOOL, ${product.name}, ${product.sku}, ${product.brand}, Diagnostic Tool, OBD2 Scanner, ECU Coding`,
      openGraph: {
        title: product.name,
        description: product.shortDescription,
        images: product.images && product.images.length > 0 
          ? [(product.images[0] as any)?.url || product.images[0]] 
          : ['/assets/heroimage.png'],
      },
    };
  } catch (error) {
    return {
      title: 'XTOOL Diagnostic Store',
    };
  }
}

export default function ProductLayout({ children }: Props) {
  return <>{children}</>;
}
