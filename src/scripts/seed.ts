import mongoose from 'mongoose';
import User from '../models/User';
import Wallet from '../models/Wallet';
import Project from '../models/Project';
import Team from '../models/Team';
import Milestone from '../models/Milestone';

async function seed() {
  await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/devarena');
  await User.deleteMany({});
  await Wallet.deleteMany({});
  await Project.deleteMany({});
  await Team.deleteMany({});
  await Milestone.deleteMany({});

  const client = await User.create({ email: 'client@example.com', passwordHash: 'hash', roles: ['client'], isEmailVerified: true });
  const freelancer1 = await User.create({ email: 'freelancer1@example.com', passwordHash: 'hash', roles: ['freelancer'], isEmailVerified: true });
  const freelancer2 = await User.create({ email: 'freelancer2@example.com', passwordHash: 'hash', roles: ['freelancer'], isEmailVerified: true });

  await Wallet.create([{ owner: client._id, balance: 1000, locked: 0 }, { owner: freelancer1._id, balance: 0, locked: 0 }, { owner: freelancer2._id, balance: 0, locked: 0 }]);

  const project = await Project.create({ client: client._id, title: 'Build landing page', description: '...', requiredSkills: ['react','css'], budgetMin: 100, budgetMax: 500, status: 'OPEN' });

  const team = await Team.create({ project: project._id, leader: freelancer1._id, members: [{ user: freelancer1._id, role: 'dev' }, { user: freelancer2._id, role: 'designer' }], revenueSplits: [{ user: freelancer1._id, percentage: 70 }, { user: freelancer2._id, percentage: 30 }] });

  project.teamId = team._id;
  project.awardedTo = freelancer1._id;
  project.status = 'AWARDED';
  await project.save();

  const milestone = await Milestone.create({ project: project._id, title: 'MVP', amount: 300, assignees: [freelancer1._id, freelancer2._id] });

  console.log('Seed done.');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
