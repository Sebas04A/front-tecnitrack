import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CrudContainer, { crudQueries } from '../CrudContainer'
import { ColumnDef } from '../CrudTable'
import { Modal } from '../../common/Modal'
import GenericForm from '../../form/GenericForm'
import GenericRowForm from '../../form/GenericRowForm'
import GenericTextInput from '../../form/Controls/GenericTextInput'
// import { direccionSchema, DireccionData } from '../../../validation/perfil.schema'
import { useModal } from '../../../hooks/useModal'
import GenericSelect from '../../form/Controls/GenericSelect'
import { DireccionData, direccionSchema } from '../../../validation/direccion.schema'
import {
    createDireccion,
    createDireccionCliente,
    deleteDireccion,
    deleteDireccionCliente,
    getDireccionByCliente,
    getDirecciones,
    updateDireccion,
    updateDireccionCliente,
} from '../../../services/direccionApi'
import { makeLocalCrudFetcher } from '../helper/crud-helpers'
import GenericButton from '../../form/Controls/GenericButton'
import DireccionesForm from './Direcciones/DireccionesForm'
import { Option } from '../../../types/form'
import { use } from 'framer-motion/client'

interface DireccionesCrudProps {
    titulo?: string
    clienteId?: number
}

// Helper para comparar direcciones sin id
const isSameDireccion = (a: DireccionData, b: DireccionData) =>
    a.pais === b.pais &&
    a.provincia === b.provincia &&
    a.ciudad === b.ciudad &&
    a.direccion === b.direccion &&
    a.codigoPostal === b.codigoPostal &&
    a.tipo === b.tipo

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

const DireccionesCrud: React.FC<DireccionesCrudProps> = ({ titulo = 'Direcciones', clienteId }) => {
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
    const [paises, setPaises] = useState<Option[]>([])
    const [provincias, setProvincias] = useState<Option[]>([])
    const [ciudades, setCiudades] = useState<Option[]>([])

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
            makeLocalCrudFetcher<DireccionData>({
                getAll: esCrud ? () => getDireccionByCliente(clienteId) : getDirecciones,
                searchKeys: ['pais', 'provincia', 'ciudad', 'direccion'],
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
            {/* Corregimos el tipo genérico para coincidir con DireccionData */}
            <CrudContainer<DireccionData, DireccionData>
                formModalProp={{
                    form: DireccionesForm,
                    props: {
                        // register: form.register,
                        // errors: form.formState.errors,
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
