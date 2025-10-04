import { useCallback } from 'react'
import { useModal } from './useModal'
import { AlertModalProps, BaseModalProps, ConfirmModalProps } from '../types/modal.types'
import { ConfirmModal } from '../components/common/modals/ConfirmModal'
import AlertModal from '../components/common/modals/AlertModal'
import FormModal, { FormModalProps } from '../components/common/modals/FormModal'
import { LoadingModal } from '../components/common/modals/LoadingModal'
import EmptyModal from '../components/common/modals/EmptyModal'

export const useModalActions = () => {
    const { openModal, closeModal, closeAllModals } = useModal()

    const showConfirm = useCallback(
        (options: Omit<ConfirmModalProps, 'isOpen' | 'onClose'>): string => {
            console.log('Mostrando ConfirmModal con opciones:', options)
            return openModal({
                component: ConfirmModal,
                props: options,
            })
        },
        [openModal]
    )

    const showAlert = useCallback(
        (options: Omit<AlertModalProps, 'isOpen' | 'onClose'>): string => {
            return openModal({
                component: AlertModal,
                props: options,
            })
        },
        [openModal]
    )

    const showLoading = useCallback(
        (message?: string): string => {
            return openModal({
                component: LoadingModal,
                props: { message },
            })
        },
        [openModal]
    )
    // const showForm = useCallback(
    //     (options: Omit<FormModalProps, 'isOpen' | 'onClose'>): string => {
    //         console.log('Mostrando FormModal con opciones:', options)
    //         return openModal({
    //             component: FormModal,
    //             props: options,
    //         })
    //     },
    //     [openModal]
    // )
    const showForm = useCallback(
        (options: Omit<FormModalProps, 'isOpen' | 'onClose'>): string => {
            return openModal({
                component: FormModal,
                props: options,
            })
        },
        [openModal]
    )

    const showEmptyModal = useCallback(
        (options: Omit<BaseModalProps, 'isOpen' | 'onClose'>): string => {
            console.warn('Abriendo modal con opciones:', options)
            return openModal({
                component: EmptyModal,
                props: options,
            })
        },
        [openModal]
    )

    return {
        showConfirm,
        showAlert,
        showLoading,
        showForm,
        showEmptyModal,
        closeModal,
        closeAllModals,
    }
}
