import React, { useEffect, useState } from 'react'
import GenericRowForm from '../../../form/GenericRowForm'
import GenericSelect from '../../../form/Controls/GenericSelect'
import GenericTextInput from '../../../form/Controls/GenericTextInput'
import GenericCheckbox from '../../../form/Controls/GenericCheckbox'
import GenericButton from '../../../form/Controls/GenericButton'
// import GenericLocalidadesSelect from '../../../form/Controls/GenericLocalidadesSelect'
import { Controller } from 'react-hook-form'
import { useLocalidades } from '../../../../hooks/useLocalidades'
import {
    obtenerCiudadesPorProvinciaSelect,
    obtenerPaisesSelect,
    obtenerProvinciasPorPaisSelect,
} from '../../../../services/Select/localidadesSelectApi'
import { Option } from '../../../../types/form'
import GenericLocalidadesSelect from '../../../form/Controls/GenericLocalidadesSelect'

export default function DireccionesForm({
    register,
    errors,
    control,
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

    // useEffect(() => {
    //     obtenerPaisesSelect().then(setPaises)
    // }, [])

    // useEffect(() => {
    //     console.log('paisSeleccionado changed:', paisSeleccionado)
    //     setValue('provincia', -1)
    //     setValue('ciudad', -1)

    //     if (paisSeleccionado === -1) {
    //         setProvincias([]) // Limpia las provincias si no hay país seleccionado
    //         return
    //     }
    //     obtenerProvinciasPorPaisSelect(paisSeleccionado).then(setProvincias)
    // }, [paisSeleccionado])

    // useEffect(() => {
    //     if (provinciaSeleccionada === -1) {
    //         setCiudades([]) // Limpia las ciudades si no hay provincia seleccionada
    //         return
    //     }
    //     obtenerCiudadesPorProvinciaSelect(provinciaSeleccionada).then(setCiudades)
    // }, [provinciaSeleccionada])

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
    console.log(direccion)
    function handleLocalidadesChange(newValue: {
        pais: number
        provincia: number
        ciudad: number
    }) {
        console.log('DireccionesForm - handleLocalidadesChange:', newValue)
        // setValue('pais', newValue.pais)
        // setValue('provincia', newValue.provincia)
        // setValue('ciudad', newValue.ciudad)
    }

    return (
        <>
            <GenericRowForm>
                <GenericSelect
                    label='Tipo de Dirección'
                    name={`tipo`}
                    isReadOnly={readOnly}
                    control={control}
                    // options={[
                    //     { value: '', label: 'Tipo' },
                    //     { value: 'Casa', label: 'Casa' },
                    //     { value: 'Oficina', label: 'Oficina' },
                    //     { value: 'Otro', label: 'Otro' },
                    // ]}
                    tipoCatalogo='tipoDireccion'
                    className='min-w-[20ch] max-w-[20ch]'
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

            <GenericLocalidadesSelect
                isReadOnly={readOnly}
                watch={watch} // Pasamos el objeto observado
                control={control}
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
