/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CambiarActivoAsociadoRequest } from '../models/CambiarActivoAsociadoRequest';
import type { EditarDatosOrdenRequest } from '../models/EditarDatosOrdenRequest';
import type { EditarMantenimientoProgramadoRequest } from '../models/EditarMantenimientoProgramadoRequest';
import type { ListarOrdenesActivasDtoPagedResponse } from '../models/ListarOrdenesActivasDtoPagedResponse';
import type { OrdenResponseApiResponse } from '../models/OrdenResponseApiResponse';
import type { StringApiResponse } from '../models/StringApiResponse';
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
    /**
     * @returns OrdenResponseApiResponse OK
     * @throws ApiError
     */
    public static putApiGestionOrdenesEditarDatosOrden({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: EditarDatosOrdenRequest,
    }): CancelablePromise<OrdenResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/GestionOrdenes/editar-datos-orden/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns OrdenResponseApiResponse OK
     * @throws ApiError
     */
    public static putApiGestionOrdenesCambiarActivoAsociado({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: CambiarActivoAsociadoRequest,
    }): CancelablePromise<OrdenResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/GestionOrdenes/cambiar-activo-asociado/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns OrdenResponseApiResponse OK
     * @throws ApiError
     */
    public static putApiGestionOrdenesEditarMantenimientoProgramado({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: EditarMantenimientoProgramadoRequest,
    }): CancelablePromise<OrdenResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/GestionOrdenes/editar-mantenimiento-programado/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns StringApiResponse OK
     * @throws ApiError
     */
    public static deleteApiGestionOrdenesEliminarOrden({
        id,
    }: {
        id: number,
    }): CancelablePromise<StringApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/GestionOrdenes/eliminar-orden/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
}
