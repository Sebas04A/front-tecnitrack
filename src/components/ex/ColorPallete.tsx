import { useEffect, useState } from 'react'

import Colores from './Colores'
import EjemplosReutilizables from './PrevisualizacionEjemplos'
import PrevisualizacionEjemplos from './PrevisualizacionEjemplos'
import PrevisualizacionReutilizables from './PrevisualizacionReutilizables'
import PrevisualizacionContrastes from './PrevisualizacionContrastes'

type ColorInfo = {
    key: string
    value: string
    defined: boolean
}
const colorsKeys = [
    'primary',
    'primary-light',
    'primary-dark',
    'secondary',
    'secondary-light',
    'secondary-dark',
    'accent',
    'background',
    'background-accent',
    'muted',
    'success',
    'error',
    'warning',
    'info',
]

export default function ColorPalette() {
    const [colors, setColors] = useState<Record<string, ColorInfo>>({})

    useEffect(() => {
        const rootStyles = getComputedStyle(document.documentElement)
        const map: Record<string, ColorInfo> = {}

        colorsKeys.forEach(key => {
            if (!map[key]) {
                const val = rootStyles.getPropertyValue(`--color-${key}`).trim()
                map[key] = { key, value: val, defined: !!val }
            }
        })

        setColors(map)
    }, [])

    return (
        <div className='p-8 space-y-12'>
            <Colores colorsKeys={colorsKeys} colors={colors} />
            <PrevisualizacionEjemplos colorsKeys={colorsKeys} />
            <PrevisualizacionReutilizables colorsKeys={colorsKeys} />
            <PrevisualizacionContrastes colorsKeys={colorsKeys} />
        </div>
    )
}
