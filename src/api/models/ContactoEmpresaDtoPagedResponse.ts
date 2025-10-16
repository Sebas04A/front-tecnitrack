/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContactoEmpresaDto } from './ContactoEmpresaDto';
import type { PaginationInfo } from './PaginationInfo';
export type ContactoEmpresaDtoPagedResponse = {
    success?: boolean;
    data?: Array<ContactoEmpresaDto> | null;
    message?: string | null;
    timestamp?: string;
    errors?: Array<string> | null;
    pagination?: PaginationInfo;
};

