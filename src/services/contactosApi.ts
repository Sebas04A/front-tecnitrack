import {
    adapterContactoCliente,
    adapterContactoEmpresa,
    parseAdapterContactoCliente,
    parseAdapterContactosCliente,
    parseAdapterContactosEmpresa,
} from '../adapters/contactos'
import { AdministradorService, ContactosDirectosService, ContactosEmpresaService } from '../api'
import { ContactoEmpresaData, ContactoClienteData } from '../validation/contacto.schema'

export const getContactosEmpresaById = async (
    clienteId: number
): Promise<ContactoEmpresaData[]> => {
    const res = await AdministradorService.getApiAdministradorObtenerContactosEmpresaCliente({
        clienteId,
    })
    console.log('Datos obtenidos de contacto empresa por ID:', res)
    if (!res || !res.data || res.data.length === 0) {
        throw new Error('No se pudo obtener el contacto de la empresa')
    }
    return parseAdapterContactosEmpresa(res.data)
}
export const getContactosEmpresa = async (): Promise<ContactoEmpresaData[]> => {
    const response = await ContactosEmpresaService.getApiContactosEmpresaMisContactosEmpresa()
    if (!response || !response.data) {
        throw new Error('No se pudieron obtener los contactos de la empresa')
    }
    const data = parseAdapterContactosEmpresa(response.data)
    console.log('Contactos de la empresa obtenidos:', data)
    return data
}

export async function crearContactoEmpresa(contacto: ContactoEmpresaData) {
    const requestBody = adapterContactoEmpresa(contacto)
    console.log('Creando contacto empresa con datos:', requestBody)
    const response = await ContactosEmpresaService.postApiContactosEmpresaAgregarContactoEmpresa({
        requestBody,
    })
    console.log('Respuesta al crear contacto empresa:', response)
    return response
}
export async function updateContactoEmpresa(contacto: ContactoEmpresaData) {
    const requestBody = adapterContactoEmpresa(contacto)
    const response = await ContactosEmpresaService.putApiContactosEmpresaActualizarContactoEmpresa({
        requestBody,
        contactoId: contacto.id,
    })
    return response
}
export async function deleteContactoEmpresa(contactoId: number) {
    return ContactosEmpresaService.deleteApiContactosEmpresaEliminarContactoEmpresa({
        contactoId,
    })
}
export const getContactosClienteById = async (
    clienteId: number
): Promise<ContactoClienteData[]> => {
    const res = await AdministradorService.getApiAdministradorObtenerContactosDirectosCliente({
        clienteId,
    })
    console.log('Datos obtenidos de contacto cliente por ID:', res)
    if (!res || !res.data || res.data.length === 0) {
        throw new Error('No se pudo obtener el contacto del cliente')
    }
    return parseAdapterContactosCliente(res.data)
}
export const getContactosCliente = async () => {
    const response = await ContactosDirectosService.getApiContactosDirectosMisContactos()
    if (!response || !response.data) {
        throw new Error('No se pudieron obtener los contactos de la empresa')
    }
    const data = parseAdapterContactosCliente(response.data)
    console.log('Contactos obtenidos:', data)
    return data
}
export async function crearContactoCliente(contacto: ContactoClienteData) {
    const requestBody = adapterContactoCliente(contacto)

    const response = ContactosDirectosService.postApiContactosDirectosAgregarContacto({
        requestBody,
    })
    return response
}
export async function updateContactoCliente(contacto: ContactoClienteData) {
    const requestBody = adapterContactoCliente(contacto)

    const response = ContactosDirectosService.putApiContactosDirectosActualizarContacto({
        requestBody,
        contactoId: contacto.id,
    })
    return response
}
export async function deleteContactoCliente(contactoId: number) {
    return ContactosDirectosService.deleteApiContactosDirectosEliminarContacto({
        contactoId,
    })
}
