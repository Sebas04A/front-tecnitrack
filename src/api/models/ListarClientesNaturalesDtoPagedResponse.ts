/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ListarClientesNaturalesDto } from './ListarClientesNaturalesDto';
import type { PaginationInfo } from './PaginationInfo';
export type ListarClientesNaturalesDtoPagedResponse = {
    success?: boolean;
    data?: Array<ListarClientesNaturalesDto> | null;
    message?: string | null;
    timestamp?: string;
    errors?: Array<string> | null;
    pagination?: PaginationInfo;
};

