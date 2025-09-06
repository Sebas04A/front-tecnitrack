import React, { useState, useEffect } from 'react'
// import { withModalData, WithModalDataProps } from '../components/modals'
import { useModalActions } from '../../hooks/useModalActions'
import { withModalData } from '../../hooks/withModalData'
import { WithModalDataProps } from '../../types/modal.types'

// Ejemplo de formulario conectado automáticamente
interface User {
    id: number
    name: string
    email: string
}

interface UserFormProps extends WithModalDataProps {
    user: User
    onSave: (user: User) => void
}

const UserForm = withModalData<Omit<UserFormProps, keyof WithModalDataProps>>(
    ({ user, onSave, modalData, updateModalData }) => {
        const [formData, setFormData] = useState<User>(user)
        const modalActions = useModalActions()

        const handleSubmit = () => {
            onSave(formData)
        }

        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value,
            })
        }

        return (
            <div>
                {/* Datos en tiempo real */}
                {modalData?.currentTime && (
                    <div className='mb-4 p-4 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200 rounded-lg'>
                        <div className='flex items-center gap-2 mb-2'>
                            <div className='w-2 h-2 bg-green-500 rounded-full animate-pulse'></div>
                            <p className='text-sm font-medium text-green-700'>
                                Datos en tiempo real
                            </p>
                        </div>
                        <p className='text-lg font-mono font-bold text-gray-800'>
                            🕒 {modalData.currentTime}
                        </p>
                    </div>
                )}

                <div className='grid grid-cols-1 gap-4'>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Nombre
                        </label>
                        <input
                            type='text'
                            name='name'
                            value={formData.name}
                            onChange={handleChange}
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                    <div>
                        <label className='block text-sm font-medium text-gray-700 mb-2'>
                            Email
                        </label>
                        <input
                            type='email'
                            name='email'
                            value={formData.email}
                            onChange={handleChange}
                            className='w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>
                </div>

                <div className='flex gap-3 justify-end mt-6'>
                    <button
                        onClick={modalActions.closeModal}
                        className='px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300'
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={handleSubmit}
                        className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
                    >
                        Guardar
                    </button>
                </div>
            </div>
        )
    }
)

const ExamplePage: React.FC = () => {
    const modalActions = useModalActions()
    const [users, setUsers] = useState<User[]>([
        { id: 1, name: 'Juan Pérez', email: 'juan@example.com' },
        { id: 2, name: 'María García', email: 'maria@example.com' },
    ])
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [currentTime, setCurrentTime] = useState<string>(new Date().toLocaleTimeString())

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date().toLocaleTimeString())
        }, 1000)
        return () => clearInterval(interval)
    }, [])

    useEffect(() => {
        console.log('Updating modal data with current time:', currentTime)
        if (selectedUser) {
            modalActions.updateModalData({
                ...selectedUser,
                currentTime,
                lastUpdate: Date.now(),
            })
        }
    }, [currentTime, selectedUser])

    const handleEdit = (user: User) => {
        setSelectedUser(user)
        modalActions.showForm(
            'Editar Usuario',
            <UserForm user={user} onSave={handleSave} />,
            { ...user, currentTime },
            'lg'
        )
    }

    const handleSave = (updatedUser: User) => {
        setUsers(users.map(u => (u.id === updatedUser.id ? updatedUser : u)))
        setSelectedUser(null)
        modalActions.closeModal()
        modalActions.showAlert('Éxito', 'Usuario actualizado correctamente', 'success')
    }

    const handleDelete = (user: User) => {
        modalActions.showDelete('Eliminar Usuario', user.name, () => {
            setUsers(users.filter(u => u.id !== user.id))
            modalActions.showAlert('Éxito', 'Usuario eliminado', 'success')
        })
    }

    return (
        <div className='p-6'>
            <h1 className='text-2xl font-bold mb-6'>Sistema de Modales TypeScript</h1>

            <div className='mb-6 flex flex-wrap gap-3 items-center'>
                <button
                    onClick={() => modalActions.showAlert('Info', 'Mensaje informativo', 'info')}
                    className='px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600'
                >
                    Mostrar Alerta
                </button>

                <button
                    onClick={() =>
                        modalActions.showConfirm('Confirmar', '¿Deseas continuar?', () =>
                            modalActions.showAlert('Confirmado', 'Acción realizada', 'success')
                        )
                    }
                    className='px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600'
                >
                    Confirmar
                </button>

                <div className='px-3 py-2 bg-gray-100 rounded-lg'>
                    <span className='text-sm text-gray-600'>Tiempo: </span>
                    <span className='font-mono text-blue-600'>{currentTime}</span>
                </div>
            </div>

            <div className='bg-white rounded-lg shadow overflow-hidden'>
                <table className='min-w-full'>
                    <thead className='bg-gray-50'>
                        <tr>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                                Nombre
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                                Email
                            </th>
                            <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase'>
                                Acciones
                            </th>
                        </tr>
                    </thead>
                    <tbody className='divide-y divide-gray-200'>
                        {users.map(user => (
                            <tr key={user.id} className='hover:bg-gray-50'>
                                <td className='px-6 py-4 text-sm font-medium text-gray-900'>
                                    {user.name}
                                </td>
                                <td className='px-6 py-4 text-sm text-gray-500'>{user.email}</td>
                                <td className='px-6 py-4 text-sm font-medium'>
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className='text-blue-600 hover:text-blue-900 mr-3'
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user)}
                                        className='text-red-600 hover:text-red-900'
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default ExamplePage
