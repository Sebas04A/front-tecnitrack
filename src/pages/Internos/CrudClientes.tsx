import React, { useMemo, useState } from 'react'
import TituloPagina from '../../components/common/TituloPagina'
import { ColumnDef, CrudContainer } from '../../components/crudGrid'
import ProfileHeader from '../../components/PerfilForm/ProfileHeader'
import { PerfilEmpresaData, PerfilPersonaNaturalData } from '../../validation/perfil.schema'
import { makeLocalCrudFetcher } from '../../components/crudGrid/helper/crud-helpers'
import { useForm } from 'react-hook-form'
import ContainerForm from '../../components/PerfilForm/containerForm'
import { TIPO_PERSONA, TIPO_PERSONA_TYPE } from '../../constants/perfil'
import GenericSelect from '../../components/form/Controls/GenericSelect'
import CrudEmpresa from '../../components/internos/crudClientes/CrudEmpresa'
import CrudNatural from '../../components/internos/crudClientes/CrudNatural'

export default function CrudClientes() {
    const [tipoPersona, setTipoPersona] = useState<TIPO_PERSONA_TYPE>(TIPO_PERSONA.NATURAL)

    return (
        <div>
            <div className='flex flex-col p-4 rounded-lg shadow-lg bg-background-accent-auto'>
                <div className='p-2'>
                    <GenericSelect
                        name='tipoPersona'
                        options={[
                            { label: 'Cliente Natural', value: TIPO_PERSONA.NATURAL },
                            { label: 'Cliente Empresa', value: TIPO_PERSONA.EMPRESA },
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
