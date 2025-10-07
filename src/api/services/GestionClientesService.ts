/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActualizarClienteEmpresaDto } from '../models/ActualizarClienteEmpresaDto';
import type { ActualizarClienteNaturalDto } from '../models/ActualizarClienteNaturalDto';
import type { ActualizarContactoDirectoDto } from '../models/ActualizarContactoDirectoDto';
import type { ActualizarContactoEmpresaDto } from '../models/ActualizarContactoEmpresaDto';
import type { ActualizarDireccionDto } from '../models/ActualizarDireccionDto';
import type { BusquedaClientesEmpresaResponseDtoApiResponse } from '../models/BusquedaClientesEmpresaResponseDtoApiResponse';
import type { BusquedaClientesNaturalesResponseDtoApiResponse } from '../models/BusquedaClientesNaturalesResponseDtoApiResponse';
import type { ClienteEmpresaDtoApiResponse } from '../models/ClienteEmpresaDtoApiResponse';
import type { ClienteNaturalDtoApiResponse } from '../models/ClienteNaturalDtoApiResponse';
import type { ContactoDirectoDtoApiResponse } from '../models/ContactoDirectoDtoApiResponse';
import type { ContactoEmpresaDtoApiResponse } from '../models/ContactoEmpresaDtoApiResponse';
import type { CrearClienteEmpresaDto } from '../models/CrearClienteEmpresaDto';
import type { CrearClienteEmpresaResponseDtoApiResponse } from '../models/CrearClienteEmpresaResponseDtoApiResponse';
import type { CrearClienteNaturalDto } from '../models/CrearClienteNaturalDto';
import type { CrearClienteNaturalResponseDtoApiResponse } from '../models/CrearClienteNaturalResponseDtoApiResponse';
import type { CrearContactoDirectoDto } from '../models/CrearContactoDirectoDto';
import type { CrearContactoEmpresaDto } from '../models/CrearContactoEmpresaDto';
import type { CrearDireccionDto } from '../models/CrearDireccionDto';
import type { DireccionDtoApiResponse } from '../models/DireccionDtoApiResponse';
import type { EstadoClienteResponseDtoApiResponse } from '../models/EstadoClienteResponseDtoApiResponse';
import type { ListarClientesEmpresaDtoListApiResponse } from '../models/ListarClientesEmpresaDtoListApiResponse';
import type { ListarClientesNaturalesDtoListApiResponse } from '../models/ListarClientesNaturalesDtoListApiResponse';
import type { ListarContactosDirectosDtoApiResponse } from '../models/ListarContactosDirectosDtoApiResponse';
import type { ListarContactosEmpresaDtoApiResponse } from '../models/ListarContactosEmpresaDtoApiResponse';
import type { ListarDireccionesDtoListApiResponse } from '../models/ListarDireccionesDtoListApiResponse';
import type { ObjectApiResponse } from '../models/ObjectApiResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class GestionClientesService {
    /**
     * @returns ContactoEmpresaDtoApiResponse Created
     * @throws ApiError
     */
    public static postApiGestionClientesAgregarContactoEmpresa({
        clienteId,
        requestBody,
    }: {
        clienteId: number,
        requestBody?: CrearContactoEmpresaDto,
    }): CancelablePromise<ContactoEmpresaDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/gestion-clientes/agregar-contacto-empresa/{clienteId}',
            path: {
                'clienteId': clienteId,
            },
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
     * @returns ListarContactosEmpresaDtoApiResponse OK
     * @throws ApiError
     */
    public static getApiGestionClientesListarContactosEmpresa({
        clienteId,
    }: {
        clienteId: number,
    }): CancelablePromise<ListarContactosEmpresaDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gestion-clientes/listar-contactos-empresa/{clienteId}',
            path: {
                'clienteId': clienteId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * @returns ContactoEmpresaDtoApiResponse OK
     * @throws ApiError
     */
    public static putApiGestionClientesActualizarContactoEmpresa({
        contactoId,
        requestBody,
    }: {
        contactoId: number,
        requestBody?: ActualizarContactoEmpresaDto,
    }): CancelablePromise<ContactoEmpresaDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/gestion-clientes/actualizar-contacto-empresa/{contactoId}',
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
    public static deleteApiGestionClientesEliminarContactoEmpresa({
        contactoId,
    }: {
        contactoId: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/gestion-clientes/eliminar-contacto-empresa/{contactoId}',
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
     * @returns ContactoEmpresaDtoApiResponse OK
     * @throws ApiError
     */
    public static getApiGestionClientesContactoEmpresa({
        contactoId,
    }: {
        contactoId: number,
    }): CancelablePromise<ContactoEmpresaDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gestion-clientes/contacto-empresa/{contactoId}',
            path: {
                'contactoId': contactoId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * @returns ContactoDirectoDtoApiResponse Created
     * @throws ApiError
     */
    public static postApiGestionClientesAgregarContactoDirecto({
        clienteId,
        requestBody,
    }: {
        clienteId: number,
        requestBody?: CrearContactoDirectoDto,
    }): CancelablePromise<ContactoDirectoDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/gestion-clientes/agregar-contacto-directo/{clienteId}',
            path: {
                'clienteId': clienteId,
            },
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
     * @returns ListarContactosDirectosDtoApiResponse OK
     * @throws ApiError
     */
    public static getApiGestionClientesListarContactosDirectos({
        clienteId,
    }: {
        clienteId: number,
    }): CancelablePromise<ListarContactosDirectosDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gestion-clientes/listar-contactos-directos/{clienteId}',
            path: {
                'clienteId': clienteId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * @returns ContactoDirectoDtoApiResponse OK
     * @throws ApiError
     */
    public static putApiGestionClientesActualizarContactoDirecto({
        contactoId,
        requestBody,
    }: {
        contactoId: number,
        requestBody?: ActualizarContactoDirectoDto,
    }): CancelablePromise<ContactoDirectoDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/gestion-clientes/actualizar-contacto-directo/{contactoId}',
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
    public static deleteApiGestionClientesEliminarContactoDirecto({
        contactoId,
    }: {
        contactoId: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/gestion-clientes/eliminar-contacto-directo/{contactoId}',
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
     * @returns ContactoDirectoDtoApiResponse OK
     * @throws ApiError
     */
    public static getApiGestionClientesContactoDirecto({
        contactoId,
    }: {
        contactoId: number,
    }): CancelablePromise<ContactoDirectoDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gestion-clientes/contacto-directo/{contactoId}',
            path: {
                'contactoId': contactoId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * @returns DireccionDtoApiResponse Created
     * @throws ApiError
     */
    public static postApiGestionClientesAgregarDireccion({
        clienteId,
        requestBody,
    }: {
        clienteId: number,
        requestBody?: CrearDireccionDto,
    }): CancelablePromise<DireccionDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/gestion-clientes/agregar-direccion/{clienteId}',
            path: {
                'clienteId': clienteId,
            },
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
     * @returns ListarDireccionesDtoListApiResponse OK
     * @throws ApiError
     */
    public static getApiGestionClientesListarDirecciones({
        clienteId,
    }: {
        clienteId: number,
    }): CancelablePromise<ListarDireccionesDtoListApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gestion-clientes/listar-direcciones/{clienteId}',
            path: {
                'clienteId': clienteId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * @returns DireccionDtoApiResponse OK
     * @throws ApiError
     */
    public static putApiGestionClientesActualizarDireccion({
        direccionId,
        requestBody,
    }: {
        direccionId: number,
        requestBody?: ActualizarDireccionDto,
    }): CancelablePromise<DireccionDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/gestion-clientes/actualizar-direccion/{direccionId}',
            path: {
                'direccionId': direccionId,
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
    public static deleteApiGestionClientesEliminarDireccion({
        direccionId,
    }: {
        direccionId: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/gestion-clientes/eliminar-direccion/{direccionId}',
            path: {
                'direccionId': direccionId,
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
     * @returns DireccionDtoApiResponse OK
     * @throws ApiError
     */
    public static getApiGestionClientesDireccion({
        direccionId,
    }: {
        direccionId: number,
    }): CancelablePromise<DireccionDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gestion-clientes/direccion/{direccionId}',
            path: {
                'direccionId': direccionId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * @returns BusquedaClientesNaturalesResponseDtoApiResponse OK
     * @throws ApiError
     */
    public static getApiGestionClientesBuscarClientesNaturales({
        termino,
        pagina = 1,
        tamanoPagina = 10,
        ordenarPor = 'fechaCreacion',
        direccion = 'desc',
        soloActivos = true,
    }: {
        termino?: string,
        pagina?: number,
        tamanoPagina?: number,
        ordenarPor?: string,
        direccion?: string,
        soloActivos?: boolean,
    }): CancelablePromise<BusquedaClientesNaturalesResponseDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gestion-clientes/buscar-clientes-naturales',
            query: {
                'termino': termino,
                'pagina': pagina,
                'tamanoPagina': tamanoPagina,
                'ordenarPor': ordenarPor,
                'direccion': direccion,
                'soloActivos': soloActivos,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * @returns CrearClienteNaturalResponseDtoApiResponse Created
     * @throws ApiError
     */
    public static postApiGestionClientesCrearClienteNatural({
        requestBody,
    }: {
        requestBody?: CrearClienteNaturalDto,
    }): CancelablePromise<CrearClienteNaturalResponseDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/gestion-clientes/crear-cliente-natural',
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
     * @returns ListarClientesNaturalesDtoListApiResponse OK
     * @throws ApiError
     */
    public static getApiGestionClientesListarClientesNaturales(): CancelablePromise<ListarClientesNaturalesDtoListApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gestion-clientes/listar-clientes-naturales',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * @returns ClienteNaturalDtoApiResponse OK
     * @throws ApiError
     */
    public static putApiGestionClientesActualizarClienteNatural({
        clienteId,
        requestBody,
    }: {
        clienteId: number,
        requestBody?: ActualizarClienteNaturalDto,
    }): CancelablePromise<ClienteNaturalDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/gestion-clientes/actualizar-cliente-natural/{clienteId}',
            path: {
                'clienteId': clienteId,
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
    public static deleteApiGestionClientesEliminarClienteNatural({
        clienteId,
    }: {
        clienteId: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/gestion-clientes/eliminar-cliente-natural/{clienteId}',
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
     * @returns ClienteNaturalDtoApiResponse OK
     * @throws ApiError
     */
    public static getApiGestionClientesClienteNatural({
        clienteId,
    }: {
        clienteId: number,
    }): CancelablePromise<ClienteNaturalDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gestion-clientes/cliente-natural/{clienteId}',
            path: {
                'clienteId': clienteId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * @returns BusquedaClientesEmpresaResponseDtoApiResponse OK
     * @throws ApiError
     */
    public static getApiGestionClientesBuscarClientesEmpresa({
        termino,
        pagina = 1,
        tamanoPagina = 10,
        ordenarPor = 'fechaCreacion',
        direccion = 'desc',
        soloActivos = true,
    }: {
        termino?: string,
        pagina?: number,
        tamanoPagina?: number,
        ordenarPor?: string,
        direccion?: string,
        soloActivos?: boolean,
    }): CancelablePromise<BusquedaClientesEmpresaResponseDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gestion-clientes/buscar-clientes-empresa',
            query: {
                'termino': termino,
                'pagina': pagina,
                'tamanoPagina': tamanoPagina,
                'ordenarPor': ordenarPor,
                'direccion': direccion,
                'soloActivos': soloActivos,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * @returns CrearClienteEmpresaResponseDtoApiResponse Created
     * @throws ApiError
     */
    public static postApiGestionClientesCrearClienteEmpresa({
        requestBody,
    }: {
        requestBody?: CrearClienteEmpresaDto,
    }): CancelablePromise<CrearClienteEmpresaResponseDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/gestion-clientes/crear-cliente-empresa',
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
     * @returns ListarClientesEmpresaDtoListApiResponse OK
     * @throws ApiError
     */
    public static getApiGestionClientesListarClientesEmpresa(): CancelablePromise<ListarClientesEmpresaDtoListApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gestion-clientes/listar-clientes-empresa',
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
            },
        });
    }
    /**
     * @returns ClienteEmpresaDtoApiResponse OK
     * @throws ApiError
     */
    public static putApiGestionClientesActualizarClienteEmpresa({
        clienteId,
        requestBody,
    }: {
        clienteId: number,
        requestBody?: ActualizarClienteEmpresaDto,
    }): CancelablePromise<ClienteEmpresaDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/gestion-clientes/actualizar-cliente-empresa/{clienteId}',
            path: {
                'clienteId': clienteId,
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
    public static deleteApiGestionClientesEliminarClienteEmpresa({
        clienteId,
    }: {
        clienteId: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/gestion-clientes/eliminar-cliente-empresa/{clienteId}',
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
     * @returns ClienteEmpresaDtoApiResponse OK
     * @throws ApiError
     */
    public static getApiGestionClientesClienteEmpresa({
        clienteId,
    }: {
        clienteId: number,
    }): CancelablePromise<ClienteEmpresaDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/gestion-clientes/cliente-empresa/{clienteId}',
            path: {
                'clienteId': clienteId,
            },
            errors: {
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
            },
        });
    }
    /**
     * @returns EstadoClienteResponseDtoApiResponse OK
     * @throws ApiError
     */
    public static patchApiGestionClientesDesactivarCliente({
        clienteId,
    }: {
        clienteId: number,
    }): CancelablePromise<EstadoClienteResponseDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/gestion-clientes/desactivar-cliente/{clienteId}',
            path: {
                'clienteId': clienteId,
            },
            errors: {
                400: `Bad Request`,
                401: `Unauthorized`,
                403: `Forbidden`,
                404: `Not Found`,
                409: `Conflict`,
            },
        });
    }
    /**
     * @returns EstadoClienteResponseDtoApiResponse OK
     * @throws ApiError
     */
    public static patchApiGestionClientesActivarCliente({
        clienteId,
    }: {
        clienteId: number,
    }): CancelablePromise<EstadoClienteResponseDtoApiResponse> {
        return __request(OpenAPI, {
            method: 'PATCH',
            url: '/api/gestion-clientes/activar-cliente/{clienteId}',
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
}
