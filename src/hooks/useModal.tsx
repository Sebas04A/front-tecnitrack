import { useContext } from 'react'
import { ModalContext } from '../context/ModalContext'
import { ModalContextType } from '../components/common/modals/models/modal.types'

export const useModal = (): ModalContextType => {
    const context = useContext(ModalContext)
    if (!context) {
        throw new Error('useModal debe ser usado dentro de ModalProvider')
    }
    return context
}
