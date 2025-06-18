import { NextRequest, NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import User from '@/models/User';
import Interview from '@/models/Interview';
import Question from '@/models/Question';
import Feedback from '@/models/Feedback';

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
  const etag = `"${Date.now()}-${Math.random().toString(36).substr(2, 9)}"`;
  response.headers.set('ETag', etag);
  
  return response;
}

export async function GET(request: NextRequest) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const type = searchParams.get('type');
    const limit = parseInt(searchParams.get('limit') || '10');
    const page = parseInt(searchParams.get('page') || '1');
    const userId = searchParams.get('userId');
    const clerkId = searchParams.get('clerkId');
    
    const skip = (page - 1) * limit;

    let response: NextResponse;

    switch (type) {
      case 'users':
        response = await getUsers(limit, skip, userId, clerkId);
        // User data is private and cached for 1 minute
        return addCacheHeaders(response, 'private', 60);
      
      case 'interviews':
        response = await getInterviews(limit, skip, userId, clerkId);
        // Interview data is private and cached for 2 minutes
        return addCacheHeaders(response, 'private', 120);
      
      case 'questions':
        response = await getQuestions(limit, skip, searchParams);
        // Questions are public and cached for 5 minutes
        return addCacheHeaders(response, 'public', 300);
      
      case 'feedback':
        response = await getFeedback(limit, skip, userId, clerkId);
        // Feedback is private and cached for 1 minute
        return addCacheHeaders(response, 'private', 60);
      
      case 'dashboard':
        response = await getDashboardData(userId, clerkId);
        // Dashboard data is private and cached for 30 seconds
        return addCacheHeaders(response, 'private', 30);
      
      default:
        response = await getAllData(limit, skip);
        // General data is public and cached for 3 minutes
        return addCacheHeaders(response, 'public', 180);
    }
  } catch (error) {
    console.error('API Data fetch error:', error);
    const errorResponse = NextResponse.json({
      success: false,
      message: 'Failed to fetch data',
      error: error instanceof Error ? error.message : 'Unknown error',
    }, { status: 500 });
    
    // Don't cache error responses
    return addCacheHeaders(errorResponse, 'none');
  }
}

