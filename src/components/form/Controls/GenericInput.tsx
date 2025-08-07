import { createElement } from 'react'
import { UseFormRegister } from 'react-hook-form'

export default function GenericInput({
    label,
    type = 'text',
    name,
    register,
    error,
    options,
    className,
    isReadOnly = false,
    required,
}: {
    label?: string
    type?: React.HTMLInputTypeAttribute | 'select'
    name: string
    register: UseFormRegister<any>
    error?: string
    options?: { value: string; label: string }[]
    className?: string
    isReadOnly?: boolean
    required?: boolean
}) {
    return (
        <div className={`flex-1 h-full min-w-[100px] mt-auto ${className}`}>
            {label && (
                <label className='block mb-2 text-xs sm:text-sm md:text-base ' htmlFor={name}>
                    {label}
                </label>
            )}
            {createElement(
                type === 'select' ? 'select' : 'input',
                {
                    ...register(name),
                    id: name,
                    type: type !== 'select' ? type : undefined,
                    placeholder: label ? `Ingresa tu ${label.toLowerCase()}` : undefined,
                    className: `w-full  px-3 py-2 sm:py-3 md:py-4 border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isReadOnly
                            ? 'bg-background-accent-auto cursor-not-allowed'
                            : 'bg-background-auto'
                    } ${error ? 'border-red-500' : 'border-gray-300'} ${
                        required ? 'required border-blue-500' : ''
                    } ${className}`,

                    // readOnly: isReadOnly,
                    disabled: isReadOnly,
                },
                type === 'select'
                    ? // Options should be passed as children or through props
                      options?.map(option => (
                          <option key={option.value} value={option.value}>
                              {option.label}
                          </option>
                      ))
                    : undefined
            )}
            <div className='h-[1.25rem]'>
                {error && <p className='text-error text-xs '>{error}</p>}
            </div>
        </div>
    )
}
