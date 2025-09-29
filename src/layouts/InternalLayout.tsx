// src/layouts/MainLayout.tsx
import { Outlet, useLocation } from 'react-router-dom'
import Header from '../components/layout/Header'
import SideBar from '../components/layout/SideBar'
import Footer from '../components/layout/Footer'
import { FaBars } from 'react-icons/fa'

import { useState } from 'react'
import TituloPagina from '../components/common/TituloPagina'
import { getNavItem, navItemsInterno } from '../router/ruta'

export default function InternalLayout() {
    const [mobileOpen, setMobileOpen] = useState<boolean>(false)
    const location = useLocation()

    const currentNavItem = getNavItem(location.pathname)
    return (
        <>
            <header className='md:hidden sticky top-0 z-30 w-full h-16 bg-primary-auto backdrop-blur border-b border-border'>
                <div className=' px-4 flex items-center justify-content gap-3 h-full'>
                    <button
                        className='md:hidden inline h-4 p-2 rounded hover:bg-secondary-light h-full'
                        onClick={() => setMobileOpen(true)}
                        aria-label='Abrir menú'
                    >
                        <FaBars />
                    </button>
                    <h1 className='text-lg font-semibold'>TecniTrack</h1>
                </div>
            </header>
            <div className='flex min-h-screen'>
                <SideBar
                    navItems={navItemsInterno}
                    mobileOpen={mobileOpen}
                    onClose={() => setMobileOpen(false)}
                    pathname={location.pathname}
                />

                <main className='flex-1 flex flex-col overflow-y-auto bg-background-auto '>
                    {/* El contenido dinámico de la página se inserta aquí */}
                    <div className='flex-1 lg:p-12 md:p-10 p-6 '>
                        <TituloPagina
                            titulo={currentNavItem?.name ?? 'TECNITRACK'}
                            icon={currentNavItem?.icon}
                        />
                        <Outlet />
                    </div>

                    <Footer />
                </main>
            </div>
        </>
    )
}
