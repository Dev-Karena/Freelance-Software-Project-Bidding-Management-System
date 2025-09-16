// src/models/User.ts
import { Schema, model, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  passwordHash: string;
  roles: Role[];
  isEmailVerified: boolean;
  phone?: string;
  isPhoneVerified?: boolean;
  oauthProviders?: { provider: string; providerId: string }[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>({
  email: { type: String, required: true, unique: true, index: true },
  passwordHash: { type: String, required: true },
  roles: { type: [String], default: ['freelancer'] },
  isEmailVerified: { type: Boolean, default: false },
  phone: { type: String },
  isPhoneVerified: { type: Boolean, default: false },
  oauthProviders: [{ provider: String, providerId: String }],
}, { timestamps: true });

export default model<IUser>('User', UserSchema);
