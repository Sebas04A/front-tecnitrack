import GenericButton from '../form/Controls/GenericButton'
import GenericCheckbox from '../form/Controls/GenericCheckbox'
import GenericLink from '../form/Controls/GenericLink'
function CardComponentReutilizable({
    text,
    children,
}: {
    text: string
    children: React.ReactNode
}) {
    return (
        <div className='p-6 my-4 bg-white  shadow-md hover:shadow-lg transition-shadow duration-300'>
            <h3 className='text-lg font-semibold mb-2'>{text}</h3>
            {children}
        </div>
    )
}
export default function PrevisualizacionReutilizables({ colorsKeys }: { colorsKeys: string[] }) {
    return (
        <div className='p-6 bg-gray-50 mt-8'>
            <h2 className='text-2xl font-bold m-4'>Componentes Reutilizables</h2>
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
                {colorsKeys.map(key => (
                    <div key={key} className='border border-gray-300 rounded-lg p-4 bg-white'>
                        <CardComponentReutilizable text={'Generic Button'}>
                            <GenericButton
                                type='button'
                                text='Botón Genérico'
                                className={`bg-${key}-auto text-white`}
                            />
                        </CardComponentReutilizable>
                        <CardComponentReutilizable text={'Generic Checkbox'}>
                            <GenericCheckbox
                                // className={`text-${key} hover:text-${key}-dark`}
                                label={`Checkbox ${key}`}
                                name={`checkbox-${key}`}
                                // register={register}
                            />
                        </CardComponentReutilizable>
                        <CardComponentReutilizable text={'Generic Link'}>
                            <GenericLink
                                to='#'
                                text='Enlace Genérico'
                                className={`text-${key} hover:text-${key}-dark`}
                            />
                        </CardComponentReutilizable>
                        <CardComponentReutilizable text={'Generic Input'}>
                            <input
                                type='text'
                                placeholder={`Input ${key}`}
                                className={`w-full p-2 border-2 border-${key} rounded text-${key} placeholder-${key}-light`}
                            />
                        </CardComponentReutilizable>
                    </div>
                ))}
            </div>
        </div>
    )
}
