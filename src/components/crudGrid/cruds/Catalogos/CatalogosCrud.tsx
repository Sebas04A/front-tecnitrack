import React, { useCallback, useEffect, useMemo } from 'react'
import CrudContainer, { crudQueries } from '../../CrudContainer'
import { CatalogoDto } from '../../../../api'
import { ColumnDef } from '../../CrudTable'
import {
    createCatalogo,
    deleteCatalogo,
    getCatalogo,
    getCatalogoLimpio,
    getCatalogos,
    updateCatalogo,
} from '../../../../services/catalogos'
import { makeLocalCrudFetcher } from '../../helper/crud-helpers'
import { Resolver, useForm } from 'react-hook-form'
import GenericSelect from '../../../form/Controls/GenericSelect'
import GenericTextInput from '../../../form/Controls/GenericTextInput'
import { CatalogoFormData, catalogoSchema } from '../../../../validation/catalogo.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import TituloPagina from '../../../common/TituloPagina'
import CatalogoForm from './CatalogoForm'

const columns: ColumnDef<CatalogoDto>[] = [
    // { header: 'ID', key: 'id' },
    // { header: 'Tipo', key: 'tipo' },
    { header: 'Valor', key: 'valor', sortable: true },
    { header: 'Descripción', key: 'descripcion', sortable: true },
    {
        header: 'Estado',
        key: 'activo',
        render: value => (value ? 'Activo' : 'Inactivo'),
        sortable: true,
    },
]

export default function CatalogosCrud() {
    const [tipoCatalogo, setTipoCatalogo] = React.useState<string>('RolUsuario')
    const defaultValues: CatalogoFormData = {
        tipo: tipoCatalogo,
        valor: '',
        descripcion: '',
        activo: true,
        orden: 0,
    }

    let fetchData = useMemo(
        () =>
            makeLocalCrudFetcher<CatalogoFormData>({
                getAll: () => getCatalogoLimpio(tipoCatalogo),
                searchKeys: ['tipo', 'valor', 'descripcion'],
            }),
        [tipoCatalogo]
    )

    async function createQuery(data: CatalogoFormData) {
        console.log('Creating catalogo with data:', data)
        const res = await createCatalogo(data)
        return res
    }
    async function updateQuery(data: CatalogoFormData) {
        if (!data.id) throw new Error('ID es requerido para actualizar')
        const res = await updateCatalogo(data)
        return res
    }
    async function deleteQuery(data: CatalogoFormData) {
        // console.log(data)
        // if (!data.id) throw new Error('ID es requerido para eliminar')
        if (typeof data !== 'number') throw new Error('ID es requerido para eliminar')
        const res = await deleteCatalogo(data)
        return res
    }
    const crudQueries: crudQueries<CatalogoFormData> = {
        fetchData: fetchData,
        createQuery: createQuery,
        editQuery: updateQuery,
        deleteQuery: deleteQuery,
    }
    const form = useForm<CatalogoFormData>({
        mode: 'onChange',
        defaultValues: { tipo: tipoCatalogo ?? '' },
        resolver: yupResolver(catalogoSchema) as Resolver<CatalogoFormData>,
    })
    const {
        register,
        handleSubmit,
        reset,
        setValue,
        formState: { errors },
    } = form
    useEffect(() => {
        console.log('ERRORS EN CATALOGOS CRUD', errors)
    }, [errors])

    // Registrar el campo 'tipo' y mantenerlo sincronizado con tipoCatalogo sin mostrar el select en el formulario
    React.useEffect(() => {
        register('tipo')
    }, [register])

    React.useEffect(() => {
        setValue('tipo', tipoCatalogo, {
            shouldDirty: true,
            shouldTouch: true,
            shouldValidate: true,
        })
    }, [tipoCatalogo, setValue])

    return (
        <div>
            <div className='p-6 bg-background-accent-auto rounded-lg  shadow-lg'>
                <p className='text-primary font-semibold text-lg mb-4'>Tipo de Catálogo</p>
                <GenericSelect
                    name='tipoCatalogo'
                    value={tipoCatalogo}
                    onChange={e => {
                        setTipoCatalogo(e.target.value)
                    }}
                    placeholderOptionLabel='Seleccione un tipo'
                    options={[
                        { value: 'CargoEmpresa', label: 'Cargo Empresa' },
                        { value: 'Ciudad', label: 'Ciudad' },
                        { value: 'EstadoCita', label: 'Estado Cita' },
                        { value: 'EstadoGeneral', label: 'Estado General' },
                        { value: 'Genero', label: 'Género' },
                        { value: 'Pais', label: 'País' },
                        { value: 'Provincia', label: 'Provincia' },
                        { value: 'RolUsuario', label: 'Rol Usuario' },
                        { value: 'TipoCliente', label: 'Tipo Cliente' },
                        { value: 'TipoContactoInterno', label: 'Tipo Contacto Interno' },
                        { value: 'TipoDireccion', label: 'Tipo Dirección' },
                        { value: 'TipoDocumento', label: 'Tipo Documento' },
                        { value: 'TipoMantenimiento', label: 'Tipo Mantenimiento' },
                    ]}
                />
            </div>

            <CrudContainer<CatalogoFormData>
                formModalProp={{
                    form: CatalogoForm,
                    props: { register, errors },
                }}
                form={form}
                crudQueries={crudQueries}
                columns={columns}
                defaultValues={defaultValues}
                isModalGrande={false}
                autoLoadOptions={{ autoLoad: true, dependencies: [tipoCatalogo] }}
            >
                {/* Eliminado el select de "Tipo" del formulario; el valor se maneja oculto vía setValue */}
                {/* Campo oculto para garantizar registro (opcional si ya registramos en useEffect) */}
                {/* <input type='hidden' {...register('tipo')} value={tipoCatalogo} /> */}
            </CrudContainer>
        </div>
    )
}
