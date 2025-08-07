// src/components/UserProfile/UserProfileTabs.tsx
import { useState } from 'react'
import DireccionForm from '../components/PerfilForm/forms/DireccionForm'
import ContactoForm from '../components/PerfilForm/forms/ContactoForm'
import PersonaJuridicaForm from '../components/PerfilForm/forms/PersonaJuridicaForm'
import GenericSelect from '../components/form/Controls/GenericSelect'
import { Resolver, useForm, UseFormReturn } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import {
    ContactosData,
    contactosEmpresaSchema,
    contactosPersonaSchema,
    DireccionesData,
    direccionesSchema,
    direccionSchema,
    PerfilEmpresaData,
    PerfilPersonaNaturalData,
    // perfilSchema,
    personaJuridicaSchema,
    personaNaturalSchema,
} from '../validation/perfil.schema'
import GenericButton from '../components/form/Controls/GenericButton'
import PersonaNaturalForm from '../components/PerfilForm/forms/PersonaNaturalForm'
import { useAuth } from '../hooks/useAuth'
import { FaUser, FaMapMarkerAlt, FaEnvelope } from 'react-icons/fa'
import { TabKeyType, tabsInfoType } from '../types/profile.types'
import ProfileHeader from '../components/PerfilForm/ProfileHeader'
import TabsNavigation from '../components/PerfilForm/TabsNavigation'
import { tipoPersonaType } from '../types/formsProfile'

// Definimos los tipos para las claves de las pestañas para mayor seguridad

export default function UserProfileTabs() {
    const { user } = useAuth()

    const [activeTab, setActiveTab] = useState<TabKeyType>('personal')
    const [estaEditando, setEstaEditando] = useState(false)
    const [tipoPersona, setTipoPersona] = useState<tipoPersonaType>('')

    const renderContent = () => {
        switch (activeTab) {
            case 'personal':
                return (
                    <div className='animate-fade-in'>
                        {tipoPersona === 'Juridica' ? (
                            <PersonaJuridicaForm
                                form={personaJuridicaForm}
                                tipoPersona={tipoPersona}
                                estaEditando={estaEditando}
                            />
                        ) : (
                            <PersonaNaturalForm
                                form={personaNaturalForm}
                                tipoPersona={tipoPersona}
                                estaEditando={estaEditando}
                            />
                        )}
                    </div>
                )
            case 'direccion':
                return (
                    <div className='animate-fade-in'>
                        <DireccionForm
                            form={direccionForm}
                            tipoPersona={tipoPersona}
                            estaEditando={estaEditando}
                        />
                    </div>
                )
            case 'contacto':
                return (
                    <div className='animate-fade-in'>
                        <ContactoForm
                            form={contactoForm}
                            tipoPersona={tipoPersona}
                            estaEditando={estaEditando}
                        />
                    </div>
                )
            default:
                return null
        }
    }
    // const profileForm = useForm({ mode: 'onChange', resolver: yupResolver(perfilSchema) })
    const personaNaturalForm = useForm<PerfilPersonaNaturalData>({
        mode: 'onChange',
        resolver: yupResolver(personaNaturalSchema),
    })
    const personaJuridicaForm = useForm<PerfilEmpresaData>({
        mode: 'onChange',
        resolver: yupResolver(personaJuridicaSchema) as Resolver<PerfilEmpresaData>,
        defaultValues: {
            emailEmpresa: 'ejemplo@gmail.com',
        },
    })
    const direccionForm = useForm<DireccionesData>({
        resolver: yupResolver(direccionesSchema),
        defaultValues: {
            direcciones: [
                {
                    // Inicia con una dirección por defecto
                    pais: undefined,
                    provincia: undefined,
                    ciudad: undefined,
                    direccion: undefined,
                },
            ],
        },
        mode: 'onChange',
    })
    const contactoForm = useForm<ContactosData>({
        mode: 'onChange',
        resolver: yupResolver(
            tipoPersona === 'Juridica' ? contactosEmpresaSchema : contactosPersonaSchema
        ),
        defaultValues: {
            contactos: [
                {
                    email: user?.email || 'ejemplo@gmail.com',
                },
            ],
        },
    })

    const tabs: tabsInfoType = [
        {
            key: 'personal',
            label: 'Información Personal',
            icon: <FaUser />,
            form: tipoPersona === 'Juridica' ? personaJuridicaForm : personaNaturalForm,
        },
        { key: 'direccion', label: 'Dirección', icon: <FaMapMarkerAlt />, form: direccionForm },
        { key: 'contacto', label: 'Contacto', icon: <FaEnvelope />, form: contactoForm },
    ]
    const activeForm = tabs.find(tab => tab.key === activeTab)!.form

    return (
        <div className='flex flex-col  min-h-screen bg-background-auto'>
            {tipoPersona == '' ? (
                <ProfileHeader setTipoPersona={setTipoPersona} />
            ) : (
                <div className='bg-background-accent-auto rounded-xl shadow-lg w-full max-w-4xl mx-auto border '>
                    <TabsNavigation
                        tabs={tabs}
                        activeTab={activeTab}
                        setActiveTab={(key: TabKeyType) => {
                            setActiveTab(key)
                            // setEstaEditando(false) // Cambia de pestaña y desactiva edición
                            // activeForm.reset() // Resetea el formulario activo al cambiar de pestaña
                        }}
                        estaEditando={estaEditando}
                        onToggleEdit={() => setEstaEditando(!estaEditando)}
                    />

                    {/* Contenido de la Pestaña Activa */}
                    <div className='p-6 md:p-8'>
                        {renderContent()}
                        {estaEditando && (
                            <div className='flex justify-end gap-2 mt-4'>
                                <GenericButton
                                    type='button'
                                    text='Cancelar'
                                    className='bg-background-auto hover:bg-background-accent-auto text-white ml-2'
                                    onClick={() => {
                                        console.log('Cancel clicked')
                                        activeForm.reset()
                                        console.log('Formulario cancelado', activeForm.getValues())
                                        // setEstaEditando(false)
                                    }}
                                />
                                <GenericButton
                                    type='button'
                                    text='Siguiente'
                                    // disabled={!activeForm.formState.isValid}
                                    className='bg-primary-dark! hover:bg-primary-light text-white'
                                    onClick={() => {
                                        console.log('Next clicked')
                                        if (!activeForm) return
                                        // console.log('Datos del formulario:', activeForm.getValues())
                                        // Aquí podrías manejar la lógica de guardado o validación
                                        activeForm.handleSubmit((data: any) => {
                                            console.log('Datos del formulario:', data)
                                            // Aquí tu llamada axios, p.ej. await axios.post('/perfil', data)
                                            // activeForm.reset()
                                            if (activeTab === 'contacto') {
                                                setActiveTab('personal')
                                                setEstaEditando(false) // Si es la última pestaña, salir de edición
                                                return
                                            }
                                            setActiveTab((prevTab: TabKeyType) => {
                                                if (prevTab === 'personal') return 'direccion'
                                                if (prevTab === 'direccion') return 'contacto'
                                                return prevTab
                                            })
                                        })()
                                        console.log('errores', activeForm.formState.errors)
                                        console.log('Datos al final:', activeForm.getValues())
                                    }}
                                />
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
