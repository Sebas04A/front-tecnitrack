/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActualizarCatalogoDto } from '../models/ActualizarCatalogoDto';
import type { CatalogoDtoApiResponse } from '../models/CatalogoDtoApiResponse';
import type { CatalogoDtoIEnumerableApiResponse } from '../models/CatalogoDtoIEnumerableApiResponse';
import type { CrearCatalogoDto } from '../models/CrearCatalogoDto';
import type { ObjectApiResponse } from '../models/ObjectApiResponse';
import type { StringIEnumerableApiResponse } from '../models/StringIEnumerableApiResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class CatalogosService {
    /**
     * @returns CatalogoDtoIEnumerableApiResponse OK
     * @throws ApiError
     */
    public static getApiCatalogosObtenerTodosCatalogos(): CancelablePromise<CatalogoDtoIEnumerableApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Catalogos/obtener-todos-catalogos',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns StringIEnumerableApiResponse OK
     * @throws ApiError
     */
    public static getApiCatalogosObtenerTiposCatalogo(): CancelablePromise<StringIEnumerableApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Catalogos/obtener-tipos-catalogo',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CatalogoDtoIEnumerableApiResponse OK
     * @throws ApiError
     */
    public static getApiCatalogosObtenerCatalogosPorTipo({
        tipo,
    }: {
        tipo: string,
    }): CancelablePromise<CatalogoDtoIEnumerableApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Catalogos/obtener-catalogos-por-tipo/{tipo}',
            path: {
                'tipo': tipo,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CatalogoDtoApiResponse OK
     * @throws ApiError
     */
    public static getApiCatalogosObtenerCatalogoPorId({
        id,
    }: {
        id: number,
    }): CancelablePromise<CatalogoDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Catalogos/obtener-catalogo-por-id/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }
    /**
     * @returns CatalogoDtoApiResponse Created
     * @throws ApiError
     */
    public static postApiCatalogosCrearCatalogo({
        requestBody,
    }: {
        requestBody?: CrearCatalogoDto,
    }): CancelablePromise<CatalogoDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Catalogos/crear-catalogo',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CatalogoDtoApiResponse OK
     * @throws ApiError
     */
    public static putApiCatalogosEditarCatalogo({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: ActualizarCatalogoDto,
    }): CancelablePromise<CatalogoDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Catalogos/editar-catalogo/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static deleteApiCatalogosEliminarCatalogo({
        id,
    }: {
        id: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Catalogos/eliminar-catalogo/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }
    /**
     * @returns CatalogoDtoIEnumerableApiResponse OK
     * @throws ApiError
     */
    public static getApiCatalogosObtenerRolesUsuarioInterno(): CancelablePromise<CatalogoDtoIEnumerableApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Catalogos/obtener-roles-usuario-interno',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CatalogoDtoIEnumerableApiResponse OK
     * @throws ApiError
     */
    public static getApiCatalogosObtenerGeneros(): CancelablePromise<CatalogoDtoIEnumerableApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Catalogos/obtener-generos',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CatalogoDtoIEnumerableApiResponse OK
     * @throws ApiError
     */
    public static getApiCatalogosObtenerTiposDocumento(): CancelablePromise<CatalogoDtoIEnumerableApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Catalogos/obtener-tipos-documento',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CatalogoDtoIEnumerableApiResponse OK
     * @throws ApiError
     */
    public static getApiCatalogosObtenerTiposDocumentoClienteNatural(): CancelablePromise<CatalogoDtoIEnumerableApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Catalogos/obtener-tipos-documento-cliente-natural',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CatalogoDtoIEnumerableApiResponse OK
     * @throws ApiError
     */
    public static getApiCatalogosObtenerTiposDocumentoClienteEmpresa(): CancelablePromise<CatalogoDtoIEnumerableApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Catalogos/obtener-tipos-documento-cliente-empresa',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CatalogoDtoIEnumerableApiResponse OK
     * @throws ApiError
     */
    public static getApiCatalogosObtenerTiposDocumentoClienteInterno(): CancelablePromise<CatalogoDtoIEnumerableApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Catalogos/obtener-tipos-documento-cliente-interno',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CatalogoDtoIEnumerableApiResponse OK
     * @throws ApiError
     */
    public static getApiCatalogosObtenerTiposContacto(): CancelablePromise<CatalogoDtoIEnumerableApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Catalogos/obtener-tipos-contacto',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CatalogoDtoIEnumerableApiResponse OK
     * @throws ApiError
     */
    public static getApiCatalogosObtenerCargosEmpresa(): CancelablePromise<CatalogoDtoIEnumerableApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Catalogos/obtener-cargos-empresa',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CatalogoDtoIEnumerableApiResponse OK
     * @throws ApiError
     */
    public static getApiCatalogosObtenerTiposDireccion(): CancelablePromise<CatalogoDtoIEnumerableApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Catalogos/obtener-tipos-direccion',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CatalogoDtoIEnumerableApiResponse OK
     * @throws ApiError
     */
    public static getApiCatalogosObtenerTiposMantenimiento(): CancelablePromise<CatalogoDtoIEnumerableApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Catalogos/obtener-tipos-mantenimiento',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns CatalogoDtoIEnumerableApiResponse OK
     * @throws ApiError
     */
    public static getApiCatalogosObtenerEstadosComponente(): CancelablePromise<CatalogoDtoIEnumerableApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Catalogos/obtener-estados-componente',
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
