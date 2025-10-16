/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContactoDirectoDto } from './ContactoDirectoDto';
import type { PaginationInfo } from './PaginationInfo';
export type ContactoDirectoDtoPagedResponse = {
    success?: boolean;
    data?: Array<ContactoDirectoDto> | null;
    message?: string | null;
    timestamp?: string;
    errors?: Array<string> | null;
    pagination?: PaginationInfo;
};

