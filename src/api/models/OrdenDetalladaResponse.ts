/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EstadoComponenteIngresoResponse } from './EstadoComponenteIngresoResponse';
import type { MantenimientoProgramadoResponse } from './MantenimientoProgramadoResponse';
export type OrdenDetalladaResponse = {
    idOrden?: number;
    numeroOrden?: string | null;
    estado?: string | null;
    fechaIngreso?: string;
    registradoPor?: string | null;
    tallerBodegaDestino?: string | null;
    observacionesIngreso?: string | null;
    accesoriosIncluidos?: string | null;
    citaId?: number;
    clienteId?: number;
    activoId?: number | null;
    motivoIngresoSegunCita?: string | null;
    tipoMantenimientoSegunCita?: string | null;
    estadosComponentes?: Array<EstadoComponenteIngresoResponse> | null;
    mantenimientoProgramado?: MantenimientoProgramadoResponse;
    fechaCreacion?: string;
    fechaModificacion?: string;
};

