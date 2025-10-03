import React from 'react'
import { TIPO_PERSONA } from '../../../../constants/perfil'
import GenericRowForm from '../../../form/GenericRowForm'
import GenericSelect from '../../../form/Controls/GenericSelect'
import GenericCheckbox from '../../../form/Controls/GenericCheckbox'
import GenericTextInput from '../../../form/Controls/GenericTextInput'

export default function ContactosForm({ tipoPersona, register, errors, control, readOnly }: any) {
    return (
        <>
            {/* Modal Crear / Editar */}
            {tipoPersona === TIPO_PERSONA.NATURAL && (
                <GenericRowForm>
                    <GenericSelect
                        label='Tipo de Contacto'
                        name='tipoContacto'
                        control={control}
                        // options={[
                        //     { value: '', label: 'Elegir tipo de contacto' },
                        //     { value: 'casa', label: 'Casa' },
                        //     { value: 'oficina', label: 'Oficina' },
                        //     { value: 'otro', label: 'Otro' },
                        // ]}
                        tipoCatalogo='tipoContactoInterno'
                        // className='flex-[1_1_150px]'
                        isReadOnly={readOnly}
                    />
                    <GenericCheckbox
                        label='Principal'
                        name='principal'
                        register={register}
                        errors={errors}
                        // className='flex-[1_1_150px]'
                        isReadOnly={readOnly}
                    />
                </GenericRowForm>
            )}
            {tipoPersona === 'Empresa' && (
                <>
                    <GenericTextInput
                        label='Nombre'
                        type='text'
                        name='nombre'
                        register={register}
                        errors={errors}
                        // className='flex-[2_1_200px]'
                        isReadOnly={readOnly}
                    />
                    <GenericSelect
                        label='Cargo'
                        name='cargo'
                        control={control}
                        options={[
                            { value: 'gerente', label: 'Gerente' },
                            { value: 'supervisor', label: 'Supervisor' },
                            { value: 'otro', label: 'Otro' },
                        ]}
                        // className='flex-[1_1_150px]'
                        isReadOnly={readOnly}
                    />
                </>
            )}
            <GenericRowForm>
                <GenericTextInput
                    label='Teléfono'
                    type='text'
                    name='telefono'
                    register={register}
                    errors={errors}
                    // className='flex-[1_1_150px]'
                    isReadOnly={readOnly}
                />
                <GenericTextInput
                    label='Email'
                    type='email'
                    name='email'
                    register={register}
                    errors={errors}
                    // className='flex-[2_1_220px]'
                    isReadOnly={readOnly}
                />
            </GenericRowForm>
        </>
    )
}
