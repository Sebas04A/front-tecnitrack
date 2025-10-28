import { OrdenResponse } from '../../../../../api'
import { OrdenData } from '../../../Ordenes/Crud/models/ordenData'

export const parseOrden = (data: OrdenResponse): OrdenData => {
    return {
        id: data.idOrden ?? 0,
        idCita: data.citaId ?? 0,
        numeroOrden: data.numeroOrden ?? '',
        fechaIngresoOrden: data.fechaIngreso ?? '',
        clienteNombre: '',
        equipoNombre: '',
        tipoMantenimiento: '',
        tecnicoNombre: '',
        prioridad: '',
        estado: '',
        progreso: '',

        // clienteNombre:undefined,

        // inspeccionadoPor: null,
        // tallerBodegaDestino: data.tallerBodegaDestino ?? '',
        // observacionesIngreso: data.observacionesIngreso ?? '',
    }
}
