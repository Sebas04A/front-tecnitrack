/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PerfilEmpresaRequest } from '../models/PerfilEmpresaRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class PerfilEmpresaService {
    /**
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static postApiPerfilEmpresaCrearCliente(
        requestBody?: PerfilEmpresaRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/PerfilEmpresa/crear-cliente',
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
    public static putApiPerfilEmpresaActualizarCliente(
        requestBody?: PerfilEmpresaRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/PerfilEmpresa/actualizar-cliente',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
