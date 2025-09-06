import { LoadingModalProps } from '../../../types/modal.types'
import BaseModal from './BaseModal'

export const LoadingModal: React.FC<LoadingModalProps> = ({
    isOpen,
    onClose = () => {},
    message,
}) => {
    return (
        <BaseModal isOpen={isOpen} onClose={() => {}} size='sm'>
            <div className='flex flex-col items-center justify-center text-center gap-4 py-8'>
                <div className='w-12 h-12 border-4 border-slate-200 dark:border-slate-600 border-t-blue-500 rounded-full animate-spin' />
                <p className='text-slate-600 dark:text-slate-300 font-medium'>{message}</p>
            </div>
        </BaseModal>
    )
}
