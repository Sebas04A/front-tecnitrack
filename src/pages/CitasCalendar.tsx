// src/components/citas/CitasCalendar.tsx
import React, { useState } from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useCitas } from '../hooks/useCitas'
import { CalendarGrid } from '../components/citas/CalendarGrid'
import { TimeSlots } from '../components/citas/TimeSlots'
import { useModal } from '../hooks/useModal'
import { Modal } from '../components/common/Modal'
import ModalConfirmarCita from '../components/citas/ModalConfirmarCita'

export const CitasCalendar: React.FC = () => {
    // const {
    //     isOpen: isErrorOpen,
    //     openModal: openErrorModal,
    //     closeModal: closeErrorModal,
    // } = useModal()

    const {
        loading,
        now,
        currentDate,
        selectedDate,
        diasCompletos,
        horasDisponibles,
        horasOcupadas,
        handleDateSelect,
        goToNextMonth,
        goToPrevMonth,
    } = useCitas(new Date()) // Iniciar en el mes actual

    const [selectedSlot, setSelectedSlot] = useState<string | null>(null)

    const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(currentDate)

    const handleSlotSelect = (hora: string) => {
        setSelectedSlot(hora)
        openModal()
    }

    const { isOpen: isConfirmOpen, openModal: openModal, closeModal: closeModal } = useModal()
    return (
        <div>
            <div className='mb-6'>
                <div className='flex justify-between items-center mb-4'>
                    <button
                        onClick={goToPrevMonth}
                        className='p-2 rounded-full hover:bg-gray-200 transition-colors'
                        aria-label='Mes anterior'
                    >
                        <FiChevronLeft className='h-5 w-5 text-primary' />
                    </button>
                    <h2 className='text-xl font-bold text-primary capitalize'>{monthName}</h2>
                    <button
                        onClick={goToNextMonth}
                        className='p-2 rounded-full hover:bg-gray-200 transition-colors'
                        aria-label='Mes siguiente'
                    >
                        <FiChevronRight className='h-5 w-5 text-primary' />
                    </button>
                </div>
                <h3 className='text-center text-lg font-semibold '>Selecciona una fecha</h3>
            </div>

            {loading ? (
                <div className='text-center text-muted'>Cargando citas...</div>
            ) : (
                <>
                    <CalendarGrid
                        now={now}
                        currentDate={currentDate}
                        selectedDate={selectedDate}
                        diasCompletos={diasCompletos}
                        onDateSelect={handleDateSelect}
                    />

                    <hr className='my-6 border-gray-200' />

                    <TimeSlots
                        now={now}
                        selectedDate={selectedDate}
                        horasDisponibles={horasDisponibles}
                        horasOcupadas={horasOcupadas}
                        onSlotSelect={handleSlotSelect}
                    />
                </>
            )}
            {/* Modal para Confirmar Cita */}
            <ModalConfirmarCita
                selectedDate={selectedDate}
                selectedSlot={selectedSlot}
                closeModal={closeModal}
                isOpen={isConfirmOpen}
            />
        </div>
    )
}
