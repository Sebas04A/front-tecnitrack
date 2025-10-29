/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { PaginationInfo } from './PaginationInfo';
import type { PaisDto } from './PaisDto';
export type PaisDtoPagedResponse = {
    success?: boolean;
    data?: Array<PaisDto> | null;
    message?: string | null;
    timestamp?: string;
    errors?: Array<string> | null;
    pagination?: PaginationInfo;
};

