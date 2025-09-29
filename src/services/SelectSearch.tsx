import { AdministradorService } from '../api'

export const buscarUsuario = async (query: string) => {
    console.log('Buscando usuario con query:', query)
    // if (!query || query.length < 3) {
    //     console.log('Query demasiado corta, no se realiza la búsqueda')
    //     return []
    // }
    const res = await AdministradorService.getApiAdministradorBuscarClientesSelector({ q: query })
    console.log('Usuarios encontrados:', res)
    if (!res.data) throw new Error('No se encontraron datos de usuarios')
    return res.data
}
