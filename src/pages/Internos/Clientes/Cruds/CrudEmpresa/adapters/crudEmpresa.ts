import { ListarClientesEmpresaDto } from '../../../../../../api'
import { ClienteEmpresaCrud } from '../models/crudEmpresaModel'

export const mapperPerfilJuridicoApiToData = {
    clienteId: 'id',
    numeroIdentificacion: 'RUC',
    razonSocial: 'razonSocial',
    nombreComercial: 'nombreComercial',
    telefonoPrincipal: 'telefonoEmpresa',
    correoPrincipal: 'emailEmpresa',
    direccion: 'direccion',
    nombreRepresentanteLegal: 'nombreRepresentanteLegal',
    estado: 'estado',
    fechaCreacion: 'fechaCreacion',
}
export const mapperPerfilJuridicoDataToApi = Object.fromEntries(
    Object.entries(mapperPerfilJuridicoApiToData).map(([key, value]) => [value, key])
)
export const parseAdapterPerfilJuridicoCrud = (
    api: ListarClientesEmpresaDto
): ClienteEmpresaCrud => {
    return {
        id: api.clienteId || -1,
        numeroIdentificacion: api.numeroIdentificacion ?? '',
        nombreComercial: api.nombreComercial ?? '',
        razonSocial: api.razonSocial ?? '',
        telefonoPrincipal: api.telefonoEmpresa ?? '',
        correoPrincipal: api.correoEmpresa ?? '',
        direccion: api.direccion ?? '',
        nombreRepresentanteLegal: api.nombreRepresentanteLegal ?? '',
        estado: api.activo ?? true,
        // fechaCreacion: api. ? new Date(api.fechaCreacion) : new Date(),
    }
}
export const parseAdapterPerfilesJuridicosCrud = (
    api: ListarClientesEmpresaDto[]
): ClienteEmpresaCrud[] => {
    return api.map(parseAdapterPerfilJuridicoCrud)
}
