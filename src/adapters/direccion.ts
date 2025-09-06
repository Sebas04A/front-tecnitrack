import { DireccionRequest, DireccionResponse } from '../api'
import { DireccionData } from '../validation/direccion.schema'

export const adapterDireccion = (direccion: DireccionData): DireccionRequest & { id: number } => {
    return {
        // callePrincipal: direccion.callePrincipal ? "",
        // calleSecundaria: direccion.calleSecundaria,
        // numero: direccion.numero,
        ciudad: direccion.ciudad,
        provincia: direccion.provincia,
        codigoPostal: direccion.codigoPostal,
        pais: direccion.pais,
        tipo: direccion.tipo,
        // principal: true,
        direccionExacta: direccion.direccion,
        principal: direccion.principal ?? false,
        id: direccion.id ?? 0, // Aseguramos que el ID sea un número
    }
}

export const parseAdapterDireccion = (api: DireccionResponse): DireccionData => {
    return {
        // callePrincipal: api.callePrincipal,
        // calleSecundaria: api.calleSecundaria,
        // numero: api.numero,
        ciudad: api.ciudad ?? '',
        provincia: api.provincia ?? '',
        codigoPostal: api.codigoPostal ?? '',
        pais: api.pais ?? '',
        tipo: api.tipoDireccion ?? '',
        // principal: api.principal,
        direccion: api.direccionExacta ?? '',
        id: api.id,
        principal: api.principal ?? false,
    }
}
export const parseAdapterDirecciones = (api: DireccionResponse[]): DireccionData[] => {
    return api.map(parseAdapterDireccion)
}
