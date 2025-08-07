/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { RolRequest } from '../models/RolRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class RolesService {
    /**
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static postCrear(
        requestBody?: RolRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/crear',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @param id
     * @param requestBody
     * @returns void
     * @throws ApiError
     */
    public static putActualizar(
        id: number,
        requestBody?: RolRequest,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/actualizar/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteEliminar(
        id: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/eliminar/{id}',
            path: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @param rolId
     * @param id
     * @param userId
     * @returns void
     * @throws ApiError
     */
    public static postAsignar(
        rolId: number,
        id: string,
        userId?: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/asignar/{id}/{rolId}',
            path: {
                'rolId': rolId,
                'id': id,
            },
            query: {
                'userId': userId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @param rolId
     * @param username
     * @param id
     * @returns void
     * @throws ApiError
     */
    public static deleteRemover(
        rolId: number,
        username: string,
        id?: number,
    ): CancelablePromise<void> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/remover/{username}/{rolId}',
            path: {
                'rolId': rolId,
                'username': username,
            },
            query: {
                'id': id,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
}
