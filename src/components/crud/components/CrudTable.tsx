import React from 'react'
import { FaEdit, FaEye, FaSort, FaSortDown, FaSortUp, FaTrash } from 'react-icons/fa'
import { FieldValues } from 'react-hook-form'
import { newActionCrud } from '../models/crud.types'

const colorsBtnAcciones = {
    view: 'text-info',
    edit: 'text-success',
    delete: 'text-error',
}

function BtnAccion({
    onClick,
    children,
    tipo,
}: {
    onClick: () => void
    children: React.ReactNode
    tipo: keyof typeof colorsBtnAcciones
}) {
    return (
        <button
            className={`px-3 py-1 rounded-md text-background-accent text-lg hover:opacity-80 ${colorsBtnAcciones[tipo]} flex items-center justify-center`}
            onClick={onClick}
        >
            {children}
        </button>
    )
}
export type SortState<K extends PropertyKey> = {
    key: K | null
    dir: 'asc' | 'desc' | null
}
type Comparable = string | number | boolean | Date | null | undefined
export interface ColumnDef<T> {
    key: keyof T
    header: string
    sortable?: boolean
    getSortValue?: (value: any, row: T) => Comparable
    render?: (value: any, row: T) => React.ReactNode
}

export interface CrudTableProps<TData extends Record<string, any>, TForm extends FieldValues> {
    data: TData[]
    columns: ColumnDef<TData>[]
    toggleSort: (sort: keyof TData) => void
    sort: SortState<keyof TData>
    dataToForm?: (data: TData) => TForm
    loading?: boolean
    onView?: (row: TForm) => void
    onEdit?: (row: TForm) => void
    onDelete?: (row: TData) => void
    getRowId: (row: TForm) => string | number
    newActionsCrud?: newActionCrud<TData>[]
}
function compareValues(a: Comparable, b: Comparable): number {
    if (a == null && b == null) return 0
    if (a == null) return 1 // nulos al final asc
    if (b == null) return -1
    // Dates
    if (a instanceof Date || b instanceof Date) {
        const aa = a instanceof Date ? a.getTime() : new Date(String(a)).getTime()
        const bb = b instanceof Date ? b.getTime() : new Date(String(b)).getTime()
        return aa - bb
    }
    // Numbers / booleans
    if (typeof a === 'number' && typeof b === 'number') return a - b
    if (typeof a === 'boolean' && typeof b === 'boolean') return (a ? 1 : 0) - (b ? 1 : 0)
    // Default string compare (numérico y sin acentos)
    return String(a).localeCompare(String(b), undefined, { numeric: true, sensitivity: 'base' })
}

