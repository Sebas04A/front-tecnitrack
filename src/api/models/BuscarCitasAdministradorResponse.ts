/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CitaAdministradorResponse } from './CitaAdministradorResponse';
export type BuscarCitasAdministradorResponse = {
    citas?: Array<CitaAdministradorResponse> | null;
    totalRegistros?: number;
    pagina?: number;
    limite?: number;
    totalPaginas?: number;
    tienePaginaAnterior?: boolean;
    tienePaginaSiguiente?: boolean;
};

