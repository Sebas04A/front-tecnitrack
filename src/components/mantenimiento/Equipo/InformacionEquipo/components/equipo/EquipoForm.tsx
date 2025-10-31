import { useCallback } from 'react'
import { useForm } from 'react-hook-form'

import GenericRowForm from '../../../../../form/GenericRowForm'
import GenericSelect from '../../../../../form/Controls/GenericSelect'
import GenericTextInput from '../../../../../form/Controls/GenericTextInput'

import {
    obtenerMarcasActivosSelect,
    obtenerSubtiposActivosSelect,
    obtenerTiposActivosSelect,
} from '../../services/equipo'

export function SoloEquipoForm({
    // ordenId,
    register,
    control,
    // blockForm,
    watch,
    readOnly,
}: {
    // ordenId: number
    register: ReturnType<typeof useForm>['register']
    control: any
    // blockForm: boolean
    watch: ReturnType<typeof useForm>['watch']
    readOnly: boolean
}) {
    const tipoEquipo = watch('tipoEquipo')
    const subtipo = watch('subtipo')
    console.log('Tipo Equipo seleccionado:', tipoEquipo)
    const obtenerSubtipoOptions = useCallback(
        () => (tipoEquipo ? obtenerSubtiposActivosSelect(tipoEquipo) : Promise.resolve([])),
        [tipoEquipo]
    )
    const obtenerMarcaOptions = useCallback(
        () => (subtipo ? obtenerMarcasActivosSelect(subtipo) : Promise.resolve([])),
        [subtipo]
    )
    return (
        <>
            <GenericRowForm>
                <GenericSelect
                    label='Tipo Equipo'
                    control={control}
                    name='tipoEquipo'
                    isReadOnly={readOnly}
                    getOptions={obtenerTiposActivosSelect}
                    required={true}
                    mostrarEspacioError={true}
                />
                <GenericSelect
                    label='Subtipo'
                    control={control}
                    name='subtipo'
                    getOptions={() => obtenerSubtipoOptions()}
                    refreshKey={[tipoEquipo]}
                    isReadOnly={readOnly}
                    mostrarEspacioError={true}
                    required={true}
                />

                <GenericTextInput
                    label='Nombre Comercial'
                    placeholder='Ingrese el Nombre Comercial'
                    register={register}
                    name='nombreComercial'
                    isReadOnly={readOnly}
                    required={true}
                    mostrarEspacioError={true}
                />
            </GenericRowForm>

            <GenericRowForm>
                <GenericSelect
                    label='Marca'
                    control={control}
                    name='marca'
                    tipoCatalogo='marcaEquipo'
                    isReadOnly={readOnly || !subtipo}
                    mostrarEspacioError={true}
                    required={true}
                    getOptions={obtenerMarcaOptions}
                    refreshKey={[subtipo]}
                />

                <GenericTextInput
                    label='Modelo'
                    placeholder='Ingrese el Modelo'
                    register={register}
                    name='modelo'
                    isReadOnly={readOnly}
                    required={true}
                    mostrarEspacioError={true}
                />
                <GenericTextInput
                    label='Número de Serie'
                    placeholder='Ingrese el Número de Serie'
                    register={register}
                    name='numeroSerie'
                    isReadOnly={readOnly}
                    required={true}
                    mostrarEspacioError={true}
                />
            </GenericRowForm>
        </>
    )
}
