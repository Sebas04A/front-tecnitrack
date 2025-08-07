/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClienteRequest } from '../models/ClienteRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ClientesService {
    /**
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static postApiClientesCrearCliente(
        requestBody?: ClienteRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Clientes/crear-cliente',
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
    public static putApiClientesActualizarCliente(
        requestBody?: ClienteRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Clientes/actualizar-cliente',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
