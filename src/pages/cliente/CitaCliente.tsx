import React, { useMemo } from 'react'
import { ColumnDef, CrudContainer, crudQueries } from '../../components/crudGrid'
import { CitaClienteData, CitaDataCrud } from '../../types/cita'
import { CitaClienteDataForm, CitaClienteSchema, CitaData } from '../../validation/cita.schema'
import FormCitas from '../../components/crudGrid/cruds/Citas/FormCitas'
import { Resolver, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { makeLocalCrudFetcher } from '../../components/crudGrid/helper/crud-helpers'
import { obtenerCitasCliente } from '../../services/citasApi'
import { CitasFilters } from '../../components/crudGrid/cruds/Citas/CitasFilters'

const stylesEstado = {
    Pendiente: 'bg-warning-auto',
    Confirmada: 'bg-success-auto',
    Cancelada: 'bg-danger-auto',
    Completada: 'bg-info-auto',
}

const columns: ColumnDef<CitaClienteData>[] = [
    {
        key: 'fechaHoraInicio',
        header: 'Fecha',
        // render: (row: Date) => row.toISOString().slice(0, 10),
        sortable: true,
    },

    { key: 'tipoMantenimiento', header: 'Tipo Mantenimiento' },
    { key: 'descripcion', header: 'Descripción' },
    {
        key: 'estado',
        header: 'Estado Cita',
        render: (row: keyof typeof stylesEstado) => (
            <span className={row in stylesEstado ? stylesEstado[row] : ''}>{row}</span>
        ),
    },
]
const defaultValues: CitaClienteDataForm = {
    fechaHoraInicio: '',
    tipoMantenimiento: '',
    otro: '',
    descripcion: '',
}

// Placeholder functions for create, edit, delete
async function create(data: CitaClienteDataForm) {
    console.log('Placeholder create function called with:', data)
    // En una aplicación real, harías una llamada a la API aquí
    return Promise.resolve({ ...data, id: Math.random() }) // Simula un ID para el nuevo elemento
}

async function edit(data: CitaClienteDataForm) {
    console.log('Placeholder edit function called with:', data)
    // En una aplicación real, harías una llamada a la API aquí
    return Promise.resolve(data)
}

async function deleteAccion(data: CitaClienteData) {
    console.log('Placeholder delete function called with:', data)
    // En una aplicación real, harías una llamada a la API aquí
    return Promise.resolve(true)
}
export default function CitaCliente() {
    const form = useForm<CitaClienteDataForm>({
        mode: 'onChange',
        resolver: yupResolver(CitaClienteSchema) as Resolver<CitaClienteDataForm>,
    })

    const fetchData = useMemo(
        () =>
            makeLocalCrudFetcher<CitaClienteData>({
                getAll: obtenerCitasCliente,
                searchKeys: ['descripcion', 'estado'],
            }),
        []
    )

    const crudQueries: crudQueries<CitaClienteData> = {
        fetchData: fetchData,
        createQuery: create,
        editQuery: edit,
        deleteQuery: deleteAccion,
    }
    return (
        <div>
            <CrudContainer<CitaClienteData, CitaClienteDataForm>
                columns={columns}
                defaultValues={defaultValues}
                formModalProp={{
                    form: FormCitas,
                }}
                form={form}
                crudQueries={crudQueries}
                FiltersComponent={CitasFilters}
            />
        </div>
    )
}
