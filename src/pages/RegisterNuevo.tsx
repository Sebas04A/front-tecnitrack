import React, { useEffect } from 'react'
import GenericSelect from '../components/form/Controls/GenericSelect'

import {
    RegisterEmpresaFormData,
    registerEmpresaSchema,
    RegisterNaturalFormData,
    registerNaturalSchema,
} from '../validation/register.schema'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useAuth } from '../hooks/useAuth'
import GenericForm from '../components/form/GenericForm'

import GenericRowForm from '../components/form/GenericRowForm'
import { RegisterComun } from '../components/register/RegisterComun'
import GenericSelectState from '../components/form/Controls/GenericSelectState'

export default function RegisterNuevo() {
    const [tipoPersona, setTipoPersona] = React.useState('Natural')

    const formNatural = useForm<RegisterNaturalFormData>({
        mode: 'onChange',
        resolver: yupResolver(registerNaturalSchema),
    })
    const { signupNatural, signupEmpresa } = useAuth()
    const formEmpresa = useForm<RegisterEmpresaFormData>({
        mode: 'onChange',
        resolver: yupResolver(registerEmpresaSchema),
        defaultValues: {
            tipoIdentificacion: 'RUC',
        },
    })
    useEffect(() => {
        formNatural.reset()
        formEmpresa.reset()
    }, [tipoPersona])

    return (
        <div>
            <GenericForm
                // onSubmit={e => {
                //     e.preventDefault()
                //     console.log(getValues())
                //     console.log(errors)
                //     handleSubmit(onSubmit)()
                // }}
                // error={error}
                title='Regístrate para continuar'
            >
                <GenericRowForm>
                    <div className='flex-1'>
                        <GenericSelectState
                            label='Tipo de Persona'
                            name='tipoCliente'
                            onChange={e => setTipoPersona(e.target.value)}
                            value={tipoPersona}
                            tipoCatalogo='tipoCliente'
                            loadingLabel='Cargando...'
                            required
                        />
                    </div>
                    <div className='flex-1'></div>
                </GenericRowForm>

                {tipoPersona === 'Natural' && (
                    <RegisterComun
                        tipoPersonaProp='Natural'
                        form={formNatural}
                        signup={signupNatural}
                    />
                )}
                {tipoPersona === 'Empresa' && (
                    <RegisterComun
                        tipoPersonaProp='Empresa'
                        form={formEmpresa}
                        signup={signupEmpresa}
                    />
                )}
            </GenericForm>
        </div>
    )
}
