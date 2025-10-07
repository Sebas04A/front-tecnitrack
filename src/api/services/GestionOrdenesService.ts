/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListarOrdenesActivasDtoListApiResponse } from '../models/ListarOrdenesActivasDtoListApiResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GestionOrdenesService {
    /**
     * @returns ListarOrdenesActivasDtoListApiResponse OK
     * @throws ApiError
     */
    public static getApiGestionOrdenesListarOrdenesActivas(): CancelablePromise<ListarOrdenesActivasDtoListApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/GestionOrdenes/listar-ordenes-activas',
            errors: {
                500: `Internal Server Error`,
            },
        });
    }
}
