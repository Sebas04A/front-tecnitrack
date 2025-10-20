import React from 'react'
import ComponentesCrud from '../Equipo/InformacionEquipo/ComponentesCrud'

export default function Componentes({ N_ORDEN }: { N_ORDEN: number }) {
    return (
        <div>
            <ComponentesCrud N_ORDEN={N_ORDEN} />
        </div>
    )
}
