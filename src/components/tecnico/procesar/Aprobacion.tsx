import GenericForm from '../../form/GenericForm'
import GenericSection from '../../form/GenericSection'
import GenericRowForm from '../../form/GenericRowForm'
import GenericCheckbox from '../../form/Controls/GenericCheckbox'
import GenericDate from '../../form/Controls/GenericDate'
import GenericTextarea from '../../form/Controls/GenericTextArea'
import { useForm } from 'react-hook-form'

export default function Aprobacion() {
    const form = useForm()
    const {
        register,

        formState: { errors },
    } = form
    return (
        <GenericForm title='Aprobación'>
            <GenericSection title='Aprobación del Cliente'>
                <GenericDate
                    // type='date'
                    label='Fecha de Envío de Cotización'
                    name='aprobacion_fecha_envio'
                    register={register}
                    errors={errors}
                />

                <div className='form-group'>
                    <label>Método de Notificación</label>
                    {/* Usamos GenericRowForm para alinear los checkboxes */}
                    <GenericRowForm>
                        <GenericCheckbox label='Email' name='notif_email' register={register} />
                        <GenericCheckbox label='SMS' name='notif_sms' register={register} />
                        <GenericCheckbox
                            label='Llamada telefónica'
                            name='notif_llamada'
                            register={register}
                        />
                    </GenericRowForm>
                </div>

                <GenericTextarea
                    label='Comentarios para el Cliente'
                    name='aprobacion_comentarios'
                    register={register}
                    errors={errors}
                />

                <GenericTextarea
                    label='Respuesta del Cliente'
                    name='aprobacion_respuesta_cliente'
                    register={register}
                    errors={errors}
                    placeholder='Esperando respuesta del cliente...'
                />

                <GenericDate
                    // type='date'
                    label='Fecha Límite para Respuesta'
                    name='aprobacion_fecha_limite'
                    register={register}
                    errors={errors}
                />
            </GenericSection>
        </GenericForm>
    )
}
