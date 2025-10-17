// crud-helpers.ts
export type CrudPage<T> = { items: T[]; total: number }

const normalize = (s: unknown): string =>
    String(s ?? '')
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '')
        .toLowerCase()
        .trim()

// ==================== SISTEMA DE FILTROS ====================

export type FilterOperator =
    | 'equals'
    | 'not_equals'
    | 'contains'
    | 'not_contains'
    | 'starts_with'
    | 'ends_with'
    | 'gt'
    | 'gte'
    | 'lt'
    | 'lte'
    | 'in'
    | 'not_in'
    | 'between'
    | 'is_null'
    | 'is_not_null'
    | 'is_empty'
    | 'is_not_empty'

export type FilterValue =
    | string
    | number
    | Date
    | boolean
    | null
    | undefined
    | (string | number | Date)[]

export interface Filter<T = any> {
    key: keyof T
    operator: FilterOperator
    value?: FilterValue
    caseSensitive?: boolean
}

// ==================== BUILDER DE FILTROS ====================

export class FilterBuilder<T> {
    private filters: Filter<T>[] = []

    // Métodos de igualdad
    equals(key: keyof T, value: FilterValue): FilterBuilder<T> {
        // console.log('🔧 FilterBuilder.equals:', { key: String(key), value })
        this.filters.push({ key, operator: 'equals', value })
        return this
    }

    // Métodos de comparación numérica/fechas
    greaterThanOrEqual(key: keyof T, value: number | Date | string): FilterBuilder<T> {
        // console.log('🔧 FilterBuilder.greaterThanOrEqual:', { key: String(key), value })
        this.filters.push({ key, operator: 'gte', value })
        return this
    }

    lessThanOrEqual(key: keyof T, value: number | Date | string): FilterBuilder<T> {
        // console.log('🔧 FilterBuilder.lessThanOrEqual:', { key: String(key), value })
        this.filters.push({ key, operator: 'lte', value })
        return this
    }

    // Métodos condicionales para facilitar uso
    when(
        condition: boolean,
        callback: (builder: FilterBuilder<T>) => FilterBuilder<T>
    ): FilterBuilder<T> {
        // console.log('🔧 FilterBuilder.when:', { condition })
        return condition ? callback(this) : this
    }

    whenValue<V>(
        value: V | null | undefined,
        callback: (builder: FilterBuilder<T>, value: NonNullable<V>) => FilterBuilder<T>
    ): FilterBuilder<T> {
        const hasValue = value !== null && value !== undefined && value !== ''
        // console.log('🔧 FilterBuilder.whenValue:', { value, hasValue })
        return hasValue ? callback(this, value as NonNullable<V>) : this
    }

    // Método para obtener los filtros
    build(): Filter<T>[] {
        // console.log(
        //     '🔧 FilterBuilder.build() - Final filters:',
        //     JSON.stringify(this.filters, null, 2)
        // )
        return [...this.filters]
    }
}

// ==================== FUNCIONES DE UTILIDAD ====================

export function createFilter<T>(): FilterBuilder<T> {
    return new FilterBuilder<T>()
}

// Helper para convertir valores a Date cuando sea necesario
function parseValue(value: unknown): unknown {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}/.test(value)) {
        const date = new Date(value)
        return isNaN(date.getTime()) ? value : date
    }
    return value
}

// Comparador de valores
function compareValues(a: unknown, b: unknown): number {
    const valA = parseValue(a)
    const valB = parseValue(b)

    if (valA instanceof Date && valB instanceof Date) {
        return valA.getTime() - valB.getTime()
    }

    if (typeof valA === 'number' && typeof valB === 'number') {
        return valA - valB
    }

    const strA = String(valA)
    const strB = String(valB)
    return strA.localeCompare(strB)
}

