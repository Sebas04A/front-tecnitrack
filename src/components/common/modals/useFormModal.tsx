import React, { useState, useCallback } from 'react'
import GenericInput from '../../form/Controls/GenericInput'
import GenericTextInput from '../../form/Controls/GenericTextInput'
import GenericButton from '../../form/Controls/GenericButton'
import BaseModal from './BaseModal'

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

export const UserFormModal: React.FC<UserFormModalProps> = ({
    isOpen,
    onClose,
    title,
    user,
    currentTime,
    onSave,
    onCloseCustom,
}) => {
    console.warn('Rendering UserFormModal with user:', currentTime)
    const [formData, setFormData] = useState<UserFormData>(() => ({
        name: user?.name || '',
        email: user?.email || '',
        status: user?.status || 'active',
    }))

    const [errors, setErrors] = useState<Partial<UserFormData>>({})

    const validateForm = useCallback((): boolean => {
        const newErrors: Partial<UserFormData> = {}

        if (!formData.name.trim()) {
            newErrors.name = 'El nombre es requerido'
        }

        if (!formData.email.trim()) {
            newErrors.email = 'El email es requerido'
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
            newErrors.email = 'El email no es válido'
        }

        setErrors(newErrors)
        return Object.keys(newErrors).length === 0
    }, [formData])

    const handleSubmit = () => {
        if (!validateForm()) return

        const userData: User = {
            id: user?.id || Date.now(),
            ...formData,
        }

        onSave(userData)
        onClose()
    }

    const handleChange =
        (field: keyof UserFormData) =>
        (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
            setFormData(prev => ({
                ...prev,
                [field]: event.target.value,
            }))

            // Limpiar error del campo modificado
            if (errors[field]) {
                setErrors(prev => ({ ...prev, [field]: undefined }))
            }
        }

    const handleClose = () => {
        // onCloseCustom?.()
        console.log('Cerrando modal desde handleClose')
        onClose()
    }

    return (
        <BaseModal isOpen={isOpen} onClose={handleClose} title={title} size='md'>
            <div className='space-y-6'>
                {/* Tiempo en vivo */}
                {currentTime && (
                    <div className='bg-blue-50 p-4 rounded-lg border-l-4 border-blue-400'>
                        <div className='text-sm text-blue-700'>
                            <div className='font-semibold flex items-center space-x-2'>
                                <span>⏰</span>
                                <span>Tiempo en vivo (actualizado desde el componente padre)</span>
                            </div>
                            <div className='font-mono text-lg mt-2'>
                                {currentTime.toLocaleString()}
                            </div>
                            <div className='text-xs mt-2 text-blue-600'>
                                ✅ Este tiempo se actualiza automáticamente cada segundo
                            </div>
                        </div>
                    </div>
                )}

                {/* Formulario */}
                <div className='space-y-4'>
                    <input
                        // label='Nombre *'
                        type='text'
                        // value={formData.name}
                        onChange={() => handleChange('name')}
                        // error={errors.name}
                        placeholder='Ingresa el nombre completo'
                    />

                    {/* <Input */}
                    {/* label='Email *'
                        type='email'
                        value={formData.email}
                        onChange={handleChange('email')}
                        error={errors.email}
                        placeholder='ejemplo@email.com'
                    /> */}

                    <div className='space-y-1'>
                        <label className='block text-sm font-medium text-gray-700'>Estado *</label>
                        <select
                            value={formData.status}
                            onChange={handleChange('status')}
                            className='w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                        >
                            <option value='active'>Activo</option>
                            <option value='inactive'>Inactivo</option>
                        </select>
                    </div>
                </div>

                {/* Botones */}
                <div className='flex gap-3 justify-end pt-4 border-t'>
                    <GenericButton text='Cancelar' onClick={handleClose} />
                    <GenericButton text={user ? 'Actualizar' : 'Crear'} onClick={handleSubmit} />
                </div>
            </div>
        </BaseModal>
    )
}
