/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ActivoDto } from './ActivoDto';
import type { PaginationInfo } from './PaginationInfo';
export type ActivoDtoPagedResponse = {
    success?: boolean;
    data?: Array<ActivoDto> | null;
    message?: string | null;
    timestamp?: string;
    errors?: Array<string> | null;
    pagination?: PaginationInfo;
};