export function CrudTable<TData extends Record<string, any>, TForm extends FieldValues>({
    data,
    columns,
    toggleSort,
    sort,
    loading = false,
    onView,
    onEdit,
    onDelete,
    getRowId,
    newActionsCrud,
    dataToForm = (data: TData) => data as unknown as TForm,
}: CrudTableProps<TData, TForm>) {
    const sortIcon = (key: keyof TData) => {
        if (sort.key !== key) return <FaSort className='shrink-0 opacity-60' aria-hidden />
        if (sort.dir === 'asc') return <FaSortUp className='shrink-0' aria-hidden />
        if (sort.dir === 'desc') return <FaSortDown className='shrink-0' aria-hidden />
        return <FaSort className='shrink-0 opacity-60' aria-hidden />
    }
    const colByKey = React.useMemo(() => {
        const map = new Map<string, ColumnDef<TData>>()
        for (const c of columns) map.set(String(c.key), c)
        return map
    }, [columns])
    const sortedData = React.useMemo(() => {
        // console.log('Sorting data', { sort })
        // console.log(data)
        if (!sort.key || !sort.dir) return data
        const col = colByKey.get(String(sort.key))
        const copy = data.slice()
        copy.sort((ra, rb) => {
            const aValRaw = ra[sort.key as keyof TData]
            const bValRaw = rb[sort.key as keyof TData]
            const aVal = col?.getSortValue ? col.getSortValue(aValRaw, ra) : (aValRaw as Comparable)
            const bVal = col?.getSortValue ? col.getSortValue(bValRaw, rb) : (bValRaw as Comparable)
            const cmp = compareValues(aVal, bVal)
            return sort.dir === 'asc' ? cmp : -cmp
        })
        console.log('Sorted data', copy)
        return copy
    }, [data, sort, colByKey])
    return (
        <div className='overflow-x-auto border  rounded-xl bg-background-accent-auto'>
            <table className='w-full text-left'>
                <thead>
                    <tr className='border-b-4  bg-primary-auto'>
                        {columns.map(col => (
                            <th key={String(col.key)} className='p-3 font-semibold text-sm'>
                                {col.sortable ? (
                                    <button
                                        type='button'
                                        onClick={() => toggleSort(col.key)}
                                        className='flex items-center gap-2 select-none hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 rounded'
                                        aria-label={`Ordenar por ${col.header}`}
                                        title={`Ordenar por ${col.header}`}
                                    >
                                        <span className='whitespace-nowrap'>{col.header}</span>
                                        {sortIcon(col.key)}
                                    </button>
                                ) : (
                                    <span className='whitespace-nowrap'>{col.header}</span>
                                )}
                            </th>
                        ))}
                        {(onView || onEdit || onDelete || newActionsCrud) && (
                            <th className='p-3 font-semibold text-sm text-center'>Acciones</th>
                        )}
                    </tr>
                </thead>
                <tbody>
                    {loading && (
                        <tr>
                            <td colSpan={columns.length + 1} className='p-4 text-center text-muted'>
                                Cargando...
                            </td>
                        </tr>
                    )}
                    {!loading && data.length === 0 && (
                        <tr>
                            <td colSpan={columns.length + 1} className='p-6 text-center text-muted'>
                                Sin datos
                            </td>
                        </tr>
                    )}
                    {!loading &&
                        sortedData
                            .map(data => {
                                return {
                                    data: data,
                                    form: dataToForm(data),
                                }
                            })
                            .map(row => (
                                <tr
                                    key={getRowId(row.form)}
                                    className=' border-b hover:bg-background-auto transition-colors duration-200 cursor-pointer'
                                >
                                    {columns.map(col => (
                                        <td
                                            key={String(col.key)}
                                            className='p-3 text-sm'
                                            onClick={onView ? () => onView(row.form) : undefined}
                                        >
                                            {col.render
                                                ? col.render(row.data[col.key], row.data)
                                                : String(row.data[col.key] ?? '')}
                                        </td>
                                    ))}
                                    {(onView || onEdit || onDelete || newActionsCrud) && (
                                        <td className='p-3'>
                                            <div className='flex  justify-center items-center gap-2'>
                                                {newActionsCrud &&
                                                    newActionsCrud.map((action, index) => (
                                                        <div
                                                            key={index}
                                                            onClick={() =>
                                                                action.onAction(row.data)
                                                            }
                                                        >
                                                            {action.component(row.data)}
                                                        </div>
                                                    ))}
                                                {onView && (
                                                    <BtnAccion
                                                        onClick={() => onView(row.form)}
                                                        tipo='view'
                                                    >
                                                        <FaEye className='inline' />
                                                    </BtnAccion>
                                                )}
                                                {onEdit && (
                                                    <BtnAccion
                                                        onClick={() => onEdit(row.form)}
                                                        tipo='edit'
                                                    >
                                                        <FaEdit className='inline' />
                                                    </BtnAccion>
                                                )}
                                                {onDelete && (
                                                    <BtnAccion
                                                        onClick={() => onDelete(row.data)}
                                                        tipo='delete'
                                                    >
                                                        <FaTrash className='inline' />
                                                    </BtnAccion>
                                                )}
                                            </div>
                                        </td>
                                    )}
                                </tr>
                            ))}
                </tbody>
            </table>
        </div>
    )
}

export default CrudTable
