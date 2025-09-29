import { p } from 'framer-motion/client'
import { createElement } from 'react'
import { UseFormRegister } from 'react-hook-form'
type PropsBase = {
    label?: string
    placeholder?: string
    type?: React.HTMLInputTypeAttribute | 'select' | 'textarea'
    name: string
    register?: UseFormRegister<any>
    error?: string
    options?: { value: string; label: string }[]
    className?: string
    isReadOnly?: boolean
    required?: boolean
    // Permitir uso controlado/no controlado
    onChange?: React.ChangeEventHandler<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    value?: string | number | readonly string[]
    defaultValue?: string | number | readonly string[]
    rows?: number
    mostrarEspacioError?: boolean
    endContent?: React.ReactNode
}
type Props = Omit<React.ComponentProps<'input'>, keyof PropsBase> & PropsBase
export default function GenericInput({
    label,
    placeholder,
    type = 'text',
    name,
    register,
    error,
    options,
    className,
    isReadOnly = false,
    required,
    value,
    mostrarEspacioError,
    endContent,
    ...rest
}: Props) {
    // console.log(name, { mostrarEspacioError })

    const isSelect = type === 'select'
    const isTextarea = type === 'textarea'
    const Element = isSelect ? 'select' : isTextarea ? 'textarea' : 'input'

    const rhfProps = register && name ? register(name) : {}
    const computedPlaceholder = !isSelect
        ? placeholder ?? (label ? `Ingresa tu ${label.toLowerCase()}` : undefined)
        : undefined
    const disabled = isReadOnly

    return (
        <div
            className={`flex flex-col justify-end flex-1 h-full min-w-[100px] mt-auto ${className}`}
        >
            {label && (
                <label className='block mb-1 ms-1 text-xs sm:text-sm md:text-base ' htmlFor={name}>
                    {label} {required && <span className='text-red-500'>*</span>}
                </label>
            )}
            <div className='relative flex items-center w-full'>
                {createElement(
                    Element,
                    {
                        id: name,
                        ...rhfProps,
                        ...rest,
                        ...(isSelect || isTextarea ? {} : { type }),
                        placeholder: computedPlaceholder,
                        className: `w-full ${
                            isTextarea ? 'h-20' : 'h-[3rem]'
                        }  px-3 py-2 sm:py-2 md:py-3 border-2  rounded-lg focus:outline-none focus:ring-2 focus:ring-primary ${
                            isReadOnly
                                ? 'bg-background-accent-auto cursor-not-allowed border-text-muted '
                                : 'bg-background-auto  border-gray-300'
                        } ${error ? 'border-red-500' : 'border-gray-300'} ${
                            required ? 'required border-error' : ''
                        } ${className}`,
                        value,
                        disabled,
                        'aria-invalid': !!error || undefined,
                        'aria-describedby': error ? `${name}-error` : undefined,
                        // ref,
                        // required,
                        name, // útil cuando NO usamos RHF
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
                {endContent && <div className='absolute right-3'>{endContent}</div>}
            </div>
            {(mostrarEspacioError || (register && !isReadOnly)) && (
                <div className='h-[1.25rem]'>
                    {error && <p className='text-error text-xs '>{error}</p>}
                </div>
            )}
        </div>
    )
}
