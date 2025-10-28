import React, { useEffect, useMemo} from 'react'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { useCitas } from '../../hooks/useCitas'
import { CalendarGrid } from './components/CalendarGrid'
import { TimeSlots } from './components/TimeSlots'

export type DateTimeSelection = {
    selectedDate: Date | null
    selectedSlot: string | null
    fechaHoraISO?: string | null
    fecha?: Date | null
}

interface DateTimeSelectorProps {
    initialDate?: Date
    defaultSelectedDate?: Date | null
    onSelectionChange?: (selection: DateTimeSelection) => void
    onSlotSelect?: (data: Date) => void
}

const DateTimeSelector: React.FC<DateTimeSelectorProps> = ({
    initialDate: initialDateProp,
    defaultSelectedDate,
    onSelectionChange,
    onSlotSelect,
}) => {
    const initialDate = useMemo(() => initialDateProp ?? new Date(), [initialDateProp])

    const {
        loading,
        now,
        currentDate,
        selectedDate,
        selectedSlot,
        diasCompletos,
        horasDisponibles,
        horasOcupadas,
        selectDate,
        selectSlot,
        goToNextMonth,
        goToPrevMonth,
        setSelectedDateDirect,
        setCurrentDateDirect,
        setSelectedSlotDirect,
        getFechaHoraSeleccionadaISO,
        getFechaHoraSeleccionada,
    } = useCitas(initialDate)

    const monthName = new Intl.DateTimeFormat('es-ES', { month: 'long' }).format(currentDate)

    // Inicializar selección por defecto al montar (solo fecha)
    useEffect(() => {
        console.log('defaultSelectedDate', { defaultSelectedDate })
        if (defaultSelectedDate) {
            setSelectedDateDirect(defaultSelectedDate)
            setCurrentDateDirect(
                new Date(defaultSelectedDate.getFullYear(), defaultSelectedDate.getMonth(), 1)
            )
            // No se inicializa hora por diseño
            setSelectedSlotDirect(null)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

   
    useEffect(() => {
        const fecha = getFechaHoraSeleccionada()
        const fechaInfo = {
            selectedDate,
            selectedSlot,
            fechaHoraISO: getFechaHoraSeleccionadaISO(),
            fecha: getFechaHoraSeleccionada(),
        }
        console.log('fechaInfo', fechaInfo)
        onSelectionChange && onSelectionChange(fechaInfo)

        console.log(fecha)
        if (!fecha) return
        onSlotSelect && onSlotSelect(fecha)

       
    }, [selectedDate, selectedSlot])

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
                        onDateSelect={selectDate}
                    />

                    <hr className='my-6 border-gray-200' />

                    <TimeSlots
                        now={now}
                        selectedDate={selectedDate}
                        horasDisponibles={horasDisponibles}
                        horasOcupadas={horasOcupadas}
                        onSlotSelect={(hora: string) => {
                            if (!selectedDate) return
                            selectSlot(hora)
                        }}
                    />
                </>
            )}
        </div>
    )
}

export default DateTimeSelector
