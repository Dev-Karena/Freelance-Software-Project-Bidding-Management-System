import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet, apiPost } from '../shared/api'

type Bid = { _id: string; amount: number; estimatedDays: number; proposalText: string }

export default function ProjectDetail() {
  const { id } = useParams()
  const [bids, setBids] = useState<Bid[]>([])
  const [amount, setAmount] = useState(0)
  const [days, setDays] = useState(1)
  const [text, setText] = useState('')

  useEffect(() => {
    if (id) apiGet<Bid[]>(`/api/bids/project/${id}`).then(setBids)
  }, [id])

  async function submitBid(e: React.FormEvent) {
    e.preventDefault()
    if (!id) return
    await apiPost('/api/bids', { projectId: id, freelancerId: id, amount, estimatedDays: days, proposalText: text })
    const updated = await apiGet<Bid[]>(`/api/bids/project/${id}`)
    setBids(updated)
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Project</h2>
      <h3>Bids</h3>
      <ul>
        {bids.map(b => (
          <li key={b._id}>{b.amount} - {b.estimatedDays}d</li>
        ))}
      </ul>
      <form onSubmit={submitBid}>
        <h4>Place a Bid</h4>
        <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />
        <input type="number" value={days} onChange={e => setDays(Number(e.target.value))} />
        <textarea value={text} onChange={e => setText(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  )
}


