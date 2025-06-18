import mongoose, { Schema, Document } from 'mongoose';

export interface IInterview extends Document {
  userId: string;
  clerkId: string;
  title: string;
  type: 'technical' | 'behavioral' | 'mixed';
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  technologies: string[];
  status: 'pending' | 'in-progress' | 'completed' | 'cancelled';
  duration: number; // in minutes
  totalQuestions: number;
  completedQuestions: number;
  score?: number; // overall score out of 100
  transcript: Array<{
    speaker: 'user' | 'ai';
    message: string;
    timestamp: Date;
  }>;
  feedbackId?: mongoose.Types.ObjectId;
  startedAt?: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const InterviewSchema: Schema = new Schema({
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
  title: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    enum: ['technical', 'behavioral', 'mixed'],
    required: true,
  },
  experienceLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
  },
  technologies: [{
    type: String,
  }],
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed', 'cancelled'],
    default: 'pending',
  },
  duration: {
    type: Number,
    default: 30, // 30 minutes default
  },
  totalQuestions: {
    type: Number,
    default: 0,
  },
  completedQuestions: {
    type: Number,
    default: 0,
  },
  score: {
    type: Number,
    min: 0,
    max: 100,
  },
  transcript: [{
    speaker: {
      type: String,
      enum: ['user', 'ai'],
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now,
    },
  }],
  feedbackId: {
    type: Schema.Types.ObjectId,
    ref: 'Feedback',
  },
  startedAt: {
    type: Date,
  },
  completedAt: {
    type: Date,
  },
}, {
  timestamps: true,
});

// Indexes for better query performance
InterviewSchema.index({ userId: 1, createdAt: -1 });
InterviewSchema.index({ status: 1, createdAt: -1 });

export default mongoose.models.Interview || mongoose.model<IInterview>('Interview', InterviewSchema); 