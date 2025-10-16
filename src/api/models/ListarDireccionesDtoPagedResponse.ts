/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListarDireccionesDto } from './ListarDireccionesDto';
import type { PaginationInfo } from './PaginationInfo';
export type ListarDireccionesDtoPagedResponse = {
    success?: boolean;
    data?: Array<ListarDireccionesDto> | null;
    message?: string | null;
    timestamp?: string;
    errors?: Array<string> | null;
    pagination?: PaginationInfo;
};

