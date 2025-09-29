import {
    IoAlertCircleOutline,
    IoInformationCircleOutline,
    IoShieldCheckmarkOutline,
} from 'react-icons/io5'
import { ConfirmModalProps } from '../../../types/modal.types'
import BaseModal from './BaseModal'
const variantConfig = {
    danger: {
        icon: <IoAlertCircleOutline className='text-red-500' size={48} />,
        buttonClass: 'bg-red-600 hover:bg-red-700 focus-visible:ring-red-500',
    },
    success: {
        icon: <IoShieldCheckmarkOutline className='text-green-500' size={48} />,
        buttonClass: 'bg-green-600 hover:bg-green-700 focus-visible:ring-green-500',
    },
    info: {
        icon: <IoInformationCircleOutline className='text-blue-500' size={48} />,
        buttonClass: 'bg-blue-600 hover:bg-blue-700 focus-visible:ring-blue-500',
    },
    warning: {
        icon: <IoAlertCircleOutline className='text-yellow-500' size={48} />,
        buttonClass: 'bg-yellow-500 hover:bg-yellow-600 focus-visible:ring-yellow-400',
    },
    error: {
        icon: <IoAlertCircleOutline className='text-red-700' size={48} />,
        buttonClass: 'bg-red-700 hover:bg-red-800 focus-visible:ring-red-600',
    },
}
export const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    onClose,
    title,
    message,
    onConfirm,
    confirmText = 'Confirmar',
    cancelText = 'Cancelar',
    type = 'info',
    // ... resto de props
}) => {
    const handleCancel = () => onClose()
    const handleConfirm = () => {
        onConfirm()
        onClose()
    }

    const config = variantConfig[type]
    return (
        <BaseModal isOpen={isOpen} onClose={handleCancel} title={title} size='sm'>
            <div className='flex flex-col items-center text-center gap-4'>
                <div className='mb-2'>{config.icon}</div>
                <p className='text-slate-600 dark:text-slate-300 text-base'>{message}</p>
            </div>

            {/* Footer con los botones de acción */}
            <footer className='flex justify-end gap-3 pt-6 mt-6 border-t border-slate-200 dark:border-slate-700'>
                <button
                    onClick={handleCancel}
                    className='px-4 py-2 rounded-lg font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 dark:text-slate-200 dark:bg-slate-700 dark:hover:bg-slate-600 transition-colors duration-200'
                >
                    {cancelText}
                </button>
                <button
                    onClick={handleConfirm}
                    className={`px-4 py-2 rounded-lg font-semibold text-white transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 dark:focus-visible:ring-offset-slate-800 ${config.buttonClass}`}
                >
                    {confirmText}
                </button>
            </footer>
        </BaseModal>
    )
}
