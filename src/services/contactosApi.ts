import {
    parseAdapterContactosCliente,
    parseAdapterContactosEmpresa,
} from '../components/PerfilForm/contactos/adapters/contactos'
import { ContactosDirectosService, GestionClientesService } from '../api'
import { ContactoClienteData } from '../components/PerfilForm/contactos/models/contacto.schema'
import { createApiSearchFunction } from './generalGetWithFilters'

// export const getContactosNaturalById = async (
//     clienteId: number
// ): Promise<ContactoClienteData[]> => {
//     // const res = await GestionClientesService.getApiGestionClientesListarContactosDirectos({
//     //     clienteId,
//     // })
//     //
//     // const res = await AdministradorService.getApiAdministradorObtenerContactosDirectosCliente({
//     //     clienteId,
//     // })
//     const res = await GestionClientesService.getApiGestionClientesListarClientesNaturales()
//     console.log('Datos obtenidos de contacto cliente por ID:', res)
//     if (!res || !res.data || res.data.data === 0) {
//         throw new Error('No se pudo obtener el contacto del cliente')
//     }
//     return parseAdapterContactosCliente(res.data)
// }

// export const getContactosCliente = async () => {
//     const response = await ContactosDirectosService.getApiContactosDirectosMisContactos()
//     if (!response || !response.data) {
//         throw new Error('No se pudieron obtener los contactos de la empresa')
//     }
//     const data = parseAdapterContactosCliente(response.data)
//     console.log('Contactos obtenidos:', data)
//     return data
// }
