import { useAuth } from '../../hooks/useAuth'

const Header = () => {
    const { logout } = useAuth()
    const handleLogout = async () => {
        await logout()
        // Aquí podrías redirigir al login si es necesario
        window.location.reload()
    }
    return (
        <header className='bg-primary-light-auto text-onPrimary p-4 flex justify-between items-center'>
            <span>TecniTrack</span>
            <button
                onClick={handleLogout}
                className='bg-accent hover:bg-accentHover text-onPrimary px-4 py-2 rounded'
            >
                Logout
            </button>
        </header>
    )
}

export default Header
