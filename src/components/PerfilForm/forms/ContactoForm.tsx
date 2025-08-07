import React from 'react'
import GenericSection from '../../form/GenericSection'
import GenericRowForm from '../../form/GenericRowForm'
import GenericTextInput from '../../form/Controls/GenericTextInput'
import { useForm, useFormContext } from 'react-hook-form'
import {
    ContactosData,
    contactosEmpresaSchema,
    contactosPersonaSchema,
} from '../../../validation/perfil.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { FormProfileProps } from '../../../types/formsProfile'

function ContactoUnico({
    form,
    tipoPersona,
    estaEditando,
    index,
}: FormProfileProps<ContactosData> & { index: number }) {
    const {
        register,
        formState: { errors },
    } = form

    return (
        <GenericRowForm>
            {tipoPersona === 'Juridica' && (
                <GenericTextInput
                    label='Nombre Contacto'
                    name={`contactos.${index}.nombre`}
                    type='text'
                    register={register}
                    errors={errors}
                    isReadOnly={!estaEditando}
                    className='min-w-[20ch] flex-[4_1_auto]'
                />
            )}
            <GenericTextInput
                label='Teléfono'
                name={`contactos.${index}.telefono`}
                type='text'
                register={register}
                errors={errors}
                isReadOnly={!estaEditando}
                className='min-w-[15ch] flex-[1_1_auto]'
            />
            <GenericTextInput
                label='Correo Electrónico'
                name={`contactos.${index}.email`}
                type='email'
                register={register}
                errors={errors}
                isReadOnly={!estaEditando || (tipoPersona === 'Natural' && index === 0)}
                className='min-w-[20ch] flex-[4_1_auto]'
            />
        </GenericRowForm>
    )
}

export default function ContactoForm({
    form,
    tipoPersona,
    estaEditando,
}: FormProfileProps<ContactosData>) {
    const {
        register,
        formState: { errors },
    } = useForm({
        mode: 'onChange',
        resolver: yupResolver(
            tipoPersona === 'Juridica' ? contactosEmpresaSchema : contactosPersonaSchema
        ),
    })

    const nContactos = tipoPersona === 'Juridica' ? 2 : 3
    return (
        <>
            {nContactos > 0 && (
                <GenericSection title='Contactos'>
                    {Array.from({ length: nContactos }).map((_, index) => (
                        <ContactoUnico
                            key={index}
                            form={form}
                            tipoPersona={tipoPersona}
                            estaEditando={estaEditando}
                            index={index}
                        />
                    ))}
                </GenericSection>
            )}
        </>
    )
}
