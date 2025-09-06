import React, { useState, useEffect, useCallback } from 'react'
import { useModal } from '../../hooks/useModal'
import { useModalActions } from '../../hooks/useModalActions'
import { UserFormModal } from '../common/modals/useFormModal'
import GenericButton from '../form/Controls/GenericButton'
import BaseModal from '../common/modals/BaseModal'
export interface User {
    id: number
    name: string
    email: string
    status: 'active' | 'inactive'
}

export interface UserFormData {
    name: string
    email: string
    status: 'active' | 'inactive'
}

interface UserFormModalProps {
    isOpen: boolean
    onClose: () => void
    title: string
    user?: User
    currentTime?: Date
    onSave: (user: User) => void
    onCloseCustom?: () => void
}

const INITIAL_USERS: User[] = [
    { id: 1, name: 'Juan Pérez', email: 'juan@email.com', status: 'active' },
    { id: 2, name: 'María García', email: 'maria@email.com', status: 'inactive' },
    { id: 3, name: 'Carlos López', email: 'carlos@email.com', status: 'active' },
]

export const UserList: React.FC = () => {
    const [users, setUsers] = useState<User[]>(INITIAL_USERS)
    const [selectedUser, setSelectedUser] = useState<User | null>(null)
    const [currentTime, setCurrentTime] = useState<Date>(new Date())
    const [editModalId, setEditModalId] = useState<string | null>(null)

    const { openModal, updateModal } = useModal()
    const { showConfirm, showAlert, showLoading } = useModalActions()
    const modalAction = useModalActions()

    // Actualizar tiempo cada segundo
    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(interval)
    }, [])

    // Actualizar modal cuando cambie el tiempo
    useEffect(() => {
        if (editModalId && selectedUser) {
            updateModal(editModalId, {
                props: {
                    title: 'Editar Usuario',
                    user: selectedUser,
                    currentTime: currentTime,
                    onSave: handleUserSave,
                    onCloseCustom: () => setEditModalId(null),
                },
            })
        }
    }, [currentTime, editModalId, selectedUser])

    const handleUserSave = useCallback(
        (updatedUser: User) => {
            setUsers(prev => prev.map(u => (u.id === updatedUser.id ? updatedUser : u)))
            setEditModalId(null)
            showAlert({
                title: 'Éxito',
                message: `Usuario ${updatedUser.id ? 'actualizado' : 'creado'} correctamente`,
                type: 'success',
            })
        },
        [showAlert]
    )

    const handleEdit = (user: User) => {
        setSelectedUser(user)

        const modalId = openModal({
            component: UserFormModal,
            props: {
                title: 'Editar Usuario',
                user: user,
                currentTime: currentTime,
                onSave: handleUserSave,
                onCloseCustom: () => setEditModalId(null),
            },
        })
        setEditModalId(modalId)
    }

    const handleDelete = (user: User) => {
        showConfirm({
            title: 'Confirmar Eliminación',
            message: `¿Estás seguro de que quieres eliminar a ${user.name}? Esta acción no se puede deshacer.`,
            confirmText: 'Eliminar',
            cancelText: 'Cancelar',
            onConfirm: async () => {
                const loadingId = showLoading('Eliminando usuario...')

                // Simular API call
                setTimeout(() => {
                    setUsers(prev => prev.filter(u => u.id !== user.id))
                    showAlert({
                        title: 'Usuario Eliminado',
                        message: `${user.name} ha sido eliminado correctamente`,
                        type: 'success',
                    })
                }, 1500)
            },
        })
    }

    const handleCreate = () => {
        openModal({
            component: UserFormModal,
            props: {
                title: 'Crear Nuevo Usuario',
                onSave: (newUser: User) => {
                    const user = { ...newUser, id: Date.now() }
                    setUsers(prev => [...prev, user])
                    showAlert({
                        title: 'Usuario Creado',
                        message: `${user.name} ha sido creado correctamente`,
                        type: 'success',
                    })
                },
            },
        })
    }

    const getStatusBadge = (status: User['status']) => {
        const baseClasses = 'inline-flex px-2 py-1 text-xs font-semibold rounded-full'
        const statusClasses =
            status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'

        return (
            <span className={`${baseClasses} ${statusClasses}`}>
                {status === 'active' ? 'Activo' : 'Inactivo'}
            </span>
        )
    }

    return (
        <div className='p-6 max-w-7xl mx-auto'>
            <div className='flex justify-between items-center mb-8'>
                <div>
                    <h1 className='text-3xl font-bold text-gray-900'>Gestión de Usuarios</h1>
                    <p className='mt-2 text-gray-600'>Administra los usuarios del sistema</p>
                </div>

                <div className='flex items-center gap-6'>
                    <div className='text-sm text-gray-600 text-right'>
                        <div className='font-semibold'>Hora actual:</div>
                        <div className='font-mono text-lg'>{currentTime.toLocaleTimeString()}</div>
                    </div>
                    <GenericButton onClick={handleCreate} text='+ Crear Usuario' />
                </div>
            </div>

            <div className='bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden'>
                <div className='overflow-x-auto'>
                    <table className='min-w-full divide-y divide-gray-200'>
                        <thead className='bg-gray-50'>
                            <tr>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Usuario
                                </th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Email
                                </th>
                                <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Estado
                                </th>
                                <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                                    Acciones
                                </th>
                            </tr>
                        </thead>
                        <tbody className='bg-white divide-y divide-gray-200'>
                            {users.map(user => (
                                <tr key={user.id} className='hover:bg-gray-50 transition-colors'>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='flex items-center'>
                                            <div className='flex-shrink-0 h-10 w-10'>
                                                <div className='h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center'>
                                                    <span className='text-sm font-medium text-gray-700'>
                                                        {user.name.charAt(0).toUpperCase()}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className='ml-4'>
                                                <div className='text-sm font-medium text-gray-900'>
                                                    {user.name}
                                                </div>
                                                <div className='text-sm text-gray-500'>
                                                    ID: {user.id}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        <div className='text-sm text-gray-900'>{user.email}</div>
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap'>
                                        {getStatusBadge(user.status)}
                                    </td>
                                    <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                                        <div className='flex gap-2 justify-end'>
                                            <GenericButton
                                                // variant='ghost'
                                                // size='sm'
                                                text='Editar'
                                                onClick={() => handleEdit(user)}
                                            />
                                            <GenericButton
                                                text='Eliminar'
                                                onClick={() => handleDelete(user)}
                                                className='text-red-600 hover:text-red-700 hover:bg-red-50'
                                            />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && (
                    <div className='text-center py-12'>
                        <div className='text-gray-400 text-lg mb-2'>📝</div>
                        <h3 className='text-lg font-medium text-gray-900 mb-1'>No hay usuarios</h3>
                        <p className='text-gray-500 mb-4'>Comienza creando tu primer usuario</p>
                        <GenericButton onClick={handleCreate} text='Crear Usuario' />
                    </div>
                )}
            </div>

            <div className='mt-6 text-sm text-gray-500 text-center'>
                Total de usuarios: {users.length}
            </div>
        </div>
    )
}
const MainAppModal: React.FC<{
    isOpen: boolean
    onClose: () => void
    title: string
}> = ({ isOpen, onClose, title }) => {
    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title={title} size='xl'>
            <UserList />
        </BaseModal>
    )
}

const ModalButton: React.FC = () => {
    const { openModal } = useModal()

    const openMainAppModal = () => {
        openModal({
            component: MainAppModal,
            props: {
                title: '🚀 Aplicación CRUD en Modal',
            },
        })
    }

    return <GenericButton text='Abrir App en Modal' onClick={openMainAppModal} />
}

export const WelcomeScreen: React.FC = () => {
    return (
        <div className='flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100'>
            <div className='text-center max-w-lg mx-auto p-8'>
                <div className='mb-8'>
                    <div className='text-6xl mb-4'>🎯</div>
                    <h1 className='text-4xl font-bold text-gray-800 mb-4'>
                        Sistema de Gestión de Modales
                    </h1>
                    <p className='text-xl text-gray-600 mb-2'>
                        Un sistema completo y profesional para manejar modales en React + TypeScript
                    </p>
                    <p className='text-gray-500'>
                        Haz clic para ver toda la aplicación funcionando dentro de un modal
                    </p>
                </div>

                <div className='space-y-4'>
                    <ModalButton />

                    <div className='text-sm text-gray-400'>
                        <p>✨ Estados reactivos • 🔄 Modales superpuestos • 🎨 TypeScript</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
