import { ContactoDirectoRequest } from '../../../../api'
import { ContactoClienteData } from '../models/contacto.schema'

export const adapterContactoCliente = (data: ContactoClienteData): ContactoDirectoRequest => {
    return {
        telefono: data.telefono,
        email: data.email,
        tipoContacto: data.tipoContacto,
        principal: data.principal ?? false,
    }
}
