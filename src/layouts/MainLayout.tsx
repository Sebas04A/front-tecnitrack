// src/layouts/MainLayout.tsx
import { Outlet } from 'react-router-dom'
import Header from '../components/layout/Header'
import SideBar from '../components/layout/SideBar'
import Footer from '../components/layout/Footer'

export default function MainLayout() {
    return (
        <div className='flex min-h-screen'>
            {/* <Header /> */}
            <SideBar />

            <main className='flex-1 flex flex-col overflow-y-auto bg-background-auto ml-64'>
                {/* El contenido dinámico de la página se inserta aquí */}
                <div className='flex-1 lg:p-12 md:p-10 p-6 '>
                    <Outlet />
                </div>

                <Footer />
            </main>
        </div>
    )
}
