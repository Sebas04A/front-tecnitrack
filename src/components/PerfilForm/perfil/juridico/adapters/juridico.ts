import { ClientesEmpresaRequest, ClientesEmpresaResponse } from '../../../../../api'
import { PerfilEmpresaData } from '../../../../../validation/perfil.schema'

export const adapterPerfilJuridico = (data: PerfilEmpresaData) => {
    const requestBody: ClientesEmpresaRequest = {
        razonSocial: data.razonSocial,
        numeroIdentificacion: data.RUC,
        nombreComercial: data.nombreComercial,
        telefonoEmpresa: data.telefonoEmpresa,
        correoEmpresa: data.emailEmpresa,
        nombreRepresentanteLegal: data.nombreRepresentanteLegal,
        // telefonoContacto1: data.telefonoEmpresa,
        // correoContacto1: data.emailEmpresa,
        // telefonoContacto2: data.telefonoSecundario,
        // correoContacto2: data.emailSecundario,
    }
    return requestBody
}
export const parseAdapterPerfilJuridico = (api: ClientesEmpresaResponse): PerfilEmpresaData => {
    return {
        RUC: api.numeroIdentificacion ?? '',
        razonSocial: api.razonSocial ?? '',
        nombreComercial: api.nombreComercial ?? '',
        numeroSucursal: api.numeroSucursal ?? '',
        nombreSucursal: api.nombreSucursal ?? '',
        telefonoEmpresa: api.telefonoEmpresa ?? '',
        emailEmpresa: api.correoEmpresa ?? '',
        telefonoSecundario: api.telefonoEmpresaSecundario,
        emailSecundario: api.correoEmpresaSecundario,
        nombreRepresentanteLegal: api.nombreRepresentanteLegal ?? '',
    }
}
