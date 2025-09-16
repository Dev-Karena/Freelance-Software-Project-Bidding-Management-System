const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4010'

export async function apiGet<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    headers: authHeaders()
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

export async function apiPost<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify(body)
  })
  if (!res.ok) throw new Error(await res.text())
  return res.json()
}

function authHeaders() {
  const token = localStorage.getItem('accessToken')
  return token ? { Authorization: `Bearer ${token}` } : {}
}


