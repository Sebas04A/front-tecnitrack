import React, { useCallback, useMemo, useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    contactoEmpresaSchema,
    contactoPersonaSchema,
    ContactoEmpresaData,
    ContactoClienteData,
} from '../../../validation/contacto.schema'
import GenericTextInput from '../../form/Controls/GenericTextInput'
import GenericRowForm from '../../form/GenericRowForm'
import CrudContainer from '../CrudContainer'
import { ColumnDef } from '../CrudTable'
import {
    crearContactoCliente,
    crearContactoEmpresa,
    deleteContactoCliente,
    deleteContactoEmpresa,
    getContactosCliente,
    getContactosClienteById,
    getContactosEmpresa,
    updateContactoCliente,
    updateContactoEmpresa,
} from '../../../services/contactosApi'
import { makeLocalCrudFetcher } from '../helper/crud-helpers'
import ContactosForm from './Contactos/ContactosForm'

// Eliminamos la interfaz local con id y usamos los tipos del schema
// Empresa incluye nombre, Persona no.
export type Contacto = ContactoEmpresaData | ContactoClienteData

// Helper type guard
const hasNombre = (c: Contacto): c is ContactoEmpresaData =>
    'nombre' in c && typeof (c as any).nombre === 'string'

// Comparación de contactos sin id
const isSameContacto = (a: Contacto, b: Contacto) => {
    if (hasNombre(a) && hasNombre(b)) {
        return a.nombre === b.nombre && a.telefono === b.telefono && a.email === b.email
    }
    if (!hasNombre(a) && !hasNombre(b)) {
        return a.telefono === b.telefono && a.email === b.email
    }
    return false
}

interface ContactosCrudProps {
    tipoPersona: string
    titulo?: string
    clienteId?: number
}

const ContactosCrud: React.FC<ContactosCrudProps> = ({
    tipoPersona,
    titulo = 'Contactos',
    clienteId,
}) => {
    clienteId === -1 && (clienteId = undefined)
    console.warn('tipoPersona en ContactosCrud:', tipoPersona, ' clienteId:', clienteId)

    // Resolver dependiente directamente de tipoPersona (evita error de tipos con 'schema')
    const resolver = useMemo(
        () =>
            yupResolver(
                (tipoPersona === 'Juridica'
                    ? contactoEmpresaSchema
                    : contactoPersonaSchema) as unknown as any
            ) as any,
        [tipoPersona]
    )

    const defaultValues = useMemo(
        () =>
            (tipoPersona === 'Juridica'
                ? {
                      nombre: '',
                      telefono: '',
                      email: '',
                      tipoContacto: '',
                      principal: false,
                  }
                : { telefono: '', email: '', tipoContacto: '', principal: false }) as any,
        [tipoPersona]
    )

    const form = useForm<any>({
        mode: 'onChange',
        resolver,
        defaultValues,
    })

    // Cuando cambie el tipoPersona (y por ende el schema), reiniciar el formulario
    useEffect(() => {
        form.reset(defaultValues)
    }, [defaultValues, form.reset])

    const columns: ColumnDef<Contacto>[] = useMemo(
        () => [
            ...(tipoPersona === 'Juridica'
                ? ([{ key: 'nombre' as keyof Contacto, header: 'Nombre' }] as ColumnDef<Contacto>[])
                : []),
            { key: 'telefono', header: 'Teléfono' },
            { key: 'email', header: 'Email' },
            // { key: 'principal', header: 'Principal', render: value => (value ? 'Sí' : 'No') },
        ],
        [tipoPersona]
    )
    const fetchData = useMemo(
        () =>
            makeLocalCrudFetcher<Contacto>({
                getAll:
                    tipoPersona === 'Juridica'
                        ? clienteId
                            ? () => getContactosClienteById(clienteId)
                            : getContactosEmpresa
                        : clienteId
                        ? () => getContactosClienteById(clienteId)
                        : getContactosCliente,
                searchKeys: ['telefono', 'email'],
            }),
        [clienteId, tipoPersona]
    )

    async function createQuery(values: Contacto) {
        console.log('Creating contacto:', values)
        if (tipoPersona === 'Juridica') {
            return await crearContactoEmpresa(values as ContactoEmpresaData)
        } else {
            return await crearContactoCliente(values as ContactoClienteData)
        }
    }
    async function editQuery(values: Contacto) {
        console.log('Editing contacto:', values)
        if (tipoPersona === 'Juridica') {
            return await updateContactoEmpresa(values as ContactoEmpresaData)
        } else {
            return await updateContactoCliente(values as ContactoClienteData)
        }
    }
    async function deleteQuery(row: Contacto) {
        console.log('Deleting contacto:', row)
        if (tipoPersona === 'Juridica') {
            return await deleteContactoEmpresa(row.id)
        } else {
            return await deleteContactoCliente(row.id)
        }
    }
    const crudQueries = {
        fetchData: fetchData,
        createQuery: createQuery,
        editQuery: editQuery,
        deleteQuery: deleteQuery,
    }
    return (
        <CrudContainer<Contacto>
            formModalProp={{
                form: ContactosForm,
                props: { tipoPersona, register: form.register, errors: form.formState.errors },
            }}
            form={form}
            crudQueries={crudQueries}
            columns={columns}
            defaultValues={defaultValues}
            isModalGrande={false}
        />
    )
}

export default ContactosCrud
