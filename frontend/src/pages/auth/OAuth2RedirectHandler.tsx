import { useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { useAuth } from '../../context/useAuth'

const OAuth2RedirectHandler = () => {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { login } = useAuth()

  useEffect(() => {
    const token = searchParams.get('token')
    const role = searchParams.get('role')

    if (token && role) {
      login(token, role)
      if (role === 'ADMIN') {
        navigate('/admin')
      } else {
        navigate('/')
      }
    } else {
      navigate('/login')
    }
  }, [searchParams, login, navigate])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
    </div>
  )
}

export default OAuth2RedirectHandler
