/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActivoCreateUpdateRequest } from '../models/ActivoCreateUpdateRequest';
import type { ActualizarParteRequest } from '../models/ActualizarParteRequest';
import type { CrearParteRequest } from '../models/CrearParteRequest';
import type { MarcaCreateUpdateRequest } from '../models/MarcaCreateUpdateRequest';
import type { SubTipoActivoCreateUpdateRequest } from '../models/SubTipoActivoCreateUpdateRequest';
import type { TipoActivoCreateUpdateRequest } from '../models/TipoActivoCreateUpdateRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ActivosService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiActivosObtenerTipos(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Activos/obtener-tipos',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiActivosObtenerTipo({
        id,
    }: {
        id: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Activos/obtener-tipo/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiActivosCrearTipo({
        requestBody,
    }: {
        requestBody?: TipoActivoCreateUpdateRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Activos/crear-tipo',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static putApiActivosActualizarTipo({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: TipoActivoCreateUpdateRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Activos/actualizar-tipo/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static deleteApiActivosEliminarTipo({
        id,
    }: {
        id: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Activos/eliminar-tipo/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiActivosObtenerSubtiposPorTipo({
        tipoId,
    }: {
        tipoId: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Activos/obtener-subtipos-por-tipo/{tipoId}',
            path: {
                'tipoId': tipoId,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiActivosObtenerSubtipo({
        id,
    }: {
        id: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Activos/obtener-subtipo/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiActivosCrearSubtipo({
        requestBody,
    }: {
        requestBody?: SubTipoActivoCreateUpdateRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Activos/crear-subtipo',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static putApiActivosActualizarSubtipo({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: SubTipoActivoCreateUpdateRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Activos/actualizar-subtipo/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static deleteApiActivosEliminarSubtipo({
        id,
    }: {
        id: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Activos/eliminar-subtipo/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiActivosObtenerMarcasPorSubtipo({
        subTipoId,
    }: {
        subTipoId: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Activos/obtener-marcas-por-subtipo/{subTipoId}',
            path: {
                'subTipoId': subTipoId,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiActivosObtenerMarca({
        id,
    }: {
        id: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Activos/obtener-marca/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiActivosCrearMarca({
        requestBody,
    }: {
        requestBody?: MarcaCreateUpdateRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Activos/crear-marca',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static putApiActivosActualizarMarca({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: MarcaCreateUpdateRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Activos/actualizar-marca/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static deleteApiActivosEliminarMarca({
        id,
    }: {
        id: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Activos/eliminar-marca/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiActivosObtenerPartesPorSubtipo({
        subTipoId,
    }: {
        subTipoId: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Activos/obtener-partes-por-subtipo/{subTipoId}',
            path: {
                'subTipoId': subTipoId,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiActivosObtenerParte({
        id,
    }: {
        id: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Activos/obtener-parte/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiActivosObtenerTodasPartes(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Activos/obtener-todas-partes',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiActivosCrearParte({
        requestBody,
    }: {
        requestBody?: CrearParteRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Activos/crear-parte',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static putApiActivosActualizarParte({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: ActualizarParteRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Activos/actualizar-parte/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static deleteApiActivosEliminarParte({
        id,
    }: {
        id: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Activos/eliminar-parte/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiActivosObtenerActivosPorCliente({
        clienteId,
        q,
        tipoId,
        marcaId,
        page = 1,
        pageSize = 20,
    }: {
        clienteId: number,
        q?: string,
        tipoId?: number,
        marcaId?: number,
        page?: number,
        pageSize?: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Activos/obtener-activos-por-cliente/{clienteId}',
            path: {
                'clienteId': clienteId,
            },
            query: {
                'q': q,
                'tipoId': tipoId,
                'marcaId': marcaId,
                'page': page,
                'pageSize': pageSize,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiActivosObtenerActivoDetalle({
        id,
    }: {
        id: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Activos/obtener-activo-detalle/{id}',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiActivosCrearActivo({
        requestBody,
    }: {
        requestBody?: ActivoCreateUpdateRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Activos/crear-activo',
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static putApiActivosActualizarActivoExistente({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: ActivoCreateUpdateRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Activos/actualizar-activo-existente/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static deleteApiActivosEliminarActivo({
        id,
    }: {
        id: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Activos/eliminar-activo/{id}',
            path: {
                'id': id,
            },
        });
    }
}
