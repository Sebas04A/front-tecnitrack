/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class DiagnosticoService {
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiDiagnosticoMigraciones(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Diagnostico/migraciones',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiDiagnosticoAplicarMigraciones(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Diagnostico/aplicar-migraciones',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiDiagnosticoCrearTablasGeograficas(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Diagnostico/crear-tablas-geograficas',
        });
    }
}
