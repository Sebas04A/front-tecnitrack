// src/router/RootRedirect.tsx
import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

const RootRedirect = () => {
    const { user, loading } = useAuth()

    if (loading) {
        // Muestra una pantalla de carga mientras se verifica la sesión
        return <div>Cargando...</div>
    }

    if (!user) {
        // Si no está autenticado, llévalo al login
        return <Navigate to='/login' replace />
    }

    // Si está autenticado, decide a dónde redirigirlo según su rol
    if (user?.rol === 'interno') {
        return <Navigate to='/interno/home' replace />
    }

    if (user?.rol === 'usuario') {
        return <Navigate to='/app/home' replace />
    }

    // Fallback por si el rol no es ninguno de los esperados
    return <Navigate to='/login' replace />
}

export default RootRedirect
