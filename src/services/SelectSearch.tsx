import { AdministradorService } from '../api'

export const buscarUsuario = async (query: string) => {
    const res = await AdministradorService.getApiAdministradorBuscarClientesSelector({ q: query })
    console.log('Usuarios encontrados:', res)
    if (!res.data) throw new Error('No se encontraron datos de usuarios')
    return res.data
}
