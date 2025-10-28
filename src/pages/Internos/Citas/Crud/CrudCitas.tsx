import { useMemo } from 'react'

import { Resolver, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { ColumnDef } from '../../../../components/crudGrid/CrudTable'
import { fetchDataCrudWithFilters } from '../../../../components/crudGrid/helper/fetchWithFilters'

import CrudCitasContainer from './components/CrudCitasContainer'
import FormCitas from './components/FormCitas'
import { CitasFilters } from './components/CitasFilters'
import { CitaDataCrud } from './models/citaCrudModel'
import { CitasFiltersType } from './models/citaFiltersType'
import { CitaCrudSchema, CitaDataForm } from './models/validationCitaCrud'
import {
    createCitaAdmin,
    eliminarCitaAdmin,
    obtenerCitasAdmin,
    updateCitaAdmin,
} from './services/crudCitasApi'
import { crudQueries } from '../../../../components/crudGrid'

const stylesEstado = {
    Pendiente: 'bg-warning-auto',
    Confirmada: 'bg-success-auto',
    Cancelada: 'bg-danger-auto',
    Completada: 'bg-info-auto',
}

const columns: ColumnDef<CitaDataCrud>[] = [
    { key: 'numeroIdentificacion', header: 'N° Identificación' },
    { key: 'nombreCompleto', header: 'Usuario', sortable: true },
    { key: 'id', header: 'Numero Cita' },
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
        return res
    }
    async function create(data: CitaDataForm) {
        console.log('Creando cita', data)
        const res = await createCitaAdmin(data)
        return res
    }
    async function deleteAccion(data: CitaDataCrud) {
        console.log('Eliminando cita', data)
        const res = await eliminarCitaAdmin(data.id)
        return res
    }
    const crudQueries: Required<crudQueries<CitaDataCrud, CitaDataForm, CitasFiltersType>> = {
        fetchData: fetchData,
        createQuery: create,
        editQuery: edit,
        deleteQuery: deleteAccion,
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
