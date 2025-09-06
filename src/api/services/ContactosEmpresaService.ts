/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContactosEmpresaRequest } from '../models/ContactosEmpresaRequest';
import type { ContactosEmpresaResponseApiResponse } from '../models/ContactosEmpresaResponseApiResponse';
import type { ContactosEmpresaResponseListApiResponse } from '../models/ContactosEmpresaResponseListApiResponse';
import type { ObjectApiResponse } from '../models/ObjectApiResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class ContactosEmpresaService {
    /**
     * @returns ContactosEmpresaResponseListApiResponse OK
     * @throws ApiError
     */
    public static getApiContactosEmpresaMisContactosEmpresa(): CancelablePromise<ContactosEmpresaResponseListApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/contactos-empresa/mis-contactos-empresa',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * @returns ContactosEmpresaResponseApiResponse OK
     * @throws ApiError
     */
    public static getApiContactosEmpresaObtenerContactoEmpresa({
        contactoId,
    }: {
        contactoId: number,
    }): CancelablePromise<ContactosEmpresaResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/contactos-empresa/obtener-contacto-empresa/{contactoId}',
            path: {
                'contactoId': contactoId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * @returns ObjectApiResponse Created
     * @throws ApiError
     */
    public static postApiContactosEmpresaAgregarContactoEmpresa({
        requestBody,
    }: {
        requestBody?: ContactosEmpresaRequest,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/contactos-empresa/agregar-contacto-empresa',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static putApiContactosEmpresaActualizarContactoEmpresa({
        contactoId,
        requestBody,
    }: {
        contactoId: number,
        requestBody?: ContactosEmpresaRequest,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/contactos-empresa/actualizar-contacto-empresa/{contactoId}',
            path: {
                'contactoId': contactoId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static deleteApiContactosEmpresaEliminarContactoEmpresa({
        contactoId,
    }: {
        contactoId: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/contactos-empresa/eliminar-contacto-empresa/{contactoId}',
            path: {
                'contactoId': contactoId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
}