async function getUsers(limit: number, skip: number, userId?: string | null, clerkId?: string | null) {
  try {
    let query: any = {};
    
    if (userId) {
      query._id = userId;
    }
    
    if (clerkId) {
      query.clerkId = clerkId;
    }

    const users = await User.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .select('-__v');

    const total = await User.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: users,
      pagination: {
        page: Math.floor(skip / limit) + 1,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    throw new Error(`Failed to fetch users: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function getInterviews(limit: number, skip: number, userId?: string | null, clerkId?: string | null) {
  try {
    let query: any = {};
    
    if (userId) {
      query.userId = userId;
    }
    
    if (clerkId) {
      query.clerkId = clerkId;
    }

    const interviews = await Interview.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .populate('feedbackId', 'overallScore categoryScores strengths areasForImprovement')
      .select('-__v');

    const total = await Interview.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: interviews,
      pagination: {
        page: Math.floor(skip / limit) + 1,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    throw new Error(`Failed to fetch interviews: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function getQuestions(limit: number, skip: number, searchParams: URLSearchParams) {
  try {
    let query: any = { isActive: true };
    
    const category = searchParams.get('category');
    const difficulty = searchParams.get('difficulty');
    const experienceLevel = searchParams.get('experienceLevel');
    const technologies = searchParams.get('technologies');
    const search = searchParams.get('search');

    if (category) {
      query.category = category;
    }
    
    if (difficulty) {
      query.difficulty = difficulty;
    }
    
    if (experienceLevel) {
      query.experienceLevel = experienceLevel;
    }
    
    if (technologies) {
      query.technologies = { $in: technologies.split(',') };
    }
    
    if (search) {
      query.$text = { $search: search };
    }

    const questions = await Question.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .select('-__v');

    const total = await Question.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: questions,
      pagination: {
        page: Math.floor(skip / limit) + 1,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    throw new Error(`Failed to fetch questions: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function getFeedback(limit: number, skip: number, userId?: string | null, clerkId?: string | null) {
  try {
    let query: any = {};
    
    if (userId) {
      query.userId = userId;
    }
    
    if (clerkId) {
      query.clerkId = clerkId;
    }

    const feedback = await Feedback.find(query)
      .limit(limit)
      .skip(skip)
      .sort({ createdAt: -1 })
      .populate('interviewId', 'title type experienceLevel technologies status score')
      .select('-__v');

    const total = await Feedback.countDocuments(query);

    return NextResponse.json({
      success: true,
      data: feedback,
      pagination: {
        page: Math.floor(skip / limit) + 1,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    throw new Error(`Failed to fetch feedback: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function getDashboardData(userId?: string | null, clerkId?: string | null) {
  try {
    let userQuery: any = {};
    let interviewQuery: any = {};
    let feedbackQuery: any = {};
    
    if (userId) {
      userQuery._id = userId;
      interviewQuery.userId = userId;
      feedbackQuery.userId = userId;
    }
    
    if (clerkId) {
      userQuery.clerkId = clerkId;
      interviewQuery.clerkId = clerkId;
      feedbackQuery.clerkId = clerkId;
    }

    // Get user data
    const user = await User.findOne(userQuery).select('-__v');
    
    // Get interview statistics
    const totalInterviews = await Interview.countDocuments(interviewQuery);
    const completedInterviews = await Interview.countDocuments({ ...interviewQuery, status: 'completed' });
    const inProgressInterviews = await Interview.countDocuments({ ...interviewQuery, status: 'in-progress' });
    
    // Get recent interviews
    const recentInterviews = await Interview.find(interviewQuery)
      .limit(5)
      .sort({ createdAt: -1 })
      .select('title type status score createdAt')
      .populate('feedbackId', 'overallScore');
    
    // Get recent feedback
    const recentFeedback = await Feedback.find(feedbackQuery)
      .limit(5)
      .sort({ createdAt: -1 })
      .select('overallScore categoryScores strengths areasForImprovement createdAt')
      .populate('interviewId', 'title type');
    
    // Get average scores
    const averageScore = await Interview.aggregate([
      { $match: { ...interviewQuery, status: 'completed', score: { $exists: true } } },
      { $group: { _id: null, avgScore: { $avg: '$score' } } }
    ]);

    return NextResponse.json({
      success: true,
      data: {
        user,
        statistics: {
          totalInterviews,
          completedInterviews,
          inProgressInterviews,
          averageScore: averageScore[0]?.avgScore || 0,
        },
        recentInterviews,
        recentFeedback,
      },
    });
  } catch (error) {
    throw new Error(`Failed to fetch dashboard data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
}

async function getAllData(limit: number, skip: number) {
  try {
    // Get summary data for all collections
    const userCount = await User.countDocuments();
    const interviewCount = await Interview.countDocuments();
    const questionCount = await Question.countDocuments({ isActive: true });
    const feedbackCount = await Feedback.countDocuments();

    // Get recent data from each collection
    const recentUsers = await User.find()
      .limit(5)
      .sort({ createdAt: -1 })
      .select('firstName lastName email experienceLevel createdAt');

    const recentInterviews = await Interview.find()
      .limit(5)
      .sort({ createdAt: -1 })
      .select('title type status score createdAt');

    const recentQuestions = await Question.find({ isActive: true })
      .limit(5)
      .sort({ createdAt: -1 })
      .select('text category difficulty experienceLevel createdAt');

    const recentFeedback = await Feedback.find()
      .limit(5)
      .sort({ createdAt: -1 })
      .select('overallScore categoryScores createdAt')
      .populate('interviewId', 'title');

    return NextResponse.json({
      success: true,
      data: {
        summary: {
          users: userCount,
          interviews: interviewCount,
          questions: questionCount,
          feedback: feedbackCount,
        },
        recent: {
          users: recentUsers,
          interviews: recentInterviews,
          questions: recentQuestions,
          feedback: recentFeedback,
        },
      },
    });
  } catch (error) {
    throw new Error(`Failed to fetch all data: ${error instanceof Error ? error.message : 'Unknown error'}`);
  }
} 