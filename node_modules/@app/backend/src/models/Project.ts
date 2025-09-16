import { Schema, model, Types } from 'mongoose';

export interface IProject {
  clientId: Types.ObjectId;
  title: string;
  description: string;
  requiredSkills: string[];
  budgetMin?: number;
  budgetMax?: number;
  fixedBudget?: number;
  deadline?: Date;
  files: string[];
  assignedFreelancerId?: Types.ObjectId;
  teamMemberIds: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const projectSchema = new Schema<IProject>(
  {
    clientId: { type: Schema.Types.ObjectId, ref: 'User', required: true, index: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
    requiredSkills: { type: [String], default: [] },
    budgetMin: { type: Number },
    budgetMax: { type: Number },
    fixedBudget: { type: Number },
    deadline: { type: Date },
    files: { type: [String], default: [] },
    assignedFreelancerId: { type: Schema.Types.ObjectId, ref: 'User' },
    teamMemberIds: { type: [Schema.Types.ObjectId], ref: 'User', default: [] }
  },
  { timestamps: true }
);

export const Project = model<IProject>('Project', projectSchema);


