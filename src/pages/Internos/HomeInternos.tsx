import StatCard from '../../components/dashboard/StatCard'
import { FaCalendarAlt, FaInfoCircle, FaMoneyBillWave, FaTools } from 'react-icons/fa'
import CardTablero from '../../components/dashboard/CardTablero'

const stats = {
    realizados: 12,
    totalPagado: '2,450.00',
    proximoMant: '15 de agosto, 2025',
    tipos: {
        preventivo: 7,
        correctivo: 5,
    },
}
const totalTipos = stats.tipos.preventivo + stats.tipos.correctivo
const preventivoPercent = (stats.tipos.preventivo / totalTipos) * 100
const correctivoPercent = (stats.tipos.correctivo / totalTipos) * 100

const recomendaciones =
    'Se sugiere realizar mantenimiento preventivo en agosto para evitar fallas en el sistema de frenos.'

const actividadReciente = [
    { id: 1, desc: 'Cambio de aceite y filtros.', fecha: '20 JUL' },
    { id: 2, desc: 'Reparación de sistema eléctrico.', fecha: '15 JUN' },
    { id: 3, desc: 'Inspección de neumáticos.', fecha: '02 JUN' },
]

export default function HomeInternos() {
    console.warn('HomeInternos render')

    return (
        <div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
                <StatCard
                    icon={<FaTools />}
                    title='Mantenimientos realizados'
                    value={stats.realizados}
                />
                <StatCard
                    icon={<FaMoneyBillWave />}
                    title='Total pagado'
                    value={`$${stats.totalPagado}`}
                    isCurrency={true}
                />
                <StatCard
                    icon={<FaCalendarAlt />}
                    title='Próximo mantenimiento'
                    value={stats.proximoMant}
                />
                {/* Card de Tipos de Mantenimiento */}
                <CardTablero className='flex-col justify-center'>
                    {/* <div className=''> */}
                    <div className='flex items-center gap-4'>
                        <div className='bg-secondary-light p-3 rounded-full text-secondary'>
                            <FaTools className='text-secondary-dark' />
                        </div>
                        <h3 className='font-bold text-dark'>Tipos de mantenimiento</h3>
                    </div>
                    <div className='mt-4 space-y-3 w-full'>
                        <div className='w-full rounded-full h-2.5'>
                            <div
                                className='bg-primary h-2.5 rounded-l-full'
                                style={{ width: `${preventivoPercent}%` }}
                            ></div>
                            <div
                                className='bg-secondary h-2.5 rounded-r-full'
                                style={{
                                    width: `${correctivoPercent}%`,
                                    marginLeft: `${preventivoPercent}%`,
                                    marginTop: '-10px',
                                }}
                            ></div>
                        </div>
                        <div className='text-sm space-y-1'>
                            <div className='flex justify-between'>
                                <span className='flex items-center gap-2'>
                                    <div className='w-3 h-3 rounded-full bg-primary'></div>
                                    Preventivo
                                </span>{' '}
                                <strong>{stats.tipos.preventivo}</strong>
                            </div>
                            <div className='flex justify-between'>
                                <span className='flex items-center gap-2'>
                                    <div className='w-3 h-3 rounded-full bg-secondary'></div>
                                    Correctivo
                                </span>{' '}
                                <strong>{stats.tipos.correctivo}</strong>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </CardTablero>
            </div>

            {/* SECCIÓN SECUNDARIA */}
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
                {/* Card de Recomendaciones */}
                <CardTablero className='flex-col justify-center'>
                    {/* <div className=''> */}
                    <div className='flex items-center gap-4 mb-4 w-full'>
                        <div className='bg-info-auto p-3 rounded-full'>
                            <FaInfoCircle />
                        </div>
                        <h3 className='font-bold '>Recomendaciones</h3>
                    </div>
                    <p className='text-text'>{recomendaciones}</p>
                    {/* </div> */}
                </CardTablero>
                {/* Card de Actividad Reciente */}
                <CardTablero className='lg:col-span-2 flex-col justify-center w-full'>
                    {/* <div className='lg:col-span-2 bg-background-accent-auto p-6 rounded-xl shadow-md'> */}
                    <h3 className='font-bold text-dark mb-4'>Actividad Reciente</h3>
                    <ul className='space-y-4 w-full'>
                        {actividadReciente.map(act => (
                            <li key={act.id} className='flex items-center gap-4'>
                                <div className='bg-light p-3 rounded-lg text-secondary font-bold text-center'>
                                    <span className='text-xs'>{act.fecha}</span>
                                </div>
                                <p className='text-text flex-1'>{act.desc}</p>
                                <a
                                    href='#'
                                    className='text-secondary font-semibold hover:underline'
                                >
                                    Ver detalle
                                </a>
                            </li>
                        ))}
                    </ul>
                    {/* </div> */}
                </CardTablero>
            </div>
        </div>
    )
}
