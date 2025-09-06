/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
export type DireccionResponse = {
    id?: number;
    clienteId?: number;
    direccionExacta?: string | null;
    paisId?: number;
    paisNombre?: string | null;
    paisCodigoISO?: string | null;
    provinciaId?: number;
    provinciaNombre?: string | null;
    ciudadId?: number;
    ciudadNombre?: string | null;
    ciudadEsCapital?: boolean;
    codigoPostal?: string | null;
    tipoDireccion?: string | null;
    principal?: boolean;
    activo?: boolean;
    fechaCreacion?: string;
    fechaActualizacion?: string | null;
    readonly direccionCompleta?: string | null;
    readonly tipoDescripcion?: string | null;
};

