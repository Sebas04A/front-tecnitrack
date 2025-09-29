/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type MantenimientoProgramadoResponse = {
    id?: number;
    ordenId?: number;
    tipoMantenimiento?: string | null;
    prioridad?: string | null;
    descripcionDelProblema?: string | null;
    condicionGeneral?: string | null;
    tecnicoAsignadoId?: number | null;
    tecnicoAsignado?: string | null;
    estadoMantenimiento?: number;
    estadoMantenimientoNombre?: string | null;
    fechaAsignacion?: string | null;
    observaciones?: string | null;
    requiereAprobacionCliente?: boolean;
    fechaCreacion?: string;
    fechaModificacion?: string;
};

