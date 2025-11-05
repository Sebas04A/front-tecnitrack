import React from 'react'

import { IoCheckmarkCircle, IoInformationCircle, IoCloseCircle, IoWarning } from 'react-icons/io5'

import { AlertModalProps, ModalTypes } from './models/modal.types'

import BaseModal from './BaseModal'

const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    title,
    message,
    type = 'info',
}) => {
    const config: Record<
        ModalTypes,
        {
            icon: React.ReactNode
            bgGradient: string
            buttonClass: string
        }
    > = {
        info: {
            icon: <IoInformationCircle className='text-blue-500 text-5xl mx-auto mb-4' />,
            bgGradient: 'from-blue-100 to-blue-200',
            buttonClass: 'bg-blue-500 hover:bg-blue-600',
        },
        success: {
            icon: <IoCheckmarkCircle className='text-green-500 text-5xl mx-auto mb-4' />,
            bgGradient: 'from-green-100 to-green-200',
            buttonClass: 'bg-green-500 hover:bg-green-600',
        },
        error: {
            icon: <IoCloseCircle className='text-red-500 text-5xl mx-auto mb-4' />,
            bgGradient: 'from-red-100 to-red-200',
            buttonClass: 'bg-red-500 hover:bg-red-600',
        },
        warning: {
            icon: <IoWarning className='text-yellow-500 text-5xl mx-auto mb-4' />,
            bgGradient: 'from-yellow-100 to-yellow-200',
            buttonClass: 'bg-yellow-500 hover:bg-yellow-600',
        },
    }

    const { icon, bgGradient, buttonClass } = config[type]

    return (
        <BaseModal isOpen={isOpen} onClose={onClose} title={title} size='sm'>
            <div className={`text-center p-6 rounded-xl bg-gradient-to-br ${bgGradient}`}>
                <p className='text-gray-700 text-lg mb-8'>{message}</p>

                <button
                    onClick={onClose}
                    className={`px-8 py-3 text-white font-semibold rounded-xl ... ${buttonClass}`}
                >
                    Entendido
                </button>
            </div>
        </BaseModal>
    )
}

export default AlertModal
