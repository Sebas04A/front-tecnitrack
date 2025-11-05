import React, { useMemo } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import CrudContainer from '../../../../../components/crud/CrudContainer'
import { ColumnDef } from '../../../../../components/crud/components/CrudTable'
import { fetchDataCrudWithFilters } from '../../../../../components/crud/helper/fetchWithFilters'

import { provinciaSchema, defaultProvinciaValues, ProvinciaFormData } from '../localidades.schema'

import {
    getProvincias,
    createProvincia,
    updateProvincia,
    deleteProvincia,
} from './services/provinciasApi'
import { apiProvinciaToData } from './adapters/provincias'
import { ProvinciaData } from './models/provincia.type'
import ProvinciasForm from './components/ProvinciasForm'

interface ProvinciasCrudProps {
    titulo?: string
    provinciaId?: number
}

const ProvinciasCrud: React.FC<ProvinciasCrudProps> = () => {
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
