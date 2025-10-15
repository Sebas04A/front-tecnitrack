import React, { useEffect, useMemo } from 'react'
import CrudContainer, { crudQueries } from '../../CrudContainer'
import { Resolver, useForm } from 'react-hook-form'
import FormCitas from './FormCitas'
import CrudCrudo from '../../CrudCrudo'
import { CitaDataForm, CitaCrudSchema } from '../../../../validation/cita.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { createFilter, makeLocalCrudFetcher } from '../../helper/crud-helpers'
import { ColumnDef } from '../../CrudTable'
import CrudCitasContainer from './CrudCitasContainer'
import {
    createCitaAdmin,
    eliminarCitaAdmin,
    obtenerCitasAdmin,
    updateCitaAdmin,
} from '../../../../services/citasApi'

import { CitaDataCrud } from '../../../../types/cita'
import { div, use } from 'framer-motion/client'
import { fetchDataCrudWithFilters } from '../../helper/fetchWithFilters'
import { CitasFilters, CitasFiltersType } from './CitasFilters'

const stylesEstado = {
    Pendiente: 'bg-warning-auto',
    Confirmada: 'bg-success-auto',
    Cancelada: 'bg-danger-auto',
    Completada: 'bg-info-auto',
}

const columns: ColumnDef<CitaDataCrud>[] = [
    { key: 'numeroIdentificacion', header: 'N° Identificación' },
    { key: 'nombreCompleto', header: 'Usuario', sortable: true },
    {
        key: 'fecha',
        header: 'Fecha',
        render: (row: Date) => row.toISOString().slice(0, 10),
        sortable: true,
    },
    {
        key: 'hora',
        header: 'Hora',
        sortable: true,
    },
    { key: 'tipoMantenimiento', header: 'Tipo Mantenimiento', sortable: true },
    { key: 'descripcion', header: 'Descripción', sortable: true },
    {
        key: 'estado',
        header: 'Estado Cita',
        render: (row: keyof typeof stylesEstado) => (
            <span className={row in stylesEstado ? stylesEstado[row] : ''}>{row}</span>
        ),
        sortable: true,
    },
]

const defaultValues: CitaDataForm = {
    usuario: -1,
    fechaHoraInicio: '',
    tipoMantenimiento: '',
    otro: '',
    descripcion: '',
}

export default function CrudCitas() {
    // console.warn('RENDERIZANDO')
    const form = useForm<CitaDataForm>({
        mode: 'onChange',
        resolver: yupResolver(CitaCrudSchema) as Resolver<CitaDataForm>,
    })
    const watchedValues = form.watch()
    useEffect(() => {
        console.log('Watched values changed:', watchedValues)
    }, [watchedValues])

    // const fetchData = useMemo(
    //     () =>
    //         makeLocalCrudFetcher<CitaDataCrud>({
    //             getAll: obtenerCitasAdmin,
    //             searchKeys: ['numeroIdentificacion', 'nombreCompleto', 'estado'],
    //         }),
    //     []
    // )

    const fetchData = useMemo(
        () =>
            fetchDataCrudWithFilters<CitaDataCrud, CitasFiltersType>({
                fetchData: obtenerCitasAdmin,
            }),
        []
    )

    async function edit(data: CitaDataForm) {
        console.log('Editando cita', data)
        const res = await updateCitaAdmin(data)
        return data
    }
    async function create(data: CitaDataForm) {
        console.log('Creando cita', data)
        const res = await createCitaAdmin(data)
        return res
    }
    async function deleteAccion(data: CitaDataCrud) {
        console.log('Eliminando cita', data)
        const res = await eliminarCitaAdmin(data.id)
        return data
    }
    const crudQueries: crudQueries<CitaDataCrud> = {
        fetchData: fetchData,
        createQuery: create,
        editQuery: edit,
        deleteQuery: deleteAccion,
    }

    const [camposReadOnly, setCamposReadOnly] = React.useState<boolean>(false)
    const [mode, setMode] = React.useState<'create' | 'edit' | 'view'>('create')
    const [actualRow, setActualRow] = React.useState<CitaDataForm | null>(null)

    function onEdit(row: CitaDataForm) {
        setCamposReadOnly(false)
        form.reset(row)
        setMode('edit')
        setActualRow(row)
    }
    function onView(row: CitaDataForm) {
        debugger
        setCamposReadOnly(true)
        form.reset(row)
        setMode('view')
        setActualRow(row)
    }
    function onCreate() {
        setCamposReadOnly(false)
        form.reset(defaultValues)
        setMode('create')
        setActualRow(null)
    }
    function onDelete(row: CitaDataForm) {
        console.log('Eliminando cita', row)
    }

    return (
        <CrudCitasContainer<CitaDataCrud, CitaDataForm, CitasFiltersType>
            formModalProp={{
                form: FormCitas,
                props: { form },
            }}
            form={form}
            columns={columns}
            defaultValues={defaultValues}
            crudQueries={crudQueries}
            isModalGrande={false}
            FilterComponent={CitasFilters}
        />
    )
}
