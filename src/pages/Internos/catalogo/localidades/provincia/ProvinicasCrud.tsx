import React, { useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import CrudContainer from '../../../../../components/crud/CrudContainer'

import ProvinciasForm from './components/ProvinciasForm'
import { provinciaSchema, defaultProvinciaValues, ProvinciaFormData } from '../localidades.schema'
import {
    getProvincias,
    getProvinciaById,
    createProvincia,
    updateProvincia,
    deleteProvincia,
} from './services/provinciasApi'
import { makeLocalCrudFetcher } from '../../../../../components/crud/helper/crud-helpers'
import { apiProvinciaToData } from './adapters/provincias'
import { fetchDataCrudWithFilters } from '../../../../../components/crud/helper/fetchWithFilters'
import { ProvinciaData } from './models/provincia.type'
import { ColumnDef } from '../../../../../components/crud/components/CrudTable'

interface ProvinciasCrudProps {
    titulo?: string
    provinciaId?: number
}

const ProvinciasCrud: React.FC<ProvinciasCrudProps> = ({ provinciaId }) => {
    const form = useForm<ProvinciaFormData>({
        mode: 'onChange',
        resolver: yupResolver(provinciaSchema),
        defaultValues: defaultProvinciaValues,
    })

    const columns: ColumnDef<ProvinciaData>[] = useMemo(
        () => [
            { key: 'nombre', header: 'Nombre' },
            { key: 'paisNombre', header: 'País' },
            { key: 'activo', header: 'Activo', render: (v: boolean) => (v ? 'Sí' : 'No') },
        ],
        []
    )

    // const fetchData = useMemo(
    //     () =>
    //         makeLocalCrudFetcher<ProvinciaData>({
    //             getAll: async () => {
    //                 const data = provinciaId
    //                     ? [await getProvinciaById(provinciaId)]
    //                     : await getProvincias()
    //                 return data.map(apiProvinciaToData)
    //             },
    //             searchKeys: ['nombre', 'paisNombre'] as any,
    //         }),
    //     [provinciaId]
    // )
    const fetchData = useMemo(
        () =>
            fetchDataCrudWithFilters<ProvinciaData, any>({
                fetchData: getProvincias,
            }),
        []
    )

    async function onCreate(values: ProvinciaFormData) {
        const created = await createProvincia(values)
        return apiProvinciaToData(created)
    }

    async function onEdit(row: ProvinciaData) {
        if (!row.id) throw new Error('ID de provincia no definido')
        const updated = await updateProvincia(row.id, {
            nombre: row.nombre,
            paisId: row.paisId,
            activo: row.activo,
        })
        return apiProvinciaToData(updated)
    }

    async function onDelete(row: ProvinciaData) {
        if (!row.id) throw new Error('ID de provincia no definido')
        await deleteProvincia(row.id)
        return true
    }

    const crudQueries = {
        fetchData,
        createQuery: onCreate,
        editQuery: onEdit,
        deleteQuery: onDelete,
    }

    return (
        <CrudContainer<ProvinciaData, ProvinciaFormData>
            formModalProp={{
                form: ProvinciasForm,
                props: { register: form.register, errors: form.formState.errors },
            }}
            form={form}
            columns={columns}
            crudQueries={crudQueries}
            defaultValues={defaultProvinciaValues}
            isModalGrande={false}
        />
    )
}

export default ProvinciasCrud
