// src/router/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const ProtectedRoute = ({ requiredRol }: { requiredRol: string }) => {
    const { user, loading } = useAuth()
    if (loading) return <div>Loading...</div>
    console.log('ProtectedRoute user:', user)
    console.log(requiredRol)
    console.warn(!user || user.rol !== requiredRol)
    if (loading) return <div>Loading...</div>
    if (!user || user.rol !== requiredRol) return <Navigate to='/login' replace />
    console.log('abriendo')
    return <Outlet />
}

export default ProtectedRoute
