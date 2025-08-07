import CardTablero from '../components/dashboard/CardTablero'
import CardValue from '../components/dashboard/CardValue'
import StatCard from '../components/dashboard/StatCard'
import MaintenanceTable from '../components/MaintenanceTable'
import { FaTools, FaCalendarCheck, FaChartLine } from 'react-icons/fa'

function Home() {
    return (
        <main className='flex-1 p-8 '>
            <header className='mb-8 text-center'>
                <h1 className='text-5xl font-extrabold text-primary mb-2 drop-shadow'>
                    Bienvenido a TecniTrak
                </h1>
                <p className='text-lg text-muted mt-1 mb-6'>
                    La mejor solución para la gestión de mantenimientos.
                </p>
            </header>

            <section className='my-12'>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
                    <CardValue
                        icon={<FaTools />}
                        title='Control total de mantenimientos'
                        value='Administra y visualiza todos los mantenimientos de tus vehículos y equipos en un solo lugar.'
                        // isCurrency={false}
                    />
                    <CardValue
                        icon={<FaCalendarCheck />}
                        title='Agendamiento inteligente'
                        value='Recibe recordatorios y agenda mantenimientos de forma rápida y sencilla.'
                    />
                    <CardValue
                        icon={<FaChartLine />}
                        title='Reportes y estadísticas'
                        value='Obtén reportes visuales para tomar mejores decisiones y optimizar recursos.'
                    />
                </div>
            </section>

            <section className='my-12 text-center'>
                <h2 className='text-2xl font-bold mb-4 text-primary'>¿Por qué elegir TecniTrak?</h2>
                <ul className='list-disc list-inside text-lg text-muted mx-auto max-w-2xl'>
                    <li>Interfaz moderna y fácil de usar</li>
                    <li>Personalización de temas y colores</li>
                    <li>Soporte para múltiples usuarios y roles</li>
                    <li>Actualizaciones automáticas y seguras</li>
                </ul>
            </section>
        </main>
    )
}

export default Home
