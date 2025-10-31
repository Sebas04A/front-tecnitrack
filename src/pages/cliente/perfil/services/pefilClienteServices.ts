import { ClientesService } from '../../../../api'

export async function getTipoPerfil() {
    const response = await ClientesService.getApiClientesTipoCliente()
    console.log('Tipos de perfil obtenidos:', response)
    return response.data?.tipoCliente
}
