/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { DireccionResponse } from './DireccionResponse';
import type { PaginationInfo } from './PaginationInfo';
export type DireccionResponsePagedResponse = {
    success?: boolean;
    data?: Array<DireccionResponse> | null;
    message?: string | null;
    timestamp?: string;
    errors?: Array<string> | null;
    pagination?: PaginationInfo;
};

