import { useForm } from 'react-hook-form'
import GenericSelect from '../form/Controls/GenericSelect'
import GenericForm from '../form/GenericForm'
import { TIPO_PERSONA_TYPE } from '../../constants/perfil'

export default function ProfileHeader({
    setTipoPersona,
}: {
    setTipoPersona: (tipo: TIPO_PERSONA_TYPE | null) => void
}) {
    const profileForm = useForm<{ tipoPersona: TIPO_PERSONA_TYPE | null }>({
        defaultValues: {
            tipoPersona: null,
        },
        mode: 'onChange',
    })

    return (
        <div className='flex w-full justify-between items-center p-6 bg-background-accent-auto rounded-xl shadow-md max-w-4xl mx-auto '>
            <GenericForm
                title='Tipo de Perfil'
                onSubmit={profileForm.handleSubmit((data: any) =>
                    console.log('Profile Form Data:', data)
                )}
                error={profileForm.formState.errors.tipoPersona?.message}
            >
                <div className='flex items-center justify-center w-full gap-4'>
                    <div className='w-1/2 md:w-1/3 flex items-center '>
                        {/* <h2 className='text-lg font-semibold'>Tipo de Persona</h2> */}
                        <GenericSelect
                            // label='Tipo de Persona'
                            name='tipoPersona'
                            control={profileForm.control}
                            // options={[
                            //     { value: '', label: 'Tipo de Persona' },
                            //     { value: 'Natural', label: 'Persona Natural' },
                            //     { value: 'Juridica', label: 'Persona Jurídica' },
                            // ]}
                            placeholderOptionLabel={'Seleccione el tipo de persona'}
                            tipoCatalogo={'tipoCliente'}
                        />
                    </div>
                    <div className='flex h-full mb-[1.5rem]'>
                        <button
                            type='submit'
                            className='bg-primary-auto px-4 py-2 rounded hover:bg-primary-light text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg'
                            onClick={() => {
                                const tipo: TIPO_PERSONA_TYPE | null =
                                    profileForm.getValues('tipoPersona')
                                setTipoPersona(tipo)
                            }}
                        >
                            Seleccionar
                        </button>
                    </div>
                </div>
            </GenericForm>
        </div>
    )
}
