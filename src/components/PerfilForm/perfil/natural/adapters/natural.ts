import { ClienteNaturalDto } from '../../../../../api'
import { parseFecha } from '../../../../../utils/parseFecha'
import { PerfilPersonaNaturalData } from '../../../../../validation/perfil.schema'

export const parsePersonaNaturalById = (cliente: ClienteNaturalDto): PerfilPersonaNaturalData => {
    return {
        id: cliente.id || -1,
        genero: cliente.genero ?? '',
        fechaNacimiento:
            parseFecha(cliente.fechaNacimiento || '')
                ?.toISOString()
                .split('T')[0] || '',
        nombreCompleto: cliente.nombre ?? '',
        apellidoCompleto: cliente.apellido ?? '',
        tipoIdentificacion: cliente.tipoDocumento ?? '',
        numeroIdentificacion: cliente.numeroIdentificacion ?? '',
        email: cliente.email ?? '',
    }
}
