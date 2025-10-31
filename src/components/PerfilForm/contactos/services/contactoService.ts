import { ContactosDirectosService, GestionClientesService } from '../../../../api'
import { createApiSearchFunction } from '../../../../services/generalGetWithFilters'
import { adapterContactoCliente } from '../adapters/contacto'
import { parseAdapterContactosCliente } from '../adapters/contactos'
import { ContactoClienteData } from '../models/contacto.schema'

export async function crearContactoCliente(contacto: ContactoClienteData) {
    const requestBody = adapterContactoCliente(contacto)

    const response = ContactosDirectosService.postApiContactosDirectosAgregarContacto({
        requestBody,
    })
    return response
}

export function crearContactoClienteById(clienteId: number, contacto: ContactoClienteData) {
    const res = GestionClientesService.postApiGestionClientesAgregarContactoDirecto({
        clienteId,
        requestBody: adapterContactoCliente(contacto),
    })
    console.log('Respuesta al crear contacto cliente por ID:', res)
    return res
}
export async function updateContactoCliente(contacto: ContactoClienteData) {
    const requestBody = adapterContactoCliente(contacto)

    const response = ContactosDirectosService.putApiContactosDirectosActualizarContacto({
        requestBody,
        contactoId: contacto.id,
    })
    return response
}
export async function updateContactoClienteByCliente(contacto: ContactoClienteData) {
    const requestBody = adapterContactoCliente(contacto)
    const response = GestionClientesService.putApiGestionClientesActualizarContactoDirecto({
        contactoId: contacto.id!,
        requestBody,
    })
    return response
}
export async function deleteContactoCliente(contactoId: number) {
    return ContactosDirectosService.deleteApiContactosDirectosEliminarContacto({
        contactoId,
    })
}
export async function deleteContactoClienteAdmin(contactoId: number) {
    return GestionClientesService.deleteApiGestionClientesEliminarContactoDirecto({
        contactoId,
    })
}

export const getContactosNaturalById = createApiSearchFunction<ContactoClienteData, any, any, any>({
    apiServiceCall: GestionClientesService.getApiGestionClientesListarClientesNaturales,
    sortKeyMapper: {},
    filterAdapter: filters => {
        return {
            ...filters,
        }
    },
    dataParser: data => {
        if (!data) return []
        return parseAdapterContactosCliente(data)
    },
    entityName: 'Contactos Cliente',
})
export const getContactosCliente = createApiSearchFunction<ContactoClienteData, any, any, any>({
    apiServiceCall: ContactosDirectosService.getApiContactosDirectosMisContactos,
    sortKeyMapper: {},
    filterAdapter: filters => {
        return {
            ...filters,
        }
    },
    dataParser: data => {
        if (!data) return []
        return parseAdapterContactosCliente(data)
    },
    entityName: 'Contactos Cliente',
})
