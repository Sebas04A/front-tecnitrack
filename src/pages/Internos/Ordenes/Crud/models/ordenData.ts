import { ColumnDef } from '../../../../../components/crud'

// const columns: ColumnDef<any>[] = [
//     { key: 'numeroOrden', header: '# Orden', sortable: true },
//     {
//         key: 'fechaIngresoOrden',
//         header: 'Fecha Ingreso',
//         sortable: true,
//         render: (row: string) => row.split('T')[0],
//     },
//     { key: 'clienteNombre', header: 'Cliente', sortable: true },
//     { key: 'equipoNombre', header: 'Equipo', sortable: true },
//     { key: 'tipoMantenimiento', header: 'Tipo de Mantenimiento', sortable: true },
//     { key: 'tecnicoNombre', header: 'Técnico', sortable: true },
//     { key: 'prioridad', header: 'Prioridad', sortable: true },
//     { key: 'estado', header: 'Estado Orden', sortable: true },

//     // { key: '', header: 'Tipo de Equipo', sortable: true },
//     // { key: 'subtipo', header: 'Subtipo', sortable: true },
//     // { key: 'estadoMantenimiento', header: 'Estado Mantenimiento', sortable: true },
//     { key: 'progreso', header: 'Progreso', sortable: true },
// ]
export type OrdenData = {
    id?: number
    idCita: number
    numeroOrden: string
    fechaIngresoOrden: string
    clienteNombre: string
    equipoNombre: string
    tipoMantenimiento: string
    tecnicoNombre: string
    prioridad: string
    estado: string
    progreso: string
}
