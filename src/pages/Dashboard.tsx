import MaintenanceTable from '../components/MaintenanceTable'

export default function DashboardPage() {
    return (
        // Usamos un fragmento o un div para agrupar los elementos de la página
        <div className='flex flex-col gap-8'>
            <header>
                <h1 className='text-4xl font-bold text-primary'>Mantenimientos</h1>
                <p className='text-text mt-1'>
                    La mejor solución para la gestión de mantenimientos.
                </p>
            </header>
            <input
                type='text'
                placeholder='Buscar mantenimiento...'
                className='w-full md:w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-secondary'
            />
            <div className='bg-background-accent-auto rounded-xl shadow-lg p-6'>
                <div className='flex justify-end mb-4'></div>
                <MaintenanceTable />
            </div>
        </div>
    )
}
