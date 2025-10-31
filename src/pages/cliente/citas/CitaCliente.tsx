import { useMemo } from 'react'

import { Resolver, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { fetchDataCrudWithFilters } from '../../../components/crud/helper/fetchWithFilters'

import { CitasFilters } from '../../Internos/Citas/Crud/components/CitasFilters'

import { CitasClienteDataType } from '../../../types/cliente/Cita'
import FormCitas from '../../Internos/Citas/Crud/components/FormCitas'
import { CitaClienteDataForm, CitaClienteSchema } from '../../../validation/cita.schema'
import {
    crearCita,
    editCita,
    eliminarCita,
    obtenerCitasCliente,
} from './services/citasClientesServices'
import { ColumnDef } from '../../../components/crud/components/CrudTable'
import CrudContainer, { crudQueries } from '../../../components/crud/CrudContainer'

const stylesEstado = {
    Pendiente: 'bg-warning-auto',
    Confirmada: 'bg-success-auto',
    Cancelada: 'bg-danger-auto',
    Completada: 'bg-info-auto',
}

const columns: ColumnDef<CitasClienteDataType>[] = [
    {
        key: 'fecha',
        header: 'Fecha',
        // render: (row: Date) => row.toISOString().slice(0, 10),
        sortable: true,
    },
    {
        key: 'hora',
        header: 'Hora',
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
    id: -1,
    fechaHoraInicio: '',
    tipoMantenimiento: '',
    otro: '',
    descripcion: '',
}

export default function CitaCliente() {
    const form = useForm<CitaClienteDataForm>({
        mode: 'onChange',
        resolver: yupResolver(CitaClienteSchema) as Resolver<CitaClienteDataForm>,
    })

    const fetchData = useMemo(
        () =>
            fetchDataCrudWithFilters<CitasClienteDataType, any>({
                fetchData: obtenerCitasCliente,
            }),
        []
    )

    const crudQueries: crudQueries<CitasClienteDataType, CitaClienteDataForm> = {
        fetchData: fetchData,
        createQuery: crearCita,
        editQuery: editCita,
        deleteQuery: eliminarCita,
    }

    return (
        <div>
            <CrudContainer<CitasClienteDataType, CitaClienteDataForm>
                columns={columns}
                defaultValues={defaultValues}
                formModalProp={{
                    form: FormCitas, //USAR NUEVO FORMULARIO PARA CITA
                    propsNoCambiantes: { form, esCrud: false },
                }}
                form={form}
                crudQueries={crudQueries}
                FiltersComponent={CitasFilters} //USAR NUEVO FILTRO PARA CITA
            />
        </div>
    )
}
