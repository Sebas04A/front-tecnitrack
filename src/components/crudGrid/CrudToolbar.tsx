import React from 'react'
import GenericButton from '../form/Controls/GenericButton'
import { FaPlus } from 'react-icons/fa'
import GenericTextInput from '../form/Controls/GenericTextInput'

interface CrudToolbarProps {
    onCreate?: () => void
    onSearch?: (value: string) => void
    searchPlaceholder?: string
    extra?: React.ReactNode
}

export const CrudToolbar: React.FC<CrudToolbarProps> = ({
    onCreate,
    onSearch,
    searchPlaceholder = 'Buscar...',
    extra,
}) => {
    return (
        <div className='flex flex-col sm:flex-row gap-3 sm:items-center justify-between mb-4'>
            <div className='flex flex-1 gap-2'>
                {onSearch && (
                    <GenericTextInput
                        name='search'
                        placeholder={searchPlaceholder}
                        onChange={e => onSearch(e.target.value)}
                        className='p-3 py-4'
                    />

                    // <input
                    //     type='text'
                    //     placeholder={searchPlaceholder}
                    //     className='w-full sm:max-w-xs px-3 py-2 rounded-lg bg-background-accent-auto border border-light text-sm focus:outline-none focus:ring-2 focus:ring-primary-auto'
                    //     onChange={e => onSearch(e.target.value)}
                    // />
                )}
            </div>
            <div className='flex gap-2'>
                {extra}
                {onCreate && (
                    <GenericButton
                        onClick={onCreate}
                        icon={<FaPlus className='inline ' />}
                        text='Nuevo'
                        type='button'
                        className='px-3 py-2'
                    />
                )}
            </div>
        </div>
    )
}

export default CrudToolbar
