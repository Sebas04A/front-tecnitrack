import React, { useState, useEffect, useRef, useCallback } from 'react'
import { Controller, Control, FieldValues, Path } from 'react-hook-form'
import GenericInput from './GenericInput' // Asegúrate que la ruta sea correcta

// --- Tipos del Componente ---

type Option = {
    value: string | number
    label: string
    [key: string]: any // Para datos adicionales
}

export type FetchFunction = (query: string, signal?: AbortSignal) => Promise<Option[]>

// Usamos genéricos (<T>) para que el componente se adapte al tipo de tu formulario
type Props<T extends FieldValues> = {
    // Props de React Hook Form
    name: Path<T>
    control: Control<any>

    // Props de UI y Lógica
    label?: string
    placeholder?: string
    className?: string
    isReadOnly?: boolean
    required?: boolean
    mostrarEspacioError?: boolean
    fetchOptions?: FetchFunction
    staticOptions?: Option[]
    minSearchLength?: number
    debounceMs?: number
    noOptionsMessage?: string
    loadingMessage?: string
    defaultValue?: string | number
    maxDropdownHeight?: string
    showClearButton?: boolean
    onFocus?: () => void
    onBlur?: () => void
    onSearchChange?: (query: string) => void
    renderOption?: (option: Option, isHighlighted: boolean) => React.ReactNode
    renderNoOptions?: () => React.ReactNode
    renderLoading?: () => React.ReactNode
}

// --- Componente Principal ---

export default function GenericSelectSearch<T extends FieldValues>({
    // Props de RHF
    control,
    name,
    defaultValue,
    required,

    // El resto de las props
    label,
    placeholder,
    className = '',
    isReadOnly = false,
    mostrarEspacioError = true,
    fetchOptions,
    staticOptions = [],
    minSearchLength = 0,
    debounceMs = 300,
    noOptionsMessage = 'No hay opciones disponibles',
    loadingMessage = 'Buscando...',
    maxDropdownHeight = '200px',
    showClearButton = true,
    onFocus,
    onBlur,
    onSearchChange,
    renderOption,
    renderNoOptions,
    renderLoading,
}: Props<T>) {
    // --- Estados y Refs Internos ---
    const [isOpen, setIsOpen] = useState(false)
    const [searchQuery, setSearchQuery] = useState('')
    const [options, setOptions] = useState<Option[]>(staticOptions)
    const [loading, setLoading] = useState(false)
    const [highlightedIndex, setHighlightedIndex] = useState(-1)
    const dropdownRef = useRef<HTMLDivElement>(null)
    const debounceRef = useRef<NodeJS.Timeout>()
    const abortControllerRef = useRef<AbortController>()

    // --- Lógica del Componente ---

    const debouncedFetch = useCallback(
        (query: string) => {
            if (debounceRef.current) clearTimeout(debounceRef.current)
            debounceRef.current = setTimeout(async () => {
                if (!fetchOptions || query.length < minSearchLength) {
                    setOptions(staticOptions)
                    return
                }
                if (abortControllerRef.current) abortControllerRef.current.abort()
                abortControllerRef.current = new AbortController()
                setLoading(true)
                try {
                    const fetchedOptions = await fetchOptions(
                        query,
                        abortControllerRef.current.signal
                    )
                    const combinedOptions = [...staticOptions, ...fetchedOptions]
                    const uniqueOptions = Array.from(
                        new Map(combinedOptions.map(opt => [opt.value, opt])).values()
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

    // Efectos para manejar clicks fuera y limpieza de timeouts
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false)
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => document.removeEventListener('mousedown', handleClickOutside)
    }, [])

    useEffect(() => {
        return () => {
            if (debounceRef.current) clearTimeout(debounceRef.current)
            if (abortControllerRef.current) abortControllerRef.current.abort()
        }
    }, [])

    const computedPlaceholder =
        placeholder ?? (label ? `Buscar ${label.toLowerCase()}...` : 'Buscar...')

    // --- Integración con React Hook Form ---

    return (
        <Controller
            name={name}
            control={control}
            defaultValue={defaultValue as any}
            rules={{ required: required ? 'Este campo es requerido' : false }}
            render={({ field, fieldState }) => {
                const selectedOption = options.find(opt => opt.value === field.value)

                // Sincroniza el texto del input con el valor del formulario
                useEffect(() => {
                    setSearchQuery(selectedOption ? selectedOption.label : '')
                }, [selectedOption])

                // --- Manejadores de Eventos ---
                const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
                    const query = e.target.value
                    setSearchQuery(query)
                    onSearchChange?.(query)
                    if (query !== selectedOption?.label) {
                        field.onChange('') // Limpia el valor si el usuario escribe algo nuevo
                    }
                    if (!isOpen) setIsOpen(true)
                    debouncedFetch(query)
                }

                const handleSelectOption = (option: Option) => {
                    setIsOpen(false)
                    setHighlightedIndex(-1)
                    field.onChange(option.value) // Actualiza el formulario
                }

                const handleClear = () => {
                    setIsOpen(false)
                    field.onChange('') // Limpia el valor en el formulario
                }

                const handleKeyDown = (e: React.KeyboardEvent) => {
                    if (!isOpen) {
                        if (['ArrowDown', 'Enter'].includes(e.key)) setIsOpen(true)
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
                            break
                    }
                }

                const actionsButtons = (
                    <div className='absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center'>
                        {showClearButton && selectedOption && !isReadOnly && (
                            <button
                                type='button'
                                onClick={handleClear}
                                className='p-1'
                                aria-label='Limpiar'
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
                            className='p-1'
                            aria-label='Desplegar'
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
                )

                // --- JSX del Componente ---
                return (
                    <div
                        ref={dropdownRef}
                        className={`flex flex-col flex-1 min-w-[100px] relative ${className}`}
                    >
                        <GenericInput
                            name={name}
                            label={label}
                            type='text'
                            value={searchQuery}
                            onChange={handleSearchChange}
                            onKeyDown={handleKeyDown}
                            onFocus={() => {
                                setIsOpen(true)
                                onFocus?.()
                            }}
                            onBlur={() => {
                                field.onBlur()
                                onBlur?.()
                            }}
                            placeholder={computedPlaceholder}
                            required={required}
                            isReadOnly={isReadOnly}
                            error={fieldState.error?.message}
                            endContent={actionsButtons}
                            mostrarEspacioError={mostrarEspacioError}
                            autoComplete='off'
                        />

                        {isOpen && (
                            <div
                                className='absolute -bottom-1 z-50 w-full translate-y-1/2 bg-white border border-gray-300 rounded-lg shadow-lg'
                                style={{ maxHeight: maxDropdownHeight, overflowY: 'auto' }}
                            >
                                {loading ? (
                                    <div className='px-3 py-2 text-gray-500'>
                                        {' '}
                                        {loadingMessage}{' '}
                                    </div>
                                ) : options.length === 0 ? (
                                    <div className='px-3 py-2 text-gray-500'>
                                        {' '}
                                        {noOptionsMessage}{' '}
                                    </div>
                                ) : (
                                    options.map((option, index) => (
                                        <div
                                            key={`${option.value}-${index}`}
                                            role='option'
                                            aria-selected={selectedOption?.value === option.value}
                                            className={`px-3 py-2 cursor-pointer ${
                                                index === highlightedIndex ? 'bg-blue-100' : ''
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
                )
            }}
        />
    )
}
