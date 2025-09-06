// src/components/LocationSelector.tsx
import React from 'react'

// Define los tipos de localidades para mayor seguridad
type LocationType = 'paises' | 'provincias' | 'ciudades'

interface LocationSelectorProps {
    value: LocationType
    onChange: (value: LocationType) => void
}

const LocationSelector: React.FC<LocationSelectorProps> = ({ value, onChange }) => {
    const options = [
        { label: 'Países', value: 'paises' as LocationType },
        { label: 'Provincias', value: 'provincias' as LocationType },
        { label: 'Ciudades', value: 'ciudades' as LocationType },
    ]

    return (
        <div className='flex flex-col sm:flex-row items-center justify-center p-2 rounded-lg  space-y-2 sm:space-y-0 sm:space-x-2 border'>
            {options.map(option => (
                <button
                    key={option.value}
                    onClick={() => onChange(option.value)}
                    className={`
                        py-2 px-4 rounded-md transition-colors duration-200 ease-in-out
                        font-medium text-lg
                        ${
                            value === option.value
                                ? 'bg-primary-auto shadow-md hover:bg-primary-light'
                                : 'bg-background-accent-auto hover:bg-background dark:hover:bg-gray-700'
                        }
                    `}
                >
                    {option.label}
                </button>
            ))}
        </div>
    )
}

export default LocationSelector
