/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClienteSelectorResponseIEnumerableApiResponse } from '../models/ClienteSelectorResponseIEnumerableApiResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdministradorService {
    /**
     * @returns ClienteSelectorResponseIEnumerableApiResponse OK
     * @throws ApiError
     */
    public static getApiAdministradorBuscarClientesSelector({
        q,
        limite,
        tipoCliente,
        soloActivos,
    }: {
        q: string,
        limite?: number,
        tipoCliente?: string,
        soloActivos?: boolean,
    }): CancelablePromise<ClienteSelectorResponseIEnumerableApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/administrador/buscar-clientes-selector',
            query: {
                'Q': q,
                'Limite': limite,
                'TipoCliente': tipoCliente,
                'SoloActivos': soloActivos,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Internal Server Error`,
            },
        });
    }
}
