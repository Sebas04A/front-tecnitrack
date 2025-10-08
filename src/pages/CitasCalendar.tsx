// src/pages/CitasCalendar.tsx
import React from 'react'
import { useModal } from '../hooks/useModal'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import IngresarCitaModal from '../components/citas/IngresarCitaModal'
import { useModalActions } from '../hooks/useModalActions'
import DateTimeSelector, { DateTimeSelection } from '../components/citas/DateTimeSelector'

export const CitasCalendar: React.FC = () => {
    const { user } = useAuth()
    const navigate = useNavigate()
    const location = useLocation()

    const modalActions = useModalActions()
    const modal = useModal()

    const [selection, setSelection] = React.useState<DateTimeSelection>({
        selectedDate: null,
        selectedSlot: null,
        fechaHoraISO: null,
        fecha: null,
    })

    // Tomar selección inicial desde location.state
    const citaSel = (location.state as any)?.citaSeleccionada as
        | { dateISO: string; slot: string }
        | undefined
    console.log('citaSel:', citaSel)
    const defaultSelectedDate = React.useMemo(
        () => (citaSel?.dateISO ? new Date(citaSel.dateISO) : null),
        [citaSel]
    )
    console.log('defaultSelectedDate:', defaultSelectedDate)
    console.log(location.state)
    // const defaultSelectedSlot = citaSel?.slot ?? null

    // Limpiar state de navegación al montar
    React.useEffect(() => {
        if (citaSel?.dateISO && citaSel?.slot) {
            navigate(location.pathname, { replace: true })
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    React.useEffect(() => {
        if (selection.fecha && selection.selectedSlot) {
            console.log('Abriendo modal para fecha:', selection.fecha)
            abrirModalConfirmarFecha(selection.fecha)
        }
    }, [selection])

    const handleConfirmCita = () => {
        const selectedDate = selection.selectedDate
        console.log({ selection })
        if (!selectedDate || !selection.fechaHoraISO) return

        // No logeado: mandar a login con retorno a calendario y conservar selección
        if (!user) {
            navigate('/login', {
                state: {
                    returnTo: '/calendario',
                    citaSeleccionada: {
                        dateISO: selection.fechaHoraISO,
                        slot: selection.selectedSlot,
                    },
                },
            })
            return
        }

        console.warn(selectedDate, selection)

        // // Autenticado: construir payload listo para API
        // const [h, m] = selectedSlot.split(':').map(Number)
        // const inicio = new Date(selectedDate)
        // inicio.setHours(h, m, 0, 0)

        // console.log(inicio)
        // console.log('Cita confirmada:', {
        //     fechaHoraInicio: inicio.toISOString(),
        //     slot: selectedSlot,
        // })

        abrirModalCita(selection.fechaHoraISO)
    }

    function abrirModalCita(fechaISO: string) {
        const id = modal.openModal({
            component: IngresarCitaModal,
            props: {
                fecha: fechaISO || '',
                isOpen: true,
                onClose: () => {
                    modal.closeModal(id)
                    setSelection({
                        selectedDate: null,
                        selectedSlot: null,
                        fechaHoraISO: null,
                        fecha: null,
                    })
                },
            },
        })
    }

    function abrirModalConfirmarFecha(date: Date) {
        const slot = date.toTimeString().slice(0, 5)
        console.warn({ selection })
        console.warn('Abriendo modal para fecha:', date)
        const id = modalActions.showConfirm({
            title: 'Confirmar Cita',
            message: `¿Deseas confirmar la cita para el ${date.toLocaleDateString()} a las ${slot}?`,
            confirmText: 'Sí, confirmar',
            cancelText: 'No, cancelar',
            onConfirm: () => {
                modalActions.closeModal(id)
                handleConfirmCita()
            },
            onCancel: () => modalActions.closeModal(id),
            type: 'info',
        })
    }

    return (
        <div>
            <DateTimeSelector
                defaultSelectedDate={selection.selectedDate}
                onSelectionChange={s => setSelection(s)}
                // onSlotSelect={date => abrirModalConfirmarFecha(date)}
            />
        </div>
    )
}
