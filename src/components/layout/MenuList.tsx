import { NavLink } from 'react-router-dom'
import { navItemsType } from '../../types/nav'
import clsx from 'clsx'
import { FaChevronDown, FaChevronRight } from 'react-icons/fa'
import { keyFor, slug } from './SideBar'

export default function MenuList({
    items,
    level = 0,
    path = [],
    open,
    setOpen,
}: {
    items: navItemsType
    level?: number
    path?: string[]
    open: Record<string, boolean>
    setOpen: React.Dispatch<React.SetStateAction<Record<string, boolean>>>
}) {
    const baseItem = 'flex items-center justify-start rounded-lg p-4 transition-colors duration-200'
    const linkItem = 'py-2 px-4 text-[15px] md:text-[16px]'
    const hover = 'hover:bg-secondary-light'
    const active = 'bg-secondary-light-auto font-medium'
    const nameTextCls = 'truncate' // evita overflow horizontal

    const toggle = (key: string) => setOpen(p => ({ ...p, [key]: !p[key] }))
    return (
        <ul
            className={
                level === 0
                    ? 'space-y-1 mt-6 '
                    : 'mt-1 ml-2 border-l border-secondary/30 pl-2 space-y-1'
            }
        >
            {items.map(item => {
                const key = keyFor(item, path)
                // const paddingLeft = Math.min(level * 8, 32) // indent visual

                if (item.type === 'link') {
                    return (
                        <li key={key}>
                            <NavLink
                                to={item.href}
                                // style={{ paddingLeft }}
                                className={({ isActive }) =>
                                    clsx(baseItem, linkItem, isActive ? active : hover)
                                }
                            >
                                {item.icon && (
                                    <span className='mr-3 text-xl shrink-0'>{item.icon}</span>
                                )}
                                <span className={nameTextCls}>{item.name}</span>
                            </NavLink>
                        </li>
                    )
                }

                const isOpen = !!open[key]
                return (
                    <li key={key}>
                        <button
                            type='button'
                            onClick={() => toggle(key)}
                            aria-expanded={isOpen}
                            aria-controls={`sect-${key}`}
                            className={clsx(baseItem, linkItem, hover, 'w-full text-left')}
                            // style={{ paddingLeft }}
                        >
                            <span className='grid h-7 w-7 place-items-center rounded-lg border bg-primary-dark mr-2'>
                                {item.icon}
                            </span>
                            <span className={clsx('flex-1 font-bold', nameTextCls)}>
                                {item.name}
                            </span>
                            {isOpen ? <FaChevronDown /> : <FaChevronRight />}
                        </button>

                        <div
                            id={`sect-${key}`}
                            className={clsx(
                                'overflow-hidden transition-[max-height,opacity] duration-200 ease-out',
                                isOpen ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'
                            )}
                        >
                            <MenuList
                                items={item.children}
                                level={level + 1}
                                path={[...path, item.id ?? slug(item.name)]}
                                open={open}
                                setOpen={setOpen}
                            />
                        </div>
                    </li>
                )
            })}
        </ul>
    )
}
