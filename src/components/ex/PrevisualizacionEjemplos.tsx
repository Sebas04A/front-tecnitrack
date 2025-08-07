export default function PrevisualizacionEjemplos({ colorsKeys }: { colorsKeys: string[] }) {
    return (
        <div className='p-6 bg-gray-50'>
            <h1 className='text-3xl font-bold mb-6'>Previsualización Ejemplos</h1>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {colorsKeys.map(key => (
                    <div key={key} className='border border-gray-300 rounded-lg p-4 bg-white'>
                        {/* Título con color de texto */}
                        <h3 className={`text-${key} font-semibold text-xl mb-3`}>{key}</h3>

                        {/* Botón con fondo y texto automático */}
                        <button className={`px-4 py-2 rounded mb-3 bg-${key} bg-${key}-auto`}>
                            Botón
                        </button>

                        {/* Enlace con color de texto */}
                        <p className='mb-3'>
                            <a href='#' className={`text-${key} hover:underline`}>
                                Enlace de ejemplo
                            </a>
                        </p>

                        {/* Input con borde y texto en color */}
                        <input
                            type='text'
                            placeholder='Campo de texto'
                            className={`w-full p-2 mb-3 border-2 border-${key} rounded text-${key} placeholder-${key}-light`}
                        />

                        {/* Caja de muestra de color */}
                        <div className={`h-10 rounded mb-3 bg-${key}`}></div>

                        {/* Párrafo de texto con color */}
                        <p className={`text-${key}`}>
                            Este es un texto de ejemplo con la clase text-{key}.
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
