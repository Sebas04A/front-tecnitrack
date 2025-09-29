/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClienteEmpresaListaResponse } from './ClienteEmpresaListaResponse';
import type { PaginationInfo } from './PaginationInfo';
export type ClienteEmpresaListaResponsePagedResponse = {
    success?: boolean;
    data?: Array<ClienteEmpresaListaResponse> | null;
    message?: string | null;
    timestamp?: string;
    errors?: Array<string> | null;
    pagination?: PaginationInfo;
};

