import {
    ActualizarClienteNaturalDto,
    CrearClienteNaturalDto,
    GestionClientesService,
    ListarClientesNaturalesDto,
} from '../../../../../../api'
import { ClienteNaturalCrud } from '../models/CrudNaturalModel'

import {
    PerfilPersonaNaturalCrudData,
    PerfilPersonaNaturalData,
} from '../../../../../../validation/perfil.schema'
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
    apiServiceCall: GestionClientesService.getApiGestionClientesListarClientesNaturales,
    sortKeyMapper: mapperPerfilNaturalDataToApi,
    dataParser: parseAdapterPersonasNaturalCrud,
    filterAdapter: (filters: any) => filters,
    entityName: 'Perfiles Naturales',
})
