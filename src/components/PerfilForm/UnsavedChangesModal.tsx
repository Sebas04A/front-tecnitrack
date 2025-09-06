import React from 'react'
import { Modal } from '../common/Modal'

interface UnsavedChangesModalProps {
    isOpen: boolean
    onCancel: () => void // No continuar, volver al formulario
    onAccept: () => void // Continuar y descartar cambios
}

const UnsavedChangesModal: React.FC<UnsavedChangesModalProps> = ({
    isOpen,
    onCancel,
    onAccept,
}) => {
    return (
        <Modal
            isOpen={isOpen}
            onClose={onAccept}
            onAccept={onAccept}
            // onCancel={onCancel}
            acceptText='Seguir editando'
            // cancelText='Seguir editando'
            title='Cambios sin guardar'
        >
            <div className='text-sm text-muted max-w-md'>
                Tienes cambios sin guardar. Si continúas, perderás las modificaciones realizadas.
            </div>
        </Modal>
    )
}

export default UnsavedChangesModal
