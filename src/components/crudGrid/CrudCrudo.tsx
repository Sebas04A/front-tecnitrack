import React, { Component, ComponentType, useState } from 'react'
import CrudToolbar from './CrudToolbar'
import CrudTable, { ColumnDef } from './CrudTable'
import CrudPagination from './CrudPagination'
import { FieldValues, UseFormHandleSubmit } from 'react-hook-form'
import { ObjectApiResponse } from '../../api'
import useDebouncedCallback from '../../hooks/useDebouncedCallback'
// import SubmitStatusModal, { SubmitStatus } from '../common/SubmitStatusModal'
import { Modal } from '../common/Modal'
import { useModal } from '../../hooks/useModal'
import { useModalActions } from '../../hooks/useModalActions'
import { Filter } from './helper/crud-helpers'
import { div } from 'framer-motion/client'

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
    TForm extends FieldValues
> {
    onCrudActions?: onCrudActionsProps<TData, TForm>
    newActionsCrud?: newActionCrud<TData>[]
    title?: string
    mostrar_titulo?: boolean
    columns: ColumnDef<TData>[]
    fetchData: (params: {
        page: number
        pageSize: number
        search: string
        filters: Filter<any>[]
    }) => Promise<{
        items: TData[]
        total: number
    }>

    FiltersComponent?: ComponentType<any>

    pageSize?: number
    searchPlaceholder?: string

    autoLoadOptions?: autoLoadOptions
    dependencies?: React.DependencyList
    formModal?: React.ReactNode

    dataToForm?: (data: TData) => TForm
}
export default function CrudCrudo<TData extends Record<string, any>, TForm extends FieldValues>({
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
}: CrudContainerRawProps<TData, TForm>) {
    // console.warn('Renderizando CrudCrudo')
    const { autoLoad: autoLoad = true, dependencies = [] } = autoLoadOptions
    const { onCreate, onEdit, onView, onDelete } = onCrudActions || {}
    const [page, setPage] = useState(1)

    const [data, setData] = useState<TData[]>([])
    const [loading, setLoading] = useState(false)
    const [total, setTotal] = useState(0)

    const [search, setSearch] = useState('')

    const { debounced: debouncedSearch } = useDebouncedCallback((val: string) => {
        load(1, val)
    }, 400)

    const handleSearch = (value: string) => {
        setSearch(value)
        debouncedSearch(value)
    }

    const [filters, setFilters] = useState<Filter<any>[]>([])
    const handleOnChangeFilters = (filters: Filter<any>[]) => {
        console.warn('Filters changed:', filters)
        setFilters(filters)
    }
    const load = async (p = page, s = search) => {
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
            const res = await fetchData({ page: p, pageSize, search: s, filters })
            console.log('Fetched data:', res)
            setData(res.items)
            setTotal(res.total)
            setPage(p)
        } catch (e) {
            console.error('Error cargando datos CRUD', e)
        } finally {
            setLoading(false)
        }
    }
    React.useEffect(() => {
        if (autoLoad) load(1, '')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencies, filters])
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
                loading={loading}
                onView={onView}
                onEdit={onEdit}
                onDelete={onDelete}
                getRowId={(r: any) => r.id ?? JSON.stringify(r)}
                newActionsCrud={newActionsCrud}
                dataToForm={dataToForm}
            />
            <CrudPagination page={page} pageSize={pageSize} total={total} onChange={p => load(p)} />
        </div>
    )
}
