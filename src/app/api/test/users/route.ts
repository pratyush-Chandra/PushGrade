import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';

// Helper function to add caching headers
function addCacheHeaders(response: NextResponse, cacheType: 'public' | 'private' | 'none', maxAge: number = 300) {
  if (cacheType === 'none') {
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    response.headers.set('Pragma', 'no-cache');
    response.headers.set('Expires', '0');
  } else {
    response.headers.set('Cache-Control', `${cacheType}, max-age=${maxAge}, s-maxage=${maxAge * 2}`);
  }
  
  // Add ETag for cache validation
  const etag = `"users-${Date.now()}-${Math.random().toString(36).substr(2, 9)}"`;
  response.headers.set('ETag', etag);
  
  return response;
}

export async function GET() {
  try {
    await dbConnect();
    
    const users = await User.find({}).limit(10).sort({ createdAt: -1 });
    
    const response = NextResponse.json({
      success: true,
      count: users.length,
      users: users.map(user => ({
        id: user._id,
        clerkId: user.clerkId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        experienceLevel: user.experienceLevel,
        preferredTechnologies: user.preferredTechnologies,
        createdAt: user.createdAt,
      })),
    });
    
    // User data is private and cached for 1 minute
    return addCacheHeaders(response, 'private', 60);
  } catch (error) {
    console.error('Error fetching users:', error);
    const errorResponse = NextResponse.json({
      success: false,
      message: 'Failed to fetch users',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
    
    // Don't cache error responses
    return addCacheHeaders(errorResponse, 'none');
  }
}

export async function POST(request: Request) {
  try {
    await dbConnect();
    
    const body = await request.json();
    const { clerkId, email, firstName, lastName, experienceLevel, preferredTechnologies } = body;
    
    // Validate required fields
    if (!clerkId || !email || !firstName || !lastName) {
      const errorResponse = NextResponse.json({
        success: false,
        message: 'Missing required fields: clerkId, email, firstName, lastName',
      }, { status: 400 });
      
      // Don't cache validation errors
      return addCacheHeaders(errorResponse, 'none');
    }
    
    // Check if user already exists
    const existingUser = await User.findOne({ clerkId });
    if (existingUser) {
      const errorResponse = NextResponse.json({
        success: false,
        message: 'User already exists with this Clerk ID',
      }, { status: 409 });
      
      // Don't cache conflict errors
      return addCacheHeaders(errorResponse, 'none');
    }
    
    // Create new user
    const user = new User({
      clerkId,
      email,
      firstName,
      lastName,
      experienceLevel: experienceLevel || 'beginner',
      preferredTechnologies: preferredTechnologies || [],
    });
    
    await user.save();
    
    const response = NextResponse.json({
      success: true,
      message: 'User created successfully',
      user: {
        id: user._id,
        clerkId: user.clerkId,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        experienceLevel: user.experienceLevel,
        preferredTechnologies: user.preferredTechnologies,
        createdAt: user.createdAt,
      },
    }, { status: 201 });
    
    // Don't cache POST responses
    return addCacheHeaders(response, 'none');
  } catch (error) {
    console.error('Error creating user:', error);
    const errorResponse = NextResponse.json({
      success: false,
      message: 'Failed to create user',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
    
    // Don't cache error responses
    return addCacheHeaders(errorResponse, 'none');
  }
} 