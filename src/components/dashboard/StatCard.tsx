import CardTablero from './CardTablero'

export default function StatCard({
    icon,
    title,
    value,
    isCurrency = false,
}: {
    icon: JSX.Element
    title: string
    value: string | number
    isCurrency?: boolean
}) {
    return (
        <CardTablero className=' flex-col justify-center '>
            <div className='bg-secondary-light text-secondary-dark p-4 rounded-full text-2xl '>
                {icon}
            </div>
            <div className='flex flex-col items-center  text-center'>
                <p className='text-sm'>{title}</p>
                <p className={`font-bold text-3xl  ${isCurrency && ' text-success'}`}>{value}</p>
            </div>
        </CardTablero>
    )
}
