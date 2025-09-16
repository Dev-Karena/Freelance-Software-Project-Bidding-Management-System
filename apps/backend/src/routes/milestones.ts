import { Router, Request, Response } from 'express';
import { Milestone } from '../models/Milestone';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const m = await Milestone.create(req.body);
    return res.status(201).json(m);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: 'Failed to create milestone' });
  }
});

router.get('/project/:projectId', async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const list = await Milestone.find({ projectId }).sort({ createdAt: 1 });
  return res.json(list);
});

router.post('/:id/status', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body as { status: string };
  const m = await Milestone.findByIdAndUpdate(id, { status }, { new: true });
  return res.json(m);
});

export default router;


