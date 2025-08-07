import GenericButton from '../form/Controls/GenericButton'

function Contrastes({ colorsKeys }: { colorsKeys: string[] }) {
    return (
        <div className='flex flex-wrap p-6 border-primary w-full border-2 rounded-lg shadow-md flex justify-center items-center'>
            <div className='m-6 border p-2 flex items-center justify-center'>
                {['primary', 'secondary', 'accent'].map(key => (
                    <span
                        key={key}
                        className={`text-${key} font-semibold m-4 border border-${key} p-2`}
                    >{`Texto ${key}`}</span>
                ))}
            </div>
            <div>
                <div className='bg-primary text-secondary p-2 m-4 rounded '>
                    Primary en secondary
                </div>
                <div className='bg-secondary text-primary p-2 m-4 rounded '>
                    Secondary en primary
                </div>
            </div>
            <div className='flex  items-center justify-center m-4'>
                <h3 className='text-lg font-semibold m-4'>Botones de ejemplo</h3>
                <div className='flex  justify-center items-center'>
                    {['accent', 'success', 'error', 'warning', 'info'].map(key => (
                        <GenericButton
                            type='button'
                            key={key}
                            className={`bg-${key}-auto m-4 p-2  `}
                            text={`${key.charAt(0).toUpperCase() + key.slice(1)} `}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}
function FondosYTextos({ colorsKeys }: { colorsKeys: string[] }) {
    return (
        <div className='flex flex-wrap p-6 border-primary w-full m-4 flex justify-center items-center'>
            {colorsKeys.map(key => (
                <div key={key} className='m-6 border  flex items-center justify-center'>
                    <div className={`bg-${key}-auto p-3 rounded `}>{`${key}`}</div>
                    <span className={`text-${key} font-semibold`}>{`Texto ${key}`}</span>
                </div>
            ))}
        </div>
    )
}

export default function PrevisualizacionContrastes({ colorsKeys }: { colorsKeys: string[] }) {
    return (
        <div className='p-6 bg-gray-50 mt-8'>
            <h2 className='text-2xl font-bold mb-4'>Ejemplos de Uso</h2>
            <div className='bg-background-auto p-6 rounded-lg shadow-md '>
                <Contrastes colorsKeys={colorsKeys} />
                <FondosYTextos colorsKeys={colorsKeys} />

                <div className='bg-background-accent-auto p-3 m-4 flex flex-wrap rounded-lg shadow-md'>
                    <Contrastes colorsKeys={colorsKeys} />

                    <FondosYTextos colorsKeys={colorsKeys} />
                </div>
            </div>
        </div>
    )
}
