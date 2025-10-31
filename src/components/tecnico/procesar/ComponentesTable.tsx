import CrudTable, { ColumnDef } from '../../crud/components/CrudTable'

const columns: ColumnDef<any>[] = [
    { key: 'componente', header: 'Componente' },
    { key: 'estado', header: 'Estado' },
    { key: 'severidad', header: 'Severidad' },
    { key: 'descripcion', header: 'Descripción' },
    {
        key: 'seguimiento',
        header: 'Requiere Seguimiento',
        render: row => (row.seguimiento ? 'Sí' : 'No'),
    },
]
const data: any = [
    {
        id: 1,
        componente: 'Disco Duro',

        estado: 'Bueno',
        severidad: 'Baja',
        descripcion: 'El disco duro está en buen estado.',
        seguimiento: false,
    },
    {
        id: 2,
        componente: 'Memoria RAM',
        estado: 'Regular',
        severidad: 'Media',
        descripcion: 'La memoria RAM presenta fallas intermitentes.',
        seguimiento: false,
    },

    {
        id: 3,
        componente: 'Placa Madre',
        estado: 'Malo',
        severidad: 'Alta',
        descripcion: 'La placa madre tiene daños visibles.',
        seguimiento: true,
    },
]
export default function ComponentesTable() {
    return <CrudTable data={data} columns={columns} getRowId={row => row.id} />
}
