import React from 'react'
import GenericRowForm from '../../../form/GenericRowForm'
import GenericSelect from '../../../form/Controls/GenericSelect'
import GenericTextInput from '../../../form/Controls/GenericTextInput'
import GenericCheckbox from '../../../form/Controls/GenericCheckbox'
import GenericButton from '../../../form/Controls/GenericButton'

export default function DireccionesForm({ register, errors, readOnly }: any) {
    return (
        <>
            <GenericRowForm>
                <GenericSelect
                    label='Tipo de Dirección'
                    name={`tipo`}
                    isReadOnly={readOnly}
                    register={register}
                    errors={errors}
                    // options={[
                    //     { value: '', label: 'Tipo' },
                    //     { value: 'Casa', label: 'Casa' },
                    //     { value: 'Oficina', label: 'Oficina' },
                    //     { value: 'Otro', label: 'Otro' },
                    // ]}
                    tipoCatalogo='tipoDireccion'
                />
                <GenericTextInput
                    label='Código Postal'
                    name='codigoPostal'
                    isReadOnly={readOnly}
                    type='text'
                    register={register}
                    errors={errors}
                />
            </GenericRowForm>
            <GenericRowForm>
                <GenericSelect
                    label='País'
                    name={`pais`}
                    isReadOnly={readOnly}
                    register={register}
                    errors={errors} // Pasamos los errores específicos de esta dirección
                    // options={[
                    //     { value: '', label: 'Pais' },

                    //     { value: 'Ecuador', label: 'Ecuador' },

                    //     { value: 'Colombia', label: 'Colombia' },

                    //     { value: 'Perú', label: 'Perú' },
                    // ]}
                    tipoCatalogo='pais'
                />
                <GenericSelect
                    label='Provincia'
                    name={`provincia`}
                    isReadOnly={readOnly}
                    register={register}
                    errors={errors}
                    // options={[
                    //     { value: '', label: 'Provincia' },

                    //     { value: 'Pichincha', label: 'Pichincha' },

                    //     { value: 'Guayas', label: 'Guayas' },

                    //     { value: 'Azuay', label: 'Azuay' },
                    // ]}
                    tipoCatalogo='provincia'
                />
                <GenericSelect
                    label='Ciudad'
                    name={`ciudad`}
                    isReadOnly={readOnly}
                    register={register}
                    errors={errors}
                    // options={[
                    //     { value: '', label: 'Ciudad' },

                    //     { value: 'Quito', label: 'Quito' },

                    //     { value: 'Guayaquil', label: 'Guayaquil' },

                    //     { value: 'Cuenca', label: 'Cuenca' },
                    // ]}
                    tipoCatalogo='ciudad'
                />
            </GenericRowForm>
            <GenericTextInput
                label='Dirección Exacta'
                name={`direccion`}
                isReadOnly={readOnly}
                type='text'
                register={register}
                errors={errors}
            />

            <GenericCheckbox
                label='Principal'
                name='principal'
                isReadOnly={readOnly}
                register={register}
                errors={errors}
            />
            <GenericButton type='submit' />
        </>
    )
}
