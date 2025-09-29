import React from 'react'
import TabsNavigation from '../common/TabsNavigation'
import { tabsInfoType } from '../../types/profile.types'
import { FaCogs, FaDesktop, FaSignInAlt, FaTools, FaUserCircle } from 'react-icons/fa'

import BaseModal from '../common/modals/BaseModal'
import FormularioEquipo from './FormularioEquipo'
import MantenimientoForm from './MantenimientoForm'
import InspeccionForm from './InformacionEquipo/InspeccionForm'

import InformacionGeneral from './InformacionGeneral'
import Orden from './Orden'
import { BaseModalProps } from '../../types/modal.types'
import { useModalActions } from '../../hooks/useModalActions'

import { OrdenResponse } from '../../api'

type tabsTypes =
    | 'informacion'
    | 'orden'
    | 'equipo'
    | 'componentes'
    | 'direccion'
    | 'contacto'
    | 'mantenimiento'

const tabs: tabsInfoType<tabsTypes> = [
    { key: 'informacion', label: 'Informacion General', icon: <FaUserCircle /> },
    { key: 'orden', label: 'Orden ', icon: <FaSignInAlt /> },
    { key: 'equipo', label: 'Equipo', icon: <FaDesktop /> },
    { key: 'componentes', label: 'Componentes', icon: <FaCogs /> },
    // { key: 'direccion', label: 'Recepción Equipo', icon: <FaMapMarkerAlt /> },
    // { key: 'contacto', label: 'Diagnostico', icon: <FaEnvelope /> },
    { key: 'mantenimiento', label: 'Mantenimiento', icon: <FaTools /> },
]

export interface WindowProps {
    handleClose: () => void
    handleSave: () => void
    N_ORDEN: number
    orden: OrdenResponse
}

export default function MantenimientoIngreso({
    N_ORDEN = 1,
    orden,
}: BaseModalProps & { N_ORDEN: number; orden: OrdenResponse }) {
    console.warn('MantenimientoIngreso render', { N_ORDEN, orden })

    const [activeTab, setActiveTab] = React.useState<tabsTypes>('informacion')

    const modalActions = useModalActions()
    function changeActiveTab(tab: tabsTypes) {
        console.log('Cambiando a tab', tab)
        console.log('Tab actual', activeTab)
        if (activeTab === 'informacion') return setActiveTab(tab)
        modalActions.showConfirm({
            title: '¿Está seguro de que desea cambiar de pestaña?',
            message: 'Si cambia de pestaña, se perderán los datos no guardados. ¿Desea continuar?',
            onConfirm: () => {
                setActiveTab(tab)
            },
            onCancel: () => {
                setActiveTab(activeTab)
            },
            type: 'warning',
        })
    }
    // SOLO POR AHORA
    const [isOpen, setIsOpen] = React.useState(true)
    const onClose = () => {
        console.log('Cerrar modal')
        setIsOpen(false)
    }

    function handleClose() {
        modalActions.showConfirm({
            title: '¿Está seguro de que desea cerrar?',
            message:
                'Si cierra esta ventana, se perderán los datos no guardados. ¿Desea continuar?',
            onConfirm: () => {
                setIsOpen(false)
            },
            onCancel: () => {
                setIsOpen(true)
            },
            type: 'warning',
        })
    }
    function handleSave() {
        // modalActions.showAlert({
        //     title: 'Guardado',
        //     message: 'Los datos se han guardado correctamente.',
        //     type: 'success',
        // })
        // changeNextTab()
    }
    function changeNextTab() {
        const currentIndex = tabs.findIndex(tab => tab.key === activeTab)
        const nextIndex = (currentIndex + 1) % tabs.length
        setActiveTab(tabs[nextIndex].key)
    }
    return (
        <BaseModal
            isOpen={isOpen}
            title='Ingreso de Mantenimiento'
            onClose={handleClose}
            size='full'
            noPadding={true}
        >
            <div className='w-full p-1 '>
                <TabsNavigation<tabsTypes>
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={changeActiveTab}
                />
                <div className='p-6 pt-8 pb-6'>
                    {activeTab === 'informacion' && (
                        <InformacionGeneral
                            handleClose={handleClose}
                            handleSave={handleSave}
                            N_ORDEN={N_ORDEN}
                            orden={orden}
                            change={changeNextTab}
                        />
                    )}
                    {activeTab === 'orden' && (
                        <Orden
                            handleClose={handleClose}
                            handleSave={handleSave}
                            N_ORDEN={N_ORDEN}
                            orden={orden}
                        />
                    )}
                    {activeTab === 'equipo' && (
                        <FormularioEquipo
                            handleClose={handleClose}
                            handleSave={handleSave}
                            N_ORDEN={N_ORDEN}
                            orden={orden}
                        />
                    )}
                    {activeTab === 'componentes' && (
                        <InspeccionForm
                            handleClose={handleClose}
                            handleSave={handleSave}
                            N_ORDEN={N_ORDEN}
                            orden={orden}
                        />
                    )}
                    {/* {activeTab === 'direccion' && <FormularioEquipo />} */}

                    {activeTab === 'mantenimiento' && (
                        <MantenimientoForm
                            handleClose={handleClose}
                            handleSave={handleSave}
                            N_ORDEN={N_ORDEN}
                            orden={orden}
                        />
                    )}
                    {/* {activeTab === 'contacto' && <InspeccionForm />} */}
                </div>
            </div>
        </BaseModal>
    )
}
