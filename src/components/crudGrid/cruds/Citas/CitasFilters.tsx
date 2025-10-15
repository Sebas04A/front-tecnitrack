import React, { useEffect, useMemo, useState } from 'react'
import GenericButton from '../../../form/Controls/GenericButton'
import GenericDate from '../../../form/Controls/GenericDate'
import GenericSelect from '../../../form/Controls/GenericSelect'
import { createFilter, Filter } from '../../helper/crud-helpers'
import { CitaDataCrud } from '../../../../types/cita'
import GenericSelectState from '../../../form/Controls/GenericSelectState'
import { FilterParamOption } from '../../helper/fetchWithFilters'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

export interface CitasFiltersType {
    fechaInicio: string
    fechaFin: string
    estadoCita: string
    tipoMantenimiento: string
}

export function CitasFilters({
    onChangeFilters,
}: {
    onChangeFilters: (filter: CitasFiltersType) => void
}) {
    // console.warn('Renderizando CitasFilters')
    const [dateRange, setDateRange] = useState([null, null])
    const [startDate, endDate] = dateRange

    const [filtros, setFiltros] = React.useState<CitasFiltersType>({
        fechaInicio: '',
        fechaFin: '',
        estadoCita: '',
        tipoMantenimiento: '',
    })

    // const processedFilters: Filter<CitaDataCrud>[] = useMemo(
    //     () =>
    //         createFilter<CitaDataCrud>()
    //             // Filtro de rango de fechas
    //             .whenValue(
    //                 filtros.fechaInicio,
    //                 (f, fecha) => f.greaterThanOrEqual('fechaHoraInicio', fecha) // ajusta 'fecha' por tu campo real
    //             )
    //             .whenValue(filtros.fechaFin, (f, fecha) =>
    //                 f.lessThanOrEqual('fechaHoraInicio', fecha)
    //             )

    //             // Filtro por estado
    //             .whenValue(
    //                 filtros.estadoCita,
    //                 (f, estado) => f.equals('estado', estado) // ajusta 'estado' por tu campo real
    //             )

    //             // Filtro por tipo de mantenimiento
    //             .whenValue(filtros.tipoMantenimiento, (f, tipo) =>
    //                 f.equals('tipoMantenimiento', tipo)
    //             )

    //             .build(),
    //     [filtros]
    // )
    const limpiarFiltros = () => {
        setFiltros({
            fechaInicio: '',
            fechaFin: '',
            estadoCita: '',
            tipoMantenimiento: '',
        })
    }

    useEffect(() => {
        console.warn('Filtros procesados actualizados:', filtros)
        onChangeFilters(filtros)
    }, [filtros])

    return (
        <div className='p-4 '>
            <div className='flex justify-between items-center px-4 w-full mb-4 '>
                <span className='text-2xl  font-semibold text-primary'>Filtros</span>
                <GenericButton
                    onClick={limpiarFiltros}
                    className='bg-background-auto'
                    type='button'
                    text='Limpiar'
                />
            </div>

            <div className='flex flex-wrap gap-4'>
                {/* <div className='flex-1 flex  gap-4'>
                    <GenericDate
                        label='Fecha y hora inicio'
                        name='fechaInicio'
                        inputType='datetime-local'
                        value={filtros.fechaInicio}
                        onChange={e => setFiltros({ ...filtros, fechaInicio: e.target.value })}
                        placeholder='Selecciona fecha y hora'
                        className='min-w-[21ch] flex-1'
                    />

                    <GenericDate
                        label='Fecha y hora fin'
                        name='fechaFin'
                        inputType='datetime-local'
                        value={filtros.fechaFin}
                        onChange={e => setFiltros({ ...filtros, fechaFin: e.target.value })}
                        placeholder='Selecciona fecha y hora'
                        className='min-w-[21ch] flex-1'
                    />
                </div> */}
                <div className='flex-1 flex  gap-4'>
                    <GenericDate
                        label='Fecha'
                        name='fechaInicio'
                        inputType='date'
                        value={filtros.fechaInicio}
                        onChange={e => setFiltros({ ...filtros, fechaInicio: e.target.value })}
                        placeholder='Selecciona fecha y hora'
                        className='min-w-[21ch] flex-1'
                    />
                    <GenericDate
                        label='Hora inicio'
                        name='fechaInicio'
                        inputType='date'
                        value={filtros.fechaInicio}
                        onChange={e => setFiltros({ ...filtros, fechaInicio: e.target.value })}
                        placeholder='Selecciona fecha y hora'
                        className='min-w-[21ch] flex-1'
                    />
                </div>
                <DatePicker
                    selectsRange={true}
                    startDate={startDate}
                    endDate={endDate}
                    onChange={update => {
                        setDateRange(update)
                    }}
                    isClearable={true} // Permite borrar la selección
                    placeholderText='Selecciona un rango de fechas'
                    className='w-full p-2 border border-gray-300 rounded-md' // Adapta las clases a tu diseño
                />

                <div className='flex-1 flex  gap-4'>
                    <GenericSelectState
                        label='Estado de la cita'
                        name='estadoCita'
                        tipoCatalogo='EstadoCita'
                        placeholderOptionLabel='Todos'
                        value={filtros.estadoCita}
                        onChange={e => setFiltros({ ...filtros, estadoCita: e.target.value })}
                        className=''
                        mostrarEspacioError={false}
                    />
                    <GenericSelectState
                        label='Tipo de Mantenimiento'
                        name='tipoMantenimiento'
                        tipoCatalogo='tipoMantenimiento'
                        placeholderOptionLabel='Todos'
                        value={filtros.tipoMantenimiento}
                        onChange={e =>
                            setFiltros({ ...filtros, tipoMantenimiento: e.target.value })
                        }
                        mostrarEspacioError={false}
                    />
                </div>
            </div>
        </div>
    )
}
