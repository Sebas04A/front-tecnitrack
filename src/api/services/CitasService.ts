/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CitaRequest } from '../models/CitaRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CitasService {
    /**
     * @returns void
     * @throws ApiError
     */
    public static getApiCitasObtenerCitas(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Citas/obtener-citas',
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
    public static postApiCitasCrearCita(
        requestBody?: CitaRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Citas/crear-cita',
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
    public static putApiCitasCancelarCita(
        requestBody?: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Citas/cancelar-cita',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns void
     * @throws ApiError
     */
    public static getApiCitasVerCitas(): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Citas/ver-citas',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
