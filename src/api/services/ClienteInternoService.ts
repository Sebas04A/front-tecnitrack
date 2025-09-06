/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClienteInternoRequest } from '../models/ClienteInternoRequest';
import type { ClienteInternoResponseApiResponse } from '../models/ClienteInternoResponseApiResponse';
import type { CrearEmpleadoResponseApiResponse } from '../models/CrearEmpleadoResponseApiResponse';
import type { EstadoEmpleadoRequest } from '../models/EstadoEmpleadoRequest';
import type { ObjectApiResponse } from '../models/ObjectApiResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ClienteInternoService {
    /**
     * @returns CrearEmpleadoResponseApiResponse OK
     * @throws ApiError
     */
    public static postApiClienteInternoCrearEmpleado({
        requestBody,
    }: {
        requestBody?: ClienteInternoRequest,
    }): CancelablePromise<CrearEmpleadoResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/ClienteInterno/crear-empleado',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * @returns ClienteInternoResponseApiResponse OK
     * @throws ApiError
     */
    public static getApiClienteInternoObtenerEmpleado({
        id,
    }: {
        id: number,
    }): CancelablePromise<ClienteInternoResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ClienteInterno/obtener-empleado/{id}',
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
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static patchApiClienteInternoCambiarEstadoEmpleado({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: EstadoEmpleadoRequest,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/ClienteInterno/cambiar-estado-empleado/{id}',
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
     * @returns ClienteInternoResponseApiResponse OK
     * @throws ApiError
     */
    public static getApiClienteInternoMiPerfil(): CancelablePromise<ClienteInternoResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/ClienteInterno/mi-perfil',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
}
