import { useState, useEffect } from 'react'
import {
    obtenerCiudadesPorProvinciaSelect,
    obtenerPaisesSelect,
    obtenerProvinciasPorPaisSelect,
} from '../services/Select/localidadesSelectApi'
import { Option } from '../types/form'

export const useLocalidades = (paisId?: number, provinciaId?: number) => {
    const [paises, setPaises] = useState<Option[]>([])
    const [provincias, setProvincias] = useState<Option[]>([])
    const [ciudades, setCiudades] = useState<Option[]>([])

    // Cargar países al montar el hook
    useEffect(() => {
        obtenerPaisesSelect().then(setPaises)
    }, [])

    // Cargar provincias cuando cambia el paisId
    useEffect(() => {
        if (!paisId || paisId === -1) {
            setProvincias([])
            return
        }
        obtenerProvinciasPorPaisSelect(paisId).then(setProvincias)
    }, [paisId])

    // Cargar ciudades cuando cambia el provinciaId
    useEffect(() => {
        if (!provinciaId || provinciaId === -1) {
            setCiudades([])
            return
        }
        obtenerCiudadesPorProvinciaSelect(provinciaId).then(setCiudades)
    }, [provinciaId])

    return { paises, provincias, ciudades }
}
