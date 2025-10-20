import { UseFormReturn } from 'react-hook-form'
import GenericCheckbox from '../../../form/Controls/GenericCheckbox'
import GenericSelect from '../../../form/Controls/GenericSelect'
import GenericSelectSearch, { FetchFunction } from '../../../form/Controls/GenericSelectSearch'
import GenericTextInput from '../../../form/Controls/GenericTextInput'
import GenericForm from '../../../form/GenericForm'
import GenericRowForm from '../../../form/GenericRowForm'
import { getComponenteDisponible } from '../../../../services/ORDEN/componentesEstado'
import { Option } from '../../../../types/form'

export function ComponentForm({
    control,
    N_ORDEN,
    register,
}: {
    control: any
    N_ORDEN: number
    register: any
}) {
    // console.log({ register, control, errors, N_ORDEN })
    if (!N_ORDEN) return <div>Cargando...</div>
    const fetchComponenteSelect: FetchFunction = async (query: string) => {
        const data = await getComponenteDisponible(N_ORDEN)
        if (!data) return []
        const options: Option[] = data.map(componente => ({
            value: String(componente.parteSubtipoId || -1),
            label: componente.nombreComponente || 'Sin Nombre',
        }))
        return options
    }

    return (
        <>
            <GenericRowForm>
                <GenericSelectSearch
                    label='Componente'
                    control={control}
                    name='componente'
                    fetchOptions={fetchComponenteSelect}
                />
                <GenericSelect
                    label='Estado'
                    control={control}
                    name='condicion'
                    tipoCatalogo='CondicionGeneral'
                    placeholderOptionLabel='Seleccione un estado'
                />
            </GenericRowForm>

            <GenericRowForm>
                <GenericSelect
                    label='Severidad'
                    control={control}
                    name='severidad'
                    tipoCatalogo='SeveridadDanio'
                />
                <GenericCheckbox
                    label='Requiere seguimiento'
                    register={register}
                    name='seguimiento'
                />
            </GenericRowForm>
            <GenericTextInput label='Observaciones' register={register} name='observaciones' />
        </>
    )
}
