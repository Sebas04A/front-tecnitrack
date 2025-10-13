// src/components/citas/hooks/useCitas.ts
import { useState, useEffect, useMemo } from 'react'
import { citaDataCompleta as Cita } from '../types/cita'
import { obtenerCitas } from '../services/citasApi'

const DURACION_CITA = 15
const HORA_INICIO = 8 // 8:00 AM
const HORA_FIN = 18 // 6:00 PM

// Definimos las horas de trabajo disponibles.
const HORAS_DISPONIBLES_DIA = Array.from(
    { length: ((HORA_FIN - HORA_INICIO) * 60) / DURACION_CITA },
    (_, i) => {
        const hour = Math.floor((i * DURACION_CITA) / 60) + HORA_INICIO
        const minute = (i * DURACION_CITA) % 60
        return `${String(hour).padStart(2, '0')}:${String(minute).padStart(2, '0')}`
    }
)
const TOTAL_SLOTS_PER_DAY = HORAS_DISPONIBLES_DIA.length

export const useCitas = (initialDate: Date = new Date()) => {
    const [citasFechas, setCitasFechas] = useState<Cita[]>([])
    const [currentDate, setCurrentDate] = useState<Date>(initialDate)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [selectedSlot, setSelectedSlot] = useState<string | null>(null)
    const [loading, setLoading] = useState(true)

    // Fecha/hora "actual" fija para consistencia visual durante una sesión de render
    const now = useMemo(() => new Date(), [])
    useEffect(() => {
        const fetchCitas = async () => {
            setLoading(true)
            const data = await obtenerCitas()
            console.log('Citas obtenidas:', data)
            for (const cita of data) {
                // Aseguramos que las fechas estén en formato ISO
                console.log('fecha', new Date(cita.fechaHoraInicio ?? ''))
            }

            setCitasFechas(data)
            setLoading(false)
        }
        fetchCitas()
    }, [])

    // Días completamente llenos
    const diasCompletos = useMemo(() => {
        const citasPorDia = new Map<string, number>()

        citasFechas.forEach(cita => {
            const fecha = cita.fechaHoraInicio.split('T')[0] // "YYYY-MM-DD"
            citasPorDia.set(fecha, (citasPorDia.get(fecha) || 0) + 1)
        })

        const diasLlenos = new Set<string>()
        citasPorDia.forEach((count, fecha) => {
            if (count >= TOTAL_SLOTS_PER_DAY) diasLlenos.add(fecha)
        })
        return diasLlenos
    }, [citasFechas])

    // Horas ocupadas para la fecha seleccionada
    const horasOcupadas = useMemo(() => {
        if (!selectedDate) return new Set<string>()
        const fechaSeleccionadaStr = selectedDate.toISOString().split('T')[0]
        const horas = new Set<string>()
        citasFechas.forEach(cita => {
            const fechaCitaStr = cita.fechaHoraInicio.split('T')[0]
            if (fechaCitaStr === fechaSeleccionadaStr) {
                const hora = cita.fechaHoraInicio.substring(11, 16) // "HH:MM"
                horas.add(hora)
            }
        })
        return horas
    }, [citasFechas, selectedDate])

    // Seleccionar día
    const selectDate = (day: number) => {
        if (
            day === selectedDate?.getDate() &&
            selectedDate &&
            currentDate.getMonth() === selectedDate.getMonth()
        ) {
            // Deseleccionar el mismo día
            setSelectedDate(null)
            setSelectedSlot(null)
            return
        }
        const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day)
        setSelectedDate(newDate)
        setSelectedSlot(null) // Al cambiar de fecha, resetea la hora
    }

    // Seleccionar hora
    const selectSlot = (hora: string) => {
        console.log('Hora seleccionada:', hora)
        setSelectedSlot(hora)
    }

    // Navegación de meses
    const goToNextMonth = () =>
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    const goToPrevMonth = () =>
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))

    // Utilidad: construir ISO de la selección completa
    const getFechaHoraSeleccionadaISO = (): string | null => {
        // Armamos la fecha local en formato YYYY-MM-DDTHH:mm:ss
        const dt = getFechaHoraSeleccionada()
        if (!dt) return null
        const year = dt.getFullYear()
        const month = String(dt.getMonth() + 1).padStart(2, '0')
        const day = String(dt.getDate()).padStart(2, '0')
        const hours = String(dt.getHours()).padStart(2, '0')
        const minutes = String(dt.getMinutes()).padStart(2, '0')
        const seconds = String(dt.getSeconds()).padStart(2, '0')

        const localString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`
        console.log('Fecha| hora seleccionada Local:', localString)

        return localString
    }

    const getFechaHoraSeleccionada = (): Date | null => {
        if (!selectedDate || !selectedSlot) return null
        const [hour, minute] = selectedSlot.split(':').map(Number)
        console.log('Hora seleccionada:', hour, minute)
        console.log('Fecha seleccionada:', selectedDate)
        const dt = new Date(selectedDate)
        dt.setHours(hour, minute, 0, 0)
        console.log('Fecha| hora seleccionada:', dt)
        return dt
    }

    return {
        // estado
        loading,
        now,
        currentDate,
        selectedDate,
        selectedSlot,
        // datos derivados
        diasCompletos,
        horasDisponibles: HORAS_DISPONIBLES_DIA,
        horasOcupadas,
        // acciones
        selectDate,
        selectSlot,
        goToNextMonth,
        goToPrevMonth,
        getFechaHoraSeleccionadaISO,
        getFechaHoraSeleccionada,
        // Setters directos para rehidratación desde navegación
        setSelectedDateDirect: setSelectedDate,
        setCurrentDateDirect: setCurrentDate,
        setSelectedSlotDirect: setSelectedSlot,
    }
}
