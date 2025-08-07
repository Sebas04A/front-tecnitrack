/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DireccionRequest } from '../models/DireccionRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DireccionesService {
    /**
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static postApiDireccionesCrearDireccion(
        requestBody?: DireccionRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Direcciones/crear-direccion',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static putApiDireccionesActualizarDireccion(
        requestBody?: DireccionRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Direcciones/actualizar-direccion',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteApiDireccionesEliminarDireccion(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Direcciones/eliminar-direccion/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
