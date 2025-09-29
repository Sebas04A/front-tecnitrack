import React, { useEffect, useState } from 'react'
import GenericRowForm from '../../../form/GenericRowForm'
import GenericSelect from '../../../form/Controls/GenericSelect'
import GenericTextInput from '../../../form/Controls/GenericTextInput'
import GenericCheckbox from '../../../form/Controls/GenericCheckbox'
import GenericButton from '../../../form/Controls/GenericButton'
import GenericLocalidadesSelect from '../../../form/Controls/GenericLocalidadesSelect'
import { Controller } from 'react-hook-form'
import { useLocalidades } from '../../../../hooks/useLocalidades'
import {
    obtenerCiudadesPorProvinciaSelect,
    obtenerPaisesSelect,
    obtenerProvinciasPorPaisSelect,
} from '../../../../services/Select/localidadesSelectApi'
import { Option } from '../../../../types/form'

export default function DireccionesForm({
    register,
    errors,
    readOnly,
    setValue,
    watch,
    values,
}: any) {
    const paisSeleccionado = watch('pais')
    const provinciaSeleccionada = watch('provincia')

    const [paises, setPaises] = useState<Option[]>([])
    const [provincias, setProvincias] = useState<Option[]>([])
    const [ciudades, setCiudades] = useState<Option[]>([])

    useEffect(() => {
        obtenerPaisesSelect().then(setPaises)
    }, [])

    useEffect(() => {
        console.log('paisSeleccionado changed:', paisSeleccionado)
        setValue('provincia', -1)
        setValue('ciudad', -1)

        if (paisSeleccionado === -1) {
            setProvincias([]) // Limpia las provincias si no hay país seleccionado
            return
        }
        obtenerProvinciasPorPaisSelect(paisSeleccionado).then(setProvincias)
    }, [paisSeleccionado])

    useEffect(() => {
        if (provinciaSeleccionada === -1) {
            setCiudades([]) // Limpia las ciudades si no hay provincia seleccionada
            return
        }
        obtenerCiudadesPorProvinciaSelect(provinciaSeleccionada).then(setCiudades)
    }, [provinciaSeleccionada])

    // 2. Usamos el hook para obtener las listas de opciones
    // const { paises, provincias, ciudades } = useLocalidades(paisSeleccionado, provinciaSeleccionada)
    // 3. Efectos para resetear los selects dependientes
    // useEffect(() => {
    //     // Si el país cambia, resetea la provincia y la ciudad
    //     console.log('paisSeleccionado changed:', paisSeleccionado)
    //     setValue('provincia', -1)
    //     setValue('ciudad', -1)
    // }, [paisSeleccionado, setValue])

    // useEffect(() => {
    //     // Si la provincia cambia, resetea la ciudad
    //     // setValue('ciudad', -1)
    // }, [provinciaSeleccionada, setValue])

    const direccion = watch() // Observa todo el formulario para cambios
    function handleLocalidadesChange(newValue: {
        pais: number
        provincia: number
        ciudad: number
    }) {
        console.log('DireccionesForm - handleLocalidadesChange:', newValue)
        setValue('pais', newValue.pais)
        setValue('provincia', newValue.provincia)
        setValue('ciudad', newValue.ciudad)
    }

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
            {/* <GenericSelect
                label='País'
                name='pais'
                register={register}
                errors={errors}
                options={paises}
            />
            <GenericSelect
                label='Provincia'
                name='provincia'
                register={register}
                errors={errors}
                options={provincias}
                isReadOnly={paisSeleccionado === -1}
            />
            <GenericSelect
                label='Ciudad'
                name='ciudad'
                register={register}
                errors={errors}
                options={ciudades}
                isReadOnly={provinciaSeleccionada === -1}
            /> */}

            {/* <Controller
                name='localidades' // Nombre del campo en los datos del formulario
                control={control}
                rules={{
                    validate: {
                        paisRequerido: value => value.pais !== -1 || 'El país es requerido',
                        provinciaRequerida: value =>
                            value.provincia !== -1 || 'La provincia es requerida',
                        ciudadRequerida: value => value.ciudad !== -1 || 'La ciudad es requerida',
                    },
                }} // Reglas de validación
                render={({ field }) => (
                    // `field` contiene `value`, `onChange`, `onBlur`, `name`, `ref`
                    <GenericLocalidadesSelect
                        value={field.value} // Pasa el valor desde RHF
                        onChange={field.onChange} // Pasa la función de cambio desde RHF
                    />
                )}
            /> */}

            <GenericLocalidadesSelect
                register={register}
                value={direccion} // Pasamos el objeto observado
                onChange={handleLocalidadesChange} // Usamos nuestro adaptador
            />
            {/* <GenericRowForm>
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
            </GenericRowForm> */}
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
            {/* <GenericButton type='submit' /> */}
        </>
    )
}
