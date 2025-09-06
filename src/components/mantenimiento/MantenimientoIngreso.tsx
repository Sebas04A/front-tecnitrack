import React from 'react'
import TabsNavigation from '../common/TabsNavigation'
import { tabsInfoType } from '../../types/profile.types'
import { FaArrowLeft, FaEnvelope, FaMapMarkerAlt, FaUserCircle } from 'react-icons/fa'
import UsuarioDetalle from './UsuarioDetalle'
import BaseModal from '../common/modals/BaseModal'
import FormularioEquipo from './FormularioEquipo'
import MantenimientoForm from './MantenimientoForm'
import InspeccionForm from './InspeccionForm'

type tabsTypes = 'ingreso' | 'direccion' | 'contacto' | 'mantenimiento'

const tabs: tabsInfoType<tabsTypes> = [
    { key: 'ingreso', label: 'Informacion', icon: <FaUserCircle /> },
    { key: 'direccion', label: 'Informacion Equipo', icon: <FaMapMarkerAlt /> },
    { key: 'mantenimiento', label: 'Mantenimiento', icon: <FaArrowLeft /> },
    { key: 'contacto', label: 'Diagnostico', icon: <FaEnvelope /> },
]

export default function MantenimientoIngreso() {
    const [activeTab, setActiveTab] = React.useState<tabsTypes>('ingreso')
    return (
        <BaseModal isOpen={true} title='Ingreso de Mantenimiento' onClose={() => {}} size='full'>
            <div className='w-full'>
                <TabsNavigation<tabsTypes>
                    tabs={tabs}
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />
                <div className='p-4'>
                    {activeTab === 'ingreso' && <UsuarioDetalle />}
                    {activeTab === 'direccion' && <FormularioEquipo />}

                    {activeTab === 'mantenimiento' && <MantenimientoForm />}
                    {activeTab === 'contacto' && <InspeccionForm />}
                </div>
            </div>
        </BaseModal>
    )
}
