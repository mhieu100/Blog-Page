export interface User {
  sub: string // email
  role: 'USER' | 'ADMIN'
  exp: number
}

export interface AuthResponse {
  token: string
  role: string
}

export interface Article {
  id: number
  title: string
  content: string
  imageUrl: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED'
  createdAt: string
  author: {
    name: string
    email: string
  }
}
