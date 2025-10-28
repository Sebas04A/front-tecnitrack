import React, { useEffect, useMemo, useState } from 'react'
import GenericButton from '../../../../../components/form/Controls/GenericButton'
import GenericDate from '../../../../../components/form/Controls/GenericDate'

import GenericSelectState from '../../../../../components/form/Controls/GenericSelectState'

import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { CitasFiltersType } from '../models/citaFiltersType'
import { convertirDateParaInput } from '../../../../../adapters/fecha'

export function CitasFilters({
    onChangeFilters,
}: {
    onChangeFilters: (filter: CitasFiltersType) => void
}) {
    // console.warn('Renderizando CitasFilters')
    const [dateRange, setDateRange] = useState<Date[] | null[]>([null, null])
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
                {/* <GenericDate
                    label='Fecha Inicio'
                    name='fechaInicio'
                    inputType='date'
                    value={filtros.fechaInicio}
                    onChange={e => setFiltros({ ...filtros, fechaInicio: e.target.value })}
                    placeholder='Selecciona fecha y hora'
                    className='min-w-[21ch] flex-1'
                /> */}

                {/* <GenericDate
                    label='Fecha Fin'
                    name='fechaFin'
                    inputType='date'
                    value={filtros.fechaInicio}
                    onChange={e => setFiltros({ ...filtros, fechaInicio: e.target.value })}
                    placeholder='Selecciona fecha y hora'
                    className='min-w-[21ch] flex-1'
                /> */}
            </div>

            <div className='flex flex-wrap gap-4'>
                <div className='flex flex-col justify-end flex-1 h-full min-w-[100px] mt-auto'>
                    <label
                        className='block mb-1 ms-1 text-xs sm:text-sm md:text-base '
                        htmlFor={'fechaRango'}
                    >
                        {'Rango Fechas'}
                    </label>
                    <DatePicker
                        name='fechaRango'
                        timeInputLabel='Gola'
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        isClearable
                        toggleCalendarOnIconClick
                        onChange={update => {
                            console.log('Rango de fechas seleccionado:', update)
                            const fechaInicio = update[0]
                                ? convertirDateParaInput(update[0] as Date)
                                : null
                            const fechaFin = update[1]
                                ? convertirDateParaInput(update[1] as Date)
                                : null
                            setFiltros({
                                ...filtros,
                                fechaInicio: fechaInicio ?? '',
                                fechaFin: fechaFin ?? '',
                            })
                            const datos = update as Date[]
                            setDateRange(datos)
                        }}
                        // isClearable={true} // Permite borrar la selección
                        placeholderText='Selecciona un rango de fechas'
                        className='w-full p-2 border border-gray-300 rounded-md h-[3rem] bg-background-auto  border-gray-300' // Adapta las clases a tu diseño
                    />
                </div>
                <GenericDate
                    label='Hora inicio'
                    name='horaInicio'
                    inputType='time'
                    value={filtros.fechaInicio.split('T')[1] || ''}
                    onChange={e => {
                        let fechaInicio = filtros.fechaInicio.split('T')[0]
                        fechaInicio = fechaInicio ? fechaInicio : '1970-01-01'
                        fechaInicio += 'T' + e.target.value

                        setFiltros({ ...filtros, fechaInicio: fechaInicio })
                    }}
                    placeholder='Selecciona fecha y hora'
                    className='min-w-[21ch] flex-1'
                />
                <GenericDate
                    label='Hora Fin'
                    name='horaFin'
                    inputType='time'
                    value={filtros.fechaFin.split('T')[1] || ''}
                    onChange={e => {
                        let fechaFin = filtros.fechaFin.split('T')[0]
                        fechaFin = fechaFin ? fechaFin : '1970-01-01'
                        fechaFin += 'T' + e.target.value
                        setFiltros({ ...filtros, fechaFin: fechaFin })
                    }}
                    placeholder='Selecciona fecha y hora'
                    className='min-w-[21ch] flex-1'
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
