import { ReactNode, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export function RequireAuth({ children }: { children: ReactNode }) {
  const navigate = useNavigate()
  useEffect(() => {
    const token = localStorage.getItem('accessToken')
    if (!token) navigate('/login')
  }, [navigate])
  return <>{children}</>
}


