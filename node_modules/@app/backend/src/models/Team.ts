import { Schema, model, Types } from 'mongoose';

export type TeamRole = 'leader' | 'member';

export interface ITeamMember {
  userId: Types.ObjectId;
  role: TeamRole;
}

export interface ITeam {
  projectId: Types.ObjectId;
  members: ITeamMember[];
  createdAt: Date;
  updatedAt: Date;
}

const teamMemberSchema = new Schema<ITeamMember>(
  {
    userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    role: { type: String, enum: ['leader', 'member'], default: 'member' }
  },
  { _id: false }
);

const teamSchema = new Schema<ITeam>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true, unique: true, index: true },
    members: { type: [teamMemberSchema], default: [] }
  },
  { timestamps: true }
);

export const Team = model<ITeam>('Team', teamSchema);

export interface ITeamInvite {
  projectId: Types.ObjectId;
  inviterId: Types.ObjectId;
  inviteeId: Types.ObjectId;
  status: 'pending' | 'accepted' | 'declined';
  createdAt: Date;
  updatedAt: Date;
}

const teamInviteSchema = new Schema<ITeamInvite>(
  {
    projectId: { type: Schema.Types.ObjectId, ref: 'Project', required: true, index: true },
    inviterId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    inviteeId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['pending', 'accepted', 'declined'], default: 'pending' }
  },
  { timestamps: true }
);

export const TeamInvite = model<ITeamInvite>('TeamInvite', teamInviteSchema);


