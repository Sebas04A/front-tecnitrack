// src/components/UserProfile/UserProfileTabs.tsx
import { useEffect, useState } from 'react'

import { useAuth } from '../../../hooks/useAuth'

import ProfileHeader from './components/ProfileHeader'
import ContainerForm from './components/containerForm'

import { getTipoPerfil } from '../../../services/perfilApi'

import { TIPO_PERSONA, TIPO_PERSONA_TYPE } from '../../../constants/perfil'

export default function Perfil() {
    const { user } = useAuth()

    const [tipoPersona, setTipoPersona] = useState<TIPO_PERSONA_TYPE | null>(null)
    useEffect(() => {
        console.log('Usuario actual:', user)
        getTipoPerfil().then(tipoCliente => {
            console.log('Tipo de perfil obtenido:', tipoCliente)

            if (tipoCliente == 'ninguno') return setDatosYaGuardados(false)
            if (tipoCliente == TIPO_PERSONA.EMPRESA) tipoCliente = TIPO_PERSONA.EMPRESA
            else if (tipoCliente == 'natural') tipoCliente = TIPO_PERSONA.NATURAL
            else {
                throw new Error('Tipo de cliente desconocido')
            }
            setTipoPersona(tipoCliente as TIPO_PERSONA_TYPE)
            setDatosYaGuardados(true)
        })
    }, [])
    useEffect(() => {
        console.warn('Tipo de persona cambiado:', tipoPersona)
    }, [tipoPersona])

    const [datosYaGuardados, setDatosYaGuardados] = useState(false)

    // const profileForm = useForm({ mode: 'onChange', resolver: yupResolver(perfilSchema) })

    return (
        <>
            <div className='flex flex-col  h-full bg-background-auto'>
                {tipoPersona == null ? (
                    <ProfileHeader setTipoPersona={setTipoPersona} />
                ) : (
                    <ContainerForm
                        datosYaGuardados={datosYaGuardados}
                        setDatosYaGuardados={setDatosYaGuardados}
                        tipoPersona={tipoPersona}
                        volver={() => setTipoPersona(null)}
                    />
                )}
            </div>
        </>
    )
}
