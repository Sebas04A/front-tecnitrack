export const TIPO_PERSONA = {
    NATURAL: 'Natural',
    EMPRESA: 'Empresa',
} as const

export type TIPO_PERSONA_TYPE = (typeof TIPO_PERSONA)[keyof typeof TIPO_PERSONA]
