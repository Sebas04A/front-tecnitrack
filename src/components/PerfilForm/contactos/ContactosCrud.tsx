import React, { useMemo, useEffect } from 'react'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import CrudContainer, { crudQueries } from '../../crud/CrudContainer'

import {
    contactoEmpresaSchema,
    contactoPersonaSchema,
    ContactoEmpresaData,
    ContactoClienteData,
} from './models/contacto.schema'

import {
    crearContactoEmpresa,
    crearContactoEmpresaById,
    deleteContactoEmpresa,
    deleteContactoEmpresaAdmin,
    getContactosEmpresa,
    getContactosEmpresaById,
    updateContactoEmpresa,
    updateContactoEmpresaByCliente,
} from './services/contactoEmpresaService'
import {
    crearContactoCliente,
    crearContactoClienteById,
    deleteContactoCliente,
    deleteContactoClienteAdmin,
    getContactosCliente,
    getContactosNaturalById,
    updateContactoCliente,
    updateContactoClienteByCliente,
} from './services/contactoService'

import ContactosForm from './ContactosForm'
import { fetchDataCrudWithFilters } from '../../crud/helper/fetchWithFilters'
import { ColumnDef } from '../../crud/components/CrudTable'

// Empresa incluye nombre, Persona no.
export type Contacto = ContactoEmpresaData | ContactoClienteData

// Helper type guard
const hasNombre = (c: Contacto): c is ContactoEmpresaData =>
    'nombre' in c && typeof (c as any).nombre === 'string'

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
    const esCrud = Boolean(clienteId)
    console.warn('tipoPersona en ContactosCrud:', tipoPersona, ' clienteId:', clienteId)

    // Resolver dependiente directamente de tipoPersona (evita error de tipos con 'schema')
    const resolver = useMemo(
        () =>
            yupResolver(
                (tipoPersona === 'Empresa'
                    ? contactoEmpresaSchema
                    : contactoPersonaSchema) as unknown as any
            ) as any,
        [tipoPersona]
    )

    const defaultValues = useMemo(
        () =>
            (tipoPersona === 'Empresa'
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
            ...(tipoPersona === 'Empresa'
                ? ([{ key: 'nombre' as keyof Contacto, header: 'Nombre' }] as ColumnDef<Contacto>[])
                : []),
            { key: 'telefono', header: 'Teléfono' },
            { key: 'email', header: 'Email' },
            // { key: 'principal', header: 'Principal', render: value => (value ? 'Sí' : 'No') },
        ],
        [tipoPersona]
    )
    // const fetchData = useMemo(
    //     () =>
    //         makeLocalCrudFetcher<Contacto>({
    //             getAll:
    //                 tipoPersona === 'Empresa'
    //                     ? esCrud
    //                         ? () => getContactosEmpresaById(clienteId!)
    //                         : getContactosEmpresa
    //                     : esCrud
    //                     ? () => getContactosNaturalById(clienteId!)
    //                     : getContactosCliente,
    //             searchKeys: ['telefono', 'email'],
    //         }),
    //     [clienteId, tipoPersona]
    // )

    const fetchData = useMemo(
        () =>
            fetchDataCrudWithFilters<Contacto, any>({
                fetchData:
                    tipoPersona === 'Empresa'
                        ? esCrud
                            ? params => getContactosEmpresaById(clienteId!)
                            : getContactosEmpresa
                        : esCrud
                        ? filters => getContactosNaturalById({ filters, clienteId: clienteId! })
                        : getContactosCliente,
            }),
        [tipoPersona]
    )

    async function createQuery(values: Contacto) {
        console.log('Creating contacto:', values)
        let response
        if (tipoPersona === 'Empresa') {
            if (esCrud)
                response = crearContactoEmpresaById(clienteId!, values as ContactoEmpresaData)
            else response = crearContactoEmpresa(values as ContactoEmpresaData)
        } else if (tipoPersona === 'Natural') {
            if (esCrud)
                response = crearContactoClienteById(clienteId!, values as ContactoClienteData)
            else response = crearContactoCliente(values as ContactoClienteData)
        }
        console.log('Contacto creado:', response)
        return response
    }
    async function editQuery(values: Contacto) {
        console.log('Editing contacto:', values)
        let response
        if (tipoPersona === 'Empresa') {
            if (esCrud)
                response = await updateContactoEmpresaByCliente(values as ContactoEmpresaData)
            else response = await updateContactoEmpresa(values as ContactoEmpresaData)
        } else {
            if (esCrud)
                response = await updateContactoClienteByCliente(values as ContactoClienteData)
            else response = await updateContactoCliente(values as ContactoClienteData)
        }
    }
    async function deleteQuery(data: Contacto) {
        const id = Number(data.id)
        console.log('Deleting contacto:', id)
        // let response
        if (tipoPersona === 'Empresa') {
            if (esCrud) return await deleteContactoEmpresaAdmin(id)
            else return await deleteContactoEmpresa(id)
        } else {
            if (esCrud) return await deleteContactoClienteAdmin(id)
            return await deleteContactoCliente(id)
        }
    }
    const crudQueries: crudQueries<Contacto> = {
        fetchData: fetchData,
        createQuery: createQuery,
        editQuery: editQuery,
        deleteQuery: deleteQuery,
    }
    return (
        <CrudContainer<Contacto, Contacto>
            formModalProp={{
                form: ContactosForm,
                props: { tipoPersona, register: form.register, errors: form.formState.errors },
            }}
            title='Contacto'
            mostrar_titulo={false}
            form={form}
            crudQueries={crudQueries}
            columns={columns}
            defaultValues={defaultValues}
            isModalGrande={false}
        />
    )
}

export default ContactosCrud
