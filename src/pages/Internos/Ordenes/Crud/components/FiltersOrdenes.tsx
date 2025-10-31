import { useEffect, useMemo, useState } from 'react'
import { Filter } from '../../../../../components/crud/helper/crud-helpers'
import { OrdenesFiltersType } from '../models/ordenFilter'
import GenericButton from '../../../../../components/form/Controls/GenericButton'
import GenericDate from '../../../../../components/form/Controls/GenericDate'
import GenericSelectState from '../../../../../components/form/Controls/GenericSelectState'
import { set, useForm } from 'react-hook-form'
import GenericSelectSearch from '../../../../../components/form/Controls/GenericSelectSearch'
import GenericSelect from '../../../../../components/form/Controls/GenericSelect'

export function OrdenesFilters({
    onChangeFilters,
}: {
    onChangeFilters: (filters: OrdenesFiltersType) => void
}) {
    const form = useForm<OrdenesFiltersType>()
    // const [filters, setFilters] = useState<OrdenesFiltersType>({
    //     estado: '',
    //     tipoMantenimiento: '',
    //     tipoEquipo: '',
    //     tecnico: '',
    // })

    // const processedFilters: Filter<any>[] = useMemo(
    //     () =>
    //         createFilter<any>()
    //             .whenValue(filters.estado, (f, estado) => f.equals('estado', estado))
    //             .whenValue(filters.tipoMantenimiento, (f, tipo) =>
    //                 f.equals('tipoMantenimiento', tipo)
    //             )
    //             .whenValue(filters.tipoEquipo, (f, tipo) => f.equals('tipoEquipo', tipo))
    //             .build(),
    //     [filters]
    // )
    const clearFilters = () => {
        form.reset()
    }
    function sendNewFilter() {
        const currentValues = form.getValues()
        onChangeFilters(form.getValues())
    }
    useEffect(() => {
        // La función watch() se suscribe a los cambios de cualquier campo
        const subscription = form.watch(value => {
            // Cada vez que un campo cambia, se llama a onChangeFilters con los nuevos valores
            onChangeFilters(value as OrdenesFiltersType)
        })
        // Es importante desuscribirse cuando el componente se desmonte para evitar fugas de memoria
        return () => subscription.unsubscribe()
    }, [form.watch, onChangeFilters]) // Dependencias del efecto

    return (
        <div className='p-4 '>
            <div className='flex justify-between items-center px-4 w-full mb-4 '>
                <span className='text-2xl  font-semibold text-primary'>Filtros</span>
                <GenericButton
                    onClick={clearFilters}
                    className='bg-background-auto'
                    type='button'
                    text='Limpiar'
                />
            </div>
            <div className='flex flex-wrap gap-4'>
                <GenericDate
                    name='fechaIngresoDesde'
                    label='Fecha Ingreso Desde'
                    register={form.register}
                    mostrarEspacioError={false}
                />
                <GenericDate
                    name='fechaIngresoHasta'
                    label='Fecha Ingreso Hasta'
                    register={form.register}
                    mostrarEspacioError={false}
                />

                {/* <GenericSelect name={'Tecnico'} label='Técnico' control={form.control} /> */}

                <GenericSelectSearch
                    name='tecnico'
                    label='Técnico'
                    control={form.control}
                    mostrarEspacioError={false}
                />
                <GenericSelect
                    name={'prioridad'}
                    label='Prioridad'
                    control={form.control}
                    className='min-w-[21ch] flex-1'
                    tipoCatalogo='prioridad'
                    mostrarEspacioError={false}
                />
                <GenericSelect
                    name={'estado'}
                    label='Estado'
                    control={form.control}
                    className='min-w-[21ch] flex-1'
                    mostrarEspacioError={false}
                    tipoCatalogo='estadoOrden'
                />
                {/* <GenericSelect
                    name='Prioridad'
                    label='Prioridad'
                    control={form.control}
                    className='min-w-[21ch] flex-1'
                    tipoCatalogo='prioridad'
                    mostrarEspacioError={false}
                /> */}
                {/* <GenericSelectState
                    name={'TipoMantenimiento'}
                    label='Tipo de Mantenimiento'
                    value={filters.tipoMantenimiento}
                    onChange={e => setFilters({ ...filters, tipoMantenimiento: e.target.value })}
                    className='min-w-[21ch] flex-1'
                    tipoCatalogo='tipoMantenimiento'
                /> */}

                {/* <GenericSelectState
                    name={'TipoEquipo'}
                    label='Tipo de Equipo'
                    value={filters.tipoEquipo}
                    onChange={e => setFilters({ ...filters, tipoEquipo: e.target.value })}
                    className='min-w-[21ch] flex-1'
                    tipoCatalogo='tipoEquipo'
                /> */}
            </div>
        </div>
    )
}
