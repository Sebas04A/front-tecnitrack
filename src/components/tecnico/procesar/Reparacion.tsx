import GenericForm from '../../form/GenericForm'
import { useForm } from 'react-hook-form'
import GenericSection from '../../form/GenericSection'
import GenericTextarea from '../../form/Controls/GenericTextArea'
import GenericRowForm from '../../form/GenericRowForm'
import GenericTextInput from '../../form/Controls/GenericTextInput'
import GenericDate from '../../form/Controls/GenericDate'

// Componente para un solo paso de la reparación
const RepairStep = ({
    title,
    stepNumber,
    register,
    errors,
}: {
    title: string
    stepNumber: number
    register: any
    errors: any
}) => {
    const baseName = `reparacion_paso_${stepNumber}`
    return (
        <div className='repair-step'>
            <div className='repair-step-header'>
                <div className='repair-step-title'>{`${stepNumber}. ${title}`}</div>
                {/* El estado podría ser un select o un badge dinámico */}
            </div>
            <GenericTextarea
                label='Descripción del Trabajo Realizado'
                name={`${baseName}_descripcion`}
                register={register}
                errors={errors}
            />
            <GenericRowForm>
                <GenericDate
                    label='Fecha de Realización'
                    name={`${baseName}_fecha`}
                    register={register}
                    errors={errors}
                />
                <GenericTextInput
                    type='number'
                    label='Tiempo Invertido (horas)'
                    name={`${baseName}_tiempo`}
                    register={register}
                    errors={errors}
                />
            </GenericRowForm>
        </div>
    )
}

export default function Reparacion() {
    const form = useForm()
    const {
        register,
        // handleSubmit,
        formState: { errors },
    } = form
    return (
        <GenericForm title='Reparación'>
            <GenericSection title='Proceso de Reparación'>
                <RepairStep
                    title='Reinstalación del Sistema Operativo'
                    stepNumber={1}
                    register={register}
                    errors={errors}
                />
                <RepairStep
                    title='Recuperación de Datos'
                    stepNumber={2}
                    register={register}
                    errors={errors}
                />
                <RepairStep
                    title='Reemplazo de Batería'
                    stepNumber={3}
                    register={register}
                    errors={errors}
                />
                <RepairStep
                    title='Limpieza Interna'
                    stepNumber={4}
                    register={register}
                    errors={errors}
                />

                <GenericTextarea
                    label='Observaciones Adicionales'
                    name='reparacion_observaciones'
                    register={register}
                    errors={errors}
                />
            </GenericSection>
        </GenericForm>
    )
}
