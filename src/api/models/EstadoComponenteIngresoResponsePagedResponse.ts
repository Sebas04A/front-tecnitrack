/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { EstadoComponenteIngresoResponse } from './EstadoComponenteIngresoResponse';
import type { PaginationInfo } from './PaginationInfo';
export type EstadoComponenteIngresoResponsePagedResponse = {
    success?: boolean;
    data?: Array<EstadoComponenteIngresoResponse> | null;
    message?: string | null;
    timestamp?: string;
    errors?: Array<string> | null;
    pagination?: PaginationInfo;
};

