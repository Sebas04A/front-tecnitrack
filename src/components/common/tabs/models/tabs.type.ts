export type tabInfoType<T> = {
    key: T
    label: string
    icon: React.ReactNode
    // form: UseFormReturn<any>
}
export type tabsInfoType<T> = tabInfoType<T>[]
