/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { ContactoDirectoResponse } from './ContactoDirectoResponse';
import type { PaginationInfo } from './PaginationInfo';
export type ContactoDirectoResponsePagedResponse = {
    success?: boolean;
    data?: Array<ContactoDirectoResponse> | null;
    message?: string | null;
    timestamp?: string;
    errors?: Array<string> | null;
    pagination?: PaginationInfo;
};

