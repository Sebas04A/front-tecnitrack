import React, { useEffect, useState } from 'react'
import GenericSelect from './GenericSelect'
import { Option } from '../../../types/form'
import {
    obtenerCiudadesPorProvinciaSelect,
    obtenerPaisesSelect,
    obtenerProvinciasPorPaisSelect,
} from '../../../services/Select/localidadesSelectApi'
import { use } from 'framer-motion/m'

// Define el tipo para el valor que manejará el componente
export interface LocalidadesValue {
    pais: number
    provincia: number
    ciudad: number
    paisNombre?: string
    provinciaNombre?: string
    ciudadNombre?: string
}

// Define las props del componente
interface GenericLocalidadesSelectProps {
    // value: LocalidadesValue
    watch: any
    onChange: (newValue: LocalidadesValue) => void
    // disabled?: boolean // Prop opcional para deshabilitar los selects
    isReadOnly?: boolean
    control?: any
    // watch?: any
}

export default function GenericLocalidadesSelect({
    watch,
    onChange,
    // disabled = false,
    isReadOnly,
    control,
}: GenericLocalidadesSelectProps) {
    const value = watch()
    console.log('VALUES', value)
    // Los estados para las opciones se mantienen internos
    const [paises, setPaises] = useState<Option[]>([])
    const [provincias, setProvincias] = useState<Option[]>([])
    const [ciudades, setCiudades] = useState<Option[]>([])

    // --- LÓGICA DE FETCHING (casi sin cambios) ---
    useEffect(() => {
        obtenerPaisesSelect().then(setPaises)
    }, [])

    useEffect(() => {
        if (value.pais === -1 && value.provincia === -1) {
            setProvincias([]) // Limpia las provincias si no hay país seleccionado
            return
        }
        obtenerProvinciasPorPaisSelect(value.pais).then(setProvincias)
    }, [value.pais])

    useEffect(() => {
        if (value.provincia === -1 && value.ciudad === -1) {
            setCiudades([]) // Limpia las ciudades si no hay provincia seleccionada
            return
        }
        obtenerCiudadesPorProvinciaSelect(value.provincia).then(setCiudades)
    }, [value.provincia])

    // --- MANEJADORES DE CAMBIOS ---
    // Ahora llaman a la prop `onChange` en lugar de `setDireccion`
    // const pais = watch('pais')
    // useEffect(() => {
    //     console.log('GenericLocalidadesSelect - pais cambiado:', pais)
    //     onChange({
    //         ...value,
    //         pais: pais,
    //         provincia: -1,
    //         ciudad: -1,
    //     })
    // }, [pais])

    const handlePaisChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        console.log('GenericLocalidadesSelect - handlePaisChange:', e.target.value)
        const paisId = Number(e.target.value)
        // Al cambiar de país, reseteamos provincia y ciudad
        onChange({
            pais: paisId,
            provincia: -1,
            ciudad: -1,
        })
    }

    const handleProvinciaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const provinciaId = Number(e.target.value)
        // Al cambiar de provincia, reseteamos la ciudad
        onChange({
            ...value,
            provincia: provinciaId,
            ciudad: -1,
        })
    }

    const handleCiudadChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const ciudadId = Number(e.target.value)
        onChange({
            ...value,
            ciudad: ciudadId,
        })
    }

    return (
        <div className='flex flex-col md:flex-row md:space-x-4 w-full'>
            <GenericSelect
                label='País'
                name='pais'
                options={paises}
                value={value.pais} // El valor viene de las props
                onChange={handlePaisChange} // Usa el nuevo manejador
                isReadOnly={isReadOnly}
                control={control}
                mostrarEspacioError={true}
            />
            <GenericSelect
                label='Provincia'
                name='provincia'
                options={provincias}
                value={value.provincia.toString()} // El valor viene de las props
                onChange={handleProvinciaChange} // Usa el nuevo manejador
                isReadOnly={isReadOnly || value.pais === -1} // Deshabilitado si no hay país
                control={control}
                mostrarEspacioError={true}
            />
            <GenericSelect
                label='Ciudad'
                name='ciudad'
                options={ciudades}
                value={value.ciudad.toString()} // El valor viene de las props
                onChange={handleCiudadChange} // Usa el nuevo manejador
                isReadOnly={isReadOnly || value.provincia === -1} // Deshabilitado si no hay provincia
                control={control}
                mostrarEspacioError={true}
            />
        </div>
    )
}
