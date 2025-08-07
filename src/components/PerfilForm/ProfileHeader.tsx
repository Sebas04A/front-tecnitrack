import { useForm } from 'react-hook-form'
import GenericSelect from '../form/Controls/GenericSelect'
import GenericForm from '../form/GenericForm'
import GenericRowForm from '../form/GenericRowForm'
import { tipoPersonaType } from '../../types/formsProfile'
import { yupResolver } from '@hookform/resolvers/yup'

export default function ProfileHeader({
    setTipoPersona,
}: {
    setTipoPersona: (tipo: tipoPersonaType) => void
}) {
    const profileForm = useForm<{ tipoPersona: tipoPersonaType }>({
        defaultValues: {
            tipoPersona: '',
        },
        mode: 'onChange',
    })

    return (
        <div className='flex w-full justify-between items-center p-6 bg-background-accent-auto mb-10 border-b rounded-xl shadow-md max-w-4xl mx-auto'>
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
                            register={profileForm.register}
                            errors={profileForm.formState.errors}
                            options={[
                                { value: '', label: 'Tipo de Persona' },
                                { value: 'Natural', label: 'Persona Natural' },
                                { value: 'Juridica', label: 'Persona Jurídica' },
                            ]}
                        />
                    </div>
                    <div className='flex h-full mb-[1.5rem]'>
                        <button
                            type='submit'
                            className='bg-primary-auto px-4 py-2 rounded hover:bg-primary-light text-white font-semibold transition-all duration-300 shadow-md hover:shadow-lg'
                            onClick={() => {
                                const tipo: tipoPersonaType = profileForm.getValues('tipoPersona')
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
