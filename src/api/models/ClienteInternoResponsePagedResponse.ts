/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ClienteInternoResponse } from './ClienteInternoResponse';
import type { PaginationInfo } from './PaginationInfo';
export type ClienteInternoResponsePagedResponse = {
    success?: boolean;
    data?: Array<ClienteInternoResponse> | null;
    message?: string | null;
    timestamp?: string;
    errors?: Array<string> | null;
    pagination?: PaginationInfo;
};

