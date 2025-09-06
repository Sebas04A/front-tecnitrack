import React from 'react'
import GenericRowForm from '../../../form/GenericRowForm'
import GenericSelect from '../../../form/Controls/GenericSelect'
import GenericTextInput from '../../../form/Controls/GenericTextInput'
import GenericDate from '../../../form/Controls/GenericDate'

export default function InternosForm({
    register,
    errors,
    viewing,
}: {
    register: any
    errors: any
    viewing: any
}) {
    return (
        <>
            <GenericRowForm>
                <GenericSelect
                    label='Rol'
                    name='rol'
                    register={register}
                    errors={errors}
                    // options={[
                    //     { value: 'Empleado', label: 'Empleado' },
                    //     { value: 'Cliente', label: 'Cliente' },
                    // ]}
                    tipoCatalogo='rolUsuario'
                />
                <GenericSelect
                    label='Estado'
                    name='estado'
                    isReadOnly // creado como Inactivo, bloqueado en alta
                    register={register}
                    errors={errors}
                    // options={[
                    //     { value: 'Activo', label: 'Activo' },
                    //     { value: 'Inactivo', label: 'Inactivo' },
                    // ]}
                    tipoCatalogo={'estadoGeneral'}
                />
            </GenericRowForm>

            {/* ---- Primera fila ---- */}
            <div className='flex gap-2 flex-wrap'>
                <div className='flex gap-2 flex-1 '>
                    <GenericSelect
                        label='Tipo de Documento'
                        name='tipoDocumento'
                        register={register}
                        errors={errors}
                        tipoCatalogo='tipoDocumento'
                        isReadOnly={!!viewing}
                        className='min-w-[20ch]'
                    />
                    <GenericTextInput
                        label='N. de Documento'
                        name='numeroDocumento'
                        type='text'
                        register={register}
                        errors={errors}
                        isReadOnly={!!viewing}
                        className='min-w-[15ch] '
                    />
                </div>
                <div className='flex gap-2 flex-1'>
                    <GenericTextInput
                        label='Usuario'
                        name='usuario'
                        isReadOnly={!!viewing}
                        type='text'
                        placeholder='Máx. 30 caracteres'
                        register={register}
                        errors={errors}
                        className='min-w-[20ch] '
                    />
                    <GenericTextInput
                        label='Contraseña'
                        name='contraseña'
                        isReadOnly={!!viewing}
                        type='password'
                        placeholder='Máx. 30 caracteres'
                        register={register}
                        errors={errors}
                        className='min-w-[20ch] '
                    />
                </div>
            </div>
            {/* ---- Segunda fila ---- */}
            <GenericRowForm>
                <GenericTextInput
                    label='Nombre completo'
                    name='nombreCompleto'
                    isReadOnly={!!viewing}
                    type='text'
                    placeholder='Máx. 50 caracteres'
                    register={register}
                    errors={errors}
                />
                <GenericTextInput
                    label='Apellido completo'
                    name='apellidoCompleto'
                    isReadOnly={!!viewing}
                    type='text'
                    placeholder='Máx. 50 caracteres'
                    register={register}
                    errors={errors}
                />
                <GenericSelect
                    label='Género'
                    name='genero'
                    isReadOnly={!!viewing}
                    register={register}
                    errors={errors}
                    options={[
                        { value: '', label: '-- Seleccione --' },
                        { value: 'Femenino', label: 'Femenino' },
                        { value: 'Masculino', label: 'Masculino' },
                        { value: 'Otro', label: 'Otro' },
                    ]}
                />
            </GenericRowForm>

            {/* ---- Tercera fila ---- */}
            <GenericRowForm>
                <GenericDate
                    label='Fecha de nacimiento'
                    name='fechaNacimiento'
                    isReadOnly={!!viewing}
                    placeholder='dd/mm/aaaa'
                    register={register}
                    errors={errors}
                />
                <GenericTextInput
                    label='Teléfono'
                    name='telefono'
                    isReadOnly={!!viewing}
                    type='text'
                    placeholder='Máx. 20 caracteres'
                    register={register}
                    errors={errors}
                />
                <GenericTextInput
                    label='Correo electrónico'
                    name='email'
                    isReadOnly={!!viewing}
                    type='email'
                    placeholder='Máx. 30 caracteres'
                    register={register}
                    errors={errors}
                />
            </GenericRowForm>
        </>
    )
}
