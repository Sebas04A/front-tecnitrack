/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActualizarCiudadDto } from '../models/ActualizarCiudadDto';
import type { ActualizarPaisDto } from '../models/ActualizarPaisDto';
import type { ActualizarProvinciaDto } from '../models/ActualizarProvinciaDto';
import type { CiudadDtoApiResponse } from '../models/CiudadDtoApiResponse';
import type { CiudadDtoPagedResponse } from '../models/CiudadDtoPagedResponse';
import type { CrearCiudadDto } from '../models/CrearCiudadDto';
import type { CrearPaisDto } from '../models/CrearPaisDto';
import type { CrearProvinciaDto } from '../models/CrearProvinciaDto';
import type { ObjectApiResponse } from '../models/ObjectApiResponse';
import type { PaisDtoApiResponse } from '../models/PaisDtoApiResponse';
import type { PaisDtoPagedResponse } from '../models/PaisDtoPagedResponse';
import type { ProvinciaDtoApiResponse } from '../models/ProvinciaDtoApiResponse';
import type { ProvinciaDtoPagedResponse } from '../models/ProvinciaDtoPagedResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class LocalidadesService {
    /**
     * @returns PaisDtoPagedResponse OK
     * @throws ApiError
     */
    public static getApiLocalidadesObtenerPaises({
        termino,
        activo,
        codigoIso,
        codigoTelefonico,
        pagina,
        limite,
        ordenarPor,
        direccionOrden,
    }: {
        termino?: string,
        activo?: boolean,
        codigoIso?: string,
        codigoTelefonico?: string,
        pagina?: number,
        limite?: number,
        ordenarPor?: string,
        direccionOrden?: string,
    }): CancelablePromise<PaisDtoPagedResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/localidades/obtener-paises',
            query: {
                'Termino': termino,
                'Activo': activo,
                'CodigoISO': codigoIso,
                'CodigoTelefonico': codigoTelefonico,
                'Pagina': pagina,
                'Limite': limite,
                'OrdenarPor': ordenarPor,
                'DireccionOrden': direccionOrden,
            },
            errors: {
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns PaisDtoApiResponse OK
     * @throws ApiError
     */
    public static getApiLocalidadesObtenerPais({
        id,
    }: {
        id: number,
    }): CancelablePromise<PaisDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/localidades/obtener-pais/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns PaisDtoApiResponse Created
     * @throws ApiError
     */
    public static postApiLocalidadesCrearPais({
        requestBody,
    }: {
        requestBody?: CrearPaisDto,
    }): CancelablePromise<PaisDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/localidades/crear-pais',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns PaisDtoApiResponse OK
     * @throws ApiError
     */
    public static putApiLocalidadesActualizarPais({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: ActualizarPaisDto,
    }): CancelablePromise<PaisDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/localidades/actualizar-pais/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static deleteApiLocalidadesEliminarPais({
        id,
    }: {
        id: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/localidades/eliminar-pais/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns ProvinciaDtoPagedResponse OK
     * @throws ApiError
     */
    public static getApiLocalidadesObtenerProvincias({
        termino,
        paisId,
        activo,
        pagina,
        limite,
        ordenarPor,
        direccionOrden,
    }: {
        termino?: string,
        paisId?: number,
        activo?: boolean,
        pagina?: number,
        limite?: number,
        ordenarPor?: string,
        direccionOrden?: string,
    }): CancelablePromise<ProvinciaDtoPagedResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/localidades/obtener-provincias',
            query: {
                'Termino': termino,
                'PaisId': paisId,
                'Activo': activo,
                'Pagina': pagina,
                'Limite': limite,
                'OrdenarPor': ordenarPor,
                'DireccionOrden': direccionOrden,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns ProvinciaDtoApiResponse OK
     * @throws ApiError
     */
    public static getApiLocalidadesObtenerProvincia({
        id,
    }: {
        id: number,
    }): CancelablePromise<ProvinciaDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/localidades/obtener-provincia/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns ProvinciaDtoApiResponse Created
     * @throws ApiError
     */
    public static postApiLocalidadesCrearProvincia({
        requestBody,
    }: {
        requestBody?: CrearProvinciaDto,
    }): CancelablePromise<ProvinciaDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/localidades/crear-provincia',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns ProvinciaDtoApiResponse OK
     * @throws ApiError
     */
    public static putApiLocalidadesActualizarProvincia({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: ActualizarProvinciaDto,
    }): CancelablePromise<ProvinciaDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/localidades/actualizar-provincia/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static deleteApiLocalidadesEliminarProvincia({
        id,
    }: {
        id: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/localidades/eliminar-provincia/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns CiudadDtoPagedResponse OK
     * @throws ApiError
     */
    public static getApiLocalidadesObtenerCiudades({
        termino,
        activo,
        provinciaId,
        paisId,
        esCapital,
        pagina,
        tamanoPagina,
        ordenarPor,
        direccionOrden,
    }: {
        termino?: string,
        activo?: boolean,
        provinciaId?: number,
        paisId?: number,
        esCapital?: boolean,
        pagina?: number,
        tamanoPagina?: number,
        ordenarPor?: string,
        direccionOrden?: string,
    }): CancelablePromise<CiudadDtoPagedResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/localidades/obtener-ciudades',
            query: {
                'Termino': termino,
                'Activo': activo,
                'ProvinciaId': provinciaId,
                'PaisId': paisId,
                'EsCapital': esCapital,
                'Pagina': pagina,
                'TamanoPagina': tamanoPagina,
                'OrdenarPor': ordenarPor,
                'DireccionOrden': direccionOrden,
            },
            errors: {
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns CiudadDtoApiResponse OK
     * @throws ApiError
     */
    public static getApiLocalidadesObtenerCiudad({
        id,
    }: {
        id: number,
    }): CancelablePromise<CiudadDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/localidades/obtener-ciudad/{id}',
            path: {
                'id': id,
            },
            errors: {
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns CiudadDtoApiResponse Created
     * @throws ApiError
     */
    public static postApiLocalidadesCrearCiudad({
        requestBody,
    }: {
        requestBody?: CrearCiudadDto,
    }): CancelablePromise<CiudadDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/localidades/crear-ciudad',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns CiudadDtoApiResponse OK
     * @throws ApiError
     */
    public static putApiLocalidadesActualizarCiudad({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: ActualizarCiudadDto,
    }): CancelablePromise<CiudadDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/localidades/actualizar-ciudad/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static deleteApiLocalidadesEliminarCiudad({
        id,
    }: {
        id: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/localidades/eliminar-ciudad/{id}',
            path: {
                'id': id,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiLocalidadesPaises(): CancelablePromise<Array<any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/localidades/paises',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiLocalidadesPaisesProvincias({
        paisId,
    }: {
        paisId: number,
    }): CancelablePromise<Array<any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/localidades/paises/{paisId}/provincias',
            path: {
                'paisId': paisId,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiLocalidadesProvinciasCiudades({
        provinciaId,
    }: {
        provinciaId: number,
    }): CancelablePromise<Array<any>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/localidades/provincias/{provinciaId}/ciudades',
            path: {
                'provinciaId': provinciaId,
            },
        });
    }
}
