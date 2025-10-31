import { DireccionRequest, DireccionResponse } from '../../../../api'
import { DireccionData } from '../models/direccion.schema'

export const adapterDireccion = (direccion: DireccionData): DireccionRequest & { id: number } => {
    return {
        // callePrincipal: direccion.callePrincipal ? "",
        // calleSecundaria: direccion.calleSecundaria,
        // numero: direccion.numero,
        ciudadId: direccion.ciudad,
        provinciaId: direccion.provincia,
        codigoPostal: direccion.codigoPostal,
        paisId: direccion.pais,
        tipoDireccion: direccion.tipo,
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
        codigoPostal: api.codigoPostal ?? '',
        pais: api.paisId ?? -1,
        provincia: api.provinciaId ?? -1,
        ciudad: api.ciudadId ?? -1,
        tipo: api.tipoDireccion ?? 'No Definido',
        // principal: api.principal,
        direccion: api.direccionExacta ?? 'No Definido',
        id: api.id,
        principal: api.principal ?? false,
        ciudadNombre: api.ciudadNombre ?? '',
        provinciaNombre: api.provinciaNombre ?? '',
        paisNombre: api.paisNombre ?? '',
    }
}
export const parseAdapterDirecciones = (api: DireccionResponse[]): DireccionData[] => {
    return api.map(parseAdapterDireccion)
}
