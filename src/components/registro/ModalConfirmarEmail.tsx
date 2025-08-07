import React, { useEffect } from 'react'
import { Modal } from '../common/Modal'
import { useModal } from '../../hooks/useModal'
import { FaCheckCircle } from 'react-icons/fa'

export default function ModalConfirmarEmail({
    isOpen,
    closeModal,
    openModal,
}: {
    isOpen: boolean
    closeModal: () => void
    openModal: () => void
}) {
    return (
        <Modal
            // title='Confirmar Email'
            onClose={closeModal}
            isOpen={isOpen}
            buttonAcceptText='Aceptar'
        >
            <div className=''>
                <div>
                    <div>
                        <FaCheckCircle className='text-success size-20 mx-auto mb-4' />
                    </div>
                    <h4 className='mt-4 text-center text-2xl text-primary font-bold'>
                        ¡Correo Enviado!
                    </h4>
                    <p className='mt-2 text-center text-gray-600'>
                        Se enviará un correo de confirmación a tu dirección de email.
                    </p>
                </div>
            </div>
        </Modal>
    )
}
