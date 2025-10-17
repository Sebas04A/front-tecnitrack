import React, { useEffect, useMemo } from 'react'
import StatCard from '../../components/dashboard/StatCard'
import { FaClipboardList } from 'react-icons/fa'

import CrudCrudo, { newActionCrud } from '../../components/crudGrid/CrudCrudo'
import { ColumnDef } from '../../components/crudGrid'
import { createFilter, Filter } from '../../components/crudGrid/helper/crud-helpers'
import GenericButton from '../../components/form/Controls/GenericButton'
import GenericSelect from '../../components/form/Controls/GenericSelect'

import { BsPlayFill } from 'react-icons/bs'
import { BiCheck } from 'react-icons/bi'
import { PiUserSquareFill } from 'react-icons/pi'
import GenericSelectState from '../../components/form/Controls/GenericSelectState'
import { fetchDataCrudWithFilters } from '../../components/crudGrid/helper/fetchWithFilters'
import { obtenerOrdenesAsignadasInterno } from '../../services/Interno/ordenes'

function InfoCards() {
    return (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
            <StatCard icon={<FaClipboardList />} title='Total Asignadas' value={15} />
            <StatCard icon={<FaClipboardList />} title='Total Completadas' value={10} />
            <StatCard icon={<FaClipboardList />} title='Total Pendientes' value={3} />
            <StatCard icon={<FaClipboardList />} title='Total En Proceso' value={2} />
        </div>
    )
}

function Filters({ onChangeFilters }: { onChangeFilters: (filters: Filter<any>[]) => void }) {
    const [filters, setFilters] = React.useState<{
        estado: string
        tipoMantenimiento: string
        tipoEquipo: string
    }>({ estado: '', tipoMantenimiento: '', tipoEquipo: '' })

    const processedFilters: Filter<any>[] = React.useMemo(
        () =>
            createFilter<any>()
                .whenValue(filters.estado, (f, estado) => f.equals('estado', estado))
                .whenValue(filters.tipoMantenimiento, (f, tipo) =>
                    f.equals('tipoMantenimiento', tipo)
                )
                .whenValue(filters.tipoEquipo, (f, tipo) => f.equals('tipoEquipo', tipo))
                .build(),
        [filters]
    )
    const clearFilters = () => {
        setFilters({ estado: '', tipoMantenimiento: '', tipoEquipo: '' })
    }
    useEffect(() => {
        onChangeFilters(processedFilters)
    }, [processedFilters])

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
                <GenericSelectState
                    name={'Estado'}
                    label='Estado'
                    value={filters.estado}
                    onChange={e => setFilters({ ...filters, estado: e.target.value })}
                    className='min-w-[21ch] flex-1'
                    tipoCatalogo='ESTADO_ORDEN'
                />
                <GenericSelectState
                    name={'TipoMantenimiento'}
                    label='Tipo de Mantenimiento'
                    value={filters.tipoMantenimiento}
                    onChange={e => setFilters({ ...filters, tipoMantenimiento: e.target.value })}
                    className='min-w-[21ch] flex-1'
                    tipoCatalogo='tipoMantenimiento'
                />
                <GenericSelectState
                    name={'TipoEquipo'}
                    label='Tipo de Equipo'
                    value={filters.tipoEquipo}
                    onChange={e => setFilters({ ...filters, tipoEquipo: e.target.value })}
                    className='min-w-[21ch] flex-1'
                    tipoCatalogo='tipoEquipo'
                />
            </div>
        </div>
    )
}

const columns: ColumnDef<any>[] = [
    { key: 'numeroOrden', header: '# Orden', sortable: true },
    { key: '', header: 'Tipo de Equipo', sortable: true },
    { key: 'subtipo', header: 'Subtipo', sortable: true },
    { key: 'estadoMantenimiento', header: 'Estado Mantenimiento', sortable: true },
    { key: 'estado', header: 'Estado Orden', sortable: true },
    { key: 'tipoMantenimiento', header: 'Tipo de Mantenimiento', sortable: true },
    { key: 'fechaIngresoOrden', header: 'Fecha Asignación', sortable: true },
]

// const style_buttons = 'flex text-sm justify-center items-center gap-2 px-3 py-2 rounded'
const style_icon = 'size-6'
export default function OrdenesAsignadas() {
    const actionsCrud: newActionCrud<any>[] = [
        {
            component: (): JSX.Element => (
                // <div className={`${style_buttons} bg-info-auto`}>
                <BsPlayFill className={`text-info ${style_icon}`} />
                // </div>
            ),
            onAction: (row: any) => {
                console.log('Ver detalles de', row)
            },
        },
        {
            component: (): JSX.Element => (
                // <button className={`${style_buttons} bg-success-auto `}>
                <BiCheck className={`text-success ${style_icon}`} />
                // </button>
            ),
            onAction: (row: any) => {
                console.log('Marcar como completada', row)
            },
        },
        {
            component: (): JSX.Element => (
                // <button className={`${style_buttons} bg-warning-auto `}>
                <PiUserSquareFill className={`text-warning ${style_icon}`} />
                // </button>
            ),
            onAction: (row: any) => {
                console.log('Marcar como cancelada', row)
            },
        },
    ]
    const fetchData = useMemo(
        () =>
            fetchDataCrudWithFilters<any, any>({
                fetchData: obtenerOrdenesAsignadasInterno,
            }),
        []
    )

    return (
        <div>
            <InfoCards />
            <CrudCrudo
                newActionsCrud={actionsCrud}
                columns={columns}
                fetchData={fetchData}
                FiltersComponent={Filters}
            />
        </div>
    )
}
