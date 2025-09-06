import { CiudadDto, LocalidadesService, PaisDto, ProvinciaDto } from '../../api'
import { Option } from '../../types/form'

function parseToSelect(data: PaisDto | ProvinciaDto | CiudadDto): Option {
    return {
        label: data.nombre ?? '',
        value: String(data.id) ?? '-1',
    }
}
function parsePaisSelect(pais: PaisDto): Option {
    return parseToSelect(pais)
}
function parsePaisesSelect(paises: PaisDto[]): Option[] {
    return paises.map(parsePaisSelect)
}
export const obtenerPaisesSelect = async (): Promise<Option[]> => {
    const res = await LocalidadesService.getApiLocalidadesObtenerPaises()
    if (!res.data) throw new Error('No se recibieron datos de países')
    return parsePaisesSelect(res.data)
}
function parseProvinciaSelect(prov: ProvinciaDto) {
    return parseToSelect(prov)
}
function parseProvinciasSelect(provincias: ProvinciaDto[]) {
    return provincias.map(parseProvinciaSelect)
}
export const obtenerProvinciasPorPaisSelect = async (paisId: number) => {
    const res = await LocalidadesService.getApiLocalidadesObtenerProvinciasPorPais({ paisId })
    if (!res.data) throw new Error('No se recibieron datos de provincias')
    return parseProvinciasSelect(res.data)
}

function parseCiudadSelect(ciudad: CiudadDto) {
    return parseToSelect(ciudad)
}
function parseCiudadesSelect(ciudades: CiudadDto[]) {
    return ciudades.map(parseCiudadSelect)
}
export const obtenerCiudadesPorProvinciaSelect = async (provinciaId: number) => {
    const res = await LocalidadesService.getApiLocalidadesObtenerCiudadesPorProvincia({
        provinciaId,
    })
    if (!res.data) throw new Error('No se recibieron datos de ciudades')
    return parseCiudadesSelect(res.data)
}
