// components/layout/Sidebar.tsx
import { useEffect, useMemo, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { FaSignOutAlt, FaChevronDown, FaChevronRight, FaTimes } from 'react-icons/fa'
import { navItemsType, NavItem } from '../../types/nav'
import { useAuth } from '../../hooks/useAuth'
import clsx from 'clsx'
import MenuList from './MenuList'

export const slug = (s: string) =>
    s
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^a-z0-9-]/g, '')

export const keyFor = (item: { id?: string; name: string }, path: string[]) =>
    [...path, item.id ?? slug(item.name)].join('/')

function hasActive(item: NavItem, pathname: string): boolean {
    if (item.type === 'link') return item.href === pathname
    return item.children.some(ch => hasActive(ch, pathname))
}

function collectOpenKeys(items: NavItem[], pathname: string, path: string[] = []) {
    const acc: Record<string, boolean> = {}
    for (const it of items) {
        if (it.type === 'group') {
            const k = keyFor(it, path)
            if (hasActive(it, pathname)) acc[k] = true
            Object.assign(
                acc,
                collectOpenKeys(it.children, pathname, [...path, it.id ?? slug(it.name)])
            )
        }
    }
    return acc
}

type SidebarProps = {
    navItems: navItemsType
    mobileOpen: boolean
    onClose: () => void
    pathname: string
}

export default function Sidebar({ navItems, mobileOpen, onClose, pathname }: SidebarProps) {
    const { logout } = useAuth()
    const [open, setOpen] = useState<Record<string, boolean>>({})

    // Abre ancestros del link activo
    const autoOpen = useMemo(() => collectOpenKeys(navItems, pathname), [navItems, pathname])
    useEffect(() => setOpen(prev => ({ ...prev, ...autoOpen })), [autoOpen])

    // Bloquear scroll del body al abrir el drawer móvil
    useEffect(() => {
        if (mobileOpen) {
            const prev = document.body.style.overflow
            document.body.style.overflow = 'hidden'
            return () => {
                document.body.style.overflow = prev
            }
        }
    }, [mobileOpen])

    return (
        <>
            {/* Overlay para móviles */}
            <div
                className={clsx(
                    'fixed inset-0 bg-black/60 z-40 sm:hidden transition-opacity',
                    mobileOpen
                        ? 'opacity-100 pointer-events-auto'
                        : 'opacity-0 hidden pointer-events-none'
                )}
                onClick={onClose}
                aria-hidden={!mobileOpen}
            />

            {/* Sidebar */}
            <aside
                className={clsx(
                    // posición fija y ancho
                    'absolute sm:sticky inset-y-0 left-0 w-[15rem] z-50',
                    // alto seguro móvil (evita “se sale” por las barras del navegador)
                    'h-[100dvh] md:h-screen',
                    // evita desbordes laterales
                    'overflow-hidden',
                    // fondo
                    'bg-primary-auto',
                    // transiciones para drawer móvil
                    'transform transition-transform duration-200',
                    mobileOpen ? 'translate-x-0' : '-translate-x-full ',
                    // mobileOpen ? 'translate-x-0 hidden' : '-translate-x-full',
                    'sm:translate-x-0'
                )}
                role='navigation'
                aria-label='Sidebar'
            >
                {/* Contenedor flex para lograr scroll en el centro */}
                <div className='flex h-full flex-col'>
                    {/* Header / Logo (sticky visual) */}
                    <div
                        className='shrink-0 p-4 bg-background-accent border-r-4 border-primary flex items-center justify-center'
                        style={{ paddingTop: 'env(safe-area-inset-top)' }}
                    >
                        <div
                            className='flex items-center gap-3 cursor-pointer'
                            onClick={() => (window.location.href = '/')}
                        >
                            <img src='/icono.png' alt='Logo' className='size-24' />
                            {/* <span className='text-2xl font-bold'>TecniTrak</span> */}
                        </div>
                        {/* Cerrar en móvil */}
                        <button
                            className='sm:hidden p-2 rounded hover:bg-secondary-light'
                            onClick={onClose}
                            aria-label='Cerrar menú'
                        >
                            <FaTimes />
                        </button>
                    </div>

                    {/* Área scrollable */}
                    <nav className='min-h-0 flex-1 overflow-y-auto px-4 py-2'>
                        <MenuList items={navItems} open={open} setOpen={setOpen} />
                    </nav>

                    {/* Footer / Logout (sticky abajo) */}
                    <div
                        className='shrink-0 p-4 '
                        // style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
                    >
                        <button
                            className='w-full text-lg py-2 px-4 rounded-lg hover:bg-secondary bg-secondary-light-auto transition-colors duration-200 flex justify-center items-center'
                            onClick={async () => {
                                await logout()
                                window.location.reload()
                            }}
                        >
                            <span className='inline-block mr-2'>
                                <FaSignOutAlt />
                            </span>
                            Cerrar sesión
                        </button>
                    </div>
                </div>
            </aside>
        </>
    )
}
