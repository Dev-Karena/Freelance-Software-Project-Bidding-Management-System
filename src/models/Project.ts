// src/models/Project.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IProject extends Document {
  client: Types.ObjectId;
  title: string;
  description: string;
  requiredSkills: string[];
  budgetMin?: number;
  budgetMax?: number;
  fixedBudget?: number;
  deadline?: Date;
  attachments: { filename: string; url: string }[];
  createdAt: Date;
  status: 'OPEN'|'AWARDED'|'IN_PROGRESS'|'COMPLETED'|'CANCELLED';
  awardedTo?: Types.ObjectId; // team or freelancer id
  teamId?: Types.ObjectId;
}

const ProjectSchema = new Schema<IProject>({
  client: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
  title: String,
  description: String,
  requiredSkills: [String],
  budgetMin: Number,
  budgetMax: Number,
  fixedBudget: Number,
  deadline: Date,
  attachments: [{ filename: String, url: String }],
  status: { type: String, default: 'OPEN' },
  awardedTo: { type: Schema.Types.ObjectId },
  teamId: { type: Schema.Types.ObjectId, ref: 'Team' }
}, { timestamps: true });

ProjectSchema.index({ title: 'text', description: 'text', requiredSkills: 'text' });

export default model<IProject>('Project', ProjectSchema);
