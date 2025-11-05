import { ReactNode, ComponentType } from 'react'

export type ModalTypes = 'info' | 'success' | 'warning' | 'error'

export interface BaseModalProps {
    isOpen: boolean
    onClose: () => void
    title?: string
    children?: ReactNode
    size?: ModalSize
    className?: string
    noPadding?: boolean
}

export type ModalSize = 'sm' | 'md' | 'lg' | 'xl' | 'full'

export interface ModalConfig {
    id: string
    component?: ComponentType<any>
    props: Record<string, any>
}

export interface ModalContextType {
    modals: ModalConfig[]
    openModal: (config: Omit<ModalConfig, 'id'>) => string
    closeModal: (modalId: string) => void
    closeAllModals: () => void
    updateModal: (modalId: string, newProps: Partial<ModalConfig>) => void
    updateModalProps: (modalId: string, newModalProps: any) => void
}

export interface ConfirmModalProps extends BaseModalProps {
    message: string
    onConfirm: () => void
    onCancel?: () => void
    confirmText?: string
    cancelText?: string
    type?: ModalTypes
}

export interface AlertModalProps extends BaseModalProps {
    title: string
    message: string
    type?: ModalTypes
}

export interface LoadingModalProps extends BaseModalProps {
    message?: string
}
