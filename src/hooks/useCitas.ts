// src/components/citas/hooks/useCitas.ts
import { useState, useEffect, useMemo } from 'react'
import { Cita } from '../types/cita'
import { obtenerCitas } from '../services/citasApi'

const DURACION_CITA = 15
const HORA_INICIO = 8 // 8:00 AM
const HORA_FIN = 18 // 11:00 PM

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
    const [citas, setCitas] = useState<Cita[]>([])
    const [currentDate, setCurrentDate] = useState<Date>(initialDate)
    const [selectedDate, setSelectedDate] = useState<Date | null>(null)
    const [loading, setLoading] = useState(true)

    // ❗ NUEVO: Obtenemos la fecha y hora actual una sola vez para mantener la consistencia
    const now = useMemo(() => new Date(), [])

    // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
        const fetchCitas = async () => {
            setLoading(true)
            const data = await obtenerCitas()
            setCitas(data)
            setLoading(false)
        }
        fetchCitas()
    }, [])

    // Procesamos las citas para identificar fácilmente los días completos
    const diasCompletos = useMemo(() => {
        const citasPorDia = new Map<string, number>()
        citas.forEach(cita => {
            const fecha = cita.fechaHoraInicio.split('T')[0] // "YYYY-MM-DD"
            citasPorDia.set(fecha, (citasPorDia.get(fecha) || 0) + 1)
        })

        const diasLlenos = new Set<string>()
        citasPorDia.forEach((count, fecha) => {
            if (count >= TOTAL_SLOTS_PER_DAY) {
                diasLlenos.add(fecha)
            }
        })
        return diasLlenos
    }, [citas])

    // Filtramos las horas ocupadas para la fecha seleccionada
    const horasOcupadas = useMemo(() => {
        if (!selectedDate) return new Set<string>()

        const fechaSeleccionadaStr = selectedDate.toISOString().split('T')[0]
        const horas = new Set<string>()

        citas.forEach(cita => {
            const fechaCitaStr = cita.fechaHoraInicio.split('T')[0]
            if (fechaCitaStr === fechaSeleccionadaStr) {
                const hora = cita.fechaHoraInicio.substring(11, 16) // "HH:MM"
                horas.add(hora)
            }
        })
        return horas
    }, [citas, selectedDate])

    const handleDateSelect = (day: number) => {
        console.log('Día seleccionado:', day)
        if (day === selectedDate?.getDate() && currentDate.getMonth() === selectedDate.getMonth()) {
            setSelectedDate(null) // Deseleccionar si ya estaba seleccionado
            return
        }
        setSelectedDate(new Date(currentDate.getFullYear(), currentDate.getMonth(), day))
    }

    const goToNextMonth = () =>
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1))
    const goToPrevMonth = () =>
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1))

    return {
        loading,
        now,
        currentDate,
        selectedDate,
        diasCompletos,
        horasDisponibles: HORAS_DISPONIBLES_DIA,
        horasOcupadas,
        handleDateSelect,
        goToNextMonth,
        goToPrevMonth,
    }
}
