// src/router/AppRouter.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'
import ProtectedRoute from './ProtectedRoute'

import Home from '../pages/Home'
import Login from '../pages/Login'
import NotFoundPage from '../pages/NofoundPage'
import ColorPalette from '../components/ex/ColorPallete'
import DashboardPage from '../pages/Dashboard'
import TableroPage from '../pages/Tablero'
import Usuario from '../pages/Usuario'
import Register from '../pages/Register'
import { CitasCalendar } from '../pages/CitasCalendar'
import ConfirmEmail from '../pages/ConfirmarEmail'
import UserProfileTabs from '../pages/Perfil'
// import Items from '../pages/Items'

const AppRouter: React.FC = () => {
    return (
        <Routes>
            {/* Rutas públicas */}
            <Route path='/' element={<AuthLayout />}>
                <Route path='login' element={<Login onLogin={() => {}} />} />
                <Route path='register' element={<Register />} />
                <Route path='colors' element={<ColorPalette />} />
                <Route path='calendario' element={<CitasCalendar />} />
                <Route path='confirmar-email' element={<ConfirmEmail />} />
            </Route>

            {/* Rutas privadas */}
            <Route element={<ProtectedRoute />}>
                <Route path='/' element={<MainLayout />}>
                    <Route index element={<Navigate to='home' replace />} />
                    <Route path='home' element={<Home />} />
                    <Route path='tablero' element={<TableroPage />} />
                    {/* <Route path='usuario' element={<Usuario />} /> */}
                    <Route path='mantenimientos' element={<DashboardPage />} />

                    <Route path='usuario' element={<UserProfileTabs />} />

                    {/* <Route path='items' element={<Items />} /> */}
                    {/* <Route path='settings' element={<Settings />} /> */}
                </Route>
            </Route>

            {/* 404 */}
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
}

export default AppRouter
