// src/models/Profile.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IFreelancerProfile extends Document {
  user: Types.ObjectId;
  displayName: string;
  skills: string[]; // indexed text
  hourlyRate?: number;
  portfolio: { type: string; url: string }[];
  experienceYears?: number;
  badges: string[];
  verification: { kyc: boolean; idVerified: boolean; level: number };
  rating: number;
  reviewsCount: number;
  public: boolean;
}

const FreelancerSchema = new Schema<IFreelancerProfile>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  displayName: String,
  skills: [String],
  hourlyRate: Number,
  portfolio: [{ type: { type: String }, url: String }],
  experienceYears: Number,
  badges: [String],
  verification: { kyc: { type: Boolean, default: false }, idVerified: { type: Boolean, default: false }, level: { type: Number, default: 0 } },
  rating: { type: Number, default: 0 },
  reviewsCount: { type: Number, default: 0 },
  public: { type: Boolean, default: true }
}, { timestamps: true });

export default model<IFreelancerProfile>('FreelancerProfile', FreelancerSchema);
