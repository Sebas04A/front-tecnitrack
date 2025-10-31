import { Routes, Route, Navigate } from 'react-router-dom'

import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'
import InternalLayout from '../layouts/InternalLayout'

import RootRedirect from './RootRedirect'
import ProtectedRoute from './ProtectedRoute'

import NotFoundPage from '../pages/NofoundPage'
// import Login from '../pages/Login'
import ColorPalette from '../components/ex/ColorPallete'

import DashboardPage from '../pages/cliente/dashboard/Dashboard'
import TableroPage from '../pages/cliente/tablero/Tablero'

import { CitasCalendar } from '../pages/nologin/calendarioCita/CitasCalendar'
import ConfirmEmail from '../pages/nologin/confirmarEmail/ConfirmarEmail'
import Perfil from '../pages/cliente/perfil/Perfil'
import RecuperarContra from '../pages/nologin/recuperarContra/RecuperarContra'
import RestablecerContra from '../pages/nologin/restablecerContra/RestablecerContra'
import CatalogosCrud from '../pages/Internos/catalogo/generales/CatalogosCrud'
import CrudInternos from '../pages/Internos/usuarios/CrudInternos'

import Citas from '../pages/Internos/Citas/Citas'

import CatalogoLocalidades from '../pages/Internos/catalogo/localidades/CatalogoLocalidades'
import HomeInternos from '../pages/Internos/home/HomeInternos'

import Register from '../pages/nologin/register/Register'

import CitaCliente from '../pages/cliente/citas/CitaCliente'
import CrudClientes from '../pages/Internos/Clientes/CrudClientes'
import { OrdenPage } from '../pages/Internos/Ordenes'
import Login from '../pages/nologin/Login/Login'
import ProcesarMantenimiento from '../components/tecnico/ProcesarMantenimiento'

const AppRouter: React.FC = () => {
    return (
        <Routes>
            {/* Rutas públicas */}
            {/* <Route path='/' element={<AuthLayout />}>
                <Route index element={<RootRedirect />} />
                <Route path='login' element={<Login />} />
                
            </Route> */}
            <Route path='/' element={<AuthLayout />}>
                <Route index element={<RootRedirect />} />
                <Route path='login' element={<Login />} />
                <Route path='register' element={<Register />} />
                <Route path='forgotpassword' element={<RecuperarContra />} />
                <Route path='resetpassword' element={<RestablecerContra />} />
                <Route path='confirmar-email' element={<ConfirmEmail />} />
                <Route path='calendario' element={<CitasCalendar />} />

                {/* Ruta de ejemplo para paleta de colores */}
                <Route path='colors' element={<ColorPalette />} />
            </Route>
            <Route element={<ProtectedRoute requiredRol='usuario' />}>
                <Route path='/app/*' element={<MainLayout />}>
                    <Route index element={<Navigate to='home' replace />} />
                    <Route path='home' element={<TableroPage />} />
                    <Route path='home' element={<TableroPage />} />
                    <Route path='tablero' element={<TableroPage />} />
                    <Route path='mantenimientos' element={<DashboardPage />} />

                    <Route path='usuario' element={<Perfil />} />
                    <Route path='citas' element={<CitaCliente />} />
                </Route>
            </Route>
            <Route element={<ProtectedRoute requiredRol='interno' />}>
                <Route path='/interno/*' element={<InternalLayout />}>
                    <Route index element={<Navigate to='home' replace />} />
                    <Route path='home' element={<HomeInternos />} />
                    <Route path='usuarios' element={<CrudInternos />} />
                    <Route path='clientes' element={<CrudClientes />} />
                    <Route path='configuracion/catalogos/generales' element={<CatalogosCrud />} />
                    <Route
                        path='configuracion/catalogos/localidades'
                        element={<CatalogoLocalidades />}
                    />
                    <Route path='citas' element={<Citas />} />
                    <Route path='ordenes' element={<OrdenPage />} />

                    {/* NO IMPLEMENTADO AUN */}
                    <Route path='procesar' element={<ProcesarMantenimiento />} />
                </Route>
            </Route>

            {/* 404 */}
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
}

export default AppRouter
