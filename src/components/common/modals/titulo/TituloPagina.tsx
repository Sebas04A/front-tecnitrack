import React from 'react'
import NavTitulo from './components/NavTitulo'

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
        </div>
    )
}
