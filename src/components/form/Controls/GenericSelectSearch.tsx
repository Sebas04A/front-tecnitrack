import React, { useState, useEffect, useRef, useCallback } from 'react'
import { UseFormRegister, UseFormSetValue, UseFormGetValues } from 'react-hook-form'

type Option = {
    value: string | number
    label: string
    [key: string]: any // Para datos adicionales
}

type FetchFunction = (query: string, signal?: AbortSignal) => Promise<Option[]>

type Props = {
    label?: string
    placeholder?: string
    name: string
    register?: UseFormRegister<any>
    setValue?: UseFormSetValue<any>
    getValues?: UseFormGetValues<any>
    error?: string
    className?: string
    isReadOnly?: boolean
    required?: boolean

    // Función para hacer fetch
    fetchOptions?: FetchFunction

    // Opciones estáticas (se pueden combinar con fetch)
    staticOptions?: Option[]

    // Configuración de búsqueda
    minSearchLength?: number // Mínimo de caracteres para buscar
    debounceMs?: number // Tiempo de debounce
    noOptionsMessage?: string
    loadingMessage?: string

    // Props controladas/no controladas
    value?: string | number
    onChange?: (value: string | number, option?: Option) => void
    defaultValue?: string | number

    // Configuración visual
    maxDropdownHeight?: string
    showClearButton?: boolean

    // Callbacks
    onFocus?: () => void
    onBlur?: () => void
    onSearchChange?: (query: string) => void

    // Personalización de renderizado
    renderOption?: (option: Option, isHighlighted: boolean) => React.ReactNode
    renderNoOptions?: () => React.ReactNode
    renderLoading?: () => React.ReactNode

    // Accesibilidad
    'aria-label'?: string
    'aria-describedby'?: string
}

