import React, { useMemo } from 'react'
import CrudCrudo, {
    newActionCrud,
    onCrudActionsProps,
} from '../../../../../components/crudGrid/CrudCrudo'
import { BsPlayFill } from 'react-icons/bs'
import { BiCheck } from 'react-icons/bi'
import { fetchDataCrudWithFilters } from '../../../../../components/crudGrid/helper/fetchWithFilters'
import {
    obtenerOrdenesAsignadasInterno,
    obtenerOrdenesAsignadasInternoFetcher,
} from '../services/ordenes'
import { ColumnDef } from '../../../../../components/crudGrid'
import { OrdenesFilters } from './FiltersOrdenes'
import { OrdenesFiltersType } from '../models/ordenFilter'
import { OrdenData } from '../models/ordenData'

// export default function CrudOrdenes() {
//   return (
//     <div>CrudOrdenes</div>
//   )
// }

const columns: ColumnDef<any>[] = [
    { key: 'numeroOrden', header: '# Orden', sortable: true },
    {
        key: 'fechaIngresoOrden',
        header: 'Fecha Ingreso',
        sortable: true,
        render: (row: string) => row.split('T')[0],
    },
    { key: 'clienteNombre', header: 'Cliente', sortable: true },
    { key: 'equipoNombre', header: 'Equipo', sortable: true },
    { key: 'tipoMantenimiento', header: 'Tipo de Mantenimiento', sortable: true },
    { key: 'tecnicoNombre', header: 'Técnico', sortable: true },
    { key: 'prioridad', header: 'Prioridad', sortable: true },
    { key: 'estado', header: 'Estado Orden', sortable: true },

    // { key: '', header: 'Tipo de Equipo', sortable: true },
    // { key: 'subtipo', header: 'Subtipo', sortable: true },
    // { key: 'estadoMantenimiento', header: 'Estado Mantenimiento', sortable: true },
    { key: 'progreso', header: 'Progreso', sortable: true },
]

const style_icon = 'size-6'

export default function CrudOrdenes() {
    // const actionsCrud: newActionCrud<any>[] = [
    //     {
    //         component: (): JSX.Element => (
    //             // <div className={`${style_buttons} bg-info-auto`}>
    //             <BsPlayFill className={`text-info ${style_icon}`} />
    //             // </div>
    //         ),
    //         onAction: (row: any) => {
    //             console.log('Ver detalles de', row)
    //         },
    //     },
    //     {
    //         component: (): JSX.Element => (
    //             // <button className={`${style_buttons} bg-success-auto `}>
    //             <BiCheck className={`text-success ${style_icon}`} />
    //             // </button>
    //         ),
    //         onAction: (row: any) => {
    //             console.log('Marcar como completada', row)
    //         },
    //     },
    //     {
    //         component: (): JSX.Element => (
    //             // <button className={`${style_buttons} bg-warning-auto `}>
    //             <PiUserSquareFill className={`text-warning ${style_icon}`} />
    //             // </button>
    //         ),
    //         onAction: (row: any) => {
    //             console.log('Marcar como cancelada', row)
    //         },
    //     },
    // ]
    const fetchData = useMemo(
        () =>
            fetchDataCrudWithFilters<any, any>({
                fetchData: obtenerOrdenesAsignadasInternoFetcher,
            }),
        []
    )
    const onCrudActions: onCrudActionsProps<OrdenData, any> = {
        onCreate: () => {
            console.log('Crear nueva orden')
        },
        onEdit: row => {
            console.log('Editar', row)
        },
        onDelete: row => {
            console.log('Eliminar', row)
        },
        onView: row => {
            console.log('Ver detalles', row)
        },
    }
    return (
        <div>
            <CrudCrudo<OrdenData, any, OrdenesFiltersType>
                onCrudActions={onCrudActions}
                // newActionsCrud={actionsCrud}
                columns={columns}
                fetchData={fetchData}
                FiltersComponent={OrdenesFilters}
            />
        </div>
    )
}
