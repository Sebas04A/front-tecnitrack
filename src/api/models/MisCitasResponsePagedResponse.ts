/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MisCitasResponse } from './MisCitasResponse';
import type { PaginationInfo } from './PaginationInfo';
export type MisCitasResponsePagedResponse = {
    success?: boolean;
    data?: Array<MisCitasResponse> | null;
    message?: string | null;
    timestamp?: string;
    errors?: Array<string> | null;
    pagination?: PaginationInfo;
};

