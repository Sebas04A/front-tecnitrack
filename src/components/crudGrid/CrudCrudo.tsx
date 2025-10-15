import React, { Component, ComponentType, useState } from 'react'
import CrudToolbar from './CrudToolbar'
import CrudTable, { ColumnDef, SortState } from './CrudTable'
import CrudPagination from './CrudPagination'
import { FieldValues, UseFormHandleSubmit } from 'react-hook-form'
import { ObjectApiResponse } from '../../api'
import useDebouncedCallback from '../../hooks/useDebouncedCallback'
// import SubmitStatusModal, { SubmitStatus } from '../common/SubmitStatusModal'
import { Modal } from '../common/Modal'
import { useModal } from '../../hooks/useModal'
import { useModalActions } from '../../hooks/useModalActions'
import { FetcherFunctionType, Filter } from './helper/crud-helpers'
import { div } from 'framer-motion/client'
import {
    FetcherFunctionWithParams,
    FetchParams,
    FilterParamOption,
} from './helper/fetchWithFilters'
import { FetchFunction } from '../form/Controls/GenericSelectSearch'

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
export default function CrudCrudo<
    TData extends Record<string, any>,
    TForm extends FieldValues,
    TFilters = any
>({
    onCrudActions,
    newActionsCrud,
    title,
    mostrar_titulo,
    columns,
    fetchData,
    FiltersComponent,
    pageSize = 10,
    searchPlaceholder,
    autoLoadOptions = { autoLoad: true, dependencies: [] },
    dataToForm,
}: CrudContainerRawProps<TData, TForm, TFilters>) {
    // console.warn('Renderizando CrudCrudo')
    const { autoLoad: autoLoad = true, dependencies = [] } = autoLoadOptions
    const { onCreate, onEdit, onView, onDelete } = onCrudActions || {}

    const [data, setData] = useState<TData[]>([])
    const [loading, setLoading] = useState(false)

    const [pagination, setPagination] = useState<{
        currentPage: number
        hasNextPage: boolean
        hasPreviousPage: boolean
        totalPages: number
        totalRecords: number
        pageSize: number
    }>({
        currentPage: 1,
        hasNextPage: false,
        hasPreviousPage: false,
        totalPages: 0,
        totalRecords: 0,
        pageSize: 10,
    })
    const [sort, setSort] = React.useState<SortState<keyof TData>>({ key: null, dir: null })
    const toggleSort = (key: keyof TData) => {
        setSort(prev => {
            if (prev.key !== key) return { key, dir: 'asc' }
            if (prev.dir === 'asc') return { key, dir: 'desc' }
            // tercera pulsación: quitar orden
            return { key: null, dir: null }
        })
    }

    const [search, setSearch] = useState('')

    const { debounced: debouncedSearch } = useDebouncedCallback((val: string) => {
        load(1, val)
    }, 400)

    const handleSearch = (value: string) => {
        setSearch(value)
        debouncedSearch(value)
    }

    const [filters, setFilters] = useState<TFilters>({} as TFilters)
    const handleOnChangeFilters = (filters: TFilters) => {
        console.warn('Filters changed:', filters)
        setFilters(filters)
    }
    const load = async (p = pagination.currentPage, s = search) => {
        console.log(
            'Loading data for page:',
            p,
            'search:',
            s,
            'page size:',
            pageSize,
            'filters:',
            filters
        )
        setLoading(true)
        try {
            const params: FetchParams<TFilters, TData> = {
                page: p,
                pageSize,
                search: s,
                filters,
                sortColumns: sort, // Aquí puedes agregar lógica para manejar el ordenamiento si es necesario
            }
            const res = await fetchData(params)
            console.log('Fetched data:', res)
            setData(res.items)
            setPagination(res.pagination)
        } catch (e) {
            console.error('Error cargando datos CRUD', e)
        } finally {
            setLoading(false)
        }
    }
    React.useEffect(() => {
        if (autoLoad) load(1, '')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencies, filters, sort])
    // const fetchDataWithFilters = ({
    //     page,
    //     pageSize,
    //     search,
    // }: {
    //     page: number
    //     pageSize: number
    //     search: string
    // }) => {
    //     console.log('FetchDataWithFilters llamado con:', {
    //         page,
    //         pageSize,
    //         search,
    //         filters,
    //     })
    //     const fetching = fetchData({
    //         page,
    //         pageSize,
    //         search,
    //         filters,
    //     })
    //     console.log('Datos obtenidos con filtros:', fetching)
    //     return fetching
    // }

    return (
        <div className='w-full'>
            {title && mostrar_titulo && (
                <h2 className='text-xl font-bold text-primary mb-4'>{title}</h2>
            )}
            <div className='rounded-lg shadow-lg bg-background-accent-auto w-full  px-4 my-4'>
                {FiltersComponent && (
                    <>
                        <div>{<FiltersComponent onChangeFilters={handleOnChangeFilters} />}</div>
                        <div className='border-b border-gray-300 my-2'></div>
                    </>
                )}

                <CrudToolbar
                    onCreate={onCreate}
                    onSearch={handleSearch}
                    searchPlaceholder={searchPlaceholder}
                />
            </div>

            <CrudTable<TData, TForm>
                data={data}
                columns={columns}
                toggleSort={toggleSort}
                sort={sort}
                loading={loading}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                getRowId={(r: any) => r.id ?? JSON.stringify(r)}
                newActionsCrud={newActionsCrud}
                dataToForm={dataToForm}
            />
            <CrudPagination
                page={pagination.currentPage}
                pageSize={pagination.pageSize}
                total={pagination.totalRecords}
                onChange={p => load(p)}
            />
        </div>
    )
}
