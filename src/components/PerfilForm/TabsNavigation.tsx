import { AiOutlineEdit, AiOutlineEye } from 'react-icons/ai'
import { TabKeyType, tabsInfoType } from '../../types/profile.types'

export default function TabsNavigation({
    tabs,
    activeTab,
    setActiveTab,
    estaEditando,
    onToggleEdit,
}: {
    tabs: tabsInfoType
    activeTab: TabKeyType
    setActiveTab: (key: TabKeyType) => void
    estaEditando: boolean
    onToggleEdit: () => void
}) {
    return (
        <div className='border-b border-gray-700/50'>
            <nav className='flex' aria-label='Tabs'>
                {tabs.map(tab => (
                    <button
                        key={tab.key}
                        onClick={() => setActiveTab(tab.key)}
                        className={`flex items-center justify-center gap-2 w-1/3 py-4 px-1 text-center border-b-2 font-medium text-sm transition-all duration-300 ease-in-out ${
                            activeTab === tab.key
                                ? 'border-primary text-primary'
                                : 'border-transparent text-muted hover:text-white hover:border-white/50'
                        }`}
                    >
                        {tab.icon}
                        <span>{tab.label}</span>
                    </button>
                ))}
                <button
                    type='button'
                    onClick={onToggleEdit}
                    className='flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm text-white bg-primary-auto hover:bg-secondary-light transition-all duration-300 shadow-md hover:shadow-lg'
                >
                    {estaEditando ? (
                        <AiOutlineEye className='size-5' />
                    ) : (
                        <AiOutlineEdit className='size-5' />
                    )}
                    {estaEditando ? 'Modo Ver' : 'Editar'}
                </button>
            </nav>
        </div>
    )
}
