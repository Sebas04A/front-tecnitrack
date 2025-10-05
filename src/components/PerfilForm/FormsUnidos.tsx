import React, { useCallback, useEffect, useState } from 'react'
import TabsNavigation from '../common/TabsNavigation'
import { TabKeyType } from '../../types/profile.types'

import PersonaJuridicaForm from './forms/PersonaJuridicaForm'
import PersonaNaturalForm from './forms/PersonaNaturalForm'

import { PerfilEmpresaData, PerfilPersonaNaturalData } from '../../validation/perfil.schema'
import {
    getPerfilJuridico,
    getPerfilJuridicoById,
    getPerfilNatural,
    getPerfilNaturalById,
} from '../../services/perfilApi'

import { FaEnvelope, FaMapMarkerAlt, FaUser } from 'react-icons/fa'
import { useModalActions } from '../../hooks/useModalActions'
import DireccionesCrud from '../crudGrid/cruds/DireccionesCrud'
import ContactosCrud from '../crudGrid/cruds/ContactosCrud'
import { TIPO_PERSONA, TIPO_PERSONA_TYPE } from '../../constants/perfil'
import { yupResolver } from '@hookform/resolvers/yup'
const tabs: Array<{ key: TabKeyType; label: string; icon: JSX.Element }> = [
    {
        key: 'personal',
        label: 'Información General',
        icon: <FaUser />,
    },
    { key: 'direccion', label: 'Dirección', icon: <FaMapMarkerAlt /> },
    { key: 'contacto', label: 'Contacto', icon: <FaEnvelope /> },
]
export default function FormsUnidos({
    tipoPersona,
    // dataProp,
    setDatosYaGuardados,
    clienteId,
    esCrud,
}: {
    tipoPersona: TIPO_PERSONA_TYPE
    // dataProp?: PerfilEmpresaData | PerfilPersonaNaturalData
    datosYaGuardados: boolean
    setDatosYaGuardados: (valor: boolean) => void
    clienteId?: number
    esCrud: boolean
}) {
    const [_clienteId, setClienteId] = useState<number | undefined>(clienteId)

    const modal = useModalActions()
    const [idLoading, setIdLoading] = useState('-1')

    const [activeTab, setActiveTab] = React.useState<TabKeyType>('personal')
    const [isDirty, setIsDirty] = useState(false)
    const [estaEditando, setEstaEditando] = useState(false)

    function openCambiosSinGuardar() {
        modal.showAlert({
            title: 'Cambios sin guardar',
            message: 'Tienes cambios sin guardar. ¿Estás seguro de que quieres cambiar de pestaña?',
            type: 'warning',
        })
    }
    function validarPuedeCambiar() {
        if (isDirty) {
            console.log('Hay cambios sin guardar, no se puede cambiar de pestaña')
            console.log({ estaEditando, isDirty })
            openCambiosSinGuardar()
            return false
        }
        return true
    }
    // const modalRequest = useRequestModal()
    const [data, setData] = useState<PerfilEmpresaData | PerfilPersonaNaturalData | null>()
    // dataProp ?? null
    function onDatosGuardados(id: number) {
        if (!id || id == -1) throw new Error('Se necesita el cliente id')
        console.log('ID guardado', id)
        setDatosYaGuardados(true)
        // setEstaEditando(false)
        nextTab()
        setClienteId(id)
        console.log('Datos guardados')
        modal.showAlert({
            title: 'Datos guardados',
            message: 'Los datos se han guardado correctamente.',
            type: 'success',
        })
    }

    function changeActiveTab(key: TabKeyType) {
        if (!validarPuedeCambiar()) return
        setActiveTab(key)
    }
    function nextTab() {
        const currentIndex = tabs.findIndex(tab => tab.key === activeTab)
        if (currentIndex < tabs.length - 1) {
            const nextTabKey = tabs[currentIndex + 1].key
            setActiveTab(nextTabKey)
            setEstaEditando(false)
            setIsDirty(false)
        }
    }
    function onSubmitStart() {
        const id = modal.showLoading('Guardando datos...')
        console.log('Guardando datos, loading ID:', id)
        setIdLoading(id)
    }
    // function onSubmitError(errorMessage: string | undefined) {
    //     console.log('Error al guardar datos:', errorMessage)
    //     console.log('Cerrando loading con ID:', idLoading)
    //     modal.closeModal(idLoading)
    //     modal.showAlert({
    //         title: 'Error al guardar',
    //         message: errorMessage ?? 'Error desconocido',
    //         type: 'error',
    //     })
    // }
    const onSubmitError = useCallback(
        (errorMessage: string | undefined) => {
            console.log('Error al guardar datos:', errorMessage)
            console.log('Cerrando loading con ID:', idLoading)
            modal.closeModal(idLoading)
            modal.showAlert({
                title: 'Error al guardar',
                message: errorMessage ?? 'Error desconocido',
                type: 'error',
            })
        },
        [idLoading]
    )

    async function obtenerData() {
        const id = modal.showLoading('Cargando datos...')
        let dataLocal: PerfilEmpresaData | PerfilPersonaNaturalData | null
        try {
            console.warn(
                'Obteniendo datos para tipoPersona:',
                tipoPersona,
                'clienteId:',
                clienteId,
                'tipoPersona:',
                tipoPersona,
                'esCrud:',
                esCrud
            )
            if (esCrud) {
                console.log('Viene de CRUD', { _clienteId }, _clienteId == -1)
                if (!_clienteId) throw new Error('No se proporcionó clienteId en modo CRUD')
                if (_clienteId === -1) {
                    console.log('Creando nuevo cliente, no se obtienen datos')
                    setData(null)
                    modal.closeModal(id)
                    return
                } else {
                    console.log('Obteniendo datos para cliente existente')
                    dataLocal = await (tipoPersona === TIPO_PERSONA.EMPRESA
                        ? getPerfilJuridicoById(_clienteId)
                        : getPerfilNaturalById(_clienteId))
                    console.log('Datos obtenidos cliente existente:', dataLocal)
                }
            } else {
                console.log('Obteniendo datos para cliente actual')
                dataLocal = await (tipoPersona === TIPO_PERSONA.EMPRESA
                    ? getPerfilJuridico()
                    : getPerfilNatural())
                console.log('Datos obtenidos cliente actual:', dataLocal)
            }

            // if (clienteId === -1 && esCrud) {
            //     console.log('Creando nuevo cliente, no se obtienen datos')
            //     dataLocal = null
            // } else if (clienteId) {
            //     console.log('Obteniendo datos para cliente existente')
            //     dataLocal = await (tipoPersona === TIPO_PERSONA.EMPRESA
            //         ? getPerfilJuridicoById(clienteId)
            //         : getPerfilNaturalById(clienteId))
            //     console.log('Datos obtenidos cliente existente:', dataLocal)
            // } else {
            //     dataLocal = await (tipoPersona === TIPO_PERSONA.EMPRESA
            //         ? getPerfilJuridico()
            //         : getPerfilNatural())
            // }
            console.log('Datos obtenidos :', dataLocal)
            setData(dataLocal)
            modal.closeModal(id)
        } catch (e) {
            modal.closeModal(id)
            const errorMessage = e instanceof Error ? e.message : 'Error al obtener datos'
            console.error('Error obteniendo datos por defecto de Persona:', errorMessage)
            if (
                errorMessage == 'No se encontró una empresa para este usuario' ||
                errorMessage == 'No se encontró un cliente natural para este usuario'
            ) {
                console.log('No hay datos previos, se asume nuevo cliente')
                setEstaEditando(true)
            } else {
                modal.showAlert({
                    title: 'Error al obtener datos',
                    message: errorMessage,
                    type: 'error',
                })
            }
        }
    }
    useEffect(() => {
        console.log('Tipo de persona cambiado a:', tipoPersona)
        setData(null)
        obtenerData()
    }, [tipoPersona])
    useEffect(() => {
        console.log('RENDERIZANDO')
    }, [])

    function handleLoadStart() {
        const id = modal.showLoading('Cargando datos...')
        setIdLoading(id)
    }
    function handleLoadEnd() {
        modal.closeModal(idLoading)
    }

    const renderContent = () => {
        if (activeTab === 'personal') {
            return (
                <div className='animate-fade-in'>
                    {tipoPersona === TIPO_PERSONA.EMPRESA ? (
                        <PersonaJuridicaForm
                            data={data as PerfilEmpresaData}
                            clienteId={_clienteId ?? -1}
                            onDatosGuardados={onDatosGuardados}
                            estaEditando={estaEditando || esCrud}
                            changeEstaEditando={setEstaEditando}
                            changeDirty={setIsDirty}
                            onSubmitStart={onSubmitStart}
                            onSubmitError={onSubmitError}
                            onLoadStart={handleLoadStart}
                            onLoadEnd={handleLoadEnd}
                        />
                    ) : tipoPersona === TIPO_PERSONA.NATURAL ? (
                        <PersonaNaturalForm
                            data={data as any}
                            clienteId={_clienteId}
                            // esNuevo={clienteId === -1}
                            onDatosGuardados={onDatosGuardados}
                            estaEditando={estaEditando || esCrud}
                            changeEstaEditando={setEstaEditando}
                            changeDirty={setIsDirty}
                            onSubmitStart={onSubmitStart}
                            onSubmitError={onSubmitError}
                            onLoadStart={handleLoadStart}
                            onLoadEnd={handleLoadEnd}
                        />
                    ) : null}
                </div>
            )
        } else if (activeTab === 'direccion') {
            return (
                <div className='animate-fade-in'>
                    <DireccionesCrud clienteId={_clienteId} />
                </div>
            )
        } else if (activeTab === 'contacto') {
            return (
                <div className='animate-fade-in'>
                    <ContactosCrud tipoPersona={tipoPersona} clienteId={_clienteId} />
                </div>
            )
        }
    }
    return (
        <>
            <TabsNavigation
                tabs={tabs}
                activeTab={activeTab}
                setActiveTab={(key: TabKeyType) => {
                    changeActiveTab(key)
                    // setEstaEditando(false) // Cambia de pestaña y desactiva edición
                    // activeForm.reset() // Resetea el formulario activo al cambiar de pestaña
                }}
                estaEditando={estaEditando}
                // onToggleEdit={
                //     esCrud
                //         ? undefined
                //         : () => {
                //               if (!validarPuedeCambiar()) return
                //               setEstaEditando(!estaEditando)
                //           }
                // }
            />

            {/* Contenido de la Pestaña Activa */}
            <div className='p-6 md:p-6'>{renderContent()}</div>
        </>
    )
}
