import React, { useState } from 'react'

import { FieldValues } from 'react-hook-form'

import useDebouncedCallback from '../../hooks/useDebouncedCallback'
import { useModalActions } from '../../hooks/useModalActions'

import { FetchParams } from './helper/fetchWithFilters'
import CrudTable, { SortState } from './components/CrudTable'
import CrudPagination from './components/CrudPagination'
import CrudToolbar from './components/CrudToolbar'
import { CrudContainerRawProps } from './models/crud.types'

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
    const { onCreate, onEdit, onView, onDelete } = onCrudActions || {}
    const { autoLoad: autoLoad = true, dependencies = [] } = autoLoadOptions

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
    const modalActions = useModalActions()

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
            modalActions.showAlert({
                title: 'Error',
                message: e instanceof Error ? e.message : 'Error desconocido',
                type: 'error',
            })
        } finally {
            setLoading(false)
        }
    }
    React.useEffect(() => {
        if (autoLoad) load(1, '')
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [...dependencies, filters, sort])

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
