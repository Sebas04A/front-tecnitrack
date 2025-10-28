import React, { useMemo } from 'react'
import CrudCrudo, {
    newActionCrud,
    onCrudActionsProps,
} from '../../../../components/crudGrid/CrudCrudo'
import { BsPlayFill } from 'react-icons/bs'
import { BiCheck } from 'react-icons/bi'
import { fetchDataCrudWithFilters } from '../../../../components/crudGrid/helper/fetchWithFilters'
import {
    deleteOrden,
    obtenerOrdenesAsignadasInterno,
    obtenerOrdenesAsignadasInternoFetcher,
} from './services/ordenes'
import { ColumnDef } from '../../../../components/crudGrid'
import { OrdenesFilters } from './components/FiltersOrdenes'
import { OrdenesFiltersType } from './models/ordenFilter'
import { OrdenData } from './models/ordenData'
import FormCrudOrdenesAdmin from './components/FormCrudOrdenesAdmin'
import { useModal } from '../../../../hooks/useModal'
import MantenimientoIngreso from '../../../../components/mantenimiento/MantenimientoIngreso'
import { useModalActions } from '../../../../hooks/useModalActions'

// export default function CrudOrdenes() {
//   return (
//     <div>CrudOrdenes</div>
//   )
// }

const camposReadOnly = {}

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
    const modal = useModal()
    function abrirModalEditar(row: OrdenData, readOnly = false) {
        console.log('Abrir modal editar orden', row)
        // modal.openModal({

        // })
        modal.openModal({
            component: MantenimientoIngreso,
            props: {
                orden: row,
                estaEditando: !readOnly,
                readOnly: readOnly,
                size: 'xl',
            },
            // size: 'md',
        })
    }
    const modalActions = useModalActions()

    const onCrudActions: onCrudActionsProps<OrdenData, any> = {
        onCreate: () => {
            console.log('Crear nueva orden')
        },
        onEdit: row => {
            console.log('Editar', row)
            abrirModalEditar(row)
        },
        onDelete: row => {
            console.log('Eliminar', row)
            modalActions.showConfirm({
                title: 'Confirmar Eliminación',
                message: `¿Está seguro de que desea eliminar la orden #${row.numeroOrden}? Esta acción no se puede deshacer.`,
                onConfirm: () => {
                    console.log('Eliminando Orden', row)
                    if (!row.id) throw new Error('ID de orden no válido')
                    deleteOrden(row.id)
                        .then(() => {
                            modalActions.showAlert({
                                title: 'Orden Eliminada',
                                message: `La orden #${row.numeroOrden} ha sido eliminada correctamente.`,
                                type: 'success',
                            })
                        })
                        .catch(error => {
                            console.error('Error eliminando la orden:', error)
                            modalActions.showAlert({
                                title: 'Error al Eliminar',
                                message:
                                    error instanceof Error ? error.message : 'Error desconocido',
                                type: 'error',
                            })
                        })
                },
                onCancel: () => {
                    console.log('Eliminación cancelada')
                },
                type: 'warning',
            })
        },
        onView: row => {
            console.log('Ver detalles', row)
            abrirModalEditar(row, true)
        },
    }
    return (
        <div>
            <CrudCrudo<OrdenData, any, OrdenesFiltersType>
                onCrudActions={onCrudActions}
                formModal={FormCrudOrdenesAdmin()}
                // newActionsCrud={actionsCrud}
                columns={columns}
                fetchData={fetchData}
                FiltersComponent={OrdenesFilters}
            />
        </div>
    )
}
