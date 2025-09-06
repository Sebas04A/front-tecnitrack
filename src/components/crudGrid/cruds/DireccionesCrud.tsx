import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import CrudContainer from '../CrudContainer'
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
    deleteDireccion,
    getDireccionById,
    getDirecciones,
    updateDireccion,
} from '../../../services/direccionApi'
import { makeLocalCrudFetcher } from '../helper/crud-helpers'
import GenericButton from '../../form/Controls/GenericButton'
import DireccionesForm from './Direcciones/DireccionesForm'

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
    pais: '',
    provincia: '',
    ciudad: '',
    direccion: '',
    codigoPostal: '',
    tipo: '',
    principal: false,
}
const schema = direccionSchema
const resolver = yupResolver(schema)

const DireccionesCrud: React.FC<DireccionesCrudProps> = ({ titulo = 'Direcciones', clienteId }) => {
    clienteId === -1 && (clienteId = undefined)
    const form = useForm<DireccionData>({
        mode: 'onChange',
        resolver,
        defaultValues,
    })
    const columns: ColumnDef<DireccionData>[] = useMemo(
        () => [
            { key: 'ciudad', header: 'Ciudad' },
            { key: 'direccion', header: 'Dirección' },
            { key: 'tipo', header: 'Tipo' },
            { key: 'principal', header: 'Principal', render: value => (value ? 'Sí' : 'No') },
        ],
        []
    )

    const fetchData = useMemo(
        () =>
            makeLocalCrudFetcher<DireccionData>({
                getAll: clienteId ? () => getDireccionById(clienteId) : getDirecciones,
                searchKeys: ['pais', 'provincia', 'ciudad', 'direccion'],
            }),
        []
    )

    async function edit(values: DireccionData) {
        let response
        response = await updateDireccion(values)
        console.log('Dirección actualizada:', response)
        return response
    }
    async function create(values: DireccionData) {
        let response
        response = await createDireccion(values)
        console.log('Dirección creada:', response)
        return response
    }
    async function deleteAccion(row: DireccionData) {
        if (!row.id) throw new Error('ID de dirección no definido')
        let response = await deleteDireccion(row.id)
        console.log('Dirección eliminada:', response)
        return response
    }

    const crudQueries = {
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
                        register: form.register,
                        errors: form.formState.errors,
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
