import GenericForm from '../../form/GenericForm'
import GenericTextInput from '../../form/Controls/GenericTextInput'
import { useForm } from 'react-hook-form'
import GenericTextarea from '../../form/Controls/GenericTextArea'
import GenericSection from '../../form/GenericSection'
import GenericRowForm from '../../form/GenericRowForm'
import ComponentesTable from './ComponentesTable'

export default function InformacionGeneral() {
    const form = useForm()
    const {
        register,
        formState: { errors },
    } = form
    return (
        <GenericForm title='Información General'>
            <GenericSection title='Información del Cliente'>
                <GenericRowForm>
                    <GenericTextInput
                        type='text'
                        label='RUC/Cédula'
                        name='cliente_ruc'
                        register={register}
                        errors={errors}
                        isReadOnly
                    />
                    <GenericTextInput
                        type='text'
                        label='Nombre'
                        name='cliente_nombre'
                        register={register}
                        errors={errors}
                        isReadOnly
                    />
                </GenericRowForm>
                <GenericRowForm>
                    <GenericTextInput
                        type='text'
                        label='Dirección'
                        name='cliente_direccion'
                        register={register}
                        errors={errors}
                        isReadOnly
                    />
                    <GenericTextInput
                        type='text'
                        label='Teléfono'
                        name='cliente_telefono'
                        register={register}
                        errors={errors}
                        isReadOnly
                    />
                </GenericRowForm>
                <GenericRowForm>
                    <GenericTextInput
                        type='email'
                        label='Email'
                        name='cliente_email'
                        register={register}
                        errors={errors}
                        isReadOnly
                    />
                    <GenericTextInput
                        type='text'
                        label='Número de Turno'
                        name='cliente_turno'
                        register={register}
                        errors={errors}
                        isReadOnly
                    />
                </GenericRowForm>
            </GenericSection>

            <GenericSection title='Información del Equipo'>
                <GenericRowForm>
                    <GenericTextInput
                        type='text'
                        label='Tipo de Equipo'
                        name='equipo_tipo'
                        register={register}
                        errors={errors}
                        isReadOnly
                    />
                    <GenericTextInput
                        type='text'
                        label='Subtipo'
                        name='equipo_subtipo'
                        register={register}
                        errors={errors}
                        isReadOnly
                    />
                </GenericRowForm>
                <GenericRowForm>
                    <GenericTextInput
                        type='text'
                        label='Marca'
                        name='equipo_marca'
                        register={register}
                        errors={errors}
                        isReadOnly
                    />
                    <GenericTextInput
                        type='text'
                        label='Modelo'
                        name='equipo_modelo'
                        register={register}
                        errors={errors}
                        isReadOnly
                    />
                </GenericRowForm>
                <GenericRowForm>
                    <GenericTextInput
                        type='text'
                        label='Número de Serie'
                        name='equipo_numeroSerie'
                        register={register}
                        errors={errors}
                        isReadOnly
                    />

                    <GenericTextInput
                        type='text'
                        label='Nombre Comercial'
                        name='equipo_nombreComercial'
                        register={register}
                        errors={errors}
                        isReadOnly
                    />
                </GenericRowForm>
                <GenericRowForm>
                    <GenericTextarea
                        label='Accesorios Incluidos'
                        name='equipo_accesorios'
                        register={register}
                        errors={errors}
                        isReadOnly
                    />
                </GenericRowForm>
            </GenericSection>

            <GenericSection title='Mantenimiento Solicitado'>
                <GenericRowForm>
                    <GenericTextInput
                        type='text'
                        label='Tipo de Mantenimiento'
                        name='mantenimiento_tipo'
                        register={register}
                        errors={errors}
                        isReadOnly
                    />
                    <GenericTextInput
                        type='text'
                        label='Prioridad'
                        name='mantenimiento_prioridad'
                        register={register}
                        errors={errors}
                        isReadOnly
                    />
                </GenericRowForm>
                <GenericTextarea
                    label='Descripción del Problema (según el cliente)'
                    name='mantenimiento_problemaCliente'
                    register={register}
                    errors={errors}
                    isReadOnly
                />
                <GenericTextarea
                    label='Observaciones de Ingreso'
                    name='mantenimiento_observacionesIngreso'
                    register={register}
                    errors={errors}
                    isReadOnly
                />
            </GenericSection>

            <GenericSection title='Componentes del Equipo'>
                <ComponentesTable />
            </GenericSection>
        </GenericForm>
    )
}
