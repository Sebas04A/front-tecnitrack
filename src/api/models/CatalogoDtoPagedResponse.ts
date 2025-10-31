/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CatalogoDto } from './CatalogoDto';
import type { PaginationInfo } from './PaginationInfo';
export type CatalogoDtoPagedResponse = {
    success?: boolean;
    data?: Array<CatalogoDto> | null;
    message?: string | null;
    timestamp?: string;
    errors?: Array<string> | null;
    pagination?: PaginationInfo;
};

