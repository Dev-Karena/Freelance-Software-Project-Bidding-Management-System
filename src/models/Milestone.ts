// src/models/Milestone.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IMilestone extends Document {
  project: Types.ObjectId;
  title: string;
  description: string;
  amount: number;
  dueDate?: Date;
  assignees: Types.ObjectId[]; // user ids
  status: MilestoneStatus;
  escrowId?: string; // reference to escrow record (internal)
  createdAt: Date;
  updatedAt: Date;
}

const MilestoneSchema = new Schema<IMilestone>({
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
  title: String,
  description: String,
  amount: Number,
  dueDate: Date,
  assignees: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  status: { type: String, default: 'CREATED' },
  escrowId: String
}, { timestamps: true });

export default model<IMilestone>('Milestone', MilestoneSchema);
