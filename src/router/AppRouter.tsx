// src/router/AppRouter.tsx
import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'
import ProtectedRoute from './ProtectedRoute'
import Login from '../pages/Login'
import NotFoundPage from '../pages/NofoundPage'
import ColorPalette from '../components/ex/ColorPallete'
import DashboardPage from '../pages/Dashboard'
import TableroPage from '../pages/Tablero'

import { CitasCalendar } from '../pages/CitasCalendar'
import ConfirmEmail from '../pages/ConfirmarEmail'
import UserProfileTabs from '../pages/Perfil'
import InternalLayout from '../layouts/InternalLayout'
import RecuperContra from '../pages/RecuperContra'
import RestablecerContra from '../pages/RestablecerContra'
import CatalogosCrud from '../components/crudGrid/cruds/Catalogos/CatalogosCrud'
import CrudInternos from '../pages/Internos/CrudInternos'

import Citas from '../pages/Internos/Citas/Citas'

import CatalogoLocalidades from '../pages/Internos/CatalogoLocalidades'
import HomeInternos from '../pages/Internos/HomeInternos'

import ProcesarMantenimiento from '../components/tecnico/ProcesarMantenimiento'
import RegisterNuevo from '../pages/RegisterNuevo'
import RootRedirect from './RootRedirect'
import DireccionesCrud from '../components/crudGrid/cruds/DireccionesCrud'
import CitaCliente from '../pages/cliente/CitaCliente'
import CrudClientes from '../pages/Internos/Clientes/CrudClientes'
import { OrdenPage } from '../pages/Internos/Ordenes'

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
                <Route path='register' element={<RegisterNuevo />} />
                <Route path='colors' element={<ColorPalette />} />
                <Route path='calendario' element={<CitasCalendar />} />
                <Route path='confirmar-email' element={<ConfirmEmail />} />
                <Route path='forgotpassword' element={<RecuperContra />} />
                <Route path='resetpassword' element={<RestablecerContra />} />
                {/* <Route path='register-nuevo' element={<RegisterNuevo />} /> */}
                {/* <Route path='ex' element={<WelcomeScreen />} /> */}
                {/* <Route path='ex' element={<MantenimientoIngreso />} /> */}
            </Route>
            <Route element={<ProtectedRoute requiredRol='usuario' />}>
                <Route path='/app/*' element={<MainLayout />}>
                    <Route index element={<Navigate to='home' replace />} />
                    <Route path='home' element={<TableroPage />} />
                    <Route path='home' element={<TableroPage />} />
                    <Route path='tablero' element={<TableroPage />} />
                    <Route path='mantenimientos' element={<DashboardPage />} />

                    <Route path='usuario' element={<UserProfileTabs />} />
                    <Route path='citas' element={<CitaCliente />} />

                    {/* <Route path='ejCrud' element={<DireccionesCrud />} /> */}
                    {/* ... todas las demás rutas para el rol 'usuario' van aquí ... */}
                    {/* Ejemplo: <Route path="mantenimientos" element={<DashboardPage />} /> */}
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
                    <Route path='procesar' element={<ProcesarMantenimiento />} />

                    {/* ... todas las demás rutas para el rol 'interno' van aquí ... */}
                    {/* Ejemplo: <Route path="clientes" element={<CrudClientes />} /> */}
                </Route>
            </Route>

            {/* 404 */}
            <Route path='*' element={<NotFoundPage />} />
        </Routes>
    )
}

export default AppRouter
