import { Schema, model, Types } from 'mongoose';

export type TransactionType = 'deposit' | 'escrow_lock' | 'release' | 'refund' | 'payout_split';
export type TransactionStatus = 'pending' | 'completed' | 'failed';

export interface ITransaction {
  walletId: Types.ObjectId;
  amountCents: number;
  currency: string;
  type: TransactionType;
  status: TransactionStatus;
  referenceId?: string; // stripe paymentIntent id etc
  metadata?: Record<string, unknown>;
  createdAt: Date;
  updatedAt: Date;
}

const transactionSchema = new Schema<ITransaction>(
  {
    walletId: { type: Schema.Types.ObjectId, ref: 'Wallet', required: true, index: true },
    amountCents: { type: Number, required: true },
    currency: { type: String, default: 'usd' },
    type: { type: String, enum: ['deposit', 'escrow_lock', 'release', 'refund', 'payout_split'], required: true },
    status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
    referenceId: { type: String },
    metadata: { type: Object }
  },
  { timestamps: true }
);

export const Transaction = model<ITransaction>('Transaction', transactionSchema);


