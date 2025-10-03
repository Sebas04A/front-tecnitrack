import { useState } from 'react'

import { TIPO_PERSONA, TIPO_PERSONA_TYPE } from '../../constants/perfil'
import CrudEmpresa from '../../components/internos/crudClientes/CrudEmpresa'
import CrudNatural from '../../components/internos/crudClientes/CrudNatural'
import GenericSelectState from '../../components/form/Controls/GenericSelectState'

export default function CrudClientes() {
    const [tipoPersona, setTipoPersona] = useState<TIPO_PERSONA_TYPE>(TIPO_PERSONA.NATURAL)

    return (
        <div>
            <div className='flex flex-col p-4 rounded-lg shadow-lg bg-background-accent-auto'>
                <div className='p-2'>
                    <GenericSelectState
                        name='tipoPersona'
                        options={[
                            { label: 'Persona Natural', value: TIPO_PERSONA.NATURAL },
                            { label: 'Persona Jurídica', value: TIPO_PERSONA.EMPRESA },
                        ]}
                        value={tipoPersona}
                        onChange={e => setTipoPersona(e.target.value as TIPO_PERSONA_TYPE)}
                        label='Tipo de Cliente'
                    />
                </div>
            </div>

            {tipoPersona === TIPO_PERSONA.EMPRESA ? <CrudEmpresa /> : <CrudNatural />}
        </div>
    )
}
