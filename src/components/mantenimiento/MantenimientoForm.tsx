import React from 'react'
import GenericForm from '../form/GenericForm'
import GenericSelect from '../form/Controls/GenericSelect'
import { useForm } from 'react-hook-form'
import GenericTextInput from '../form/Controls/GenericTextInput'
import GenericSelectSearch from '../form/Controls/GenericSelectSearch'
import GenericRowForm from '../form/GenericRowForm'

export default function MantenimientoForm() {
    const form = useForm()
    const { register, handleSubmit } = form

    const resetearValores = () => {
        form.reset()
    }
    return (
        <div>
            <GenericForm
                onSubmit={handleSubmit(data => {
                    console.log(data)
                })}
                title='Información Mantenimiento'
                onCancel={resetearValores}
                showButtons={true}
            >
                <GenericRowForm>
                    <GenericSelectSearch
                        label='Quien Recibe'
                        register={register}
                        name='quienRecibe'
                    />
                    <GenericSelectSearch label='Técnico' register={register} name='tecnico' />
                    <GenericSelect
                        label='Tipo Mantenimiento'
                        register={register}
                        name='tipoMantenimiento'
                        tipoCatalogo='tipoMantenimiento'
                        placeholderOptionLabel='Seleccione un tipo de mantenimiento'
                    />
                    <GenericSelect
                        label='Prioridad'
                        register={register}
                        name='prioridad'
                        tipoCatalogo='prioridad'
                        placeholderOptionLabel='Seleccione una prioridad'
                    />
                </GenericRowForm>
                <GenericRowForm>
                    <GenericTextInput
                        label='Direccion Bodega/Mantenimiento'
                        register={register}
                        name='direccion'
                    />

                    <GenericTextInput label='Accesorios' register={register} name='accesorios' />
                </GenericRowForm>
                <GenericTextInput label='Motivo Ingreso' register={register} name='observaciones' />

                <GenericTextInput label='Observaciones' register={register} name='observaciones' />
            </GenericForm>
        </div>
    )
}
