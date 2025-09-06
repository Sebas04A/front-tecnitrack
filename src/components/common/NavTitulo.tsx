import React from 'react'
import { getTitleNavItems } from '../../router/ruta'
import { NavLink } from 'react-router-dom'

export default function NavTitulo() {
    const location = window.location.pathname.replace(/^\/+/, '') // Remover '/' inicial
    console.log('Ubicación actual en NavTitulo:', location)
    const navItems = getTitleNavItems()
    return (
        <div className='flex space-x-4 text-primary ml-auto'>
            {navItems.map(item => (
                <NavLink
                    key={item.href}
                    to={item.href}
                    className={` text-xl ${
                        location === item.href
                            ? 'text-primary-dark cursor-not-allowed'
                            : 'cursor-pointer hover:text-primary-dark hover:scale-110 transition-transform'
                    }`}
                >
                    {item.icon}
                </NavLink>
            ))}
        </div>
    )
}
