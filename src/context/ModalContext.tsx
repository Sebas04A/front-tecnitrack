import React, { createContext, useState, useCallback, ReactNode, useEffect } from 'react'
import { ModalConfig, ModalContextType } from '../types/modal.types'
import { ModalRenderer } from '../components/common/modals/logica/ModalRendered'

const ModalContext = createContext<ModalContextType | undefined>(undefined)

interface ModalProviderProps {
    children: ReactNode
}

export const ModalProvider: React.FC<ModalProviderProps> = ({ children }) => {
    const [modals, setModals] = useState<ModalConfig[]>([])

    useEffect(() => {
        console.log('Modals changed:', modals)
    }, [modals])

    const openModal = useCallback((modalConfig: Omit<ModalConfig, 'id'>): string => {
        const modalId = `modal_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
        console.log('Abriendo modal con ID:', modalId)
        setModals(prev => [...prev, { id: modalId, ...modalConfig }])
        console.log('Modals actuales:', [...modals, { id: modalId, ...modalConfig }])
        return modalId
    }, [])

    const closeModal = useCallback((modalId: string): void => {
        console.log('Cerrando modal con ID:', modalId)
        setModals(prev => prev.filter(modal => modal.id !== modalId))
    }, [])

    const closeAllModals = useCallback((): void => {
        console.warn('Cerrando todos los modales')
        setModals([])
    }, [])

    const updateModal = useCallback((modalId: string, newProps: Partial<ModalConfig>): void => {
        setModals(prev =>
            prev.map(modal => (modal.id === modalId ? { ...modal, ...newProps } : modal))
        )
        // console.error('Modal actualizado:', modalId, newProps)
    }, [])
    const updateModalProps = useCallback((modalId: string, newModalProps: any): void => {
        console.log('Actualizando props del modal:', modalId, newModalProps)
        setModals(prev =>
            prev.map(modal =>
                modal.id === modalId
                    ? { ...modal, props: { ...modal.props, ...newModalProps } }
                    : modal
            )
        )
    }, [])

    const value: ModalContextType = {
        modals,
        openModal,
        closeModal,
        closeAllModals,
        updateModal,
        updateModalProps,
    }

    return (
        <ModalContext.Provider value={value}>
            {children}
            <ModalRenderer />
        </ModalContext.Provider>
    )
}

export { ModalContext }
