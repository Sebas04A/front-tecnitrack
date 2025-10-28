import React from 'react'
import TabsNavigation from '../common/TabsNavigation'
import { tabsInfoType } from '../../types/profile.types'
import { FaCogs, FaDesktop, FaSignInAlt, FaTools, FaUserCircle } from 'react-icons/fa'

import BaseModal from '../common/modals/BaseModal'
import FormularioEquipo from './Equipo/FormularioEquipo'
import MantenimientoForm from './Mantenimiento/MantenimientoForm'
import InspeccionForm from './Inspeccion/InspeccionForm'

import InformacionGeneral from './InformacionGeneral/InformacionGeneral'
import Orden from './Orden/Orden'
import { BaseModalProps } from '../../types/modal.types'
import { useModalActions } from '../../hooks/useModalActions'

import { OrdenResponse } from '../../api'
import { OrdenData } from '../../pages/Internos/Ordenes/Crud/models/ordenData'

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
    estaEditando?: boolean
    orden: OrdenData
    readOnly?: boolean
}

export default function MantenimientoIngreso({
    orden,
    estaEditando = false,
    readOnly = false,
    size = 'full',
}: BaseModalProps & {
    orden: OrdenData

    estaEditando?: boolean
    readOnly?: boolean
}) {
    console.warn('MantenimientoIngreso render', { orden })

    const [activeTab, setActiveTab] = React.useState<tabsTypes>('informacion')

    const modalActions = useModalActions()
    function changeActiveTab(tab: tabsTypes) {
        console.log('Cambiando a tab', tab)
        console.log('Tab actual', activeTab)
        if (activeTab === 'informacion' || readOnly) return setActiveTab(tab)
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

    const [isOpen, setIsOpen] = React.useState(true)
    function handleClose() {
        if (readOnly) {
            setIsOpen(false)
            return
        }
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
        modalActions.showAlert({
            title: 'Guardado',
            message: 'Los datos se han guardado correctamente.',
            type: 'success',
        })
        changeNextTab()
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
            size={size}
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
                            orden={orden}
                            change={changeNextTab}
                            // readonly={readonly}
                        />
                    )}
                    {activeTab === 'orden' && (
                        <Orden
                            handleClose={handleClose}
                            handleSave={handleSave}
                            orden={orden}
                            readOnly={readOnly}
                            estaEditando={estaEditando}
                        />
                    )}
                    {activeTab === 'equipo' && (
                        <FormularioEquipo
                            handleClose={handleClose}
                            handleSave={handleSave}
                            orden={orden}
                            estaEditando={estaEditando}
                            readOnly={readOnly}
                        />
                    )}
                    {activeTab === 'componentes' && (
                        <InspeccionForm
                            handleClose={handleClose}
                            handleSave={handleSave}
                            estaEditando={estaEditando}
                            orden={orden}
                            readOnly={readOnly}
                        />
                    )}
                    {/* {activeTab === 'direccion' && <FormularioEquipo />} */}

                    {activeTab === 'mantenimiento' && (
                        <MantenimientoForm
                            handleClose={handleClose}
                            handleSave={handleSave}
                            // ID_CITA={orden.idCita || 0}
                            orden={orden}
                            estaEditando={estaEditando}
                            readOnly={readOnly}
                        />
                    )}
                    {/* {activeTab === 'contacto' && <InspeccionForm />} */}
                </div>
            </div>
        </BaseModal>
    )
}
