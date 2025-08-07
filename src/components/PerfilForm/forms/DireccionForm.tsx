import { useForm, useFieldArray } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
// import { perfilDireccionesSchema, PerfilDireccionesData } from '../../validation/perfil.schema'
import GenericButton from '../../form/Controls/GenericButton'
import {
    DireccionData,
    DireccionesData,
    direccionesSchema,
} from '../../../validation/perfil.schema'

import GenericSelect from '../../form/Controls/GenericSelect'
import GenericTextInput from '../../form/Controls/GenericTextInput'
import GenericRowForm from '../../form/GenericRowForm'
import GenericSection from '../../form/GenericSection'
import { UseFormRegister, FieldErrors } from 'react-hook-form'
import { FormProfileProps } from '../../../types/formsProfile'

// Definimos las props que el componente hijo realmente necesita
interface DireccionUnicaProps {
    index: number
    register: UseFormRegister<DireccionesData>
    errors: FieldErrors<DireccionesData>
}

function DireccionUnica({
    index,
    register,
    errors,
    estaEditando,
}: DireccionUnicaProps & { estaEditando: boolean }) {
    // Accedemos a los errores de este campo específico del array, si existen.

    return (
        <GenericSection title={`Dirección ${index + 1}`}>
            <GenericRowForm>
                <GenericSelect
                    label='País'
                    name={`direcciones.${index}.pais`}
                    isReadOnly={!estaEditando}
                    register={register}
                    errors={errors} // Pasamos los errores específicos de esta dirección
                    options={[
                        { value: '', label: 'Pais' },

                        { value: 'Ecuador', label: 'Ecuador' },

                        { value: 'Colombia', label: 'Colombia' },

                        { value: 'Perú', label: 'Perú' },
                    ]}
                />
                <GenericSelect
                    label='Provincia'
                    name={`direcciones.${index}.provincia`}
                    isReadOnly={!estaEditando}
                    register={register}
                    errors={errors}
                    options={[
                        { value: '', label: 'Provincia' },

                        { value: 'Pichincha', label: 'Pichincha' },

                        { value: 'Guayas', label: 'Guayas' },

                        { value: 'Azuay', label: 'Azuay' },
                    ]}
                />
                <GenericSelect
                    label='Ciudad'
                    name={`direcciones.${index}.ciudad`}
                    isReadOnly={!estaEditando}
                    register={register}
                    errors={errors}
                    options={[
                        { value: '', label: 'Ciudad' },

                        { value: 'Quito', label: 'Quito' },

                        { value: 'Guayaquil', label: 'Guayaquil' },

                        { value: 'Cuenca', label: 'Cuenca' },
                    ]}
                />
            </GenericRowForm>
            <GenericTextInput
                label='Dirección Exacta'
                name={`direcciones.${index}.direccion`}
                isReadOnly={!estaEditando}
                type='text'
                register={register}
                errors={errors}
            />
        </GenericSection>
    )
}

// Asumimos que el formulario principal se inicializa en un componente superior
// y te pasa las props. Aquí un ejemplo de cómo se vería ese componente.

export default function DireccionForm({
    form,
    tipoPersona,
    estaEditando,
}: FormProfileProps<DireccionesData>) {
    // El useForm principal ahora vive aquí y controla TODO el estado.

    const {
        control,
        register,
        formState: { errors },
        handleSubmit,
    } = form

    // useFieldArray se conecta al formulario principal
    const { fields, append, remove } = useFieldArray({
        control, // Control del formulario principal
        name: 'direcciones', // Nombre del campo array en tus datos
    })

    const onSubmit = (data: DireccionesData) => {
        console.log('Datos del formulario:', data)
        // Aquí envías `data` a tu API. `data.direcciones` será el array con todas las direcciones.
    }

    return (
        <>
            {fields.map((field, index) => (
                <div
                    key={field.id}
                    style={{
                        border: '1px solid #ccc',
                        padding: '1rem',
                        marginBottom: '1rem',
                        borderRadius: '8px',
                    }}
                >
                    <DireccionUnica
                        // Pasas las props necesarias al hijo
                        index={index}
                        register={register}
                        errors={errors}
                        estaEditando={estaEditando}
                    />
                    {/* Solo muestra el botón de eliminar si hay más de una dirección */}
                    {fields.length > 1 && (
                        <GenericButton
                            type='button'
                            onClick={() => remove(index)} // `remove` elimina la dirección por su índice
                            text='Eliminar Dirección'
                            className='mt-2'
                            // variant='danger' // Opcional: para estilo
                        />
                    )}
                </div>
            ))}

            <GenericButton
                type='button'
                className='mt-4'
                text='Agregar Otra Dirección'
                onClick={() =>
                    append({
                        // `append` agrega un nuevo objeto al array
                        pais: '',
                        provincia: '',
                        ciudad: '',
                        direccion: '',
                    })
                }
            />

            {/* <GenericButton type='submit' className='mt-4 ml-4' text='Guardar Perfil' /> */}
        </>
    )
}
