import { Schema, model, Types } from 'mongoose';

export interface IWallet {
  userId: Types.ObjectId;
  balanceCents: number;
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

const walletSchema = new Schema<IWallet>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
    balanceCents: { type: Number, default: 0 },
    currency: { type: String, default: 'usd' }
  },
  { timestamps: true }
);

export const Wallet = model<IWallet>('Wallet', walletSchema);


