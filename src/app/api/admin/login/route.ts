import { NextRequest, NextResponse } from 'next/server';
import { createAdminToken, validateAdminCredentials } from '@/lib/auth';
import connectToDatabase from '@/lib/mongodb';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    // 1. Check against environment variables first
    let isValid = validateAdminCredentials(username, password);
    let sessionUser = username.trim();

    // 2. Fallback check against MongoDB Admin collection
    if (!isValid) {
      try {
        await connectToDatabase();
        const dbAdmin = await Admin.findOne({
          $or: [
            { email: username.trim().toLowerCase() },
            { name: { $regex: new RegExp(`^${username.trim()}$`, 'i') } }
          ]
        });

        if (dbAdmin && dbAdmin.isActive) {
          const passMatch = await bcrypt.compare(password, dbAdmin.passwordHash);
          if (passMatch) {
            isValid = true;
            sessionUser = dbAdmin.name || dbAdmin.email;
          }
        }
      } catch (dbError) {
        console.error('Database admin check fallback error:', dbError);
      }
    }

    if (!isValid) {
      return NextResponse.json(
        { error: 'Invalid username or password' },
        { status: 401 }
      );
    }

    // Generate authenticated session token
    const token = await createAdminToken(sessionUser);

    const response = NextResponse.json({
      success: true,
      message: 'Logged in successfully',
      user: { username: sessionUser }
    });

    // Set HTTP-only secure cookie
    response.cookies.set('admin_token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 7 * 24 * 60 * 60 // 7 days in seconds
    });

    return response;
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json(
      { error: 'An unexpected error occurred during login' },
      { status: 500 }
    );
  }
}
