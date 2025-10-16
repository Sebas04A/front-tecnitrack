/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActivoDtoPagedResponse } from '../models/ActivoDtoPagedResponse';
import type { ActualizarEstadoComponenteRequest } from '../models/ActualizarEstadoComponenteRequest';
import type { AgregarDatosFaltantesOrdenRequest } from '../models/AgregarDatosFaltantesOrdenRequest';
import type { AsociarActivoOrdenRequest } from '../models/AsociarActivoOrdenRequest';
import type { BuscarInspectorMantenimientoRequest } from '../models/BuscarInspectorMantenimientoRequest';
import type { BuscarTecnicoMantenimientoRequest } from '../models/BuscarTecnicoMantenimientoRequest';
import type { CatalogoDtoIEnumerableApiResponse } from '../models/CatalogoDtoIEnumerableApiResponse';
import type { ClienteInternoResponsePagedResponse } from '../models/ClienteInternoResponsePagedResponse';
import type { ComponenteDisponibleResponseListApiResponse } from '../models/ComponenteDisponibleResponseListApiResponse';
import type { CrearActivoYAsociarRequest } from '../models/CrearActivoYAsociarRequest';
import type { CrearOrdenConNumeroRequest } from '../models/CrearOrdenConNumeroRequest';
import type { EstadoComponenteIngresoResponseApiResponse } from '../models/EstadoComponenteIngresoResponseApiResponse';
import type { EstadoComponenteIngresoResponsePagedResponse } from '../models/EstadoComponenteIngresoResponsePagedResponse';
import type { InformacionPreviaOrdenResponseApiResponse } from '../models/InformacionPreviaOrdenResponseApiResponse';
import type { InspectorOrdenResponseApiResponse } from '../models/InspectorOrdenResponseApiResponse';
import type { ObjectApiResponse } from '../models/ObjectApiResponse';
import type { OrdenDetalladaResponseApiResponse } from '../models/OrdenDetalladaResponseApiResponse';
import type { OrdenResponseApiResponse } from '../models/OrdenResponseApiResponse';
import type { ProgramarMantenimientoRequest } from '../models/ProgramarMantenimientoRequest';
import type { RegistrarEstadoComponenteRequest } from '../models/RegistrarEstadoComponenteRequest';
import type { RegistrarEstadosComponentesRequest } from '../models/RegistrarEstadosComponentesRequest';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class OrdenesService {
    /**
     * @returns OrdenResponseApiResponse Created
     * @throws ApiError
     */
    public static postApiOrdenesCrearOrdenConNumero({
        requestBody,
    }: {
        requestBody?: CrearOrdenConNumeroRequest,
    }): CancelablePromise<OrdenResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Ordenes/crear-orden-con-numero',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns OrdenResponseApiResponse OK
     * @throws ApiError
     */
    public static putApiOrdenesAgregarDatosOrden({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: AgregarDatosFaltantesOrdenRequest,
    }): CancelablePromise<OrdenResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Ordenes/agregar-datos-orden/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns OrdenResponseApiResponse OK
     * @throws ApiError
     */
    public static postApiOrdenesAsociarActivo({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: AsociarActivoOrdenRequest,
    }): CancelablePromise<OrdenResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Ordenes/asociar-activo/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns OrdenResponseApiResponse OK
     * @throws ApiError
     */
    public static postApiOrdenesCrearActivoYAsociar({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: CrearActivoYAsociarRequest,
    }): CancelablePromise<OrdenResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Ordenes/crear-activo-y-asociar/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns OrdenDetalladaResponseApiResponse OK
     * @throws ApiError
     */
    public static postApiOrdenesRegistrarEstadosComponentes({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: RegistrarEstadosComponentesRequest,
    }): CancelablePromise<OrdenDetalladaResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Ordenes/registrar-estados-componentes/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns OrdenDetalladaResponseApiResponse OK
     * @throws ApiError
     */
    public static postApiOrdenesProgramarMantenimiento({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: ProgramarMantenimientoRequest,
    }): CancelablePromise<OrdenDetalladaResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Ordenes/programar-mantenimiento/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns InformacionPreviaOrdenResponseApiResponse OK
     * @throws ApiError
     */
    public static getApiOrdenesObtenerInformacionPreviaCita({
        citaId,
    }: {
        citaId: number,
    }): CancelablePromise<InformacionPreviaOrdenResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Ordenes/obtener-informacion-previa-cita/{citaId}',
            path: {
                'citaId': citaId,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns OrdenResponseApiResponse OK
     * @throws ApiError
     */
    public static getApiOrdenesObtenerOrden({
        id,
    }: {
        id: number,
    }): CancelablePromise<OrdenResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Ordenes/obtener-orden/{id}',
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
     * @returns InspectorOrdenResponseApiResponse OK
     * @throws ApiError
     */
    public static getApiOrdenesObtenerInspectorOrden({
        id,
    }: {
        id: number,
    }): CancelablePromise<InspectorOrdenResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Ordenes/obtener-inspector-orden/{id}',
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
     * @returns ActivoDtoPagedResponse OK
     * @throws ApiError
     */
    public static getApiOrdenesBuscarActivosOrden({
        ordenId,
        filtroTexto,
        tipoId,
        marcaId,
        pagina = 1,
        porPagina = 20,
    }: {
        ordenId: number,
        filtroTexto?: string,
        tipoId?: number,
        marcaId?: number,
        pagina?: number,
        porPagina?: number,
    }): CancelablePromise<ActivoDtoPagedResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Ordenes/buscar-activos-orden/{ordenId}',
            path: {
                'ordenId': ordenId,
            },
            query: {
                'filtroTexto': filtroTexto,
                'tipoId': tipoId,
                'marcaId': marcaId,
                'pagina': pagina,
                'porPagina': porPagina,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static getApiOrdenesObtenerNombreClienteLogueado(): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Ordenes/obtener-nombre-cliente-logueado',
            errors: {
                401: `Unauthorized`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns ComponenteDisponibleResponseListApiResponse OK
     * @throws ApiError
     */
    public static getApiOrdenesObtenerComponentesDisponiblesOrden({
        ordenId,
    }: {
        ordenId: number,
    }): CancelablePromise<ComponenteDisponibleResponseListApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Ordenes/obtener-componentes-disponibles-orden/{ordenId}',
            path: {
                'ordenId': ordenId,
            },
            errors: {
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns EstadoComponenteIngresoResponsePagedResponse OK
     * @throws ApiError
     */
    public static getApiOrdenesObtenerEstadosComponentesOrden({
        ordenId,
        termino,
        pagina = 1,
        limite = 10,
        ordenarPor = 'SeveridadDaño',
        direccionOrden = 'desc',
    }: {
        ordenId: number,
        termino?: string,
        pagina?: number,
        limite?: number,
        ordenarPor?: string,
        direccionOrden?: string,
    }): CancelablePromise<EstadoComponenteIngresoResponsePagedResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Ordenes/obtener-estados-componentes-orden/{ordenId}',
            path: {
                'ordenId': ordenId,
            },
            query: {
                'termino': termino,
                'pagina': pagina,
                'limite': limite,
                'ordenarPor': ordenarPor,
                'direccionOrden': direccionOrden,
            },
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns EstadoComponenteIngresoResponseApiResponse Created
     * @throws ApiError
     */
    public static postApiOrdenesCrearEstadoComponenteOrden({
        ordenId,
        requestBody,
    }: {
        ordenId: number,
        requestBody?: RegistrarEstadoComponenteRequest,
    }): CancelablePromise<EstadoComponenteIngresoResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Ordenes/crear-estado-componente-orden/{ordenId}',
            path: {
                'ordenId': ordenId,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns EstadoComponenteIngresoResponseApiResponse OK
     * @throws ApiError
     */
    public static getApiOrdenesObtenerEstadoComponente({
        id,
    }: {
        id: number,
    }): CancelablePromise<EstadoComponenteIngresoResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Ordenes/obtener-estado-componente/{id}',
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
     * @returns EstadoComponenteIngresoResponseApiResponse OK
     * @throws ApiError
     */
    public static putApiOrdenesActualizarEstadoComponente({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: ActualizarEstadoComponenteRequest,
    }): CancelablePromise<EstadoComponenteIngresoResponseApiResponse> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/Ordenes/actualizar-estado-componente/{id}',
            path: {
                'id': id,
            },
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static deleteApiOrdenesEliminarEstadoComponente({
        id,
    }: {
        id: number,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/api/Ordenes/eliminar-estado-componente/{id}',
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
     * @returns ClienteInternoResponsePagedResponse OK
     * @throws ApiError
     */
    public static postApiOrdenesBuscarTecnicosMantenimiento({
        requestBody,
    }: {
        requestBody?: BuscarTecnicoMantenimientoRequest,
    }): CancelablePromise<ClienteInternoResponsePagedResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Ordenes/buscar-tecnicos-mantenimiento',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns CatalogoDtoIEnumerableApiResponse OK
     * @throws ApiError
     */
    public static getApiOrdenesObtenerTalleresBodegas(): CancelablePromise<CatalogoDtoIEnumerableApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Ordenes/obtener-talleres-bodegas',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns ClienteInternoResponsePagedResponse OK
     * @throws ApiError
     */
    public static postApiOrdenesBuscarInspectoresMantenimiento({
        requestBody,
    }: {
        requestBody?: BuscarInspectorMantenimientoRequest,
    }): CancelablePromise<ClienteInternoResponsePagedResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/Ordenes/buscar-inspectores-mantenimiento',
            body: requestBody,
            mediaType: 'application/json',
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static getApiOrdenesObtenerOrdenes({
        pagina = 1,
        registrosPorPagina = 10,
        estado,
        fechaDesde,
        fechaHasta,
        clienteId,
        activoId,
        numeroOrden,
        termino,
    }: {
        pagina?: number,
        registrosPorPagina?: number,
        estado?: string,
        fechaDesde?: string,
        fechaHasta?: string,
        clienteId?: number,
        activoId?: number,
        numeroOrden?: string,
        termino?: string,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/Ordenes/obtener-ordenes',
            query: {
                'pagina': pagina,
                'registrosPorPagina': registrosPorPagina,
                'estado': estado,
                'fechaDesde': fechaDesde,
                'fechaHasta': fechaHasta,
                'clienteId': clienteId,
                'activoId': activoId,
                'numeroOrden': numeroOrden,
                'termino': termino,
            },
            errors: {
                400: `Bad Request`,
                500: `Internal Server Error`,
            },
        });
    }
}
