import { FieldValues } from 'react-hook-form'
import { ColumnDef } from '../components/CrudTable'
import { FetcherFunctionWithParams } from '../helper/fetchWithFilters'
import { ComponentType } from 'react'

export interface onCrudActionsProps<TData, TForm> {
    onCreate?: () => void
    onView?: (row: TForm) => void
    onEdit?: (row: TForm) => void
    onDelete?: (id: TData) => void
}
export interface autoLoadOptions {
    autoLoad?: boolean
    dependencies?: React.DependencyList
}
export interface newActionCrud<TData> {
    component: (row: TData) => React.ReactNode
    onAction: (row: TData) => void
}
export interface CrudContainerRawProps<
    TData extends Record<string, any>,
    TForm extends FieldValues,
    TFilters = any
> {
    onCrudActions?: onCrudActionsProps<TData, TForm>
    newActionsCrud?: newActionCrud<TData>[]
    title?: string
    mostrar_titulo?: boolean
    columns: ColumnDef<TData>[]

    fetchData: //  FetcherFunctionType<TData> |
    FetcherFunctionWithParams<TData, TFilters>

    FiltersComponent?: ComponentType<{
        onChangeFilters: (filters: TFilters) => void
    }>

    pageSize?: number
    searchPlaceholder?: string

    autoLoadOptions?: autoLoadOptions
    dependencies?: React.DependencyList
    formModal?: React.ReactNode

    dataToForm?: (data: TData) => TForm
}
