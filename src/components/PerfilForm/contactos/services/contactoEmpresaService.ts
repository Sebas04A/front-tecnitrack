import { adapterContactoEmpresa, parseAdapterContactosEmpresa } from '../adapters/contactos'
import { ContactosEmpresaService, GestionClientesService } from '../../../../api'
import { ContactoEmpresaData } from '../models/contacto.schema'
import { createApiSearchFunction } from '../../../../services/generalGetWithFilters'

export const getContactosEmpresaById = async (
    clienteId: number
): Promise<ContactoEmpresaData[]> => {
    // const res = await AdministradorService.getApiAdministradorObtenerContactosEmpresaCliente({
    //     clienteId,
    // })
    const res = await GestionClientesService.getApiGestionClientesListarContactosEmpresa({
        clienteId,
    })
    // const res = await GestionClientesService.getApiGestionClientesListarContactosEmpresa({
    //     clienteId,
    // })
    console.log('Datos obtenidos de contacto empresa por ID:', res)
    if (!res || !res.data || !res.data.data) {
        throw new Error('No se pudo obtener el contacto de la empresa')
    }
    return parseAdapterContactosEmpresa(res.data.data)
}
// export const getContactosEmpresa = async (): Promise<ContactoEmpresaData[]> => {
//     const response = await ContactosEmpresaService.getApiContactosEmpresaMisContactosEmpresa()
//     if (!response || !response.data) {
//         throw new Error('No se pudieron obtener los contactos de la empresa')
//     }
//     const data = parseAdapterContactosEmpresa(response.data)
//     console.log('Contactos de la empresa obtenidos:', data)
//     return data
// }
export const getContactosEmpresa = createApiSearchFunction<ContactoEmpresaData, any, any, any>({
    apiServiceCall: ContactosEmpresaService.getApiContactosEmpresaMisContactosEmpresa,
    sortKeyMapper: {},
    filterAdapter: filters => {
        return {
            ...filters,
        }
    },
    dataParser: data => {
        if (!data) return []
        return parseAdapterContactosEmpresa(data)
    },
    entityName: 'Contactos de Empresa',
})

export async function crearContactoEmpresa(contacto: ContactoEmpresaData) {
    const requestBody = adapterContactoEmpresa(contacto)
    console.log('Creando contacto empresa con datos:', requestBody)
    const response = await ContactosEmpresaService.postApiContactosEmpresaAgregarContactoEmpresa({
        requestBody,
    })
    console.log('Respuesta al crear contacto empresa:', response)
    return response
}
export async function crearContactoEmpresaById(clienteId: number, contacto: ContactoEmpresaData) {
    const res = await GestionClientesService.postApiGestionClientesAgregarContactoEmpresa({
        clienteId,
        requestBody: adapterContactoEmpresa(contacto),
    })
    console.log('Respuesta al crear contacto empresa por ID:', res)
    return res
}

export async function updateContactoEmpresa(contacto: ContactoEmpresaData) {
    const requestBody = adapterContactoEmpresa(contacto)
    const response = await ContactosEmpresaService.putApiContactosEmpresaActualizarContactoEmpresa({
        requestBody,
        contactoId: contacto.id,
    })
    return response
}
export async function updateContactoEmpresaByCliente(contacto: ContactoEmpresaData) {
    const requestBody = adapterContactoEmpresa(contacto)
    const response = await GestionClientesService.putApiGestionClientesActualizarContactoEmpresa({
        contactoId: contacto.id!,
        requestBody,
    })
    return response
}

export async function deleteContactoEmpresa(contactoId: number) {
    return ContactosEmpresaService.deleteApiContactosEmpresaEliminarContactoEmpresa({
        contactoId,
    })
}
export async function deleteContactoEmpresaAdmin(contactoId: number) {
    return GestionClientesService.deleteApiGestionClientesEliminarContactoEmpresa({
        contactoId,
    })
}
