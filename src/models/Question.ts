import mongoose, { Schema, Document } from 'mongoose';

export interface IQuestion extends Document {
  text: string;
  category: 'technical' | 'behavioral' | 'system-design' | 'algorithms' | 'frontend' | 'backend' | 'devops';
  subcategory: string; // e.g., 'react', 'nodejs', 'leadership', 'conflict-resolution'
  difficulty: 'easy' | 'medium' | 'hard' | 'expert';
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  technologies: string[]; // e.g., ['javascript', 'react', 'nodejs']
  type: 'multiple-choice' | 'open-ended' | 'coding' | 'scenario' | 'whiteboard';
  expectedAnswer?: string;
  sampleAnswers?: string[];
  hints?: string[];
  timeLimit?: number; // in minutes
  points: number; // scoring weight
  tags: string[];
  isActive: boolean;
  usageCount: number;
  averageRating?: number;
  createdBy: 'ai' | 'admin' | 'user';
  aiGenerated: boolean;
  metadata?: {
    model?: string; // AI model used to generate
    prompt?: string; // Original prompt used
    temperature?: number; // AI generation temperature
  };
  createdAt: Date;
  updatedAt: Date;
}

const QuestionSchema: Schema = new Schema({
  text: {
    type: String,
    required: true,
    index: true, // For text search
  },
  category: {
    type: String,
    enum: ['technical', 'behavioral', 'system-design', 'algorithms', 'frontend', 'backend', 'devops'],
    required: true,
    index: true,
  },
  subcategory: {
    type: String,
    required: true,
    index: true,
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard', 'expert'],
    required: true,
    index: true,
  },
  experienceLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    required: true,
    index: true,
  },
  technologies: [{
    type: String,
    index: true,
  }],
  type: {
    type: String,
    enum: ['multiple-choice', 'open-ended', 'coding', 'scenario', 'whiteboard'],
    required: true,
  },
  expectedAnswer: {
    type: String,
  },
  sampleAnswers: [{
    type: String,
  }],
  hints: [{
    type: String,
  }],
  timeLimit: {
    type: Number,
    default: 5, // 5 minutes default
  },
  points: {
    type: Number,
    default: 10,
    min: 1,
    max: 100,
  },
  tags: [{
    type: String,
    index: true,
  }],
  isActive: {
    type: Boolean,
    default: true,
    index: true,
  },
  usageCount: {
    type: Number,
    default: 0,
  },
  averageRating: {
    type: Number,
    min: 0,
    max: 5,
  },
  createdBy: {
    type: String,
    enum: ['ai', 'admin', 'user'],
    default: 'ai',
  },
  aiGenerated: {
    type: Boolean,
    default: true,
  },
  metadata: {
    model: String,
    prompt: String,
    temperature: Number,
  },
}, {
  timestamps: true,
});

// Compound indexes for better query performance
QuestionSchema.index({ category: 1, difficulty: 1, experienceLevel: 1 });
QuestionSchema.index({ technologies: 1, category: 1 });
QuestionSchema.index({ isActive: 1, category: 1, difficulty: 1 });

// Text index for search functionality
QuestionSchema.index({ text: 'text', tags: 'text' });

export default mongoose.models.Question || mongoose.model<IQuestion>('Question', QuestionSchema); 