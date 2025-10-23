import { FaArrowLeft, FaEnvelope, FaMapMarkerAlt, FaUser } from 'react-icons/fa'

import { useModalActions } from '../../hooks/useModalActions'
import { TIPO_PERSONA_TYPE } from '../../constants/perfil'
import FormsUnidos from './forms/FormsUnidos'

export default function ContainerForm({
    tipoPersona,
    volver,
    datosYaGuardados,
    setDatosYaGuardados,
}: {
    tipoPersona: TIPO_PERSONA_TYPE
    volver: () => void
    datosYaGuardados: boolean
    setDatosYaGuardados: (valor: boolean) => void
}) {
    const modal = useModalActions()
    return (
        <div className='bg-background-accent-auto rounded-xl shadow-lg w-full max-w-6xl mx-auto border '>
            <div className='p-6 md:p-8 border-b flex items-center gap-4'>
                {!datosYaGuardados && (
                    <button
                        className='text-primary hover:text-primary-light transition-colors duration-300'
                        onClick={() => {
                            modal.showConfirm({
                                title: '¿Salir sin guardar?',
                                message:
                                    'Tienes cambios sin guardar. ¿Estás seguro de que quieres salir?',
                                onConfirm: volver,
                                type: 'warning',
                            })
                        }}
                    >
                        <FaArrowLeft className='inline mr-2' />
                    </button>
                )}
                <h2 className='text-primary text-2xl font-bold'>Persona {tipoPersona}</h2>
            </div>
            <FormsUnidos
                tipoPersona={tipoPersona}
                datosYaGuardados={datosYaGuardados}
                setDatosYaGuardados={setDatosYaGuardados}
                esCrud={false}
            />
        </div>
    )
}
