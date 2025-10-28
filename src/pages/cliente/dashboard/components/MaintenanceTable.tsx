type MaintenanceType = 'Preventivo' | 'Correctivo' | 'Otro'

type Maintenance = {
    id: number
    date: string
    type: MaintenanceType
    description: string
}

const maintenances: Maintenance[] = [
    {
        id: 1,
        date: '01/07/2025',
        type: 'Preventivo',
        description: 'Cambio de filtros y revisión general',
    },
    {
        id: 2,
        date: '15/06/2025',
        type: 'Correctivo',
        description: 'Reparación del sistema eléctrico',
    },
    {
        id: 3,
        date: '02/06/2025',
        type: 'Otro',
        description: 'Inspección por ruidos extraños',
    },
]

const typeStyles: Record<MaintenanceType, string> = {
    Preventivo: 'bg-info-auto',
    Correctivo: 'bg-warning-auto',
    Otro: 'bg-background-accent-auto',
}

function MaintenanceTable() {
    return (
        <div className='overflow-x-auto'>
            <table className='w-full text-left'>
                <thead>
                    <tr className='border-b-2 border-light text-primary'>
                        <th className='p-4 font-bold '>Fecha de mantenimiento</th>
                        <th className='p-4 font-bold '>Tipo de mantenimiento</th>
                        <th className='p-4 font-bold '>Descripción</th>
                        <th className='p-4 font-bold '>Acción</th>
                    </tr>
                </thead>
                <tbody>
                    {maintenances.map(m => (
                        <tr key={m.id} className='border-b border-light hover:bg-background-auto '>
                            <td className='p-4 '>{m.date}</td>
                            <td className='p-4'>
                                <span className={`px-3 py-1 text-sm font-medium rounded-full `}>
                                    {m.type}
                                </span>
                            </td>
                            <td className='p-4 '>{m.description}</td>
                            <td className='p-4'>
                                <button className='bg-primary-auto px-4 py-1.5 rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors'>
                                    Ver
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default MaintenanceTable
