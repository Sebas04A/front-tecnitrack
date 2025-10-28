/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type EditarMantenimientoProgramadoRequest = {
    tipoMantenimiento: string;
    prioridad: string;
    requiereAprobacionCliente?: boolean;
    descripcionDelProblema: string;
    condicionGeneral: string;
    observaciones?: string | null;
    tecnicoAsignadoId?: number | null;
};

