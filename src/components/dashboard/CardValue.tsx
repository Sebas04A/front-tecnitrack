import CardTablero from './CardTablero'

export default function CardValue({
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
            <div className='flex flex-col items-center text-center gap-2'>
                <p className='text-xl font-bold'>{title}</p>
                <p className={` text-lg  ${isCurrency && ' text-success'}`}>{value}</p>
            </div>
        </CardTablero>
    )
}