export default function GenericSelectSearch({
    label,
    placeholder,
    name,
    register,
    setValue,
    getValues,
    error,
    className = '',
    isReadOnly = false,
    required = false,
    fetchOptions,
    staticOptions = [],
    minSearchLength = 0,
    debounceMs = 300,
    noOptionsMessage = 'No hay opciones disponibles',
    loadingMessage = 'Buscando...',
    value,
    onChange,
    defaultValue,
    maxDropdownHeight = '200px',
    showClearButton = true,
    onFocus,
    onBlur,
    onSearchChange,
    renderOption,
    renderNoOptions,
    renderLoading,
    'aria-label': ariaLabel,
    'aria-describedby': ariaDescribedBy,
}: Props) {
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [options, setOptions] = useState<Option[]>(staticOptions)
    const [loading, setLoading] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const [selectedOption, setSelectedOption] = useState<Option | null>(null)

    const inputRef = useRef<HTMLInputElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const debounceRef = useRef<any>()
    const abortControllerRef = useRef<AbortController>()

    // Determinar el valor actual
    const currentValue =
        value ?? (register && getValues ? getValues(name) : undefined) ?? defaultValue ?? ''

    // Inicializar con el valor por defecto
    useEffect(() => {
        if (currentValue && options.length > 0) {
            const foundOption = options.find(opt => opt.value === currentValue)
            if (foundOption) {
                setSelectedOption(foundOption)
                setSearchQuery(foundOption.label)
            }
        }
    }, [currentValue, options])

    // Función para hacer fetch con debounce
    const debouncedFetch = useCallback(
        (query: string) => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current)
            }

            debounceRef.current = setTimeout(async () => {
                if (!fetchOptions || query.length < minSearchLength) {
                    setOptions(staticOptions)
                    return
                }

                // Cancelar request anterior
                if (abortControllerRef.current) {
                    abortControllerRef.current.abort()
                }

                abortControllerRef.current = new AbortController()
                setLoading(true)

                try {
                    const fetchedOptions = await fetchOptions(
                        query,
                        abortControllerRef.current.signal
                    )

                    // Combinar opciones estáticas y fetched
                    const combinedOptions = [...staticOptions, ...fetchedOptions]

                    // Eliminar duplicados basado en value
                    const uniqueOptions = combinedOptions.filter(
                        (option, index, self) =>
                            index === self.findIndex(opt => opt.value === option.value)
                    )

                    setOptions(uniqueOptions)
                } catch (err) {
                    if (err instanceof Error && err.name !== 'AbortError') {
                        console.error('Error fetching options:', err)
                        setOptions(staticOptions)
                    }
                } finally {
                    setLoading(false)
                }
            }, debounceMs)
        },
        [fetchOptions, minSearchLength, staticOptions, debounceMs]
    )

    // Manejar cambios en el input de búsqueda
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const query = e.target.value
        setSearchQuery(query)
        setSelectedOption(null)
        onSearchChange?.(query)

        if (!isOpen) setIsOpen(true)

        debouncedFetch(query)
    }

    // Manejar selección de opción
    const handleSelectOption = (option: Option) => {
        setSelectedOption(option)
        setSearchQuery(option.label)
        setIsOpen(false)
        setHighlightedIndex(-1)

        // Actualizar valor
        if (register && setValue) {
            setValue(name, option.value, { shouldValidate: true })
        }

        onChange?.(option.value, option)
    }

    // Limpiar selección
    const handleClear = () => {
        setSelectedOption(null)
        setSearchQuery('')
        setIsOpen(false)

        if (register && setValue) {
            setValue(name, '', { shouldValidate: true })
        }

        onChange?.('', undefined)
        inputRef.current?.focus()
    }

    // Manejar teclas
    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (!isOpen) {
            if (e.key === 'ArrowDown' || e.key === 'Enter') {
                setIsOpen(true)
                e.preventDefault()
            }
            return
        }

        switch (e.key) {
            case 'ArrowDown':
                e.preventDefault()
                setHighlightedIndex(prev => (prev < options.length - 1 ? prev + 1 : 0))
                break
            case 'ArrowUp':
                e.preventDefault()
                setHighlightedIndex(prev => (prev > 0 ? prev - 1 : options.length - 1))
                break
            case 'Enter':
                e.preventDefault()
                if (highlightedIndex >= 0 && options[highlightedIndex]) {
                    handleSelectOption(options[highlightedIndex])
                }
                break
            case 'Escape':
                setIsOpen(false)
                setHighlightedIndex(-1)
                inputRef.current?.blur()
                break
        }
    }

    // Manejar clicks fuera del componente
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node) &&
                !inputRef.current?.contains(event.target as Node)
            ) {
                setIsOpen(false)
                setHighlightedIndex(-1)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    // Cleanup
    useEffect(() => {
        return () => {
            if (debounceRef.current) {
                clearTimeout(debounceRef.current)
            }
            if (abortControllerRef.current) {
                abortControllerRef.current.abort()
            }
        }
    }, [])

    const computedPlaceholder =
        placeholder ?? (label ? `Buscar ${label.toLowerCase()}...` : 'Buscar...')

    return (
        <div
            className={`flex flex-col justify-end flex-1 h-full min-w-[100px] mt-auto relative ${className}`}
        >
            {label && (
                <label className='block mb-1 ms-1 text-xs sm:text-sm md:text-base' htmlFor={name}>
                    {label} {required && <span className='text-red-500'>*</span>}
                </label>
            )}

            <div className='relative'>
                <input
                    ref={inputRef}
                    id={name}
                    type='text'
                    value={searchQuery}
                    onChange={handleSearchChange}
                    onKeyDown={handleKeyDown}
                    onFocus={() => {
                        setIsOpen(true)
                        onFocus?.()
                    }}
                    onBlur={onBlur}
                    placeholder={computedPlaceholder}
                    disabled={isReadOnly}
                    required={required}
                    aria-label={ariaLabel}
                    aria-describedby={ariaDescribedBy || (error ? `${name}-error` : undefined)}
                    aria-expanded={isOpen}
                    aria-autocomplete='list'
                    aria-activedescendant={
                        highlightedIndex >= 0 ? `${name}-option-${highlightedIndex}` : undefined
                    }
                    className={`w-full h-[3rem] px-3 py-2 pr-10 sm:py-2 md:py-3 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isReadOnly
                            ? 'bg-background-accent-auto cursor-not-allowed border-text-muted'
                            : 'bg-background-auto border-gray-300'
                    } ${error ? 'border-red-500' : 'border-gray-300'} ${
                        required ? 'required border-blue-500' : ''
                    }`}
                />

                {/* Botones de acción */}
                <div className='absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1'>
                    {showClearButton && selectedOption && !isReadOnly && (
                        <button
                            type='button'
                            onClick={handleClear}
                            className='p-1 hover:bg-gray-100 rounded'
                            aria-label='Limpiar selección'
                        >
                            <svg
                                className='w-4 h-4 text-gray-400'
                                fill='none'
                                stroke='currentColor'
                                viewBox='0 0 24 24'
                            >
                                <path
                                    strokeLinecap='round'
                                    strokeLinejoin='round'
                                    strokeWidth={2}
                                    d='M6 18L18 6M6 6l12 12'
                                />
                            </svg>
                        </button>
                    )}

                    <button
                        type='button'
                        onClick={() => setIsOpen(!isOpen)}
                        className='p-1 hover:bg-gray-100 rounded'
                        aria-label={isOpen ? 'Cerrar lista' : 'Abrir lista'}
                        disabled={isReadOnly}
                    >
                        <svg
                            className={`w-4 h-4 text-gray-400 transition-transform ${
                                isOpen ? 'rotate-180' : ''
                            }`}
                            fill='none'
                            stroke='currentColor'
                            viewBox='0 0 24 24'
                        >
                            <path
                                strokeLinecap='round'
                                strokeLinejoin='round'
                                strokeWidth={2}
                                d='M19 9l-7 7-7-7'
                            />
                        </svg>
                    </button>
                </div>

                {/* Dropdown */}
                {isOpen && (
                    <div
                        ref={dropdownRef}
                        className='absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg'
                        style={{ maxHeight: maxDropdownHeight, overflowY: 'auto' }}
                        role='listbox'
                        aria-labelledby={name}
                    >
                        {loading ? (
                            <div className='px-3 py-2 text-gray-500'>
                                {renderLoading ? renderLoading() : loadingMessage}
                            </div>
                        ) : options.length === 0 ? (
                            <div className='px-3 py-2 text-gray-500'>
                                {renderNoOptions ? renderNoOptions() : noOptionsMessage}
                            </div>
                        ) : (
                            options.map((option, index) => (
                                <div
                                    key={`${option.value}-${index}`}
                                    id={`${name}-option-${index}`}
                                    role='option'
                                    aria-selected={selectedOption?.value === option.value}
                                    className={`px-3 py-2 cursor-pointer transition-colors ${
                                        index === highlightedIndex
                                            ? 'bg-blue-100 text-blue-900'
                                            : selectedOption?.value === option.value
                                            ? 'bg-blue-50 text-blue-800'
                                            : 'text-gray-900 hover:bg-gray-100'
                                    }`}
                                    onClick={() => handleSelectOption(option)}
                                    onMouseEnter={() => setHighlightedIndex(index)}
                                >
                                    {renderOption
                                        ? renderOption(option, index === highlightedIndex)
                                        : option.label}
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>

            {/* Campo oculto para React Hook Form */}
            {register && (
                <input type='hidden' {...register(name)} value={selectedOption?.value ?? ''} />
            )}

            {/* Error */}
            {error && (
                <div className='h-[1.25rem]'>
                    <p className='text-error text-xs'>{error}</p>
                </div>
            )}
        </div>
    )
}
