import { Schema, model, Types } from 'mongoose';

export interface IBid {
  projectId: Types.ObjectId;
  freelancerId: Types.ObjectId;
  amount: number;
  estimatedDays: number;
  proposalText: string;
  attachments: string[];
  createdAt: Date;
  updatedAt: Date;
}

const bidSchema = new Schema<IBid>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    freelancerId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    amount: { type: Number, required: true },
    estimatedDays: { type: Number, required: true },
    proposalText: { type: String, required: true },
    attachments: { type: [String], default: [] }
  },
  { timestamps: true }
);

export const Bid = model<IBid>('Bid', bidSchema);


