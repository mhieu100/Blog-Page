import type React from 'react'
import { ClipLoader } from 'react-spinners'

interface SpinnerProps {
  size?: number
  color?: string
  loading?: boolean
  className?: string
}

const Spinner: React.FC<SpinnerProps> = ({
  size = 20,
  color = '#2563eb',
  loading = true,
  className = '',
}) => {
  return (
    <div className={`inline-flex items-center justify-center ${className}`}>
      <ClipLoader size={size} color={color} loading={loading} />
    </div>
  )
}

export default Spinner
