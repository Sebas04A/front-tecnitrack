/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MantenimientoAsignadoGridResponse } from './MantenimientoAsignadoGridResponse';
import type { PaginationInfo } from './PaginationInfo';
export type MantenimientoAsignadoGridResponsePagedResponse = {
    success?: boolean;
    data?: Array<MantenimientoAsignadoGridResponse> | null;
    message?: string | null;
    timestamp?: string;
    errors?: Array<string> | null;
    pagination?: PaginationInfo;
};

