import GenericForm from '../../form/GenericForm'
import { useForm } from 'react-hook-form'
import GenericSection from '../../form/GenericSection'
import GenericRowForm from '../../form/GenericRowForm'
import GenericTextInput from '../../form/Controls/GenericTextInput'
import GenericDate from '../../form/Controls/GenericDate'
import GenericTextarea from '../../form/Controls/GenericTextArea'
import GenericSelect from '../../form/Controls/GenericSelect'

// / Sub-componente para mostrar los resultados de las pruebas
const TestResults = () => (
    <div className='test-results'>
        <div className='test-result-item'>
            <span>Arranque del Sistema</span>
            <span className='status-badge status-good'>Éxito</span>
        </div>
        <div className='test-result-item'>
            <span>Funcionamiento de Pantalla</span>
            <span className='status-badge status-good'>Éxito</span>
        </div>
        <div className='test-result-item'>
            <span>Carga de Batería</span>
            <span className='status-badge status-good'>Éxito</span>
        </div>
        <div className='test-result-item'>
            <span>Conexión WiFi</span>
            <span className='status-badge status-good'>Éxito</span>
        </div>
    </div>
)
const garantiaOptions = [
    { value: '30', label: '30 días' },
    { value: '60', label: '60 días' },
    { value: '90', label: '90 días' },
    { value: '180', label: '180 días' },
]
export default function Finalizacion() {
    const form = useForm()
    const {
        register,
        formState: { errors },
    } = form
    return (
        <GenericForm title='Finalización del Mantenimiento'>
            {' '}
            <GenericSection title='Finalización del Mantenimiento'>
                <h3>Resumen de la Reparación</h3>
                <GenericRowForm>
                    <GenericDate
                        label='Fecha de Inicio'
                        name='finalizacion_fecha_inicio'
                        register={register}
                        errors={errors}
                        isReadOnly // Generalmente la fecha de inicio no se edita al final
                    />
                    <GenericDate
                        label='Fecha de Finalización'
                        name='finalizacion_fecha_fin'
                        register={register}
                        errors={errors}
                    />
                </GenericRowForm>

                <label className='form-label'>Tiempo Total de Reparación</label>
                <GenericRowForm>
                    <GenericTextInput
                        type='number'
                        label='Días'
                        name='finalizacion_total_dias'
                        register={register}
                        errors={errors}
                        isReadOnly
                    />
                    <GenericTextInput
                        type='number'
                        label='Horas'
                        name='finalizacion_total_horas'
                        register={register}
                        errors={errors}
                        isReadOnly
                    />
                </GenericRowForm>

                <div className='form-group'>
                    <h3>Pruebas de Funcionalidad</h3>
                    <TestResults />
                </div>

                <GenericTextarea
                    label='Observaciones Finales'
                    name='finalizacion_observaciones'
                    register={register}
                    errors={errors}
                />

                <GenericSelect
                    label='Garantía Ofrecida'
                    name='finalizacion_garantia'
                    control={form.control}
                    options={garantiaOptions}
                />
            </GenericSection>
        </GenericForm>
    )
}
