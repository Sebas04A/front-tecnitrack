import GenericSection from '../../form/GenericSection'
import GenericRowForm from '../../form/GenericRowForm'
import GenericTextInput from '../../form/Controls/GenericTextInput'
import { useForm } from 'react-hook-form'
import { PerfilEmpresaData, personaJuridicaSchema } from '../../../validation/perfil.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProfileProps } from '../../../types/formsProfile'

export default function PersonaJuridicaForm({
    form,
    tipoPersona,
    estaEditando,
}: FormProfileProps<PerfilEmpresaData>) {
    const {
        register,
        formState: { errors },
    } = form
    return (
        <div>
            <GenericSection title='Información de la Empresa'>
                <GenericRowForm>
                    <GenericTextInput
                        label='RUC'
                        name='RUC'
                        type='text'
                        register={register}
                        errors={errors}
                        className='min-w-[14ch]'
                        isReadOnly={!estaEditando}
                    />
                    <GenericTextInput
                        label='Razón Social'
                        name='razonSocial'
                        type='text'
                        register={register}
                        errors={errors}
                        className='min-w-[40ch]'
                        isReadOnly={!estaEditando}
                    />
                    <GenericTextInput
                        label='Nombre Comercial'
                        name='nombreComercial'
                        type='text'
                        register={register}
                        errors={errors}
                        className='min-w-[30ch]'
                        isReadOnly={!estaEditando}
                    />
                </GenericRowForm>

                <GenericRowForm>
                    <GenericTextInput
                        label='Número de la Sucursal'
                        name='numeroSucursal'
                        type='text'
                        register={register}
                        errors={errors}
                        className=' min-w-[10ch] flex-1'
                        isReadOnly={!estaEditando}
                    />
                    <GenericTextInput
                        label='Nombre de la Sucursal'
                        name='nombreSucursal'
                        type='text'
                        register={register}
                        errors={errors}
                        className='min-w-[20ch] flex-[3_1_auto]'
                        isReadOnly={!estaEditando}
                    />
                </GenericRowForm>
                <GenericSection title='Contacto de la Empresa'>
                    <GenericRowForm>
                        <GenericTextInput
                            label='Teléfono Principal'
                            name='telefonoEmpresa'
                            type='text'
                            register={register}
                            errors={errors}
                            isReadOnly={!estaEditando}
                        />
                        <GenericTextInput
                            label='Correo Electrónico Principal'
                            name='emailEmpresa'
                            type='email'
                            register={register}
                            errors={errors}
                            isReadOnly={true}
                        />
                    </GenericRowForm>
                    <GenericRowForm>
                        <GenericTextInput
                            label='Teléfono Secundario'
                            name='telefonoSecundario'
                            type='text'
                            register={register}
                            errors={errors}
                            isReadOnly={!estaEditando}
                        />
                        <GenericTextInput
                            label='Correo Electrónico Secundario'
                            name='emailSecundario'
                            type='email'
                            register={register}
                            errors={errors}
                            isReadOnly={!estaEditando}
                        />
                    </GenericRowForm>
                </GenericSection>
            </GenericSection>
        </div>
    )
}
