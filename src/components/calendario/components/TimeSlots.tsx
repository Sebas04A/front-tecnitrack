// src/components/citas/TimeSlots.tsx
import React from 'react'

interface TimeSlotsProps {
    now: Date // ❗ NUEVO: Prop para la fecha y hora actual
    selectedDate: Date | null
    horasDisponibles: string[]
    horasOcupadas: Set<string>
    onSlotSelect: (hora: string) => void
}

export const TimeSlots: React.FC<TimeSlotsProps> = ({
    now,
    selectedDate,
    horasDisponibles,
    horasOcupadas,
    onSlotSelect,
}) => {
    if (!selectedDate) {
        return (
            <div className='mt-8 text-center '>
                <p>Selecciona una fecha para ver las horas disponibles.</p>
            </div>
        )
    }

    const formattedDate = new Intl.DateTimeFormat('es-ES', {
        day: 'numeric',
        month: 'long',
    }).format(selectedDate)

    const isToday = selectedDate.toDateString() === now.toDateString()

    return (
        <div className='mt-8'>
            <h3 className='font-semibold text-center mb-4'>Horas disponibles el {formattedDate}</h3>
            <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3'>
                {horasDisponibles.map(hora => {
                    const isOcupada = horasOcupadas.has(hora)

                    // ❗ LÓGICA ACTUALIZADA: para deshabilitar horas pasadas
                    let isPast = false
                    if (isToday) {
                        const [hour, minute] = hora.split(':').map(Number)
                        const slotTime = new Date(selectedDate)
                        slotTime.setHours(hour, minute, 0, 0)
                        if (slotTime < now) {
                            isPast = true
                        }
                    }

                    const isDisabled = isOcupada || isPast

                    return (
                        <button
                            key={hora}
                            type='button'
                            disabled={isDisabled}
                            className={`p-2 rounded-lg text-sm font-semibold transition-colors duration-200 ${
                                isDisabled
                                    ? 'bg-unavailable-auto cursor-not-allowed'
                                    : 'bg-background-accent text-primary hover:bg-primary-light-auto  border border-gray-200'
                            }`}
                            onClick={() => !isDisabled && onSlotSelect(hora)}
                        >
                            {hora}
                        </button>
                    )
                })}
            </div>
        </div>
    )
}
