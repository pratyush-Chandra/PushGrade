import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import { testConnection } from '@/lib/test-db';

export async function GET() {
  try {
    // Test the connection
    const isConnected = await testConnection();
    
    if (isConnected) {
      return NextResponse.json({
        success: true,
        message: 'MongoDB connection successful',
        timestamp: new Date().toISOString(),
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'MongoDB connection failed',
        timestamp: new Date().toISOString(),
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Database connection test error:', error);
    return NextResponse.json({
      success: false,
      message: 'Database connection test failed',
      error: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString(),
    }, { status: 500 });
  }
} 