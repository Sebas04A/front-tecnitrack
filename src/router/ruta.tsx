import { FaBoxesStacked, FaGear, FaLocationDot, FaTruckField, FaUserGear } from 'react-icons/fa6'
import { NavItem, navItemsType } from '../types/nav'
import {
    FaAddressCard,
    FaFileInvoice,
    FaFileInvoiceDollar,
    FaRegCalendarAlt,
    FaTachometerAlt,
    FaTools,
    FaUserCircle,
    FaUserTie,
} from 'react-icons/fa'
export const navItemsMain: navItemsType = [
    {
        type: 'link',
        name: 'Tablero',
        href: '/tablero',
        icon: <FaTachometerAlt className='inline' />,
    },
    {
        type: 'link',
        name: 'Perfil de usuario',
        href: '/usuario',
        icon: <FaUserCircle className='inline' />,
    },
    {
        type: 'link',
        name: 'Mantenimientos',
        href: '/mantenimientos',
        icon: <FaTools className='inline' />,
    },
]
export const navItemsInterno: navItemsType = [
    {
        type: 'link',
        name: 'Clientes',
        href: '/interno/clientes',
        icon: <FaUserTie className='inline' />,
    },
    {
        type: 'link',
        name: 'Citas',
        href: '/interno/citas',
        icon: <FaRegCalendarAlt className='inline' />,
    },
    {
        type: 'link',
        name: 'Mantenimientos',
        href: 'mantenimientos',
        icon: <FaTools className='inline' />,
    },
    {
        type: 'link',
        name: 'Tecnicos',
        href: 'tecnicos',
        icon: <FaUserGear />,
    },
    {
        type: 'link',
        name: 'Inventario',
        href: 'inventario',
        icon: <FaBoxesStacked />,
    },
    {
        type: 'link',
        name: 'Proveedores',
        href: '/interno/proveedores',
        icon: <FaTruckField />,
    },
    {
        type: 'link',
        name: 'Facturacion',
        href: '/interno/facturacion',
        icon: <FaFileInvoiceDollar />,
    },
    {
        type: 'group',
        name: 'Configuracion',
        icon: <FaGear />,
        children: [
            {
                type: 'group',
                name: 'Catalogos',
                // href: '/interno/configuracion/catalogos',
                icon: <FaFileInvoice />,
                children: [
                    {
                        type: 'link',
                        name: 'Catalogos Generales',
                        href: '/interno/configuracion/catalogos/generales',
                        icon: <FaFileInvoice />,
                    },
                    {
                        type: 'link',
                        name: 'Localidades',
                        href: '/interno/configuracion/catalogos/localidades',
                        icon: <FaLocationDot />,
                    },
                ],
            },
            {
                type: 'link',
                name: 'Usuarios',
                href: '/interno/usuarios',
                icon: <FaAddressCard />,
            },
        ],
    },
]

function getChildrenPaths(item: NavItem): NavItem[] {
    if (item.type === 'link') return [item]
    return item.children.flatMap(getChildrenPaths)
}

export function getNavItem(path: string) {
    console.log('Buscando nav item para path:', path)
    // path = path.startsWith('/') ? path.slice(1) : path // Remover '/' inicial si existe
    const navItems = [...navItemsMain, ...navItemsInterno]
    const flat = navItems.flatMap(getChildrenPaths)
    console.log('Nav items originales:', navItems)
    console.log('Nav items planos:', flat)
    return flat.find(item => {
        if (item.type === 'link') {
            console.log(`Comparando ${item.href} con ${path}`)
            return item.href === path
        }
    })
}
export function getTitleNavItems() {
    const esInterno = window.location.pathname.startsWith('/interno')
    const navItems = esInterno ? navItemsInterno : navItemsMain
    return navItems.filter(item => item.type === 'link')
}
