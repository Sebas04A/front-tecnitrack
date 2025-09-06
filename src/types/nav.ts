import React from 'react'

type BaseItem = {
    id?: string // opcional pero recomendado para claves estables
    name: string
    title?: string
    icon?: React.ReactNode
}

export type NavLinkItem = BaseItem & {
    type: 'link'
    href: string
}

export type NavGroupItem = BaseItem & {
    type: 'group'
    children: NavItem[] // <— recursivo: un grupo puede contener links y más grupos
}

export type NavItem = NavLinkItem | NavGroupItem
export type navItemsType = NavItem[]
