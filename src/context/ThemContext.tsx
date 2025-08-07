// src/context/ThemeContext.tsx
import { createContext, useContext, useEffect, ReactNode } from 'react'
import { defaultTheme } from '../themes/default'
import type { ThemeColors } from '../themes/types'

type ThemeContextValue = {
    theme: ThemeColors
}

const ThemeContext = createContext<ThemeContextValue>({ theme: defaultTheme })

interface ThemeProviderProps {
    theme?: ThemeColors
    children: ReactNode
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
    theme = defaultTheme,
    children,
}: ThemeProviderProps) => {
    // Selecciona el tema; si no existe, usa default

    useEffect(() => {
        // Itera TODAS las propiedades de theme y las inyecta como variable CSS
        Object.entries(theme).forEach(([key, value]) => {
            // Mejor conversión camelCase a kebab-case
            const kebab = key
                .replace(/([a-z])([A-Z])/g, '$1-$2')
                .replace(/([A-Z])([A-Z][a-z])/g, '$1-$2')
                .toLowerCase()
            // console.log(`Setting CSS variable --color-${kebab} to ${value}`)
            document.documentElement.style.setProperty(`--color-${kebab}`, value)
        })
    }, [theme])

    return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>
}

export const useTheme = () => useContext(ThemeContext)
