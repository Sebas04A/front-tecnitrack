import { UseFormReturn } from 'react-hook-form'

export type TabKeyType = 'personal' | 'direccion' | 'contacto'
export type tabInfoType = {
    key: TabKeyType
    label: string
    icon: React.ReactNode
    form: UseFormReturn<any>
}
export type tabsInfoType = tabInfoType[]
