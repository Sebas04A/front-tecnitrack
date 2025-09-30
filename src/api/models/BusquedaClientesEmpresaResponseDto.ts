/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClienteEmpresaBusquedaDto } from './ClienteEmpresaBusquedaDto';
import type { FiltrosAplicadosEmpresaDto } from './FiltrosAplicadosEmpresaDto';
import type { PaginacionInfoEmpresaDto } from './PaginacionInfoEmpresaDto';
export type BusquedaClientesEmpresaResponseDto = {
    clientes?: Array<ClienteEmpresaBusquedaDto> | null;
    paginacion?: PaginacionInfoEmpresaDto;
    filtros?: FiltrosAplicadosEmpresaDto;
};

