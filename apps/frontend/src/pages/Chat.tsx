import { useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'

export default function Chat() {
  const [socket, setSocket] = useState<Socket | null>(null)
  const [roomId, setRoomId] = useState('room1')
  const [text, setText] = useState('')
  const [messages, setMessages] = useState<{ senderId: string, text: string, ts: number }[]>([])

  useEffect(() => {
    const base = (import.meta.env.VITE_API_URL || 'http://localhost:4010').replace(/\/$/, '')
    const s = io(base + '/chat')
    setSocket(s)
    s.emit('joinRoom', roomId)
    s.on('message', (msg) => setMessages(m => [...m, msg]))
    return () => { s.close() }
  }, [roomId])

  function send() {
    socket?.emit('message', { roomId, text })
    setText('')
  }

  return (
    <div style={{ padding: 24 }}>
      <h2>Chat</h2>
      <input value={roomId} onChange={e => setRoomId(e.target.value)} />
      <div style={{ border: '1px solid #ccc', height: 200, overflow: 'auto', margin: '8px 0', padding: 8 }}>
        {messages.map((m, i) => (
          <div key={i}>{new Date(m.ts).toLocaleTimeString()} - {m.senderId}: {m.text}</div>
        ))}
      </div>
      <input value={text} onChange={e => setText(e.target.value)} />
      <button onClick={send}>Send</button>
    </div>
  )
}


