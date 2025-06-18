import mongoose, { Schema, Document } from 'mongoose';

export interface IFeedback extends Document {
  interviewId: mongoose.Types.ObjectId;
  userId: string;
  clerkId: string;
  overallScore: number; // 0-100
  categoryScores: {
    technicalKnowledge: number;
    communication: number;
    problemSolving: number;
    confidence: number;
    timeManagement: number;
  };
  strengths: string[];
  areasForImprovement: string[];
  detailedFeedback: {
    technicalKnowledge: {
      score: number;
      comments: string;
      suggestions: string[];
    };
    communication: {
      score: number;
      comments: string;
      suggestions: string[];
    };
    problemSolving: {
      score: number;
      comments: string;
      suggestions: string[];
    };
    confidence: {
      score: number;
      comments: string;
      suggestions: string[];
    };
    timeManagement: {
      score: number;
      comments: string;
      suggestions: string[];
    };
  };
  aiRecommendations: {
    nextSteps: string[];
    resources: Array<{
      title: string;
      url: string;
      type: 'article' | 'video' | 'course' | 'practice';
    }>;
    practiceAreas: string[];
  };
  generatedAt: Date;
  createdAt: Date;
  updatedAt: Date;
}

const FeedbackSchema: Schema = new Schema({
  interviewId: {
    type: Schema.Types.ObjectId,
    ref: 'Interview',
    required: true,
    index: true,
  },
  userId: {
    type: String,
    required: true,
    index: true,
  },
  clerkId: {
    type: String,
    required: true,
    index: true,
  },
  overallScore: {
    type: Number,
    required: true,
    min: 0,
    max: 100,
  },
  categoryScores: {
    technicalKnowledge: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    communication: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    problemSolving: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    confidence: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
    timeManagement: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
    },
  },
  strengths: [{
    type: String,
  }],
  areasForImprovement: [{
    type: String,
  }],
  detailedFeedback: {
    technicalKnowledge: {
      score: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      comments: {
        type: String,
        required: true,
      },
      suggestions: [{
        type: String,
      }],
    },
    communication: {
      score: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      comments: {
        type: String,
        required: true,
      },
      suggestions: [{
        type: String,
      }],
    },
    problemSolving: {
      score: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      comments: {
        type: String,
        required: true,
      },
      suggestions: [{
        type: String,
      }],
    },
    confidence: {
      score: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      comments: {
        type: String,
        required: true,
      },
      suggestions: [{
        type: String,
      }],
    },
    timeManagement: {
      score: {
        type: Number,
        required: true,
        min: 0,
        max: 100,
      },
      comments: {
        type: String,
        required: true,
      },
      suggestions: [{
        type: String,
      }],
    },
  },
  aiRecommendations: {
    nextSteps: [{
      type: String,
    }],
    resources: [{
      title: {
        type: String,
        required: true,
      },
      url: {
        type: String,
        required: true,
      },
      type: {
        type: String,
        enum: ['article', 'video', 'course', 'practice'],
        required: true,
      },
    }],
    practiceAreas: [{
      type: String,
    }],
  },
  generatedAt: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
FeedbackSchema.index({ userId: 1, createdAt: -1 });
FeedbackSchema.index({ interviewId: 1 });

export default mongoose.models.Feedback || mongoose.model<IFeedback>('Feedback', FeedbackSchema); 