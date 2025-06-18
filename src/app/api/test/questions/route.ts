import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Question from '@/models/Question';

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
  const etag = `"questions-${Date.now()}-${Math.random().toString(36).substr(2, 9)}"`;
  response.headers.set('ETag', etag);
  
  return response;
}

export async function GET() {
  try {
    await dbConnect();
    
    const questions = await Question.find({ isActive: true })
      .limit(10)
      .sort({ createdAt: -1 });
    
    const response = NextResponse.json({
      success: true,
      count: questions.length,
      questions: questions.map(q => ({
        id: q._id,
        text: q.text,
        category: q.category,
        subcategory: q.subcategory,
        difficulty: q.difficulty,
        experienceLevel: q.experienceLevel,
        technologies: q.technologies,
        type: q.type,
        points: q.points,
        tags: q.tags,
        usageCount: q.usageCount,
        createdAt: q.createdAt,
      })),
    });
    
    // Questions are public and cached for 5 minutes
    return addCacheHeaders(response, 'public', 300);
  } catch (error) {
    console.error('Error fetching questions:', error);
    const errorResponse = NextResponse.json({
      success: false,
      message: 'Failed to fetch questions',
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
    const { text, category, subcategory, difficulty, experienceLevel, technologies, type } = body;
    
    // Validate required fields
    if (!text || !category || !subcategory || !difficulty || !experienceLevel || !type) {
      const errorResponse = NextResponse.json({
        success: false,
        message: 'Missing required fields: text, category, subcategory, difficulty, experienceLevel, type',
      }, { status: 400 });
      
      // Don't cache validation errors
      return addCacheHeaders(errorResponse, 'none');
    }
    
    // Create new question
    const question = new Question({
      text,
      category,
      subcategory,
      difficulty,
      experienceLevel,
      technologies: technologies || [],
      type,
      tags: [category, subcategory, difficulty, experienceLevel, ...(technologies || [])],
      aiGenerated: true,
      metadata: {
        model: 'gpt-4',
        temperature: 0.7,
      },
    });
    
    await question.save();
    
    const response = NextResponse.json({
      success: true,
      message: 'Question created successfully',
      question: {
        id: question._id,
        text: question.text,
        category: question.category,
        subcategory: question.subcategory,
        difficulty: question.difficulty,
        experienceLevel: question.experienceLevel,
        technologies: question.technologies,
        type: question.type,
        points: question.points,
        tags: question.tags,
        createdAt: question.createdAt,
      },
    }, { status: 201 });
    
    // Don't cache POST responses
    return addCacheHeaders(response, 'none');
  } catch (error) {
    console.error('Error creating question:', error);
    const errorResponse = NextResponse.json({
      success: false,
      message: 'Failed to create question',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
    
    // Don't cache error responses
    return addCacheHeaders(errorResponse, 'none');
  }
} 