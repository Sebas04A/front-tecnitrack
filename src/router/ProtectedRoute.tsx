// src/router/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const ProtectedRoute = () => {
    const { user, loading } = useAuth()
    console.log('ProtectedRoute user:', user)
    if (loading) return <div>Loading...</div>
    return user ? <Outlet /> : <Navigate to='/login' replace />
}

export default ProtectedRoute
