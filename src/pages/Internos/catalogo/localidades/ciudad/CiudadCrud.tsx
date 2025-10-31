// src/components/crud/CiudadesCrud.tsx
import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import CrudContainer from '../../../../../components/crud/CrudContainer'

import { fetchDataCrudWithFilters } from '../../../../../components/crud/helper/fetchWithFilters'

import CiudadesForm from './components/CiudadForm'
import { ciudadSchema, defaultCiudadValues, CiudadFormData } from '../localidades.schema'
import { CiudadData } from './models.ts/ciudad'
import { apiCiudadToData } from './adapters/ciudad'

import { createCiudad, deleteCiudad, getCiudades, updateCiudad } from './services/ciudadService'
import { ColumnDef } from '../../../../../components/crud/components/CrudTable'

interface CiudadesCrudProps {
    titulo?: string
    ciudadId?: number
}

const CiudadCrud: React.FC<CiudadesCrudProps> = ({ ciudadId }) => {
    const form = useForm<CiudadFormData>({
        mode: 'onChange',
        resolver: yupResolver(ciudadSchema),
        defaultValues: defaultCiudadValues,
    })

    const columns: ColumnDef<CiudadData>[] = useMemo(
        () => [
            { key: 'paisNombre', header: 'País' },
            { key: 'provinciaNombre', header: 'Provincia' },
            { key: 'nombre', header: 'Ciudad' },
            { key: 'esCapital', header: 'Capital', render: (v: boolean) => (v ? 'Sí' : 'No') },
            { key: 'activo', header: 'Activo', render: (v: boolean) => (v ? 'Sí' : 'No') },
        ],
        []
    )

    // const fetchData = useMemo(
    //     () =>
    //         makeLocalCrudFetcher<CiudadData>({
    //             getAll: async () => {
    //                 const data = ciudadId ? [await getCiudadById(ciudadId)] : await getCiudades()
    //                 return data.map(apiCiudadToData)
    //             },
    //             searchKeys: ['nombre', 'provinciaNombre', 'paisNombre'] as any,
    //         }),
    //     [ciudadId]
    // )
    const fetchData = useMemo(
        () =>
            fetchDataCrudWithFilters<CiudadData, any>({
                fetchData: getCiudades,
            }),
        []
    )

    async function onCreate(values: CiudadFormData) {
        const created = await createCiudad(values)
        return apiCiudadToData(created)
    }

    async function onEdit(row: CiudadData) {
        if (!row.id) throw new Error('ID de ciudad no definido')
        const updated = await updateCiudad(row.id, {
            nombre: row.nombre,
            provinciaId: row.provinciaId,
            esCapital: row.esCapital,
            activo: row.activo,
        })
        return apiCiudadToData(updated)
    }

    async function onDelete(row: CiudadData) {
        if (!row.id) throw new Error('ID de ciudad no definido')
        await deleteCiudad(row.id)
        return true
    }

    const crudQueries = {
        fetchData,
        createQuery: onCreate,
        editQuery: onEdit,
        deleteQuery: onDelete,
    }

    return (
        <CrudContainer<CiudadData, CiudadFormData>
            formModalProp={{
                form: CiudadesForm,
                props: { register: form.register, errors: form.formState.errors },
            }}
            form={form}
            columns={columns}
            crudQueries={crudQueries}
            defaultValues={defaultCiudadValues}
            isModalGrande={false}
        />
    )
}
export default CiudadCrud
