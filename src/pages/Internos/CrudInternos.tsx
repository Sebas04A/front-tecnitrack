import { useEffect, useMemo } from 'react'
import { ColumnDef, CrudContainer, crudQueries } from '../../components/crudGrid'
import { UsuarioInternoData, usuarioInternoSchema } from '../../validation/usuarioInterno'
import { makeLocalCrudFetcher } from '../../components/crudGrid/helper/crud-helpers'
import { Resolver, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { createInterno, deleteInterno, getInternos, updateInterno } from '../../services/internos'

import InternosForm from '../../components/crudGrid/cruds/Internos/InternosForm'

export default function CrudInternos() {
    console.warn('CrudInternos render')
    const defaultValues: UsuarioInternoData = {
        id: -1,
        nombreCompleto: '',
        apellidoCompleto: '',
        rol: 'Empleado',
        estado: 'Inactivo', // siempre Inactivo al crear
        email: '',
        genero: 'Masculino',
        usuario: '',
        contraseña: '',
        fechaNacimiento: '2000-01-01',
        tipoDocumento: '',
        numeroDocumento: '',
    }
    const form = useForm<UsuarioInternoData>({
        mode: 'onChange',
        resolver: yupResolver(usuarioInternoSchema) as unknown as Resolver<UsuarioInternoData>,
        // defaultValues,
    })

    const columns: ColumnDef<UsuarioInternoData>[] = [
        // { header: 'ID', key: 'id' },
        { header: 'Nombre', key: 'nombreCompleto' },
        { header: 'Apellido', key: 'apellidoCompleto' },
        { header: 'Email', key: 'email' },
        { header: 'Estado', key: 'estado' },
    ]

    const fetchData = useMemo(
        () =>
            makeLocalCrudFetcher<UsuarioInternoData>({
                getAll: getInternos,
                searchKeys: ['nombreCompleto', 'apellidoCompleto', 'email'],
            }),
        []
    )
    async function createQuery(data: UsuarioInternoData) {
        const res = await createInterno(data)
        return res
    }
    async function updateQuery(data: UsuarioInternoData) {
        if (!data.id) throw new Error('ID es requerido para actualizar')
        const res = await updateInterno(data.id, data)
        return res
    }
    async function deleteQuery(id: number | string) {
        const res = await deleteInterno(id as number)
        return res
    }
    const crudQueries: crudQueries<UsuarioInternoData, UsuarioInternoData, any> = {
        fetchData: fetchData,
        createQuery: createQuery,
        editQuery: updateQuery,
        deleteQuery: deleteQuery,
    }
    useEffect(() => {
        console.log(form.formState.errors)
    }, [form.formState.errors])

    return (
        <div>
            <CrudContainer<UsuarioInternoData, UsuarioInternoData>
                formModalProp={{
                    form: InternosForm,
                    props: { register: form.register, errors: form.formState.errors },
                }}
                form={form}
                crudQueries={crudQueries}
                columns={columns}
                defaultValues={defaultValues}
                isModalGrande={true}
                autoLoadOptions={{ autoLoad: true }}
            />
        </div>
    )
}
