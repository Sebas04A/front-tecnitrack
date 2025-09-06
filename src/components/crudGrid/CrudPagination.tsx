import React from 'react'

interface CrudPaginationProps {
    page: number
    pageSize: number
    total: number
    onChange: (page: number) => void
}

export const CrudPagination: React.FC<CrudPaginationProps> = ({
    page,
    pageSize,
    total,
    onChange,
}) => {
    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    const canPrev = page > 1
    const canNext = page < totalPages

    const go = (p: number) => {
        if (p >= 1 && p <= totalPages && p !== page) onChange(p)
    }

    return (
        <div className='flex items-center justify-between mt-4 text-sm'>
            <span>
                Página {page} de {totalPages} ({total} registros)
            </span>
            <div className='flex gap-2'>
                <button
                    disabled={!canPrev}
                    onClick={() => go(page - 1)}
                    className={`px-3 py-1 rounded-md border border-light ${
                        canPrev
                            ? 'hover:bg-background-accent-auto'
                            : 'opacity-40 cursor-not-allowed'
                    }`}
                >
                    Anterior
                </button>
                <button
                    disabled={!canNext}
                    onClick={() => go(page + 1)}
                    className={`px-3 py-1 rounded-md border border-light ${
                        canNext
                            ? 'hover:bg-background-accent-auto'
                            : 'opacity-40 cursor-not-allowed'
                    }`}
                >
                    Siguiente
                </button>
            </div>
        </div>
    )
}

export default CrudPagination
