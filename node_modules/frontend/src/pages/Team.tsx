import { useEffect, useState } from 'react'
import { apiGet, apiPost } from '../shared/api'

type Member = { userId: string; role: string }

export default function Team() {
  const [projectId, setProjectId] = useState('')
  const [inviteeId, setInviteeId] = useState('')
  const [inviterId, setInviterId] = useState('')
  const [members, setMembers] = useState<Member[]>([])

  async function load() {
    if (!projectId) return
    const list = await apiGet<Member[]>(`/api/team/members/${projectId}`)
    setMembers(list)
  }

  useEffect(() => {
    load().catch(console.error)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId])

  async function sendInvite(e: React.FormEvent) {
    e.preventDefault()
    await apiPost('/api/team/invite', { projectId, inviterId, inviteeId })
    alert('Invite sent (test)')
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Team</h2>
      <div>
        <label>Project ID</label>
        <input value={projectId} onChange={e => setProjectId(e.target.value)} />
        <button onClick={load}>Load Members</button>
      </div>
      <ul>
        {members.map((m, i) => (
          <li key={i}>{m.userId} - {m.role}</li>
        ))}
      </ul>
      <h3>Invite Member</h3>
      <form onSubmit={sendInvite}>
        <div>
          <label>Inviter User ID</label>
          <input value={inviterId} onChange={e => setInviterId(e.target.value)} />
        </div>
        <div>
          <label>Invitee User ID</label>
          <input value={inviteeId} onChange={e => setInviteeId(e.target.value)} />
        </div>
        <button type="submit">Send Invite</button>
      </form>
    </div>
  )
}


