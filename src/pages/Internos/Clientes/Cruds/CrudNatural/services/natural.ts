import { GestionClientesService, ListarClientesNaturalesDto } from '../../../../../../api'
import { ClienteNaturalCrud } from '../models/CrudNaturalModel'

import { createApiSearchFunction } from '../../../../../../services/generalGetWithFilters'
import {
    mapperPerfilNaturalDataToApi,
    parseAdapterPersonasNaturalCrud,
} from '../adapters/crudNatural'

export const buscarPerfilesNaturales = createApiSearchFunction<
    ClienteNaturalCrud,
    ListarClientesNaturalesDto,
    any,
    any
>({
    apiServiceCall: filters =>
        GestionClientesService.getApiGestionClientesListarClientesNaturales({
            soloActivos: false,
            ...filters,
        }),
    sortKeyMapper: mapperPerfilNaturalDataToApi,
    dataParser: parseAdapterPersonasNaturalCrud,
    filterAdapter: (filters: any) => filters,
    entityName: 'Perfiles Naturales',
})
