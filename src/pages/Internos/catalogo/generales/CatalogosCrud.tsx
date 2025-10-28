import React, { useCallback, useEffect, useMemo } from 'react'
import { yupResolver } from '@hookform/resolvers/yup'

import { Resolver, useForm } from 'react-hook-form'

import CrudContainer, { crudQueries } from '../../../../components/crudGrid/CrudContainer'
import { ColumnDef } from '../../../../components/crudGrid/CrudTable'

import GenericSelectState from '../../../../components/form/Controls/GenericSelectState'

import { CatalogoDto } from '../../../../api'

import CatalogoForm from './components/CatalogoForm'
import { CatalogoFormData, catalogoSchema } from './models/catalogo.schema'
import {
    createCatalogo,
    deleteCatalogo,
    getCatalogoPorTipo,
    getTiposCatalogos,
    updateCatalogo,
} from './services/catalogos'
import { fetchDataCrudWithFilters } from '../../../../components/crudGrid/helper/fetchWithFilters'

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
    console.warn('RENDERIZANDO CATALOGOS CRUD')
    const [tipoCatalogo, setTipoCatalogo] = React.useState<string>('RolUsuario')
    const defaultValues: CatalogoFormData = {
        tipo: tipoCatalogo,
        valor: '',
        descripcion: '',
        activo: true,
        orden: 0,
    }

    // let fetchData = useMemo(
    //     () =>
    //         makeLocalCrudFetcher<CatalogoFormData>({
    //             getAll: () => getCatalogoLimpio(tipoCatalogo),
    //             searchKeys: ['tipo', 'valor', 'descripcion'],
    //         }),
    //     [tipoCatalogo]
    // )
    let fetchData = useMemo(
        () =>
            fetchDataCrudWithFilters({
                fetchData: getCatalogoPorTipo(tipoCatalogo),
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
        if (!data.id) throw new Error('ID es requerido para eliminar')
        if (typeof data.id !== 'number') throw new Error('ID es requerido para eliminar')
        const res = await deleteCatalogo(data.id)
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
        control,
    } = form
    useEffect(() => {
        console.log('ERRORS EN CATALOGOS CRUD', errors)
    }, [errors])

    // Registrar el campo 'tipo' y mantenerlo sincronizado con tipoCatalogo sin mostrar el select en el formulario
    // React.useEffect(() => {
    //     register('tipo')
    // }, [register])

    // React.useEffect(() => {
    //     setValue('tipo', tipoCatalogo, {
    //         shouldDirty: true,
    //         shouldTouch: true,
    //         shouldValidate: true,
    //     })
    // }, [tipoCatalogo, setValue])
    function fetchTiposCatalogos() {
        getTiposCatalogos()
            .then(tipos => {
                console.log('Tipos de catálogos disponibles:', tipos)
            })
            .catch(err => {
                console.error('Error obteniendo tipos de catálogos:', err)
            })
    }
    const [opcionesTiposCatalogo, setOpcionesTiposCatalogo] = React.useState<
        { value: string; label: string }[]
    >([])
    const cargarTiposCatalogo = useCallback(async () => {
        try {
            const tipos = await getTiposCatalogos()
            const opciones = tipos.map(tipo => ({ value: tipo, label: tipo }))
            setOpcionesTiposCatalogo(opciones)
            console.log('Tipos de catálogos cargados:', opciones)
        } catch (error) {
            console.error('Error cargando tipos de catálogos:', error)
        }
    }, [])
    useEffect(() => {
        cargarTiposCatalogo()
    }, [cargarTiposCatalogo])

    return (
        <div>
            <div className='p-6 bg-background-accent-auto rounded-lg  shadow-lg'>
                <p className='text-primary font-semibold text-lg mb-4'>Tipo de Catálogo</p>
                <GenericSelectState
                    name='tipoCatalogo'
                    value={tipoCatalogo}
                    onChange={e => {
                        setTipoCatalogo(e.target.value)
                    }}
                    placeholderOptionLabel='Seleccione un tipo'
                    options={opcionesTiposCatalogo}
                />
            </div>

            <CrudContainer<CatalogoFormData, CatalogoFormData>
                formModalProp={{
                    form: CatalogoForm,
                    props: { register, errors },
                    // propsNoCambiantes: { control },
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
