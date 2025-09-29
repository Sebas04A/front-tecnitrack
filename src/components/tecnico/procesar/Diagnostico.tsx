import GenericForm from '../../form/GenericForm'
import GenericSection from '../../form/GenericSection'
import GenericTextarea from '../../form/Controls/GenericTextArea'
import GenericTextInput from '../../form/Controls/GenericTextInput'
import GenericRowForm from '../../form/GenericRowForm'
import { useForm } from 'react-hook-form'

export default function Diagnostico() {
    const form = useForm()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = form
    return (
        <GenericForm
            title='Diagnóstico'
            onSubmit={handleSubmit(() => {})}
            onCancel={() => {
                form.reset()
            }}
            showButtons={true}
        >
            <GenericSection title='Diagnóstico Técnico'>
                <GenericTextarea
                    label='Diagnóstico General'
                    name='diagnostico_general'
                    register={register}
                    errors={errors}
                    placeholder='Describa el diagnóstico general del equipo...'
                />
                <GenericTextInput
                    type='text'
                    label='Causa Principal del Problema'
                    name='diagnostico_causa'
                    register={register}
                    errors={errors}
                    placeholder='Describa la causa principal...'
                />

                {/* <h3>Diagnóstico por Componentes</h3>
                <div className='diagnostic-section'>
                    <DiagnosticoItem
                        nombreComponente='Pantalla'
                        register={register}
                        errors={errors}
                    />
                    <DiagnosticoItem
                        nombreComponente='Teclado'
                        register={register}
                        errors={errors}
                    />
                    <DiagnosticoItem
                        nombreComponente='Bateria'
                        register={register}
                        errors={errors}
                    />
                    <DiagnosticoItem
                        nombreComponente='SistemaArranque'
                        register={register}
                        errors={errors}
                    />
                </div> */}

                <GenericTextarea
                    label='Recomendaciones y Soluciones Propuestas'
                    name='diagnostico_recomendaciones'
                    register={register}
                    errors={errors}
                />

                <label className='form-label'>Tiempo Estimado de Reparación</label>
                <GenericSection title='Tiempo Estimado de Reparación'>
                    <GenericRowForm>
                        <GenericTextInput
                            type='number'
                            label='Días'
                            name='diagnostico_tiempo_dias'
                            register={register}
                            errors={errors}
                        />
                        <GenericTextInput
                            type='number'
                            label='Horas'
                            name='diagnostico_tiempo_horas'
                            register={register}
                            errors={errors}
                        />
                    </GenericRowForm>
                </GenericSection>

                {/* <div className='actions'>
                    <GenericButton
                        text='Siguiente: Cotización'
                        type='submit'
                        disabled={isSubmitting}
                        onClick={handleSubmit(onDiagnosticoSubmit)}
                    />
                </div> */}
            </GenericSection>
        </GenericForm>
    )
}
