import GenericForm from '../components/form/GenericForm'
import GenericSelect from '../components/form/Controls/GenericSelect'
import GenericTextInput from '../components/form/Controls/GenericTextInput'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { PerfilData, perfilSchema } from '../validation/perfil.schema'
import GenericButton from '../components/form/Controls/GenericButton'
import GenericSection from '../components/form/GenericSection'
import GenericRowForm from '../components/form/GenericRowForm'
import PersonaJuridicaForm from '../components/PerfilForm/forms/PersonaJuridicaForm'
import PersonaNaturalForm from '../components/PerfilForm/forms/PersonaNaturalForm'
import DireccionForm from '../components/PerfilForm/forms/DireccionForm'
import ContactoForm from '../components/PerfilForm/forms/ContactoForm'

export default function Usuario() {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        watch,
    } = useForm({
        mode: 'onChange',
    })
    const onSubmit = async (data: any) => {
        console.log('Datos del formulario:', data)
        try {
            // aquí tu llamada axios, p.ej. await axios.post('/login', data)
            console.log('Datos válidos:', data)
            reset()
        } catch (e) {
            // si el backend devuelve error global:
            // setError('email', { message: 'Usuario no encontrado' });
        }
    }

    const tipoPersona = watch('tipoPersona')

    return (
        <div className='bg-background-accent-auto  rounded-xl shadow-md  w-full'>
            {/* <h2 className='text-xl font-semibold'>Información del Usuario</h2> */}
            <GenericForm onSubmit={handleSubmit(onSubmit)} title='Perfil del Usuario'>
                <GenericSelect
                    label='Tipo de Persona'
                    name='tipoPersona'
                    register={register}
                    errors={errors}
                    options={[
                        { value: 'Natural', label: 'Persona Natural' },
                        { value: 'Juridica', label: 'Persona Jurídica' },
                    ]}
                />
                {tipoPersona === 'Juridica' ? <PersonaJuridicaForm /> : <PersonaNaturalForm />}
                <DireccionForm />
                <ContactoForm />
                <div className='flex justify-end gap-2 mt-4'>
                    <GenericButton
                        type='button'
                        text='Cancelar'
                        className='bg-background-auto hover:bg-background-accent-auto text-white ml-2'
                        onClick={() => {
                            console.log('Cancel clicked')
                            reset()
                            // regresar a la pagina anterior
                            window.history.back()
                        }}
                    />
                    <GenericButton type='submit' text='Guardar F' />
                </div>
            </GenericForm>
        </div>
    )
}
