import { Outlet } from 'react-router-dom'

export default function AuthLayout() {
    return (
        <div className='flex flex-col items-center justify-center min-h-screen w-screen bg-background-auto gap-10'>
            <div className='m-4 text-center '>
                <h2 className='text-primary font-bold text-4xl m-2'>Bienvenido a TecniTrack</h2>
                <p>La mejor solución para la gestión de mantenimientos</p>
            </div>
            <div className='bg-background-accent-auto p-6 shadow-lg w-full max-w-xl rounded-lg'>
                <Outlet />
            </div>
        </div>
    )
}
