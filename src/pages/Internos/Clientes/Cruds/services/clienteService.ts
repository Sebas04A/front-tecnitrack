import { GestionClientesService } from '../../../../../api'

export async function activarUsuario(clienteId: number) {
    const res = GestionClientesService.patchApiGestionClientesActivarCliente({
        clienteId: clienteId,
    })
    return res
}

export async function desactivarUsuario(clienteId: number) {
    const res = GestionClientesService.patchApiGestionClientesDesactivarCliente({
        clienteId: clienteId,
    })
    return res
}
