import { Router, Request, Response } from 'express';
import { Team, TeamInvite } from '../models/Team';

const router = Router();

router.post('/invite', async (req: Request, res: Response) => {
  const { projectId, inviterId, inviteeId } = req.body;
  const inv = await TeamInvite.create({ projectId, inviterId, inviteeId });
  res.status(201).json(inv);
});

router.post('/invite/:id/accept', async (req: Request, res: Response) => {
  const { id } = req.params;
  const inv = await TeamInvite.findByIdAndUpdate(id, { status: 'accepted' }, { new: true });
  if (!inv) return res.status(404).json({ message: 'Invite not found' });
  const team = await Team.findOneAndUpdate(
    { projectId: inv.projectId },
    { $addToSet: { members: { userId: inv.inviteeId, role: 'member' } } },
    { new: true, upsert: true }
  );
  res.json({ invite: inv, team });
});

router.post('/invite/:id/decline', async (req: Request, res: Response) => {
  const { id } = req.params;
  const inv = await TeamInvite.findByIdAndUpdate(id, { status: 'declined' }, { new: true });
  if (!inv) return res.status(404).json({ message: 'Invite not found' });
  res.json(inv);
});

router.get('/members/:projectId', async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const team = await Team.findOne({ projectId });
  res.json(team?.members || []);
});

export default router;


