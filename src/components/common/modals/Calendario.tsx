import { useEffect, useState } from 'react'
import DateTimeSelector, { DateTimeSelection } from '../../calendario/DateTimeSelector'
import { useModalActions } from '../../../hooks/useModalActions'
import BaseModal from './BaseModal'

export function CalendarioModal({
    isOpen,
    onClose,
    initialDate,
    onConfirm,
}: {
    isOpen: boolean
    onClose: () => void
    initialDate?: Date
    onConfirm: (date: Date) => void
}) {
    const modalActions = useModalActions()
    useEffect(() => {
        setFechaSeleccionada(initialDate ?? null)
    }, [initialDate])
    const [fechaSeleccionada, setFechaSeleccionada] = useState<Date | null>(null)
    function handleSelectionChange(selection: DateTimeSelection) {
        setFechaSeleccionada(selection.fecha ?? null)
        console.log('Selected Date:', selection.selectedDate)
        console.log('Selected Slot:', selection.selectedSlot)
        console.log('Fecha y Hora ISO:', selection.fechaHoraISO)
    }
    function handleSlotSelect(date: Date) {
        console.log('Slot seleccionado')
        console.log('Fecha seleccionada:', date)
        modalActions.showConfirm({
            title: 'Confirmar',
            message: '¿Deseas proceder con la fecha seleccionada?',
            confirmText: 'Sí',
            cancelText: 'No',
            onConfirm: () => {
                onConfirm(date)
                onClose()
            },
            onCancel: () => {
                onClose()
            },

            type: 'info',
        })
    }

    return (
        <BaseModal title={'Calendario'} isOpen={isOpen} onClose={onClose}>
            <DateTimeSelector
                initialDate={initialDate ?? new Date()}
                onSelectionChange={handleSelectionChange}
                onSlotSelect={handleSlotSelect}
                defaultSelectedDate={fechaSeleccionada}
            />
        </BaseModal>
    )
}
