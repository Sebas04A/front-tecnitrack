import { ClientesNaturalResponse } from '../../../api'
import { parseFecha } from '../../../utils/parseFecha'
import { PerfilPersonaNaturalData } from '../../../validation/perfil.schema'

export const parseAdapterPerfilNatural = (
    api: ClientesNaturalResponse
): PerfilPersonaNaturalData => {
    const allowedGeneros = new Set([
        '',
        'Masculino',
        'Femenino',
        'No binario',
        'Prefiero no decirlo',
    ])
    const genero =
        api.genero && allowedGeneros.has(api.genero)
            ? (api.genero as PerfilPersonaNaturalData['genero'])
            : ''
    return {
        nombreCompleto: api.nombres ?? '',
        apellidoCompleto: api.apellidos ?? '',
        tipoIdentificacion: api.tipoDocumento ?? '',
        numeroIdentificacion: api.numeroIdentificacion ?? '',
        fechaNacimiento:
            parseFecha(api.fechaNacimiento || '')
                ?.toISOString()
                .split('T')[0] || '',
        genero: genero,
        email: api.emailRegistrado ?? '',
    }
}
