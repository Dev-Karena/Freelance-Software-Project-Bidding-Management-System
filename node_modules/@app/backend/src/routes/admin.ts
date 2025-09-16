import { Router, Request, Response } from 'express';
import { User } from '../models/User';
import { Project } from '../models/Project';
import { Transaction } from '../models/Transaction';

const router = Router();

router.get('/stats', async (_req: Request, res: Response) => {
  const [users, projects, txs] = await Promise.all([
    User.countDocuments({}),
    Project.countDocuments({}),
    Transaction.countDocuments({})
  ]);
  res.json({ users, projects, transactions: txs });
});

router.get('/users', async (_req: Request, res: Response) => {
  const list = await User.find({}).select('email role createdAt');
  res.json(list);
});

router.get('/transactions', async (_req: Request, res: Response) => {
  const list = await Transaction.find({}).sort({ createdAt: -1 }).limit(100);
  res.json(list);
});

export default router;


