import React, { useEffect, useMemo } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import CrudContainer, { crudQueries } from '../../crud/CrudContainer'
import { ColumnDef } from '../../crud/components/CrudTable'

import { fetchDataCrudWithFilters } from '../../crud/helper/fetchWithFilters'

import DireccionesForm from './components/DireccionesForm'

import { DireccionData, direccionSchema } from './models/direccion.schema'
import {
    createDireccion,
    createDireccionCliente,
    deleteDireccion,
    deleteDireccionCliente,
    getDireccionByCliente,
    getDirecciones,
    updateDireccion,
    updateDireccionCliente,
} from './services/direccionApi'

interface DireccionesCrudProps {
    titulo?: string
    clienteId?: number
}

const defaultValues: DireccionData = {
    pais: -1,
    provincia: -1,
    ciudad: -1,
    direccion: '',
    codigoPostal: '',
    tipo: '',
    principal: false,
}
const schema = direccionSchema
const resolver = yupResolver(schema)

const DireccionesCrud: React.FC<DireccionesCrudProps> = ({ clienteId }) => {
    // console.warn('DireccionesCrud render clienteId:', clienteId)
    // clienteId === -1 && (clienteId = undefined)
    const esCrud = !!clienteId
    const form = useForm<DireccionData>({
        mode: 'onChange',
        resolver,
        defaultValues,
    })
    const direccion = form.watch() // Observa todo el objeto de dirección
    useEffect(() => {
        console.log('Direccion changed:', direccion)
    }, [direccion])

    const columns: ColumnDef<DireccionData>[] = useMemo(
        () => [
            { key: 'ciudadNombre', header: 'Ciudad' },
            { key: 'direccion', header: 'Dirección' },
            { key: 'tipo', header: 'Tipo' },
            { key: 'principal', header: 'Principal', render: value => (value ? 'Sí' : 'No') },
        ],
        []
    )

    const fetchData = useMemo(
        () =>
            fetchDataCrudWithFilters<DireccionData, any>({
                fetchData: esCrud
                    ? filters => getDireccionByCliente(clienteId ?? -1)(filters)
                    : getDirecciones,
            }),
        []
    )

    async function edit(values: DireccionData) {
        let response
        if (esCrud) response = await updateDireccionCliente(values)
        else response = await updateDireccion(values)
        console.log('Dirección actualizada:', response)
        return response
    }
    async function create(values: DireccionData) {
        let response
        if (esCrud) {
            response = await createDireccionCliente(values, clienteId!)
        } else {
            response = await createDireccion(values)
        }
        console.log('Dirección creada:', response)
        return response
    }
    async function deleteAccion(data: DireccionData) {
        const id = Number(data.id)
        if (!id) throw new Error('ID de dirección no definido')
        let response
        if (esCrud) response = await deleteDireccionCliente(id)
        else response = await deleteDireccion(id)
        console.log('Dirección eliminada:', response)
        return response
    }

    const crudQueries: crudQueries<DireccionData> = {
        fetchData: fetchData,
        createQuery: create,
        editQuery: edit,
        deleteQuery: deleteAccion,
    }

    return (
        <>
            <CrudContainer<DireccionData, DireccionData>
                formModalProp={{
                    form: DireccionesForm,
                    props: {
                        watch: form.watch,
                        values: form.watch(),
                    },
                    propsNoCambiantes: {
                        control: form.control,
                        register: form.register,
                        errors: form.formState.errors,
                        setValue: form.setValue,
                        // control: form.control,
                    },
                }}
                title={'Direccion'}
                mostrar_titulo={false}
                form={form}
                crudQueries={crudQueries}
                columns={columns}
                defaultValues={defaultValues}
                isModalGrande={false}
            />
        </>
    )
}
export default DireccionesCrud
