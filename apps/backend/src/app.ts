import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import authRouter from './routes/auth';
import projectsRouter from './routes/projects';
import bidsRouter from './routes/bids';
import milestonesRouter from './routes/milestones';
import walletRouter, { webhookHandler } from './routes/wallet';
import teamRouter from './routes/team';
import adminRouter from './routes/admin';
import { setupSwagger } from './docs/swagger';

export function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: '*', credentials: true }));
  app.use(express.json({ limit: '2mb' }));
  app.use(morgan('dev'));

  app.get('/health', (_req: Request, res: Response) => {
    res.status(200).json({ status: 'ok' });
  });

  app.use('/api/auth', authRouter);
  app.use('/api/projects', projectsRouter);
  app.use('/api/bids', bidsRouter);
  app.use('/api/milestones', milestonesRouter);
  app.use('/api/wallet', walletRouter);
  app.use('/api/team', teamRouter);
  app.use('/api/admin', adminRouter);
  // Stripe webhook must use raw body
  app.post('/api/wallet/webhook', express.raw({ type: 'application/json' }), webhookHandler);

  setupSwagger(app);

  // Global error handler
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error' });
  });

  return app;
}


