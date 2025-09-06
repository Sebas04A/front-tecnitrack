/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { BuscarCitasAdministradorRequest } from '../models/BuscarCitasAdministradorRequest';
import type { BuscarCitasAdministradorResponseApiResponse } from '../models/BuscarCitasAdministradorResponseApiResponse';
import type { BuscarClienteEmpresaRequest } from '../models/BuscarClienteEmpresaRequest';
import type { BuscarClienteNaturalRequest } from '../models/BuscarClienteNaturalRequest';
import type { CitaAdministradorCreatedResponseApiResponse } from '../models/CitaAdministradorCreatedResponseApiResponse';
import type { CitaAdministradorResponseIEnumerableApiResponse } from '../models/CitaAdministradorResponseIEnumerableApiResponse';
import type { ClienteEmpresaDetalleResponseApiResponse } from '../models/ClienteEmpresaDetalleResponseApiResponse';
import type { ClienteEmpresaListaResponseIEnumerableApiResponse } from '../models/ClienteEmpresaListaResponseIEnumerableApiResponse';
import type { ClienteEmpresaListaResponsePagedResponse } from '../models/ClienteEmpresaListaResponsePagedResponse';
import type { ClienteNaturalDetalleResponseApiResponse } from '../models/ClienteNaturalDetalleResponseApiResponse';
import type { ClienteNaturalListaResponseIEnumerableApiResponse } from '../models/ClienteNaturalListaResponseIEnumerableApiResponse';
import type { ClienteNaturalListaResponsePagedResponse } from '../models/ClienteNaturalListaResponsePagedResponse';
import type { ClienteSelectorResponseIEnumerableApiResponse } from '../models/ClienteSelectorResponseIEnumerableApiResponse';
import type { ContactoDirectoClienteDetalleResponseListApiResponse } from '../models/ContactoDirectoClienteDetalleResponseListApiResponse';
import type { ContactoEmpresaClienteDetalleResponseListApiResponse } from '../models/ContactoEmpresaClienteDetalleResponseListApiResponse';
import type { CrearCitaAdministradorRequest } from '../models/CrearCitaAdministradorRequest';
import type { CrearClienteAdminResponseApiResponse } from '../models/CrearClienteAdminResponseApiResponse';
import type { CrearClienteEmpresaAdminRequest } from '../models/CrearClienteEmpresaAdminRequest';
import type { CrearClienteNaturalAdminRequest } from '../models/CrearClienteNaturalAdminRequest';
import type { DireccionClienteDetalleResponseListApiResponse } from '../models/DireccionClienteDetalleResponseListApiResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class AdministradorService {
    /**
     * @returns CrearClienteAdminResponseApiResponse OK
     * @throws ApiError
     */
    public static postApiAdministradorCrearClienteNatural({
        requestBody,
    }: {
        requestBody?: CrearClienteNaturalAdminRequest,
    }): CancelablePromise<CrearClienteAdminResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/administrador/crear-cliente-natural',
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
     * @returns CrearClienteAdminResponseApiResponse OK
     * @throws ApiError
     */
    public static postApiAdministradorCrearClienteEmpresa({
        requestBody,
    }: {
        requestBody?: CrearClienteEmpresaAdminRequest,
    }): CancelablePromise<CrearClienteAdminResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/administrador/crear-cliente-empresa',
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
     * @returns ClienteNaturalListaResponseIEnumerableApiResponse OK
     * @throws ApiError
     */
    public static getApiAdministradorListaClientesNaturales(): CancelablePromise<ClienteNaturalListaResponseIEnumerableApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/administrador/lista-clientes-naturales',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns ClienteEmpresaListaResponseIEnumerableApiResponse OK
     * @throws ApiError
     */
    public static getApiAdministradorListaClientesEmpresa(): CancelablePromise<ClienteEmpresaListaResponseIEnumerableApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/administrador/lista-clientes-empresa',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns ClienteNaturalListaResponsePagedResponse OK
     * @throws ApiError
     */
    public static postApiAdministradorBuscarClientesNaturales({
        requestBody,
    }: {
        requestBody?: BuscarClienteNaturalRequest,
    }): CancelablePromise<ClienteNaturalListaResponsePagedResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/administrador/buscar-clientes-naturales',
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
     * @returns ClienteEmpresaListaResponsePagedResponse OK
     * @throws ApiError
     */
    public static postApiAdministradorBuscarClientesEmpresa({
        requestBody,
    }: {
        requestBody?: BuscarClienteEmpresaRequest,
    }): CancelablePromise<ClienteEmpresaListaResponsePagedResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/administrador/buscar-clientes-empresa',
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
     * @returns ClienteNaturalDetalleResponseApiResponse OK
     * @throws ApiError
     */
    public static getApiAdministradorObtenerClienteNatural({
        clienteId,
    }: {
        clienteId: number,
    }): CancelablePromise<ClienteNaturalDetalleResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/administrador/obtener-cliente-natural/{clienteId}',
            path: {
                'clienteId': clienteId,
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
     * @returns ClienteEmpresaDetalleResponseApiResponse OK
     * @throws ApiError
     */
    public static getApiAdministradorObtenerClienteEmpresa({
        clienteId,
    }: {
        clienteId: number,
    }): CancelablePromise<ClienteEmpresaDetalleResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/administrador/obtener-cliente-empresa/{clienteId}',
            path: {
                'clienteId': clienteId,
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
     * @returns DireccionClienteDetalleResponseListApiResponse OK
     * @throws ApiError
     */
    public static getApiAdministradorObtenerDireccionesCliente({
        clienteId,
    }: {
        clienteId: number,
    }): CancelablePromise<DireccionClienteDetalleResponseListApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/administrador/obtener-direcciones-cliente/{clienteId}',
            path: {
                'clienteId': clienteId,
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
     * @returns ContactoDirectoClienteDetalleResponseListApiResponse OK
     * @throws ApiError
     */
    public static getApiAdministradorObtenerContactosDirectosCliente({
        clienteId,
    }: {
        clienteId: number,
    }): CancelablePromise<ContactoDirectoClienteDetalleResponseListApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/administrador/obtener-contactos-directos-cliente/{clienteId}',
            path: {
                'clienteId': clienteId,
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
     * @returns ContactoEmpresaClienteDetalleResponseListApiResponse OK
     * @throws ApiError
     */
    public static getApiAdministradorObtenerContactosEmpresaCliente({
        clienteId,
    }: {
        clienteId: number,
    }): CancelablePromise<ContactoEmpresaClienteDetalleResponseListApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/administrador/obtener-contactos-empresa-cliente/{clienteId}',
            path: {
                'clienteId': clienteId,
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
     * @returns CitaAdministradorResponseIEnumerableApiResponse OK
     * @throws ApiError
     */
    public static getApiAdministradorListaCitasClientes(): CancelablePromise<CitaAdministradorResponseIEnumerableApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/administrador/lista-citas-clientes',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns BuscarCitasAdministradorResponseApiResponse OK
     * @throws ApiError
     */
    public static postApiAdministradorBuscarCitasClientes({
        requestBody,
    }: {
        requestBody?: BuscarCitasAdministradorRequest,
    }): CancelablePromise<BuscarCitasAdministradorResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/administrador/buscar-citas-clientes',
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
    /**
     * @returns CitaAdministradorCreatedResponseApiResponse Created
     * @throws ApiError
     */
    public static postApiAdministradorCrearCitaCliente({
        requestBody,
    }: {
        requestBody?: CrearCitaAdministradorRequest,
    }): CancelablePromise<CitaAdministradorCreatedResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/administrador/crear-cita-cliente',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                409: `Conflict`,
                500: `Internal Server Error`,
            },
        });
    }
}
