import { Tab } from '@headlessui/react'
import React from 'react'
import TabsNavigation from '../common/tabs/TabsNavigation'

import InformacionGeneral from './procesar/InformacionGeneral'
import Diagnostico from './procesar/Diagnostico'
import Cotizacion from './procesar/Cotizacion'
import Aprobacion from './procesar/Aprobacion'
import Reparacion from './procesar/Reparacion'
import Finalizacion from './procesar/Finalizacion'
import { tabsInfoType } from '../common/tabs/models/tabs.type'

const tabs: tabsInfoType<string> = [
    { key: 'Informacion General', label: 'Informacion General', icon: <></> },
    { key: 'Diagnostico', label: 'Diagnostico', icon: <></> },
    { key: 'Cotizacion', label: 'Cotizacion', icon: <></> },
    { key: 'Aprobacion', label: 'Aprobacion', icon: <></> },
    { key: 'Reparacion', label: 'Reparacion', icon: <></> },
    { key: 'Finalizacion', label: 'Finalizacion', icon: <></> },
]

export default function ProcesarMantenimiento() {
    const [selectedTab, setSelectedTab] = React.useState<string>('Informacion General')
    const renderContent = () => {
        switch (selectedTab) {
            case 'Informacion General':
                return <InformacionGeneral />
            case 'Diagnostico':
                return <Diagnostico />
            case 'Cotizacion':
                return <Cotizacion />
            case 'Aprobacion':
                return <Aprobacion />
            case 'Reparacion':
                return <Reparacion />
            case 'Finalizacion':
                return <Finalizacion />
            default:
                return <div>Seleccione una pestaña</div>
        }
    }

    return (
        <>
            <div className='p-4 bg-background-accent-auto rounded-lg shadow-lg'>
                <TabsNavigation tabs={tabs} activeTab={selectedTab} setActiveTab={setSelectedTab} />
                <div className='mt-4'>{renderContent()}</div>
            </div>
        </>
    )
}
