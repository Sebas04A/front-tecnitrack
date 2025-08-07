import { useState, useEffect } from 'react'
import { AutenticacionService } from '../api'
import { FaCheck, FaExclamation, FaMailBulk, FaMailchimp } from 'react-icons/fa'

// --- Componente Principal de la Página ---
export default function ConfirmEmail() {
    const [status, setStatus] = useState('idle') // 'idle', 'loading', 'success', 'error'
    const [message, setMessage] = useState('')
    const [token, setToken] = useState<string | null>(null)

    // Efecto para extraer el token de la URL cuando el componente se monta
    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const tokenFromUrl = urlParams.get('token')

        if (tokenFromUrl) {
            setToken(tokenFromUrl)
            setStatus('idle') // Listo para confirmar
        } else {
            setStatus('error')
            setMessage(
                'No se encontró el token de confirmación. Por favor, asegúrate de usar el enlace correcto.'
            )
        }
    }, [])

    // Función para manejar el envío de la confirmación
    const handleConfirm = async () => {
        if (!token) {
            setStatus('error')
            setMessage('El token es inválido o ha expirado.')
            return
        }

        setStatus('loading')
        setMessage('Confirmando tu correo electrónico...')

        try {
            const response = await AutenticacionService.getApiAutenticacionConfirmaremail(token)
            console.log('Respuesta de la API al confirmar correo:', response)
            // Si la confirmación es exitosa
            setStatus('success')
            setMessage('¡Tu correo ha sido confirmado exitosamente! Ahora puedes iniciar sesión.')
        } catch (error) {
            setStatus('error')
            setMessage(
                (error instanceof Error && error.message) ||
                    'Ocurrió un error al confirmar tu correo. Por favor, inténtalo de nuevo.'
            )
        }
    }

    // Renderiza el contenido según el estado actual
    const renderContent = () => {
        switch (status) {
            case 'loading':
                return (
                    <>
                        <div className='animate-spin rounded-full h-12 w-12 border-b-2 mx-auto mb-4'></div>
                        <h2 className='text-2xl font-bold mb-2'>Confirmando...</h2>
                        <p className='text-muted'>{message}</p>
                    </>
                )
            case 'success':
                return (
                    <>
                        <FaCheck className='text-success h-12 w-12 mx-auto mb-4' />
                        <h2 className='text-2xl font-bold text-success mb-2'>¡Confirmado!</h2>
                        <p className='text-muted'>{message}</p>
                        <button
                            onClick={() => {
                                /* Lógica para redirigir al login */ window.location.href = '/login'
                            }}
                            className='mt-6 w-full bg-primary-auto hover:bg-primary-light-auto  font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105'
                        >
                            Ir a Iniciar Sesión
                        </button>
                    </>
                )
            case 'error':
                return (
                    <>
                        <FaExclamation className='text-error h-12 w-12 mx-auto mb-4' />
                        <h2 className='text-2xl font-bold text-error mb-2'>Error</h2>
                        <p className='text-muted'>{message}</p>
                        <button
                            onClick={() => {
                                /* Lógica para reenviar el correo */ alert('Reenviando correo...')
                            }}
                            className='mt-6 w-full bg-primary-auto hover:bg-primary-light-auto text-white font-bold py-2 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105'
                        >
                            Reenviar Correo
                        </button>
                    </>
                )
            case 'idle':
            default:
                return (
                    <>
                        <FaMailBulk className='text-muted size-12 mx-auto mb-4' />
                        <h2 className='text-2xl font-bold mb-6'>Confirmación de Correo</h2>
                        <p className='text-muted mb-6'>
                            Por favor, haz clic en el botón de abajo para verificar tu dirección de
                            correo electrónico.
                        </p>
                        <button
                            onClick={handleConfirm}
                            className='w-full bg-primary-auto hover:bg-primary-light-auto font-bold py-3 px-4 rounded-lg transition duration-300 ease-in-out transform hover:scale-105'
                        >
                            Confirmar mi Correo
                        </button>
                    </>
                )
        }
    }

    return (
        // <div className='bg-background-auto min-h-screen flex items-center justify-center p-4'>
        <div className='w-full max-w-md  p-8 text-center'>{renderContent()}</div>
        // </div>
    )
}
