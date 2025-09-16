import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { apiGet, apiPost } from '../shared/api'

type Milestone = { _id: string; title: string; amount: number; status: string }

export default function Milestones() {
  const { id } = useParams()
  const [list, setList] = useState<Milestone[]>([])
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState(0)

  useEffect(() => {
    if (id) apiGet<Milestone[]>(`/api/milestones/project/${id}`).then(setList)
  }, [id])

  async function addMilestone(e: React.FormEvent) {
    e.preventDefault()
    if (!id) return
    await apiPost('/api/milestones', { projectId: id, title, description: title, amount })
    const updated = await apiGet<Milestone[]>(`/api/milestones/project/${id}`)
    setList(updated)
  }

  return (
    <div style={{ padding: 24 }}>
      <h3>Milestones</h3>
      <ul>
        {list.map(m => (
          <li key={m._id}>{m.title} - ${m.amount} - {m.status}</li>
        ))}
      </ul>
      <form onSubmit={addMilestone}>
        <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Title" />
        <input type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} placeholder="Amount" />
        <button type="submit">Add</button>
      </form>
    </div>
  )
}


