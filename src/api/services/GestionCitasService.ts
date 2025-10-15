/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CrearCitaClienteRequest } from '../models/CrearCitaClienteRequest';
import type { CrearCitaClienteResponse } from '../models/CrearCitaClienteResponse';
import type { EditarCitaClienteRequest } from '../models/EditarCitaClienteRequest';
import type { ListarCitasResponsePagedResponse } from '../models/ListarCitasResponsePagedResponse';
import type { ObjectApiResponse } from '../models/ObjectApiResponse';
import type { ObtenerDetalleCitaResponse } from '../models/ObtenerDetalleCitaResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GestionCitasService {
    /**
     * @returns ListarCitasResponsePagedResponse OK
     * @throws ApiError
     */
    public static getApiGestionCitasListarCitas({
        termino,
        estado,
        tipoMantenimiento,
        fechaDesde,
        fechaHasta,
        pagina = 1,
        limite = 10,
        ordenarPor = 'Fecha',
        direccionOrden = 'desc',
    }: {
        termino?: string,
        estado?: string,
        tipoMantenimiento?: string,
        fechaDesde?: string,
        fechaHasta?: string,
        pagina?: number,
        limite?: number,
        ordenarPor?: string,
        direccionOrden?: string,
    }): CancelablePromise<ListarCitasResponsePagedResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/GestionCitas/listar-citas',
            query: {
                'termino': termino,
                'estado': estado,
                'tipoMantenimiento': tipoMantenimiento,
                'fechaDesde': fechaDesde,
                'fechaHasta': fechaHasta,
                'pagina': pagina,
                'limite': limite,
                'ordenarPor': ordenarPor,
                'direccionOrden': direccionOrden,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns CrearCitaClienteResponse Created
     * @throws ApiError
     */
    public static postApiGestionCitasCrearCitaCliente({
        requestBody,
    }: {
        requestBody?: CrearCitaClienteRequest,
    }): CancelablePromise<CrearCitaClienteResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/GestionCitas/crear-cita-cliente',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns CrearCitaClienteResponse OK
     * @throws ApiError
     */
    public static putApiGestionCitasEditarCitaCliente({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: EditarCitaClienteRequest,
    }): CancelablePromise<CrearCitaClienteResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/GestionCitas/editar-cita-cliente/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static deleteApiGestionCitasCancelarCitaCliente({
        id,
    }: {
        id: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/GestionCitas/cancelar-cita-cliente/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns ObtenerDetalleCitaResponse OK
     * @throws ApiError
     */
    public static getApiGestionCitasObtenerDetalleCita({
        id,
    }: {
        id: number,
    }): CancelablePromise<ObtenerDetalleCitaResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/GestionCitas/obtener-detalle-cita/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
}
