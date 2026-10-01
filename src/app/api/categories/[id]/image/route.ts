import { NextResponse } from 'next/server';
import connectToDatabase from '../../../../../lib/mongodb';
import Category from '../../../../../models/Category';

export async function GET(request: Request, props: { params: Promise<{ id: string }> }) {
  try {
    const params = await props.params;
    await connectToDatabase();
    
    // Find the category and ONLY fetch the image field
    const category = await Category.findById(params.id).select('image').lean();
    
    if (!category || !category.image) {
      return new NextResponse('Image not found', { status: 404 });
    }

    // The image is stored as a base64 Data URI (e.g., data:image/png;base64,iVBORw0K...)
    // We can extract the base64 part and the mime type to serve it properly!
    const matches = category.image.match(/^data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+);base64,(.+)$/);
    
    if (matches && matches.length === 3) {
      const mimeType = matches[1];
      const base64Data = matches[2];
      const buffer = Buffer.from(base64Data, 'base64');
      
      return new NextResponse(buffer, {
        headers: {
          'Content-Type': mimeType,
          'Cache-Control': 'public, max-age=86400'
        }
      });
    }

    // If it's not a valid data URI (maybe a normal URL?), redirect to it or just return it
    if (category.image.startsWith('http')) {
      return NextResponse.redirect(category.image);
    }
    
    return new NextResponse('Invalid image format', { status: 400 });

  } catch (error) {
    console.error('Failed to fetch category image:', error);
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
