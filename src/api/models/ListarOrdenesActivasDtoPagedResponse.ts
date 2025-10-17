/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListarOrdenesActivasDto } from './ListarOrdenesActivasDto';
import type { PaginationInfo } from './PaginationInfo';
export type ListarOrdenesActivasDtoPagedResponse = {
    success?: boolean;
    data?: Array<ListarOrdenesActivasDto> | null;
    message?: string | null;
    timestamp?: string;
    errors?: Array<string> | null;
    pagination?: PaginationInfo;
};

