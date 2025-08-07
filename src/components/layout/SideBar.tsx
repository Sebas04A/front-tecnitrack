import { Link } from 'react-router-dom'
// import { logout } from '../../hooks/useAuth'
import { Logo } from '../icons/Logo'
import { useAuth } from '../../hooks/useAuth'

const navItems = [
    { name: 'Tablero', href: 'tablero' },
    { name: 'Perfil de usuario', href: 'usuario' },
    { name: 'Mantenimientos', href: 'mantenimientos' },
]

function Sidebar() {
    const { logout } = useAuth()
    return (
        <aside className='w-64 flex-shrink-0 bg-primary-auto flex flex-col h-screen fixed'>
            <div
                className='flex flex-col items-center gap-3 border-r-4 border-primary mb-10 cursor-pointer justify-center bg-background p-4'
                onClick={() => (window.location.href = '/')}
            >
                <img src='/icono.png' alt='Logo' className='size-max' />
                {/* <span className='text-3xl font-bold'>TecniTrak</span> */}
            </div>

            <nav className='flex flex-col gap-4 my-8 p-6'>
                {navItems.map(item => (
                    <Link
                        key={item.name}
                        to={item.href}
                        className='text-lg py-2 px-4 rounded-lg hover:bg-secondary-light transition-colors duration-200'
                    >
                        {item.name}
                    </Link>
                ))}
            </nav>

            <a
                href='#'
                className='mt-auto text-lg py-2 mb-10 mx-4 px-4 rounded-lg hover:bg-secondary bg-secondary-light-auto transition-colors duration-200'
                onClick={async () => {
                    await logout()
                    window.location.reload()
                }}
            >
                Cerrar sesión
            </a>
        </aside>
    )
}

export default Sidebar
