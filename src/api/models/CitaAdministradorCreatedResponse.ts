/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EstadoCita } from './EstadoCita';
export type CitaAdministradorCreatedResponse = {
    id?: number;
    numeroCita?: string | null;
    usuarioId?: number;
    clienteId?: number;
    tipoIdentificacion?: string | null;
    numeroIdentificacion?: string | null;
    nombreCompleto?: string | null;
    tipoCliente?: string | null;
    fechaHora?: string;
    estado?: EstadoCita;
    tipoMantenimiento?: string | null;
    observaciones?: string | null;
    fechaCreacion?: string;
    fechaActualizacion?: string | null;
};

