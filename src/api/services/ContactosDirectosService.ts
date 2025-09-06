/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BooleanApiResponse } from '../models/BooleanApiResponse';
import type { ContactoDirectoRequest } from '../models/ContactoDirectoRequest';
import type { ContactoDirectoResponseApiResponse } from '../models/ContactoDirectoResponseApiResponse';
import type { ContactoDirectoResponseListApiResponse } from '../models/ContactoDirectoResponseListApiResponse';
import type { ObjectApiResponse } from '../models/ObjectApiResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ContactosDirectosService {
    /**
     * @returns ContactoDirectoResponseListApiResponse OK
     * @throws ApiError
     */
    public static getApiContactosDirectosMisContactos(): CancelablePromise<ContactoDirectoResponseListApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/contactos-directos/mis-contactos',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * @returns ContactoDirectoResponseApiResponse OK
     * @throws ApiError
     */
    public static getApiContactosDirectosObtenerContacto({
        contactoId,
    }: {
        contactoId: number,
    }): CancelablePromise<ContactoDirectoResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/contactos-directos/obtener-contacto/{contactoId}',
            path: {
                'contactoId': contactoId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
    /**
     * @returns ObjectApiResponse Created
     * @throws ApiError
     */
    public static postApiContactosDirectosAgregarContacto({
        requestBody,
    }: {
        requestBody?: ContactoDirectoRequest,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contactos-directos/agregar-contacto',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static putApiContactosDirectosActualizarContacto({
        contactoId,
        requestBody,
    }: {
        contactoId: number,
        requestBody?: ContactoDirectoRequest,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/contactos-directos/actualizar-contacto/{contactoId}',
            path: {
                'contactoId': contactoId,
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
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static deleteApiContactosDirectosEliminarContacto({
        contactoId,
    }: {
        contactoId: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/contactos-directos/eliminar-contacto/{contactoId}',
            path: {
                'contactoId': contactoId,
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
    public static patchApiContactosDirectosEstablecerPrincipal({
        contactoId,
    }: {
        contactoId: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/contactos-directos/establecer-principal/{contactoId}',
            path: {
                'contactoId': contactoId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                404: `Not Found`,
            },
        });
    }
    /**
     * @returns BooleanApiResponse OK
     * @throws ApiError
     */
    public static getApiContactosDirectosVerificarContactoPrincipal(): CancelablePromise<BooleanApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/contactos-directos/verificar-contacto-principal',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
            },
        });
    }
}
