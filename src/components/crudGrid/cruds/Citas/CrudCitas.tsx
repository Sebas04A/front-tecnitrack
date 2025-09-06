import React, { useEffect, useMemo } from 'react'
import CrudContainer, { crudQueries } from '../../CrudContainer'
import { Resolver, useForm } from 'react-hook-form'
import FormCitas from './FormCitas'
import CrudCrudo from '../../CrudCrudo'
import { CitaCrudData, CitaCrudSchema } from '../../../../validation/cita.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { createFilter, makeLocalCrudFetcher } from '../../helper/crud-helpers'
import { ColumnDef } from '../../CrudTable'
import CrudCitasContainer from './CrudCitasContainer'
import { createCitaAdmin, obtenerCitasAdmin } from '../../../../services/citasApi'
import { CitaAdministradorResponse } from '../../../../api'
import { CitaAdminType } from '../../../../types/cita'
import { div } from 'framer-motion/client'

const stylesEstado = {
    Pendiente: 'bg-warning-auto',
    Confirmada: 'bg-success-auto',
    Cancelada: 'bg-danger-auto',
    Completada: 'bg-info-auto',
}

const columns: ColumnDef<CitaAdminType>[] = [
    { key: 'numeroIdentificacion', header: 'N° Identificación' },
    { key: 'nombreCompleto', header: 'Usuario' },
    {
        key: 'fecha',
        header: 'Fecha',
        render: (row: Date) => row.toISOString().slice(0, 10),
    },
    {
        key: 'hora',
        header: 'Hora',
    },
    { key: 'tipoMantenimiento', header: 'Tipo Mantenimiento' },
    { key: 'descripcion', header: 'Descripción' },
    {
        key: 'estado',
        header: 'Estado',
        render: (row: keyof typeof stylesEstado) => (
            <span className={row in stylesEstado ? stylesEstado[row] : ''}>{row}</span>
        ),
    },
]

const defaultValues: CitaCrudData = {
    usuario: -1,
    fechaHoraInicio: '',
    tipoMantenimiento: '',
    otro: '',
    descripcion: '',
}

export default function CrudCitas() {
    // console.warn('RENDERIZANDO')
    const form = useForm<CitaCrudData>({
        mode: 'onChange',
        resolver: yupResolver(CitaCrudSchema) as Resolver<CitaCrudData>,
    })

    const fetchData = useMemo(
        () =>
            makeLocalCrudFetcher<CitaAdminType>({
                getAll: obtenerCitasAdmin,
                searchKeys: ['numeroIdentificacion', 'nombreCompleto', 'estado'],
            }),
        []
    )

    async function edit(data: CitaCrudData) {
        console.log('Editando cita', data)
        return data
    }
    async function create(data: CitaCrudData) {
        console.log('Creando cita', data)
        const res = await createCitaAdmin(data)
        return res
    }
    async function deleteAccion(data: CitaCrudData) {
        console.log('Eliminando cita', data)
        return data
    }
    const crudQueries: crudQueries<CitaAdminType> = {
        fetchData: fetchData,
        createQuery: create,
        editQuery: edit,
        deleteQuery: deleteAccion,
    }

    const [camposReadOnly, setCamposReadOnly] = React.useState<boolean>(false)
    const [mode, setMode] = React.useState<'create' | 'edit' | 'view'>('create')
    const [actualRow, setActualRow] = React.useState<CitaCrudData | null>(null)

    function onEdit(row: CitaCrudData) {
        setCamposReadOnly(false)
        form.reset(row)
        setMode('edit')
        setActualRow(row)
    }
    function onView(row: CitaCrudData) {
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
    function onDelete(row: CitaCrudData) {
        console.log('Eliminando cita', row)
    }
    return (
        <CrudCitasContainer<CitaCrudData>
            formModalProp={{
                form: FormCitas,
                props: { form },
            }}
            form={form}
            columns={columns}
            defaultValues={defaultValues}
            crudQueries={crudQueries}
            isModalGrande={false}
        />
    )
}
