import { useForm } from 'react-hook-form'

import GenericSection from '../../../../form/GenericSection'
import GenericSelectSearch from '../../../../form/Controls/GenericSelectSearch'

import { buscarSelectActivo } from '../../services/activoApi'
import { SoloEquipoForm } from './equipo/EquipoForm'

export function EquipoSection({
    ordenId,
    form,
    blockForm,
    estaEditando,
    readOnly,
}: {
    ordenId: number
    form: ReturnType<typeof useForm>
    blockForm: boolean
    estaEditando?: boolean
    readOnly?: boolean
}) {
    return (
        <GenericSection>
            <GenericSelectSearch
                label='Buscar Equipo'
                placeholder='Seleccione un Equipo'
                control={form.control}
                name='equipo'
                fetchOptions={q => buscarSelectActivo(ordenId, q)}
                isReadOnly={blockForm || readOnly}
            />
            <div className='px-6 mt-2'>
                <SoloEquipoForm
                    control={form.control}
                    // ordenId={ordenId}
                    // blockForm={blockForm}
                    register={form.register}
                    watch={form.watch}
                    readOnly={blockForm || (readOnly ?? false)}
                />
            </div>
        </GenericSection>
    )
}
