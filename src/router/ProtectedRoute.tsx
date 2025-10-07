// src/router/ProtectedRoute.tsx
import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth' // O como sea que obtengas el usuario

const ProtectedRoute = ({ requiredRol }: { requiredRol: string }) => {
    const { user, loading } = useAuth()

    if (loading) {
        // Muestra algo mientras se verifica si hay un usuario
        return <div>Cargando sesión...</div>
    }

    if (!user || user.rol !== requiredRol) {
        // Si no hay usuario o el rol no es el correcto, redirige al login
        return <Navigate to='/login' replace />
    }

    // Si todo está bien, permite el paso a las rutas hijas. ESTA LÍNEA ES LA CLAVE.
    return <Outlet />
}

export default ProtectedRoute
