import React from 'react'
import GenericForm from '../form/GenericForm'
import GenericTextInput from '../form/Controls/GenericTextInput'
import { useForm } from 'react-hook-form'
import GenericRowForm from '../form/GenericRowForm'
import GenericSelectSearch from '../form/Controls/GenericSelectSearch'
import GenericSection from '../form/GenericSection'

export default function FormularioEquipo() {
    const form = useForm()
    const { register, handleSubmit } = form
    const onSubmit = handleSubmit(data => {
        console.log(data)
    })
    const resetForm = () => {
        form.reset()
    }
    return (
        <GenericForm
            showButtons={true}
            onSubmit={onSubmit}
            onCancel={resetForm}
            title='Informacion Equipo'
        >
            <GenericSelectSearch
                label='Seleccionar Equipo'
                placeholder='Seleccione un Equipo'
                register={register}
                name='equipo'
            />
            <div className='border-y my-4 p-2  w-full text-center'>o</div>
            <GenericRowForm>
                <GenericTextInput
                    label='Tipo Equipo'
                    placeholder='Ingrese el Tipo de Equipo'
                    register={register}
                    name='tipoEquipo'
                />
                <GenericTextInput
                    label='Marca'
                    placeholder='Ingrese la Marca'
                    register={register}
                    name='marca'
                />
                <GenericTextInput
                    label='Modelo'
                    placeholder='Ingrese el Modelo'
                    register={register}
                    name='modelo'
                />
            </GenericRowForm>
            <GenericRowForm>
                <GenericTextInput
                    label='Numero Serie'
                    placeholder='Ingrese el Numero de Serie'
                    register={register}
                    name='numeroSerie'
                />
                <GenericTextInput label='Nombre Comercial' register={register} name='nombre' />
            </GenericRowForm>
        </GenericForm>
    )
}
