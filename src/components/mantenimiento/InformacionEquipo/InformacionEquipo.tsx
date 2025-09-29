import { useForm } from 'react-hook-form'
import GenericTextInput from '../../form/Controls/GenericTextInput'
import GenericRowForm from '../../form/GenericRowForm'
import GenericSection from '../../form/GenericSection'
import GenericSelectSearch from '../../form/Controls/GenericSelectSearch'
import GenericSelect from '../../form/Controls/GenericSelect'
import GenericForm from '../../form/GenericForm'
import { useCallback, useEffect, useState } from 'react'
import {
    buscarSelectActivo,
    obtenerMarcasActivosSelect,
    obtenerSubtiposActivosSelect,
    obtenerTiposActivosSelect,
} from '../../../services/ORDEN/activoApi'
import { form, sub } from 'framer-motion/client'

function SoloEquipoForm({
    ordenId,
    register,
    blockForm,
    watch,
}: {
    ordenId: number
    register: ReturnType<typeof useForm>['register']
    blockForm: boolean
    watch: ReturnType<typeof useForm>['watch']
}) {
    const tipoEquipo = watch('tipoEquipo')
    const subtipo = watch('subtipo')
    console.log('Tipo Equipo seleccionado:', tipoEquipo)
    const obtenerSubtipoOptions = useCallback(
        () => (tipoEquipo ? obtenerSubtiposActivosSelect(tipoEquipo) : Promise.resolve([])),
        [tipoEquipo]
    )
    const obtenerMarcaOptions = useCallback(
        () => (subtipo ? obtenerMarcasActivosSelect(subtipo) : Promise.resolve([])),
        [subtipo]
    )
    return (
        <>
            {/* <GenericSection title='Detalles del Equipo'> */}
            <GenericRowForm>
                <GenericSelect
                    label='Tipo Equipo'
                    register={register}
                    name='tipoEquipo'
                    isReadOnly={blockForm}
                    getOptions={obtenerTiposActivosSelect}
                    required={true}
                    mostrarEspacioError={true}
                />
                <GenericSelect
                    label='Subtipo'
                    register={register}
                    name='subtipo'
                    getOptions={() => obtenerSubtipoOptions()}
                    // options={[
                    //     { label: 'Seleccione Tipo Equipo primero', value: '' },
                    //     { label: 'Laptop', value: '1' },
                    //     { label: 'Desktop', value: '2' },
                    //     { label: 'Impresora', value: '3' },
                    //     { label: 'Router', value: '4' },
                    // ]}
                    refreshKey={[tipoEquipo]}
                    isReadOnly={blockForm}
                    mostrarEspacioError={true}
                    required={true}
                />

                <GenericTextInput
                    label='Nombre Comercial'
                    placeholder='Ingrese el Nombre Comercial'
                    register={register}
                    name='nombreComercial'
                    isReadOnly={blockForm}
                    required={true}
                    mostrarEspacioError={true}
                />
            </GenericRowForm>

            <GenericRowForm>
                <GenericSelect
                    label='Marca'
                    register={register}
                    name='marca'
                    tipoCatalogo='marcaEquipo'
                    isReadOnly={blockForm || !subtipo}
                    mostrarEspacioError={true}
                    required={true}
                    getOptions={obtenerMarcaOptions}
                    refreshKey={[subtipo]}
                />

                <GenericTextInput
                    label='Modelo'
                    placeholder='Ingrese el Modelo'
                    register={register}
                    name='modelo'
                    isReadOnly={blockForm}
                    required={true}
                    mostrarEspacioError={true}
                />
                <GenericTextInput
                    label='Número de Serie'
                    placeholder='Ingrese el Número de Serie'
                    register={register}
                    name='numeroSerie'
                    isReadOnly={blockForm}
                    required={true}
                    mostrarEspacioError={true}
                />
            </GenericRowForm>
        </>
    )
}

export function EquipoSection({
    ordenId,
    form,
    blockForm,
}: {
    ordenId: number
    form: ReturnType<typeof useForm>
    blockForm: boolean
}) {
    return (
        <GenericSection>
            <GenericSelectSearch
                label='Buscar Equipo'
                placeholder='Seleccione un Equipo'
                control={form.control}
                name='equipo'
                fetchOptions={q => buscarSelectActivo(ordenId, q)}
            />
            <div className='px-6 mt-2'>
                <SoloEquipoForm
                    ordenId={ordenId}
                    blockForm={blockForm}
                    register={form.register}
                    watch={form.watch}
                />
            </div>
        </GenericSection>
    )
}
