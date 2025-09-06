import React from 'react'
import NavTitulo from './NavTitulo'

export default function TituloPagina({ titulo, icon }: { titulo: string; icon?: React.ReactNode }) {
    console.log('Renderizando TituloPagina con titulo:', titulo, 'y icono:', icon)
    return (
        <div className='flex justify-start items-center bg-background-accent px-4 py-6 rounded-lg shadow-md  mb-4 px-6'>
            {/* Título */}
            {icon && <div className='text-primary text-2xl'>{icon}</div>}
            <h2 className='text-3xl font-bold text-primary ml-4'>{titulo}</h2>
            {/* Icono */}
            <div className='ml-auto mr-2 text-xl'>
                <NavTitulo />
            </div>

            {/* Barra de íconos */}
            {/* <div className='flex space-x-4 text-gray-600'>
                {actions.map((action, index) => (
                    <a
                        key={index}
                        href={action.href}
                        title={action.name}
                        className='hover:text-blue-700 transition'
                    >
                        <FontAwesomeIcon icon={action.icon} size='lg' />
                    </a>
                ))}
            </div> */}
        </div>
    )
}
