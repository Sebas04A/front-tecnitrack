/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListarClientesEmpresaDto } from './ListarClientesEmpresaDto';
import type { PaginationInfo } from './PaginationInfo';
export type ListarClientesEmpresaDtoPagedResponse = {
    success?: boolean;
    data?: Array<ListarClientesEmpresaDto> | null;
    message?: string | null;
    timestamp?: string;
    errors?: Array<string> | null;
    pagination?: PaginationInfo;
};

