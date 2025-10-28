import GenericTextInput from '../../../../../components/form/Controls/GenericTextInput'
import { UseFormRegister } from 'react-hook-form'
import { CatalogoFormData } from '../models/catalogo.schema'
import GenericSelect from '../../../../../components/form/Controls/GenericSelect'

export default function CatalogoForm({
    register,
    errors,
    readOnly,
    control,
}: {
    register: UseFormRegister<CatalogoFormData>
    errors: any
    control: any
    readOnly?: boolean
}) {
    console
    return (
        <>
            <GenericTextInput
                label='Valor'
                name='valor'
                type='text'
                register={register}
                errors={errors}
                isReadOnly={readOnly}
                required
            />
            <GenericTextInput
                label='Descripción'
                name='descripcion'
                type='text'
                register={register}
                errors={errors}
                isReadOnly={readOnly}
                required
            />
            <GenericSelect
                label='Estado'
                name='activo'
                control={control}
                options={[
                    { value: 'true', label: 'Activo' },
                    { value: 'false', label: 'Inactivo' },
                ]}
                isReadOnly={readOnly}
                required
            />
        </>
    )
}
