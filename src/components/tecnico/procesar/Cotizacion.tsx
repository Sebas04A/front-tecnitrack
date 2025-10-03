import GenericForm from '../../form/GenericForm'
import GenericSection from '../../form/GenericSection'
import GenericTextarea from '../../form/Controls/GenericTextArea'
import GenericRowForm from '../../form/GenericRowForm'
import GenericSelect from '../../form/Controls/GenericSelect'
import GenericTextInput from '../../form/Controls/GenericTextInput'
import GenericButton from '../../form/Controls/GenericButton'
import { useFieldArray, useForm } from 'react-hook-form'

const repuestosOptions = [
    { value: '', label: 'Seleccionar repuesto...' },
    { value: 'bateria', label: 'Batería para Laptop Dell XPS 13' },
    { value: 'disco', label: 'Disco SSD 512GB' },
    { value: 'ram', label: 'Memoria RAM 8GB' },
]

const manoDeObraOptions = [
    { value: '', label: 'Seleccionar tipo de trabajo...' },
    { value: 'reinstalacion', label: 'Reinstalación de Sistema Operativo' },
    { value: 'reparacion', label: 'Reparación General' },
    { value: 'mantenimiento', label: 'Mantenimiento Preventivo' },
    { value: 'complejo', label: 'Reparación Compleja' },
]

export default function Cotizacion() {
    const form = useForm()
    const {
        register,
        handleSubmit,
        formState: { errors },
        control,
    } = form

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'repuestos',
    })

    const onCotizacionSubmit = (data: any) => {
        console.log('Datos de Cotización:', data)
    }

    return (
        <GenericForm
            title='Cotización'
            showButtons={true}
            onSubmit={handleSubmit(onCotizacionSubmit)}
            onCancel={() => form.reset()}
        >
            <GenericSection title='Cotización de Reparación'>
                <GenericTextarea
                    label='Descripción del Trabajo a Realizar'
                    name='cotizacion_descripcion'
                    register={register}
                    errors={errors}
                />

                <h3>Repuestos Requeridos</h3>
                <div>
                    {fields.map((item, index) => (
                        <GenericRowForm key={item.id}>
                            <GenericSelect
                                name={`repuestos.${index}.id`}
                                control={control}
                                options={repuestosOptions}
                                // No se usa label aquí para un look más compacto en la fila
                            />
                            <GenericTextInput
                                type='number'
                                name={`repuestos.${index}.cantidad`}
                                register={register}
                                placeholder='Cant.'
                            />
                            <GenericTextInput
                                type='number'
                                name={`repuestos.${index}.precio`}
                                register={register}
                                placeholder='Precio Unit.'
                            />
                            <GenericButton
                                text='Quitar'
                                onClick={() => remove(index)}
                                className='btn-danger'
                            />
                        </GenericRowForm>
                    ))}
                    <GenericButton
                        text='Agregar Repuesto'
                        onClick={() => append({ id: '', cantidad: 1, precio: 0 })}
                        className='btn-primary'
                    />
                </div>

                <GenericSection title='Mano de Obra'>
                    <GenericSelect
                        label='Tipo de Trabajo'
                        name='mano_de_obra_tipo'
                        control={control}
                        options={manoDeObraOptions}
                    />

                    <GenericTextarea
                        label='Notas Adicionales para el Cliente'
                        name='cotizacion_notas'
                        register={register}
                        errors={errors}
                    />
                </GenericSection>
            </GenericSection>
        </GenericForm>
    )
}
