/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { MarcaInfo } from './MarcaInfo';
import type { SubtipoActivoInfo } from './SubtipoActivoInfo';
import type { TipoActivoInfo } from './TipoActivoInfo';
export type ActivoAsociadoOrdenResponse = {
    tieneActivoAsociado?: boolean;
    activoId?: number | null;
    tipoActivo?: TipoActivoInfo;
    subtipoActivo?: SubtipoActivoInfo;
    nombreComercial?: string | null;
    marca?: MarcaInfo;
    modelo?: string | null;
    numeroSerie?: string | null;
    accesorios?: string | null;
};

