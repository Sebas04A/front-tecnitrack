/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanApiResponse } from '../models/BooleanApiResponse';
import type { DireccionRequest } from '../models/DireccionRequest';
import type { DireccionResponseListApiResponse } from '../models/DireccionResponseListApiResponse';
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
     * @returns DireccionResponseListApiResponse OK
     * @throws ApiError
     */
    public static getApiDireccionesMisDirecciones(): CancelablePromise<DireccionResponseListApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Direcciones/mis-direcciones',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static patchApiDireccionesEstablecerPrincipal({
        id,
    }: {
        id: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/Direcciones/establecer-principal/{id}',
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
     * @returns BooleanApiResponse OK
     * @throws ApiError
     */
    public static getApiDireccionesVerificarDireccionPrincipal(): CancelablePromise<BooleanApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Direcciones/verificar-direccion-principal',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
}
