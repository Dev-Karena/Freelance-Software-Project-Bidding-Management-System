import { Router, Request, Response } from 'express';
import { Project } from '../models/Project';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const project = await Project.create(req.body);
    return res.status(201).json(project);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: 'Failed to create project' });
  }
});

router.get('/', async (_req: Request, res: Response) => {
  const list = await Project.find({}).sort({ createdAt: -1 }).limit(50);
  return res.json(list);
});

export default router;


