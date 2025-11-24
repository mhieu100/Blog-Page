import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/useAuth'

const GuestRoute = () => {
  const { isAuthenticated } = useAuth()

  if (isAuthenticated) {
    return <Navigate to="/" replace />
  }

  return <Outlet />
}

export default GuestRoute
