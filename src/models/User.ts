import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  clerkId: string;
  email: string;
  firstName: string;
  lastName: string;
  profileImage?: string;
  experienceLevel: 'beginner' | 'intermediate' | 'advanced';
  preferredTechnologies: string[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  clerkId: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  profileImage: {
    type: String,
  },
  experienceLevel: {
    type: String,
    enum: ['beginner', 'intermediate', 'advanced'],
    default: 'beginner',
  },
  preferredTechnologies: [{
    type: String,
  }],
}, {
  timestamps: true,
});

// Prevent multiple model initialization in development
export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema); 