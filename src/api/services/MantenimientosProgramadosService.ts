/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AsignarTecnicoRequest } from '../models/AsignarTecnicoRequest';
import type { CambiarEstadoMantenimientoRequest } from '../models/CambiarEstadoMantenimientoRequest';
import type { CancelarMantenimientoRequest } from '../models/CancelarMantenimientoRequest';
import type { CargaTecnicoResponse } from '../models/CargaTecnicoResponse';
import type { MantenimientoAsignadoGridResponsePagedResponse } from '../models/MantenimientoAsignadoGridResponsePagedResponse';
import type { ObjectApiResponse } from '../models/ObjectApiResponse';
import type { ProgramarMantenimientoRequest } from '../models/ProgramarMantenimientoRequest';
import type { ReasignarTecnicoRequest } from '../models/ReasignarTecnicoRequest';
import type { TecnicoSugeridoResponse } from '../models/TecnicoSugeridoResponse';
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';
export class MantenimientosProgramadosService {
    /**
     * @returns MantenimientoAsignadoGridResponsePagedResponse OK
     * @throws ApiError
     */
    public static getApiMantenimientosAsignados({
        tecnicoId,
        tipoActivoId,
        subTipoActivoId,
        estadoMantenimiento,
        desde,
        hasta,
        pagina,
        tamPagina,
    }: {
        tecnicoId?: number,
        tipoActivoId?: number,
        subTipoActivoId?: number,
        estadoMantenimiento?: number,
        desde?: string,
        hasta?: string,
        pagina?: number,
        tamPagina?: number,
    }): CancelablePromise<MantenimientoAsignadoGridResponsePagedResponse> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/mantenimientos/asignados',
            query: {
                'TecnicoId': tecnicoId,
                'TipoActivoId': tipoActivoId,
                'SubTipoActivoId': subTipoActivoId,
                'EstadoMantenimiento': estadoMantenimiento,
                'Desde': desde,
                'Hasta': hasta,
                'Pagina': pagina,
                'TamPagina': tamPagina,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static postApiMantenimientosAsignarTecnico({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: AsignarTecnicoRequest,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/mantenimientos/{id}/asignar-tecnico',
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
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static postApiMantenimientosReasignarTecnico({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: ReasignarTecnicoRequest,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/mantenimientos/{id}/reasignar-tecnico',
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
     * @returns ObjectApiResponse OK
     * @throws ApiError
     */
    public static postApiMantenimientosEstado({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: CambiarEstadoMantenimientoRequest,
    }): CancelablePromise<ObjectApiResponse> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/mantenimientos/{id}/estado',
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
     * @returns CargaTecnicoResponse OK
     * @throws ApiError
     */
    public static getApiMantenimientosCargaTecnicos(): CancelablePromise<Array<CargaTecnicoResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/mantenimientos/carga-tecnicos',
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns TecnicoSugeridoResponse OK
     * @throws ApiError
     */
    public static getApiMantenimientosSugerenciasTecnicos({
        subTipoActivoId,
        max = 10,
    }: {
        subTipoActivoId?: number,
        max?: number,
    }): CancelablePromise<Array<TecnicoSugeridoResponse>> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/mantenimientos/sugerencias-tecnicos',
            query: {
                'subTipoActivoId': subTipoActivoId,
                'max': max,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiMantenimientosProgramadosProgramarMantenimiento({
        ordenId,
        requestBody,
    }: {
        ordenId: number,
        requestBody?: ProgramarMantenimientoRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/MantenimientosProgramados/programar-mantenimiento/{ordenId}',
            path: {
                'ordenId': ordenId,
            },
            body: requestBody,
            mediaType: 'application/json',
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static putApiMantenimientosProgramadosActualizarMantenimiento({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: ProgramarMantenimientoRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/api/MantenimientosProgramados/{id}/actualizar-mantenimiento',
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
    public static getApiMantenimientosProgramadosObtenerMantenimiento({
        id,
    }: {
        id: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/MantenimientosProgramados/{id}/obtener-mantenimiento',
            path: {
                'id': id,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static postApiMantenimientosProgramadosCancelarMantenimiento({
        id,
        requestBody,
    }: {
        id: number,
        requestBody?: CancelarMantenimientoRequest,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/api/MantenimientosProgramados/{id}/cancelar-mantenimiento',
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
    public static getApiMantenimientosProgramadosOrdenPuedeProgramarMantenimiento({
        ordenId,
    }: {
        ordenId: number,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/MantenimientosProgramados/orden/{ordenId}/puede-programar-mantenimiento',
            path: {
                'ordenId': ordenId,
            },
        });
    }
    /**
     * @returns any OK
     * @throws ApiError
     */
    public static getApiMantenimientosProgramadosListarMantenimientos({
        estado,
        tipoMantenimiento,
    }: {
        estado?: string,
        tipoMantenimiento?: string,
    }): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/api/MantenimientosProgramados/listar-mantenimientos',
            query: {
                'estado': estado,
                'tipoMantenimiento': tipoMantenimiento,
            },
        });
    }
}
