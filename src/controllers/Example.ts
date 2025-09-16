export async function releaseMilestone(milestoneId: string, idempotencyKey: string) {
  const session = await mongoose.startSession();
  try {
    session.startTransaction();
    const milestone = await Milestone.findById(milestoneId).populate('project').session(session);
    if (!milestone) throw new Error('Milestone missing');
    const project = milestone.project;
    const clientWallet = await Wallet.findOne({ owner: project.client }).session(session);

    // Reduce locked
    const beforeClientLocked = clientWallet.locked;
    clientWallet.locked -= milestone.amount;
    await clientWallet.save({ session });
    await Transaction.create([{
      wallet: clientWallet._id, type: 'RELEASE', amount: milestone.amount,
      balanceBefore: beforeClientLocked, balanceAfter: clientWallet.locked, meta: { milestoneId }
    }], { session });

    // If project has team, distribute
    if (project.teamId) {
      const team = await Team.findById(project.teamId).session(session);
      for (const split of team.revenueSplits) {
        const memberWallet = await Wallet.findOne({ owner: split.user }).session(session);
        const amount = Math.round((milestone.amount * split.percentage) / 100 * 100) / 100;
        const before = memberWallet.balance;
        memberWallet.balance += amount;
        await memberWallet.save({ session });
        await Transaction.create([{
          wallet: memberWallet._id, type: 'PAYOUT', amount,
          balanceBefore: before, balanceAfter: memberWallet.balance,
          meta: { milestoneId, split: split.percentage }
        }], { session });
      }
    } else {
      // single freelancer
      const freelancer = project.awardedTo; // user id
      const memberWallet = await Wallet.findOne({ owner: freelancer }).session(session);
      const before = memberWallet.balance;
      memberWallet.balance += milestone.amount;
      await memberWallet.save({ session });
      await Transaction.create([{
        wallet: memberWallet._id, type: 'PAYOUT', amount: milestone.amount,
        balanceBefore: before, balanceAfter: memberWallet.balance, meta: { milestoneId }
      }], { session });
    }

    milestone.status = 'PAID';
    await milestone.save({ session });

    await session.commitTransaction();
    return { success: true };
  } catch (err) {
    await session.abortTransaction();
    throw err;
  } finally {
    session.endSession();
  }
}
