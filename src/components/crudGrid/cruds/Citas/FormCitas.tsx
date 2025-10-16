import React from 'react'
import DateTimeSelector from '../../../citas/DateTimeSelector'
// import GenericSelect from '../../../form/Controls/GenericSelect'
import GenericTextInput from '../../../form/Controls/GenericTextInput'
import GenericDate from '../../../form/Controls/GenericDate'
import GenericSelectSearch from '../../../form/Controls/GenericSelectSearch'
import { buscarUsuario } from '../../../../services/SelectSearch'
import GenericForm from '../../../form/GenericForm'
import GenericSelect from '../../../form/Controls/GenericSelect'
import GenericButton from '../../../form/Controls/GenericButton'
import { useModal } from '../../../../hooks/useModal'
import { CalendarioModal } from '../../../common/modals/Calendario'
import GenericRowForm from '../../../form/GenericRowForm'
import { FaCalendarAlt } from 'react-icons/fa'
import { UseFormReturn } from 'react-hook-form'
import { convertirDateParaInput } from '../../../../adapters/fecha'

export default function FormCitas({
    form,
    readOnly,
    esCrud = true,
    noMostrarNumeroCita = false,
}: {
    form: UseFormReturn
    readOnly: boolean
    esCrud?: boolean
    noMostrarNumeroCita?: boolean
}) {
    // console.log('Valores del formulario en FormCitas:', form.getValues())

    const tipoMantenimiento = form.watch('tipoMantenimiento')
    // console.log('Tipo Mantenimiento observado:', tipoMantenimiento)

    const modal = useModal()
    function abrirCalendario() {
        modal.openModal({
            component: CalendarioModal,
            props: {
                onConfirm: (date: Date) => {
                    const fechaParseada = convertirDateParaInput(date)
                    // console.log('Fecha parseada:', fechaParseada)
                    form.setValue('fechaHoraInicio', fechaParseada)
                },
            },
        })
    }

    return (
        <>
            {/* <GenericForm> */}
            <GenericRowForm>
                {!noMostrarNumeroCita && (
                    <GenericTextInput
                        label='Número de Cita'
                        name='id'
                        isReadOnly={true}
                        type='text'
                        register={form.register}
                        errors={form.formState.errors}
                    />
                )}
            </GenericRowForm>
            <GenericRowForm>
                <GenericDate
                    label='Fecha y Hora de la Cita'
                    name='fechaHoraInicio'
                    inputType='datetime-local'
                    isReadOnly={true}
                    register={form.register}
                    errors={form.formState.errors}
                    // value={formatDate(fecha)}
                />
                {!readOnly && <GenericButton onClick={abrirCalendario} icon={<FaCalendarAlt />} />}
            </GenericRowForm>
            <div style={{ height: '16px' }}></div>
            <GenericSelect
                label='Tipo de Mantenimiento'
                name={`tipoMantenimiento`}
                isReadOnly={readOnly}
                control={form.control}
                tipoCatalogo='tipoMantenimiento'
                loadingLabel='Cargando...'
                // watch={form.watch}
            />
            {tipoMantenimiento === 'Otro' && (
                <GenericTextInput
                    label='Otro'
                    name='otro'
                    isReadOnly={readOnly}
                    type='text'
                    register={form.register}
                    errors={form.formState.errors}
                />
            )}
            <GenericTextInput
                label='Descripción'
                name='descripcion'
                isReadOnly={readOnly}
                type='text'
                register={form.register}
                errors={form.formState.errors}
            />
            {esCrud && (
                <GenericSelectSearch
                    label='Cliente'
                    name='usuario'
                    control={form.control}
                    fetchOptions={async query => {
                        const response = await buscarUsuario(query)
                        return response.map(user => ({
                            value: user.id ?? -1,
                            label: user.nombreCompleto + ' - ' + user.numeroIdentificacion,
                        }))
                    }}
                    minSearchLength={2}
                    debounceMs={1000}
                    isReadOnly={readOnly}
                    selectedLabel={form.getValues('nombreCompleto')}
                    mostrarEspacioError={true}
                />
            )}

            {/* </GenericForm> */}
        </>
    )
}
