import React from 'react'
import GenericForm from '../form/GenericForm'
import { useForm } from 'react-hook-form'
import GenericSelect from '../form/Controls/GenericSelect'
import GenericSelectSearch from '../form/Controls/GenericSelectSearch'
import GenericTextInput from '../form/Controls/GenericTextInput'
import GenericSection from '../form/GenericSection'
import GenericButton from '../form/Controls/GenericButton'
import GenericCheckbox from '../form/Controls/GenericCheckbox'
import GenericRowForm from '../form/GenericRowForm'
import { FaTrash } from 'react-icons/fa'

interface Componente {
    id: number
    nombre: string
    condicion: string
    observaciones: string
    severidad: string
    seguimiento: boolean
}
function ComponentForm() {
    const form = useForm()
    const { register, handleSubmit } = form
    return (
        <GenericForm onSubmit={handleSubmit(() => {})}>
            <GenericRowForm>
                <GenericSelectSearch label='Componente' register={register} name='componente' />
                <GenericSelect label='Condicion' register={register} name='condicion' />
            </GenericRowForm>
            <GenericTextInput label='Observaciones' register={register} name='observaciones' />
            <GenericRowForm>
                <GenericSelect label='Severidad' register={register} name='severidad' />
                <GenericCheckbox
                    label='Requiere seguimiento'
                    register={register}
                    name='seguimiento'
                />
            </GenericRowForm>
        </GenericForm>
    )
}

export default function InspeccionForm() {
    const form = useForm()
    const { register, handleSubmit } = form
    const [componentes, setComponentes] = React.useState<Componente[]>([])
    const eliminarComponente = (i: number) => {
        setComponentes(componentes.filter((_, index) => index !== i))
    }

    const onSubmit = handleSubmit(data => {
        console.log(data)
    })
    const resetearValores = () => {
        form.reset()
    }
    return (
        <div>
            <GenericForm
                onSubmit={onSubmit}
                title='Información Inspección'
                onCancel={resetearValores}
            >
                <GenericRowForm>
                    <GenericSelectSearch label='Inspector' register={register} name='inspector' />
                    <GenericSelect
                        label='Condicion General'
                        register={register}
                        name='condicionGeneral'
                        options={[
                            { value: 'bueno', label: 'Bueno' },
                            { value: 'regular', label: 'Regular' },
                            { value: 'malo', label: 'Malo' },
                        ]}
                        placeholderOptionLabel='Seleccione una condición'
                    />
                </GenericRowForm>
                <GenericTextInput
                    label='Observaciones Generales'
                    register={register}
                    name='observacionesGenerales'
                />
                <GenericSection title='Componentes'>
                    {componentes.map((componente, index) => (
                        <div className='border shadow-md p-4 relative' key={index}>
                            <div
                                onClick={() => eliminarComponente(index)}
                                className='cursor-pointer absolute top-2 right-2 p-4'
                            >
                                <FaTrash className='text-error text-xl' />
                            </div>
                            <ComponentForm />
                        </div>
                    ))}
                    <GenericRowForm>
                        <div className='rounded border px-6 flex w-full justify-between items-center'>
                            <div>Indicar fallos en algun componente</div>
                            <GenericButton
                                text='Agregar Componente'
                                onClick={() =>
                                    setComponentes([
                                        ...componentes,
                                        {
                                            id: Date.now(),
                                            nombre: '',
                                            condicion: '',
                                            observaciones: '',
                                            severidad: '',
                                            seguimiento: false,
                                        },
                                    ])
                                }
                            />
                        </div>
                    </GenericRowForm>
                </GenericSection>
            </GenericForm>
        </div>
    )
}
