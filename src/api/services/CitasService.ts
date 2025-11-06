/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CitaRequest } from '../models/CitaRequest';
import type { CitaResponseApiResponse } from '../models/CitaResponseApiResponse';
import type { CitaResponseListApiResponse } from '../models/CitaResponseListApiResponse';
import type { EditarCitaRequest } from '../models/EditarCitaRequest';
import type { MisCitasResponsePagedResponse } from '../models/MisCitasResponsePagedResponse';
import type { ObjectApiResponse } from '../models/ObjectApiResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CitasService {
    /**
     * @returns CitaResponseListApiResponse OK
     * @throws ApiError
     */
    public static getApiCitasObtenerCitas(): CancelablePromise<CitaResponseListApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Citas/obtener-citas',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns CitaResponseApiResponse Created
     * @throws ApiError
     */
    public static postApiCitasCrearCita({
        requestBody,
    }: {
        requestBody?: CitaRequest,
    }): CancelablePromise<CitaResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Citas/crear-cita',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns MisCitasResponsePagedResponse OK
     * @throws ApiError
     */
    public static getApiCitasMisCitas({
        termino,
        estado,
        fechaDesde,
        fechaHasta,
        pagina = 1,
        limite = 10,
        ordenarPor = 'Fecha',
        direccionOrden = 'desc',
    }: {
        termino?: string,
        estado?: string,
        fechaDesde?: string,
        fechaHasta?: string,
        pagina?: number,
        limite?: number,
        ordenarPor?: string,
        direccionOrden?: string,
    }): CancelablePromise<MisCitasResponsePagedResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Citas/mis-citas',
            query: {
                'termino': termino,
                'estado': estado,
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
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns CitaResponseApiResponse OK
     * @throws ApiError
     */
    public static putApiCitasEditarCita({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: EditarCitaRequest,
    }): CancelablePromise<CitaResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Citas/editar-cita/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static deleteApiCitasCancelarCita({
        id,
    }: {
        id: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Citas/cancelar-cita/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
}
