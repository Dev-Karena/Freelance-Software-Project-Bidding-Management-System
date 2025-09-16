import { Router, Request, Response } from 'express';
import { Bid } from '../models/Bid';

const router = Router();

router.post('/', async (req: Request, res: Response) => {
  try {
    const bid = await Bid.create(req.body);
    return res.status(201).json(bid);
  } catch (e) {
    console.error(e);
    return res.status(400).json({ message: 'Failed to create bid' });
  }
});

router.get('/project/:projectId', async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const list = await Bid.find({ projectId }).sort({ createdAt: -1 });
  return res.json(list);
});

export default router;


