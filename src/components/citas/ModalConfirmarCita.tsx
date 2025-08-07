import React, { useEffect, useImperativeHandle } from 'react'
import { Modal } from '../common/Modal'
import { useModal } from '../../hooks/useModal'
import { Navigate } from 'react-router-dom'

export default function ModalConfirmarCita({
    selectedDate,
    selectedSlot,
    closeModal,
    isOpen,
}: {
    selectedDate: Date | null
    selectedSlot: string | null
    closeModal: () => void
    isOpen: boolean
}) {
    const handleConfirmCita = () => {
        // Aquí iría lógica para llamar a la API y guardar la cita
        console.log(
            `Cita confirmada para el ${selectedDate?.toLocaleDateString()} a las ${selectedSlot}`
        )
        // mostrar un modal de éxito o simplemente cerrar
        closeModal()
        // alert('¡Cita agendada con éxito!')
        window.location.href = '/login' // Redirigir a la página de login
    }

    return (
        <Modal isOpen={isOpen} onClose={closeModal} title='Confirmar Cita'>
            {selectedDate && selectedSlot && (
                <div>
                    <p className=''>
                        ¿Estás seguro de que deseas agendar una cita para el
                        <strong className='text-text'>
                            {' '}
                            {new Intl.DateTimeFormat('es-ES', {
                                weekday: 'long',
                                day: 'numeric',
                                month: 'long',
                            }).format(selectedDate)}
                        </strong>{' '}
                        a las
                        <strong className='text-text'> {selectedSlot}</strong>?
                    </p>
                    <div className='mt-10 flex justify-end gap-3'>
                        <button
                            type='button'
                            className='px-4 py-2 text-sm font-semibold bg-background-accent-auto rounded-lg hover:bg-background-auto transition-colors'
                            onClick={closeModal}
                        >
                            Cancelar
                        </button>
                        <button
                            type='button'
                            className='px-4 py-2 text-sm font-semibold bg-primary-auto rounded-lg hover:bg-primary-light-auto transition-colors'
                            onClick={handleConfirmCita}
                        >
                            Confirmar
                        </button>
                    </div>
                </div>
            )}
        </Modal>
    )
}
