// src/models/Team.ts
import { Schema, model, Document, Types } from 'mongoose';

export interface ITeam extends Document {
  project: Types.ObjectId;
  leader: Types.ObjectId; // user id
  members: { user: Types.ObjectId; role: string; joinedAt?: Date }[];
  revenueSplits: { user: Types.ObjectId; percentage: number }[]; // sums to 100
}
const TeamSchema = new Schema<ITeam>({
  project: { type: Schema.Types.ObjectId, ref: 'Project', required: true, unique: true },
  leader: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  members: [{ user: { type: Schema.Types.ObjectId, ref: 'User' }, role: String, joinedAt: Date }],
  revenueSplits: [{ user: { type: Schema.Types.ObjectId, ref: 'User' }, percentage: Number }]
}, { timestamps: true });

export default model<ITeam>('Team', TeamSchema);
