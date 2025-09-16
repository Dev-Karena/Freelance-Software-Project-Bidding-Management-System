import { Schema, model, Types } from 'mongoose';

export type MilestoneStatus =
  | 'created'
  | 'in_progress'
  | 'submitted'
  | 'approved'
  | 'paid'
  | 'rejected';

export interface IRevenueSplitEntry {
  userId: Types.ObjectId;
  percent: number; // 0-100
}

export interface IMilestone {
  projectId: Types.ObjectId;
  title: string;
  description: string;
  amount: number;
  dueDate?: Date;
  assigneeIds: Types.ObjectId[];
  status: MilestoneStatus;
  attachments: string[];
  comments: string[];
  revenueSplit: IRevenueSplitEntry[];
  escrowLocked: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const revenueSplitSchema = new Schema<IRevenueSplitEntry>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    percent: { type: Number, required: true, min: 0, max: 100 }
  },
  { _id: false }
);

const milestoneSchema = new Schema<IMilestone>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    amount: { type: Number, required: true, min: 0 },
    dueDate: { type: Date },
    assigneeIds: { type: [Schema.Types.ObjectId], ref: 'User', default: [] },
    status: {
      type: String,
      enum: ['created', 'in_progress', 'submitted', 'approved', 'paid', 'rejected'],
      default: 'created'
    },
    attachments: { type: [String], default: [] },
    comments: { type: [String], default: [] },
    revenueSplit: { type: [revenueSplitSchema], default: [] },
    escrowLocked: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const Milestone = model<IMilestone>('Milestone', milestoneSchema);


