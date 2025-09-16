// src/models/Transaction.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface ITransaction extends Document {
  wallet: Types.ObjectId;
  type: 'DEPOSIT'|'LOCK'|'RELEASE'|'PAYOUT'|'REFUND'|'ADMIN_ADJUST';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  meta?: any; // store gateway id, milestoneId, team split details
  idempotencyKey?: string;
  createdAt: Date;
}

const TransactionSchema = new Schema<ITransaction>({
  wallet: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true, index: true },
  type: { type: String, required: true },
  amount: { type: Number, required: true },
  balanceBefore: Number,
  balanceAfter: Number,
  meta: Schema.Types.Mixed,
  idempotencyKey: { type: String, index: true }
}, { timestamps: true });

export default model<ITransaction>('Transaction', TransactionSchema);
