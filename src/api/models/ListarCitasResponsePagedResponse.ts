/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListarCitasResponse } from './ListarCitasResponse';
import type { PaginationInfo } from './PaginationInfo';
export type ListarCitasResponsePagedResponse = {
    success?: boolean;
    data?: Array<ListarCitasResponse> | null;
    message?: string | null;
    timestamp?: string;
    errors?: Array<string> | null;
    pagination?: PaginationInfo;
};

