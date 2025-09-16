import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { User } from '../models/User';
import { Project } from '../models/Project';

dotenv.config();

async function run() {
	const uri = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/freelance';
	await mongoose.connect(uri);

	await User.deleteMany({ email: { $in: ['client@test.com', 'freelancer@test.com'] } });
	const client = await User.create({ email: 'client@test.com', passwordHash: 'x', role: 'client' });
	const freelancer = await User.create({ email: 'freelancer@test.com', passwordHash: 'y', role: 'freelancer' });

	const project = await Project.create({
		clientId: client._id,
		title: 'Demo Project',
		description: 'Build something awesome',
		requiredSkills: ['ts', 'react']
	});

	console.log('Seeded:', { client: client.email, freelancer: freelancer.email, project: project.title });
	await mongoose.disconnect();
}

run().catch((e) => { console.error(e); process.exit(1); });
