import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { apiPost } from '../shared/api'

export default function NewProject() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const navigate = useNavigate()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    await apiPost('/api/projects', { title, description })
    navigate('/projects')
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Post Project</h2>
      <form onSubmit={onSubmit}>
        <div>
          <label>Title</label>
          <input value={title} onChange={e => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Description</label>
          <textarea value={description} onChange={e => setDescription(e.target.value)} required />
        </div>
        <button type="submit">Create</button>
      </form>
    </div>
  )
}


