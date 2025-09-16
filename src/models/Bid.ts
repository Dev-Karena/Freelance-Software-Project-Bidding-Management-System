// src/models/Bid.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IBid extends Document {
  project: Types.ObjectId;
  freelancer: Types.ObjectId;
  amount: number;
  estimatedDays?: number;
  proposalText: string;
  attachments: { filename: string; url: string }[];
  createdAt: Date;
  status: 'ACTIVE'|'WITHDRAWN'|'REJECTED'|'ACCEPTED';
}

const BidSchema = new Schema<IBid>({
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
  freelancer: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: Number,
  estimatedDays: Number,
  proposalText: String,
  attachments: [{ filename: String, url: String }],
  status: { type: String, default: 'ACTIVE' }
}, { timestamps: true });

export default model<IBid>('Bid', BidSchema);
