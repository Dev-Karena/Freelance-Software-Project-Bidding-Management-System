import { useState } from 'react'
import { apiPost } from '../shared/api'

export default function Deposit() {
  const [walletId, setWalletId] = useState('')
  const [amount, setAmount] = useState(1000)
  const [clientSecret, setClientSecret] = useState('')

  async function createIntent(e: React.FormEvent) {
    e.preventDefault()
    const res = await apiPost<{ clientSecret: string }>(
      '/api/wallet/deposit-intent',
      { walletId, amountCents: amount, currency: 'usd' }
    )
    setClientSecret(res.clientSecret)
    alert('PaymentIntent created (test). Client secret received.')
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Deposit (Test)</h2>
      <form onSubmit={createIntent}>
        <div>
          <label>Wallet ID</label>
          <input value={walletId} onChange={e => setWalletId(e.target.value)} required />
        </div>
        <div>
          <label>Amount (cents)</label>
          <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />
        </div>
        <button type="submit">Create PaymentIntent</button>
      </form>
      {clientSecret && <p>Client Secret: {clientSecret}</p>}
    </div>
  )
}


