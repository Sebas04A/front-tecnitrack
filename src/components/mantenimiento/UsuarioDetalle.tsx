import React from 'react'
import GenericForm from '../form/GenericForm'
import GenericInput from '../form/Controls/GenericInput'
import GenericTextInput from '../form/Controls/GenericTextInput'
import GenericDate from '../form/Controls/GenericDate'
import GenericRowForm from '../form/GenericRowForm'
import GenericSection from '../form/GenericSection'

export default function UsuarioDetalle({ register }: any) {
    return (
        <GenericForm title='Informacion'>
            <GenericSection title='Cliente'>
                <GenericRowForm>
                    <GenericTextInput
                        label='RUC/Cédula'
                        placeholder='Ingrese su RUC/Cédula'
                        register={register}
                        name='numeroIdentificacion'
                        isReadOnly={true}
                    />
                    <GenericTextInput
                        label='Nombre Completo'
                        placeholder='Ingrese su Nombre Completo'
                        register={register}
                        name='nombreCompleto'
                        isReadOnly={true}
                    />
                </GenericRowForm>
            </GenericSection>

            <GenericRowForm>
                <GenericTextInput
                    label='Direccion'
                    placeholder='Ingrese la Direccion'
                    register={register}
                    name='direccion'
                    isReadOnly={true}
                />
                <GenericTextInput
                    label='Telefono'
                    placeholder='Ingrese el Telefono'
                    register={register}
                    name='telefono'
                    isReadOnly={true}
                />
            </GenericRowForm>
            <GenericSection title='Orden de Ingreso'>
                <GenericRowForm>
                    <GenericTextInput
                        label='N° Orden'
                        placeholder='Ingrese el N° de Orden'
                        register={register}
                        name='numeroOrden'
                        isReadOnly={true}
                    />
                    <GenericTextInput
                        label='N° Cita'
                        placeholder='Ingrese el N° de Cita'
                        register={register}
                        name='numeroCita'
                        isReadOnly={true}
                    />
                </GenericRowForm>
                <GenericRowForm>
                    <GenericDate
                        label='Fecha Ingreso'
                        placeholder='Ingrese la Fecha de Ingreso'
                        register={register}
                        name='fechaIngreso'
                        isReadOnly={true}
                    />

                    <GenericDate
                        inputType='time'
                        label='Hora Ingreso'
                        placeholder='Ingrese la Hora de Ingreso'
                        register={register}
                        name='horaIngreso'
                        isReadOnly={true}
                    />
                </GenericRowForm>
            </GenericSection>
        </GenericForm>
    )
}
