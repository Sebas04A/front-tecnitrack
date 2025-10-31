import {
    ActualizarClienteNaturalDto,
    ActualizarMisDatosRequest,
    ClientesService,
    CrearClienteNaturalDto,
    GestionClientesService,
} from '../../../../../api'
import {
    PerfilPersonaNaturalCrudData,
    PerfilPersonaNaturalData,
} from '../../../../../validation/perfil.schema'
import { parsePersonaNaturalById } from '../adapters/natural'

export async function updatePerfilNatural(data: PerfilPersonaNaturalData) {
    const requestBody: ActualizarMisDatosRequest = {
        nombre: data.nombreCompleto,
        apellido: data.apellidoCompleto,
        tipoIdentificacion: data.tipoIdentificacion,
        numeroIdentificacion: data.numeroIdentificacion,
        fechaNacimiento: data.fechaNacimiento,
        genero: data.genero,
    }
    console.log('Datos del perfil natural a actualizar:', requestBody)

    const response = await ClientesService.putApiClientesActualizarMisDatos({ requestBody })
    return response
}

export async function getPerfilNaturalById(clienteId: number): Promise<PerfilPersonaNaturalData> {
    const data = await GestionClientesService.getApiGestionClientesClienteNatural({
        clienteId: clienteId,
    })
    console.log('Datos obtenidos del perfil natural por ID:', data)
    if (!data || !data.data) {
        throw new Error('No se encontraron datos del perfil natural')
    }
    return parsePersonaNaturalById(data.data)
}
export async function crearPerfilNaturaAdmin(data: PerfilPersonaNaturalCrudData): Promise<number> {
    const requestBody: CrearClienteNaturalDto = {
        nombre: data.nombreCompleto,
        apellido: data.apellidoCompleto,
        tipoIdentificacion: data.tipoIdentificacion,
        numeroIdentificacion: data.numeroIdentificacion,
        fechaNacimiento: data.fechaNacimiento,
        genero: data.genero,
        email: data.email,
    }
    const res = await GestionClientesService.postApiGestionClientesCrearClienteNatural({
        requestBody,
    })
    if (!res.data || !res.data.id) throw new Error('No se encontro el id del perfil natural')
    return res.data.id
}

export async function updatePerfilNaturalAdmin(
    data: PerfilPersonaNaturalCrudData,
    clienteId: number
): Promise<number> {
    const requestBody: ActualizarClienteNaturalDto = {
        nombre: data.nombreCompleto,
        apellido: data.apellidoCompleto,
        tipoIdentificacion: data.tipoIdentificacion,
        numeroIdentificacion: data.numeroIdentificacion,
        fechaNacimiento: data.fechaNacimiento,
        genero: data.genero,
        email: data.email,
    }
    const res = await GestionClientesService.putApiGestionClientesActualizarClienteNatural({
        clienteId: clienteId,
        requestBody,
    })
    if (!res.data || !res.data.id) throw new Error('No se encontro el id del perfil natural')
    return res.data.id
}
export async function deletePerfilNaturalAdmin(clienteId: number) {
    const res = await GestionClientesService.deleteApiGestionClientesEliminarClienteNatural({
        clienteId: clienteId,
    })
    return res
}
