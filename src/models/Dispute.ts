// src/models/Dispute.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IDispute extends Document {
  milestone: Types.ObjectId;
  project: Types.ObjectId;
  raisedBy: Types.ObjectId;
  reason: string;
  evidence: { filename: string; url: string }[];
  status: 'OPEN'|'UNDER_REVIEW'|'RESOLVED'|'CLOSED';
  resolution?: { action: 'REFUND'|'PARTIAL'|'RELEASE'|'MANUAL'; notes?: string; amount?: number };
  adminNotes?: string;
  createdAt: Date;
}

const DisputeSchema = new Schema<IDispute>({
  milestone: { type: Schema.Types.ObjectId, ref: 'Milestone' },
  project: { type: Schema.Types.ObjectId, ref: 'Project' },
  raisedBy: { type: Schema.Types.ObjectId, ref: 'User' },
  reason: String,
  evidence: [{ filename: String, url: String }],
  status: { type: String, default: 'OPEN' }
}, { timestamps: true });

export default model<IDispute>('Dispute', DisputeSchema);
