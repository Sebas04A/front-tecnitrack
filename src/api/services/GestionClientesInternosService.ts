/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClienteInternoResponsePagedResponse } from '../models/ClienteInternoResponsePagedResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GestionClientesInternosService {
    /**
     * @returns ClienteInternoResponsePagedResponse OK
     * @throws ApiError
     */
    public static getApiGestionClientesInternosListarClientesInternos({
        termino,
        activo,
        rol,
        pagina,
        tamanoPagina,
        ordenarPor,
        direccionOrden,
    }: {
        termino?: string,
        activo?: boolean,
        rol?: string,
        pagina?: number,
        tamanoPagina?: number,
        ordenarPor?: string,
        direccionOrden?: string,
    }): CancelablePromise<ClienteInternoResponsePagedResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gestion-clientes-internos/listar-clientes-internos',
            query: {
                'Termino': termino,
                'Activo': activo,
                'Rol': rol,
                'Pagina': pagina,
                'TamanoPagina': tamanoPagina,
                'OrdenarPor': ordenarPor,
                'DireccionOrden': direccionOrden,
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
