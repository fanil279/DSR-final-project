import { Navigate } from 'react-router-dom'
import { useAppSelector } from '../hooks/redux'

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const token = useAppSelector(
    (state) => state.auth.token
  )

  if (!token) {
    return <Navigate to="/login" />
  }

  return <>{children}</>
}
