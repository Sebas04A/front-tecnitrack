/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContactosEmpresaResponse } from './ContactosEmpresaResponse';
import type { PaginationInfo } from './PaginationInfo';
export type ContactosEmpresaResponsePagedResponse = {
    success?: boolean;
    data?: Array<ContactosEmpresaResponse> | null;
    message?: string | null;
    timestamp?: string;
    errors?: Array<string> | null;
    pagination?: PaginationInfo;
};

