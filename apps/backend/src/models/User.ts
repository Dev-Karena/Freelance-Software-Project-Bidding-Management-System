import { Schema, model } from 'mongoose';

export type UserRole = 'client' | 'freelancer' | 'admin';

export interface IUser {
  email: string;
  passwordHash: string;
  role: UserRole;
  isEmailVerified: boolean;
  phone?: string;
  isPhoneVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true, index: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ['client', 'freelancer', 'admin'], required: true },
    isEmailVerified: { type: Boolean, default: false },
    phone: { type: String },
    isPhoneVerified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

export const User = model<IUser>('User', userSchema);


