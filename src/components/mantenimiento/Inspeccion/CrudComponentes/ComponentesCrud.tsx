import { useMemo } from 'react'

import { ComponentForm } from './FormComponente'
import { useForm } from 'react-hook-form'

import { yupResolver } from '@hookform/resolvers/yup'
import { ComponenteFormData, validacionComponentes } from './models/componenteEstado'
import {
    deleteEstadosComponentes,
    getEstadosComponentes,
    postEstadosComponentes,
    putEstadosComponentes,
} from './services/componentesEstado'

import { fetchDataCrudWithFilters } from '../../../crud/helper/fetchWithFilters'
import { ColumnDef } from '../../../crud/components/CrudTable'
import CrudContainer, { crudQueries, formModalCrudProps } from '../../../crud/CrudContainer'

export type ComponenteData = {
    id: number
    componente: string
    condicion: string
    severidad: string
    observaciones: string
    seguimiento: boolean
}

const columns: ColumnDef<ComponenteData>[] = [
    { key: 'componente', header: 'Componente' },
    { key: 'condicion', header: 'Condición' },
    { key: 'severidad', header: 'Severidad' },
    { key: 'observaciones', header: 'Observaciones' },
    { key: 'seguimiento', header: 'Requiere Seguimiento' },
]
const defaultValues = {
    componente: 'Tarjeta Madre',
    condicion: 'Bueno',
    severidad: 'Baja',
    observaciones: 'Ninguna',
    seguimiento: false,
    id: -1,
}

export default function ComponentesCrud({
    N_ORDEN,
    readOnly,
}: {
    N_ORDEN: number
    readOnly: boolean
}) {
    const form = useForm<ComponenteFormData>({
        resolver: yupResolver(validacionComponentes) as any,
    })

    const crudQueries: crudQueries<any, ComponenteFormData> = {
        fetchData: useMemo(
            () =>
                fetchDataCrudWithFilters<any, any>({
                    fetchData: getEstadosComponentes(N_ORDEN),
                }),
            []
        ),
        createQuery: async (data: ComponenteFormData) => {
            console.log('Creando componente', data)
            const res = await postEstadosComponentes(data, N_ORDEN)
            console.log({ res })
            return res
        },
        editQuery: async (data: ComponenteFormData) => {
            const res = await putEstadosComponentes(data.id, data)
            return res
        },
        deleteQuery: async id => {
            const res = await deleteEstadosComponentes(Number(id))
            return res
        },
    }
    if (readOnly) {
        crudQueries.createQuery = undefined
        crudQueries.editQuery = undefined
        crudQueries.deleteQuery = undefined
    }

    const formModal: formModalCrudProps = {
        form: ComponentForm,
        props: {
            register: form.register,
            errors: form.formState.errors,
        },
        propsNoCambiantes: {
            N_ORDEN: N_ORDEN,
            control: form.control,
        },
    }
    return (
        <CrudContainer<ComponenteData, ComponenteFormData>
            formModalProp={formModal}
            form={form}
            crudQueries={crudQueries}
            columns={columns}
            defaultValues={defaultValues}
            title='Componentes del Equipo'
        />
    )
}
