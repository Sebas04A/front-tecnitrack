/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClientesEmpresaRequest } from '../models/ClientesEmpresaRequest'
import type { ClientesEmpresaResponseApiResponse } from '../models/ClientesEmpresaResponseApiResponse'
import type { ClientesNaturalRequest } from '../models/ClientesNaturalRequest'
import type { ClientesNaturalResponseApiResponse } from '../models/ClientesNaturalResponseApiResponse'
import type { ObjectApiResponse } from '../models/ObjectApiResponse'
import type { TipoClienteResponseApiResponse } from '../models/TipoClienteResponseApiResponse'
import type { CancelablePromise } from '../core/CancelablePromise'
import { OpenAPI } from '../core/OpenAPI'
import { request as __request } from '../core/request'
export class ClientesService {
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static postApiClientesCrearCliente({
        requestBody,
    }: {
        requestBody?: ClientesNaturalRequest
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Clientes/crear-cliente',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        })
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static putApiClientesActualizarMisDatos({
        requestBody,
    }: {
        requestBody?: ClientesNaturalRequest
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Clientes/actualizar-mis-datos',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        })
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static postApiClientesCrearEmpresa({
        requestBody,
    }: {
        requestBody?: ClientesEmpresaRequest
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Clientes/crear-empresa',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        })
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static putApiClientesActualizarMiEmpresa({
        requestBody,
    }: {
        requestBody?: ClientesEmpresaRequest
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Clientes/actualizar-mi-empresa',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        })
    }
    /**
     * @returns ClientesNaturalResponseApiResponse OK
     * @throws ApiError
     */
    public static getApiClientesMisDatos(): CancelablePromise<ClientesNaturalResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Clientes/mis-datos',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
            },
        })
    }
    /**
     * @returns ClientesEmpresaResponseApiResponse OK
     * @throws ApiError
     */
    public static getApiClientesMiEmpresa(): CancelablePromise<ClientesEmpresaResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Clientes/mi-empresa',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
            },
        })
    }
    /**
     * @returns TipoClienteResponseApiResponse OK
     * @throws ApiError
     */
    public static getApiClientesTipoCliente(): CancelablePromise<TipoClienteResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Clientes/tipo-cliente',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        })
    }
}
