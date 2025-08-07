    export default function Colores({
    colorsKeys,
    colors,
}: {
    colorsKeys: string[]
    colors: Record<string, { value: string; defined?: boolean }>
}) {
    return (
        <section>
            <h2 className='text-2xl font-bold mb-4'>Colores</h2>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6'>
                {colorsKeys.map(key => {
                    const info = colors[key]
                    const baseClass = info?.defined ? `bg-${key}-auto` : ''

                    return (
                        <div
                            key={key}
                            className={`p-4 rounded-lg shadow flex flex-col items-center justify-center transform hover:scale-105 transition-transform ${
                                info?.defined
                                    ? 'border border-gray-200'
                                    : 'border-2 border-red-500 bg-gray-50'
                            }`}
                        >
                            <div
                                className={`p-4  mb-2 rounded flex justify-center items-center ${baseClass}`}
                            >
                                {info?.defined ? info.value : 'No definido'}
                            </div>
                            <span className='text-sm font-mono break-all mt-2'>
                                {' '}
                                {info?.defined ? `bg-${key}-auto` : `bg-${key}`}
                            </span>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}
