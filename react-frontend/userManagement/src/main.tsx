import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { UserList } from './components/UsersLists.tsx'
// import { UserCard } from './components/userCard.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <UserList/>
  </StrictMode>,
)
