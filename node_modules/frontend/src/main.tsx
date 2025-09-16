import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import { RequireAuth } from './shared/RequireAuth'
import Projects from './pages/Projects'
import NewProject from './pages/NewProject'
import ProjectDetail from './pages/ProjectDetail'
import Milestones from './pages/Milestones'
import Chat from './pages/Chat'
import Deposit from './pages/Deposit'
import Team from './pages/Team'

const router = createBrowserRouter([
  { path: '/', element: <RequireAuth><Dashboard /></RequireAuth> },
  { path: '/projects', element: <RequireAuth><Projects /></RequireAuth> },
  { path: '/projects/new', element: <RequireAuth><NewProject /></RequireAuth> },
  { path: '/projects/:id', element: <RequireAuth><ProjectDetail /></RequireAuth> },
  { path: '/projects/:id/milestones', element: <RequireAuth><Milestones /></RequireAuth> },
  { path: '/chat', element: <RequireAuth><Chat /></RequireAuth> },
  { path: '/deposit', element: <RequireAuth><Deposit /></RequireAuth> },
  { path: '/team', element: <RequireAuth><Team /></RequireAuth> },
  { path: '/login', element: <Login /> },
  { path: '/register', element: <Register /> },
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
)
