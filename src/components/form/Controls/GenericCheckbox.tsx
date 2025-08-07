import { UseFormRegister } from 'react-hook-form'

type Props = {
    name: string
    label: string
    register?: UseFormRegister<any>
    error?: string
    isReadOnly?: boolean
}

export const GenericCheckbox = ({ name, label, register, error, isReadOnly }: Props) => {
    return (
        <div className='flex items-center justify-start gap-2 '>
            <input
                id={name}
                type='checkbox'
                {...(register ? register(name) : {})}
                className='h-5 w-5 rounded accent-primary'
                disabled={isReadOnly}
            />
            <label htmlFor={name} className='text-sm leading-5'>
                {label}
            </label>
            {error && <p className='text-red-500 text-sm ml-2'>{error}</p>}
        </div>
    )
}