// Aplicador de filtros individual
function applyFilter<T>(item: T, filter: Filter<T>): boolean {
    const { key, operator, value, caseSensitive = false } = filter
    const itemValue = item[key]

    switch (operator) {
        case 'equals':
            return itemValue === value

        case 'not_equals':
            return itemValue !== value

        case 'contains': {
            const itemStr = caseSensitive ? String(itemValue) : normalize(itemValue)
            const valueStr = caseSensitive ? String(value) : normalize(value)
            return itemStr.includes(valueStr)
        }

        case 'not_contains': {
            const itemStr = caseSensitive ? String(itemValue) : normalize(itemValue)
            const valueStr = caseSensitive ? String(value) : normalize(value)
            return !itemStr.includes(valueStr)
        }

        case 'starts_with': {
            const itemStr = caseSensitive ? String(itemValue) : normalize(itemValue)
            const valueStr = caseSensitive ? String(value) : normalize(value)
            return itemStr.startsWith(valueStr)
        }

        case 'ends_with': {
            const itemStr = caseSensitive ? String(itemValue) : normalize(itemValue)
            const valueStr = caseSensitive ? String(value) : normalize(value)
            return itemStr.endsWith(valueStr)
        }

        case 'gt':
            return compareValues(itemValue, value) > 0

        case 'gte':
            return compareValues(itemValue, value) >= 0

        case 'lt':
            return compareValues(itemValue, value) < 0

        case 'lte':
            return compareValues(itemValue, value) <= 0

        case 'between': {
            if (!Array.isArray(value) || value.length !== 2) return false
            const [min, max] = value
            return compareValues(itemValue, min) >= 0 && compareValues(itemValue, max) <= 0
        }

        case 'in': {
            if (!Array.isArray(value)) return false
            return value.some(v => itemValue === v)
        }

        case 'not_in': {
            if (!Array.isArray(value)) return false
            return !value.some(v => itemValue === v)
        }

        case 'is_null':
            return itemValue === null || itemValue === undefined

        case 'is_not_null':
            return itemValue !== null && itemValue !== undefined

        case 'is_empty':
            return itemValue === null || itemValue === undefined || String(itemValue).trim() === ''

        case 'is_not_empty':
            return itemValue !== null && itemValue !== undefined && String(itemValue).trim() !== ''

        default:
            return true
    }
}

// ==================== FETCHER PRINCIPAL ====================

type MakeLocalCrudFetcherOptions<T> = {
    getAll: ({ any }: any) => Promise<T[]>
    searchKeys?: (keyof T)[]
}

type FetchParams<T> = {
    page: number
    pageSize: number
    search?: string
    filters?: Filter<T>[]
}

export type FetcherFunctionType<T> = (fetchParams: any) => Promise<CrudPage<T>>

export function makeLocalCrudFetcher<T>({
    getAll,
    searchKeys = [],
}: MakeLocalCrudFetcherOptions<T>): FetcherFunctionType<T> {
    return async ({
        page,
        pageSize,
        search = '',
        filters = [],
    }: FetchParams<T>): Promise<CrudPage<T>> => {
        try {
            const data = await getAll()
            console.log('Datos obtenidos:', data)
            // console.warn('Datos obtenidos:', data)

            // Aplicar búsqueda de texto
            const q = normalize(search)
            console.log('Texto de búsqueda:', q, 'en ', searchKeys)
            let filtered = q
                ? data.filter(row => searchKeys.some(k => normalize(row[k]).includes(q)))
                : data
            // console.warn('Datos después de búsqueda:', filtered)

            // Aplicar filtros
            if (filters.length > 0) {
                filtered = filtered.filter(item =>
                    filters.every(filter => applyFilter(item, filter))
                )
            }
            // console.warn('Datos después de filtros:', filtered)

            // Paginación
            const size = Math.max(1, pageSize | 0)
            const currentPage = Math.max(1, page | 0)
            const start = (currentPage - 1) * size
            // console.warn('Paginación:', { size, currentPage, start })

            return {
                items: filtered.slice(start, start + size),
                total: filtered.length,
            }
        } catch (err) {
            console.error('Error fetching data:', err)
            return { items: [], total: 0 }
        }
    }
}
