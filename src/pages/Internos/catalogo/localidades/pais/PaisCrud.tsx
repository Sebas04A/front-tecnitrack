import { useMemo } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { ColumnDef } from '../../../../../components/crudGrid/CrudTable'
import { makeLocalCrudFetcher } from '../../../../../components/crudGrid/helper/crud-helpers'
import CrudContainer, { crudQueries } from '../../../../../components/crudGrid/CrudContainer'

import { apiToData, PaisData } from './models/paises'
import { createPais, deletePais, getPaisById, getPaises, updatePais } from './services/paisApi'
import PaisesForm from './components/PaisForm'
import { PaisFormData, defaultPaisValues, paisSchema } from './models/paises.schema'

interface PaisesCrudProps {
    titulo?: string
    paisId?: number
}
export const PaisesCrud: React.FC<PaisesCrudProps> = ({ titulo, paisId }) => {
    const form = useForm<PaisFormData>({
        mode: 'onChange',
        resolver: yupResolver(paisSchema),
        defaultValues: defaultPaisValues,
    })
    const columns: ColumnDef<PaisData>[] = useMemo(
        () => [
            { key: 'nombre', header: 'Nombre' },
            { key: 'codigoISO', header: 'Código ISO' },
            { key: 'codigoTelefonico', header: 'Código Tel.' },
            { key: 'activo', header: 'Activo', render: v => (v ? 'Sí' : 'No') },
        ],
        []
    )
    const fetchData = useMemo(
        () =>
            makeLocalCrudFetcher<PaisData>({
                getAll: async () => {
                    const data = paisId ? [await getPaisById(paisId)] : await getPaises()
                    return data.map(apiToData)
                },
                searchKeys: ['nombre', 'codigoISO', 'codigoTelefonico'] as any,
            }),
        [paisId]
    )
    async function onCreate(values: PaisFormData) {
        const created = await createPais(values) // form->api en service
        return apiToData(created)
    }

    async function onEdit(row: PaisFormData) {
        if (!row.id) throw new Error('ID de país no definido')
        const updated = await updatePais(row.id, {
            nombre: row.nombre,
            codigoISO: row.codigoISO,
            codigoTelefonico: row.codigoTelefonico,
            activo: row.activo,
        })
        return apiToData(updated)
    }

    async function onDelete(data: PaisData) {
        if (!data.id) throw new Error('ID de país no definido')
        await deletePais(Number(data.id))
        return true
    }

    const crudQueries: crudQueries<PaisData, PaisFormData> = {
        fetchData,
        createQuery: onCreate,
        editQuery: onEdit,
        deleteQuery: onDelete,
    }
    return (
        <CrudContainer<PaisData, PaisFormData>
            title={titulo}
            formModalProp={{
                form: PaisesForm,
                props: { register: form.register, errors: form.formState.errors },
            }}
            form={form}
            columns={columns}
            crudQueries={crudQueries}
            defaultValues={defaultPaisValues}
            isModalGrande={false}
        />
    )
}
