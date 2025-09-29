/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AutenticacionLoginInternoRequest } from '../models/AutenticacionLoginInternoRequest';
import type { AutenticacionLoginInternoResponseApiResponse } from '../models/AutenticacionLoginInternoResponseApiResponse';
import type { AutenticacionLoginRequest } from '../models/AutenticacionLoginRequest';
import type { AutenticacionLoginResponseApiResponse } from '../models/AutenticacionLoginResponseApiResponse';
import type { AutenticacionRegistroClienteRequest } from '../models/AutenticacionRegistroClienteRequest';
import type { CambiarPasswordRequest } from '../models/CambiarPasswordRequest';
import type { ObjectApiResponse } from '../models/ObjectApiResponse';
import type { RegistroClienteEmpresaRequest } from '../models/RegistroClienteEmpresaRequest';
import type { RegistroClienteEmpresaResponseApiResponse } from '../models/RegistroClienteEmpresaResponseApiResponse';
import type { RegistroClienteNaturalRequest } from '../models/RegistroClienteNaturalRequest';
import type { RegistroClienteNaturalResponseApiResponse } from '../models/RegistroClienteNaturalResponseApiResponse';
import type { RestablecerPasswordRequest } from '../models/RestablecerPasswordRequest';
import type { SolicitarRestablecimientoRequest } from '../models/SolicitarRestablecimientoRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AutenticacionService {
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static postApiAutenticacionRegistro({
        requestBody,
    }: {
        requestBody?: AutenticacionRegistroClienteRequest,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Autenticacion/registro',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static getApiAutenticacionConfirmarEmail({
        token,
    }: {
        token?: string,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Autenticacion/confirmar-email',
            query: {
                'token': token,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns AutenticacionLoginResponseApiResponse OK
     * @throws ApiError
     */
    public static postApiAutenticacionLogin({
        requestBody,
    }: {
        requestBody?: AutenticacionLoginRequest,
    }): CancelablePromise<AutenticacionLoginResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Autenticacion/login',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns AutenticacionLoginInternoResponseApiResponse OK
     * @throws ApiError
     */
    public static postApiAutenticacionLoginInterno({
        requestBody,
    }: {
        requestBody?: AutenticacionLoginInternoRequest,
    }): CancelablePromise<AutenticacionLoginInternoResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Autenticacion/login-interno',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static postApiAutenticacionSolicitarRestablecimiento({
        requestBody,
    }: {
        requestBody?: SolicitarRestablecimientoRequest,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Autenticacion/solicitar-restablecimiento',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static postApiAutenticacionRestablecerPassword({
        requestBody,
    }: {
        requestBody?: RestablecerPasswordRequest,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Autenticacion/restablecer-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static postApiAutenticacionCambiarPassword({
        requestBody,
    }: {
        requestBody?: CambiarPasswordRequest,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Autenticacion/cambiar-password',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * @returns RegistroClienteNaturalResponseApiResponse OK
     * @throws ApiError
     */
    public static postApiAutenticacionRegistroClienteNatural({
        requestBody,
    }: {
        requestBody?: RegistroClienteNaturalRequest,
    }): CancelablePromise<RegistroClienteNaturalResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Autenticacion/registro-cliente-natural',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns RegistroClienteEmpresaResponseApiResponse OK
     * @throws ApiError
     */
    public static postApiAutenticacionRegistroClienteEmpresa({
        requestBody,
    }: {
        requestBody?: RegistroClienteEmpresaRequest,
    }): CancelablePromise<RegistroClienteEmpresaResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Autenticacion/registro-cliente-empresa',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
