/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DireccionDetalleResponseApiResponse } from '../models/DireccionDetalleResponseApiResponse';
import type { DireccionRequest } from '../models/DireccionRequest';
import type { DireccionResponsePagedResponse } from '../models/DireccionResponsePagedResponse';
import type { ObjectApiResponse } from '../models/ObjectApiResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DireccionesService {
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static postApiDireccionesCrearDireccion({
        requestBody,
    }: {
        requestBody?: DireccionRequest,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Direcciones/crear-direccion',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                409: `Conflict`,
            },
        });
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static putApiDireccionesActualizarDireccion({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: DireccionRequest,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Direcciones/actualizar-direccion/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static deleteApiDireccionesEliminarDireccion({
        id,
    }: {
        id: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Direcciones/eliminar-direccion/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
    /**
     * @returns DireccionResponsePagedResponse OK
     * @throws ApiError
     */
    public static getApiDireccionesMisDirecciones({
        termino,
        estado = 'Activa',
        pagina = 1,
        limite = 10,
        ordenarPor = 'TipoDireccion',
        direccionOrden = 'asc',
    }: {
        termino?: string,
        estado?: string,
        pagina?: number,
        limite?: number,
        ordenarPor?: string,
        direccionOrden?: string,
    }): CancelablePromise<DireccionResponsePagedResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Direcciones/mis-direcciones',
            query: {
                'termino': termino,
                'estado': estado,
                'pagina': pagina,
                'limite': limite,
                'ordenarPor': ordenarPor,
                'direccionOrden': direccionOrden,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns DireccionDetalleResponseApiResponse OK
     * @throws ApiError
     */
    public static getApiDireccionesObtenerDireccion({
        id,
    }: {
        id: number,
    }): CancelablePromise<DireccionDetalleResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Direcciones/obtener-direccion/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
}
