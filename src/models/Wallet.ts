// src/models/Wallet.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface IWallet extends Document {
  owner: Types.ObjectId; // user id
  balance: number; // available
  locked: number; // locked in escrow
  currency: string;
  createdAt: Date;
  updatedAt: Date;
}

const WalletSchema = new Schema<IWallet>({
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true },
  balance: { type: Number, default: 0 },
  locked: { type: Number, default: 0 },
  currency: { type: String, default: 'USD' }
}, { timestamps: true });

export default model<IWallet>('Wallet', WalletSchema);
