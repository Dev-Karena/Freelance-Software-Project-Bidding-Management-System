// src/controllers/milestoneController.ts
import mongoose from 'mongoose';
import Wallet from '../models/Wallet';
import Transaction from '../models/Transaction';
import Milestone from '../models/Milestone';

export async function lockMilestoneFunds(clientId: string, milestoneId: string, idempotencyKey: string) {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const milestone = await Milestone.findById(milestoneId).session(session);
    if (!milestone) throw new Error('Milestone not found');

    const wallet = await Wallet.findOne({ owner: milestone.project.client }).session(session);
    if (!wallet || wallet.balance < milestone.amount) throw new Error('Insufficient funds');

    const before = wallet.balance;
    wallet.balance = wallet.balance - milestone.amount;
    wallet.locked += milestone.amount;
    await wallet.save({ session });

    await Transaction.create([{
      wallet: wallet._id,
      type: 'LOCK',
      amount: milestone.amount,
      balanceBefore: before,
      balanceAfter: wallet.balance,
      meta: { milestone: milestone._id },
      idempotencyKey
    }], { session });

    milestone.escrowId = `escrow:${milestone._id}:${Date.now()}`;
    await milestone.save({ session });

    await session.commitTransaction();
    return { success: true, escrowId: milestone.escrowId };
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}
