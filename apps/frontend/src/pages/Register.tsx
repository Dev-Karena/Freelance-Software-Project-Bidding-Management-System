import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'

export default function Register() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('client')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role })
      })
      if (!res.ok) throw new Error('Registration failed')
      navigate('/login')
    } catch (err: any) {
      setError(err.message || 'Registration failed')
    }
  }

  return (
    <div style={{ maxWidth: 420, margin: '40px auto' }}>
      <h2>Register</h2>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <form onSubmit={onSubmit}>
        <div>
          <label>Email</label>
          <input value={email} onChange={e => setEmail(e.target.value)} type="email" required />
        </div>
        <div>
          <label>Password</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" required />
        </div>
        <div>
          <label>Role</label>
          <select value={role} onChange={e => setRole(e.target.value)}>
            <option value="client">Client</option>
            <option value="freelancer">Freelancer</option>
          </select>
        </div>
        <button type="submit">Create account</button>
      </form>
      <p>Have an account? <Link to="/login">Login</Link></p>
    </div>
  )
}


