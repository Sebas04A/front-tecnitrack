import React, { useEffect } from 'react'
import GenericSelect from './GenericSelect'
import { Option } from '../../../types/form'
import {
    obtenerCiudadesPorProvinciaSelect,
    obtenerPaisesSelect,
    obtenerProvinciasPorPaisSelect,
} from '../../../services/localidadesApi'

export default function GenericLocalidadesSelect() {
    const [direccion, setDireccion] = React.useState({
        pais: -1,
        provincia: -1,
        ciudad: -1,
    })
    const [paises, setPaises] = React.useState<Option[]>([])
    const [provincias, setProvincias] = React.useState<Option[]>([])
    const [ciudades, setCiudades] = React.useState<Option[]>([])

    useEffect(() => {
        console.log('Obteniendo Direcciones')
        obtenerPaisesSelect().then(data => {
            console.log('Paises obtenidos:', data)
            setPaises(data)
        })
    }, [])
    useEffect(() => {
        console.log('Pais cambiado:', direccion.pais)
        if (direccion.pais == -1) return
        obtenerProvinciasPorPaisSelect(direccion.pais).then(data => {
            setProvincias(data)
        })
    }, [direccion.pais])
    useEffect(() => {
        console.log('Provincia cambiado:', direccion.provincia)
        if (direccion.provincia == -1) return
        obtenerCiudadesPorProvinciaSelect(direccion.provincia).then(data => {
            setCiudades(data)
        })
    }, [direccion.provincia])
    return (
        <div className='flex justify-center items-center w-full h-full p-6'>
            <div>
                <GenericSelect
                    label='Pais'
                    name='pais'
                    isReadOnly={false}
                    options={paises}
                    value={direccion.pais.toString() ?? 'Cargando..'}
                    onChange={value => {
                        console.log(value.currentTarget.value)
                        const paisId = Number(value.target.value)
                        setDireccion(prev => ({ pais: paisId, provincia: -1, ciudad: -1 }))
                    }}
                />
                <GenericSelect
                    label='Provincia'
                    name='provincia'
                    isReadOnly={!direccion.pais}
                    options={provincias}
                    value={direccion.provincia.toString() ?? 'Cargando...'}
                    onChange={value => {
                        console.log(value.currentTarget.value)
                        const provinciaId = Number(value.target.value)
                        setDireccion(prev => ({ ...prev, provincia: provinciaId, ciudad: -1 }))
                    }}
                />
                <GenericSelect
                    label='Ciudad'
                    name='ciudad'
                    isReadOnly={false}
                    options={ciudades}
                    value={'Cargando...'}
                    onChange={value => {
                        console.log(value.currentTarget.value)
                        const ciudadId = Number(value.target.value)
                        setDireccion(prev => ({ ...prev, ciudad: ciudadId }))
                    }}
                />
            </div>
        </div>
    )
}
