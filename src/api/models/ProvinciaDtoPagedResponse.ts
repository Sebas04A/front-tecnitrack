/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginationInfo } from './PaginationInfo';
import type { ProvinciaDto } from './ProvinciaDto';
export type ProvinciaDtoPagedResponse = {
    success?: boolean;
    data?: Array<ProvinciaDto> | null;
    message?: string | null;
    timestamp?: string;
    errors?: Array<string> | null;
    pagination?: PaginationInfo;
};

