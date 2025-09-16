import { Router, Request, Response } from 'express';
import Stripe from 'stripe';
import { Wallet } from '../models/Wallet';
import { Transaction } from '../models/Transaction';

const router = Router();

const stripeSecret = process.env.STRIPE_SECRET_KEY || 'sk_test_123';
const stripe = new Stripe(stripeSecret);

router.post('/create-wallet', async (req: Request, res: Response) => {
  const { userId } = req.body as { userId: string };
  const existing = await Wallet.findOne({ userId });
  if (existing) return res.json(existing);
  const w = await Wallet.create({ userId, balanceCents: 0, currency: 'usd' });
  return res.status(201).json(w);
});

router.post('/deposit-intent', async (req: Request, res: Response) => {
  const { walletId, amountCents, currency } = req.body as { walletId: string; amountCents: number; currency?: string };
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountCents,
    currency: currency || 'usd',
    automatic_payment_methods: { enabled: true }
  });
  const tx = await Transaction.create({
    walletId,
    amountCents,
    currency: currency || 'usd',
    type: 'deposit',
    status: 'pending',
    referenceId: paymentIntent.id
  });
  return res.json({ clientSecret: paymentIntent.client_secret, transactionId: tx._id });
});

export async function webhookHandler(req: Request, res: Response) {
  try {
    const event = JSON.parse((req as any).body?.toString?.() || '{}') as Stripe.Event;
    if (event.type === 'payment_intent.succeeded') {
      const pi = event.data.object as Stripe.PaymentIntent;
      const tx = await Transaction.findOne({ referenceId: pi.id });
      if (tx && tx.status !== 'completed') {
        tx.status = 'completed';
        await tx.save();
        const wallet = await Wallet.findById(tx.walletId);
        if (wallet) {
          wallet.balanceCents += tx.amountCents;
          await wallet.save();
        }
      }
    }
    res.json({ received: true });
  } catch (e) {
    console.error('Webhook error', e);
    res.status(400).send('Webhook error');
  }
}

export default router;


