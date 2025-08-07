import { yupResolver } from '@hookform/resolvers/yup'
import GenericSelect from '../../form/Controls/GenericSelect'
import GenericTextInput from '../../form/Controls/GenericTextInput'
import GenericRowForm from '../../form/GenericRowForm'
import GenericSection from '../../form/GenericSection'
import { PerfilPersonaNaturalData, personaNaturalSchema } from '../../../validation/perfil.schema'
import { useForm } from 'react-hook-form'
import { FormProfileProps } from '../../../types/formsProfile'

export default function PersonaNaturalForm({
    form,
    tipoPersona,
    estaEditando,
}: FormProfileProps<PerfilPersonaNaturalData>) {
    const {
        register,
        formState: { errors },
    } = form
    return (
        <div>
            <GenericSection title='Información Personal'>
                <GenericRowForm>
                    <GenericTextInput
                        label='Nombre Completo'
                        name='nombreCompleto'
                        type='text'
                        register={register}
                        errors={errors}
                        isReadOnly={!estaEditando}
                    />
                    <GenericTextInput
                        label='Apellido Completo'
                        name='apellidoCompleto'
                        type='text'
                        register={register}
                        errors={errors}
                        isReadOnly={!estaEditando}
                    />
                </GenericRowForm>
                <GenericRowForm>
                    <GenericSelect
                        label='Tipo de Documento'
                        name='tipoDocumento'
                        register={register}
                        errors={errors}
                        options={[
                            {
                                value: 'Cédula',
                                label: 'Cédula de Ciudadanía',
                            },
                            { value: 'Pasaporte', label: 'Pasaporte' },
                        ]}
                        isReadOnly={!estaEditando}
                    />
                    <GenericTextInput
                        label='Número de Documento'
                        name='numeroDocumento'
                        type='text'
                        register={register}
                        errors={errors}
                        isReadOnly={!estaEditando}
                    />
                </GenericRowForm>
            </GenericSection>
        </div>
    )
}
