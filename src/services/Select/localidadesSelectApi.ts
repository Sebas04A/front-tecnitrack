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
    const res = await LocalidadesService.getApiLocalidadesPaises()
    if (!res) throw new Error('No se recibieron datos de países')
    return parsePaisesSelect(res)
}
function parseProvinciaSelect(prov: ProvinciaDto) {
    return parseToSelect(prov)
}
function parseProvinciasSelect(provincias: ProvinciaDto[]) {
    return provincias.map(parseProvinciaSelect)
}
export const obtenerProvinciasPorPaisSelect = async (paisId: number) => {
    const res = await LocalidadesService.getApiLocalidadesPaisesProvincias({ paisId })
    if (!res) throw new Error('No se recibieron datos de provincias')
    return parseProvinciasSelect(res)
}

function parseCiudadSelect(ciudad: CiudadDto) {
    return parseToSelect(ciudad)
}
function parseCiudadesSelect(ciudades: CiudadDto[]) {
    return ciudades.map(parseCiudadSelect)
}
export const obtenerCiudadesPorProvinciaSelect = async (provinciaId: number) => {
    const res = await LocalidadesService.getApiLocalidadesProvinciasCiudades({ provinciaId })
    if (!res) throw new Error('No se recibieron datos de ciudades')
    return parseCiudadesSelect(res)
}
