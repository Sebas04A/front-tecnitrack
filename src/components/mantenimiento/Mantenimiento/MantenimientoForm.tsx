import { useEffect } from 'react'
import GenericForm from '../../form/GenericForm'
import GenericSelect from '../../form/Controls/GenericSelect'
import { useForm } from 'react-hook-form'

import GenericSelectSearch from '../../form/Controls/GenericSelectSearch'
import GenericRowForm from '../../form/GenericRowForm'
import GenericTextarea from '../../form/Controls/GenericTextArea'
import { WindowProps } from '../MantenimientoIngreso'

import { yupResolver } from '@hookform/resolvers/yup'
import { mantenimientoValidationSchema } from '../../../validation/IngresoOrden/mantenimiento'
import { getTecnicosSearch } from '../../../services/Select/usuariosSearch'
import { Option } from '../../../types/form'
import { getDatosMantenimiento, postMantenimiento } from './services/mantenimiento'

// const defaultValues = {
//     tipoMantenimiento: 'Correctivo',
//     descripcionProblema: 'El equipo no enciende',
// }

export default function MantenimientoForm({
    handleClose,
    handleSave,
    orden,
    readOnly,
}: WindowProps) {
    const form = useForm({
        // defaultValues,
        resolver: yupResolver(mantenimientoValidationSchema),
        mode: 'onChange',
    })
    const { register, handleSubmit } = form

    const resetearValores = () => {
        form.reset()
    }
    function onSubmit(data: any) {
        console.log('GUARDANDO DATA', data)
        postMantenimiento(data, orden.id!)
        handleSave()
    }

    useEffect(() => {
        // cargar datos de mantenimiento
        getDatosMantenimiento(orden.id!).then(data => {
            console.log({ data })
            form.reset(data)
        })
    }, [])

    async function fetchTecnicos(query: string) {
        try {
            const res = await getTecnicosSearch(query)
            const options: Option[] = res?.map(catalogo => {
                if (!catalogo.id) return { label: 'No definido', value: '-1' }
                return {
                    label: catalogo.nombreCompleto + ' - ' + catalogo.numeroIdentificacion,
                    value: String(catalogo.id),
                }
            })
            return options
        } catch (error) {
            console.error('Error fetching técnicos:', error)
            return []
        }
    }

    return (
        <div>
            <GenericForm
                // onSubmit={handleSubmit(onSubmit)}
                onSubmit={(e: any) => {
                    e.preventDefault()
                    console.log('SUBMIT', e)
                    console.log('FORM DATA', form.getValues())
                    handleSubmit(onSubmit)()
                    console.log('ERRORES', form.formState.errors)
                }}
                title='Información Mantenimiento'
                onCancel={resetearValores}
                showButtons={true}
            >
                <GenericRowForm>
                    <GenericSelect
                        label='Tipo Mantenimiento'
                        control={form.control}
                        name='tipoMantenimiento'
                        tipoCatalogo='tipoMantenimiento'
                        placeholderOptionLabel='Seleccione un tipo de mantenimiento'
                        // isReadOnly={true}
                        mostrarEspacioError={!readOnly}
                        isReadOnly={readOnly}
                    />
                    <GenericSelect
                        label='Prioridad'
                        control={form.control}
                        name='prioridad'
                        tipoCatalogo='prioridad'
                        placeholderOptionLabel='Seleccione una prioridad'
                        isReadOnly={readOnly}
                    />
                </GenericRowForm>
                <GenericTextarea
                    label='Descripción del Problema'
                    register={register}
                    errors={form.formState.errors}
                    name='descripcionProblema'
                    isReadOnly={readOnly}
                    // isReadOnly={true}
                />
                <GenericRowForm>
                    <GenericSelectSearch
                        label='Técnico'
                        control={form.control}
                        name='tecnico'
                        fetchOptions={fetchTecnicos}
                        isReadOnly={readOnly}
                        mostrarEspacioError={!readOnly}
                    />
                    <GenericSelect
                        label='Condición General'
                        control={form.control}
                        name='estado'
                        tipoCatalogo='CondicionGeneral'
                        placeholderOptionLabel='Seleccione un estado'
                        isReadOnly={readOnly}
                    />
                </GenericRowForm>
                <GenericTextarea
                    label='Observaciones'
                    register={register}
                    errors={form.formState.errors}
                    name='observaciones'
                    isReadOnly={readOnly}
                />
            </GenericForm>
        </div>
    )
}
