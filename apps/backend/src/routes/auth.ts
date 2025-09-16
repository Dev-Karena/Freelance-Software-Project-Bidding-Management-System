import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User, IUser, UserRole } from '../models/User';

const router = Router();

function signTokens(user: IUser) {
  const secret = process.env.JWT_SECRET || 'devsecret';
  const accessToken = jwt.sign({ sub: user.email, role: user.role }, secret, { expiresIn: '15m' });
  const refreshToken = jwt.sign({ sub: user.email, type: 'refresh' }, secret, { expiresIn: '7d' });
  return { accessToken, refreshToken };
}

router.post('/register', async (req: Request, res: Response) => {
  try {
    const { email, password, role } = req.body as { email: string; password: string; role: UserRole };
    if (!email || !password || !role) return res.status(400).json({ message: 'Missing fields' });

    const existing = await User.findOne({ email });
    if (existing) return res.status(409).json({ message: 'Email already in use' });

    const passwordHash = await bcrypt.hash(password, 10);
    const user = await User.create({ email, passwordHash, role });
    const tokens = signTokens(user as unknown as IUser);
    return res.status(201).json({ user: { email: user.email, role: user.role }, ...tokens });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return res.status(500).json({ message: 'Registration failed' });
  }
});

router.post('/login', async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body as { email: string; password: string };
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'Invalid credentials' });
    const ok = await bcrypt.compare(password, user.passwordHash);
    if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
    const tokens = signTokens(user as unknown as IUser);
    return res.status(200).json({ user: { email: user.email, role: user.role }, ...tokens });
  } catch (e) {
    // eslint-disable-next-line no-console
    console.error(e);
    return res.status(500).json({ message: 'Login failed' });
  }
});

router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body as { refreshToken: string };
    if (!refreshToken) return res.status(400).json({ message: 'Missing refreshToken' });
    const secret = process.env.JWT_SECRET || 'devsecret';
    const payload = jwt.verify(refreshToken, secret) as any;
    if (payload.type !== 'refresh') return res.status(401).json({ message: 'Invalid token' });
    const user = await User.findOne({ email: payload.sub });
    if (!user) return res.status(401).json({ message: 'Invalid token' });
    const tokens = signTokens(user as unknown as IUser);
    return res.status(200).json(tokens);
  } catch (e) {
    return res.status(401).json({ message: 'Invalid token' });
  }
});

export default router;


