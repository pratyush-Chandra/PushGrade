import dbConnect from './db';

export async function testConnection() {
  try {
    await dbConnect();
    console.log('✅ MongoDB connected successfully');
    return true;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    return false;
  }
} 