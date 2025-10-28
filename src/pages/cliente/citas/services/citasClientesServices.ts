import { CitasService, EditarCitaRequest, MisCitasResponse } from '../../../../api'

import { createApiSearchFunction } from '../../../../services/generalGetWithFilters'
import { citaDataCompleta } from '../../../../types/cita'
import { CitasClienteDataType } from '../../../../types/cliente/Cita'
import { CitaClienteDataForm } from '../../../../validation/cita.schema'

import { adapterCita, parseCitasCliente } from '../../../Internos/Citas/Crud/adapter/cita'

export const obtenerCitasCliente = createApiSearchFunction<
    CitasClienteDataType,
    MisCitasResponse,
    any,
    any
>({
    apiServiceCall: CitasService.getApiCitasMisCitas,
    sortKeyMapper: {},
    dataParser: parseCitasCliente,
    filterAdapter: filters => {
        return {}
    },
    entityName: 'Citas Cliente',
})

export const crearCita = async (cita: citaDataCompleta): Promise<any> => {
    const citaConvertida = adapterCita(cita)
    console.log('Datos de la cita a crear:', citaConvertida)
    try {
        const response = await CitasService.postApiCitasCrearCita({
            requestBody: citaConvertida,
        })
        console.log('Respuesta de la API al crear cita:', response)
        return response.data
    } catch (error) {
        console.error('Error al crear la cita:', error)
        throw error
    }
}

export const editCita = async (cita: CitaClienteDataForm): Promise<any> => {
    const requestBody: EditarCitaRequest = {
        fechaHora: cita.fechaHoraInicio,
        tipoMantenimiento: cita.tipoMantenimiento ?? 'Otro',
        observaciones: cita.descripcion,
    }
    if (!cita.id) throw new Error('ID de la cita es requerido')
    const res = await CitasService.putApiCitasEditarCita({
        id: cita.id,
        requestBody,
    })
    return res
}
export const eliminarCita = async (cita: CitasClienteDataType): Promise<any> => {
    const res = await CitasService.deleteApiCitasCancelarCita({ id: cita.id })
    return res
}
