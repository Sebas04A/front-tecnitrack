/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListarOrdenesActivasDtoPagedResponse } from '../models/ListarOrdenesActivasDtoPagedResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GestionOrdenesService {
    /**
     * @returns ListarOrdenesActivasDtoPagedResponse OK
     * @throws ApiError
     */
    public static getApiGestionOrdenesListarOrdenesActivas({
        termino,
        estado,
        clienteId,
        tipoCliente,
        tecnicoAsignado,
        prioridad,
        fechaDesde,
        fechaHasta,
        pagina = 1,
        limite = 10,
        ordenarPor = 'FechaIngreso',
        direccionOrden = 'desc',
    }: {
        termino?: string,
        estado?: string,
        clienteId?: number,
        tipoCliente?: string,
        tecnicoAsignado?: string,
        prioridad?: string,
        fechaDesde?: string,
        fechaHasta?: string,
        pagina?: number,
        limite?: number,
        ordenarPor?: string,
        direccionOrden?: string,
    }): CancelablePromise<ListarOrdenesActivasDtoPagedResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/GestionOrdenes/listar-ordenes-activas',
            query: {
                'termino': termino,
                'estado': estado,
                'clienteId': clienteId,
                'tipoCliente': tipoCliente,
                'tecnicoAsignado': tecnicoAsignado,
                'prioridad': prioridad,
                'fechaDesde': fechaDesde,
                'fechaHasta': fechaHasta,
                'pagina': pagina,
                'limite': limite,
                'ordenarPor': ordenarPor,
                'direccionOrden': direccionOrden,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
}
