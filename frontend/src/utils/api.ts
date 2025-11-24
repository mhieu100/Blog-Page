import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
    console.log('Request to:', config.url, 'with token:', `${token.substring(0, 20)}...`)
  } else {
    console.log('Request to:', config.url, 'without token')
  }
  return config
})

export default api
