import {
    ContactoDirectoResponse,
    ContactoEmpresaDto,
    ContactosEmpresaRequest,
} from '../../../../api'
import { ContactoEmpresaData, ContactoClienteData } from '../models/contacto.schema'

export const adapterContactoEmpresa = (data: ContactoEmpresaData): ContactosEmpresaRequest => {
    return {
        nombre: data.nombre,
        cargo: data.cargo,
        email: data.email,
        telefono: data.telefono,
        // tipoEmail: 'string',
        // tipoTelefono: 'string',
        // principal: true,
    }
}
export const parseAdapterContactoEmpresa = (data: ContactoEmpresaDto): ContactoEmpresaData => {
    return {
        id: data.id ?? 0,
        nombre: data.nombre ?? '',
        cargo: data.cargo ?? '',
        telefono: data.telefono ?? '',
        email: data.email ?? '',
    }
}
export const adapterContactosEmpresa = (data: ContactoEmpresaData[]) => {
    return data.map(item => adapterContactoEmpresa(item))
}
export const parseAdapterContactosEmpresa = (data: ContactoEmpresaDto[]): ContactoEmpresaData[] => {
    return data.map(item => parseAdapterContactoEmpresa(item))
}

export const parseAdapterContactoCliente = (data: ContactoDirectoResponse): ContactoClienteData => {
    return {
        id: data.id ?? 0,
        telefono: data.telefono ?? '',
        email: data.email ?? '',
        tipoContacto: data.tipoContacto ?? '',
        principal: data.principal ?? false,
    }
}
export const parseAdapterContactosCliente = (
    data: ContactoDirectoResponse[]
): ContactoClienteData[] => {
    return data.map(item => parseAdapterContactoCliente(item))
}
