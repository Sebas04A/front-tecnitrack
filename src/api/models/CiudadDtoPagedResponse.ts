/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CiudadDto } from './CiudadDto';
import type { PaginationInfo } from './PaginationInfo';
export type CiudadDtoPagedResponse = {
    success?: boolean;
    data?: Array<CiudadDto> | null;
    message?: string | null;
    timestamp?: string;
    errors?: Array<string> | null;
    pagination?: PaginationInfo;
};

