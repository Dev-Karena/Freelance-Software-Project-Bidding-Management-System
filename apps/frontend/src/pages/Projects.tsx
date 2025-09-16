import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { apiGet } from '../shared/api'

type Project = {
  _id: string
  title: string
  description: string
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  useEffect(() => {
    apiGet<Project[]>('/api/projects').then(setProjects).catch(console.error)
  }, [])

  return (
    <div style={{ padding: 24 }}>
      <h2>Projects</h2>
      <Link to="/projects/new">Post Project</Link>
      <ul>
        {projects.map(p => (
          <li key={p._id}>
            <Link to={`/projects/${p._id}`}>{p.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  )
}


