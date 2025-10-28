import React from 'react'
import { PaisesCrud } from './pais/PaisCrud'
import ProvinciasCrud from '../../../../components/crudGrid/cruds/Localidades/Provincias/ProvinicasCrud'
import CiudadCrud from '../../../../components/crudGrid/cruds/Localidades/Ciudades/CiudadCrud'
import LocationSelector from '../../../../components/crudGrid/cruds/Internos/Catalogos/SelectTipoLocalidad'

export default function CatalogoLocalidades() {
    const [tipoLocalidad, setTipoLocalidad] = React.useState<'paises' | 'provincias' | 'ciudades'>(
        'paises'
    )
    return (
        <div>
            <div>
                <h1 className='text-lg font-bold mb-4 text-center text-primary'>
                    Selecciona el Tipo de Localidad
                </h1>
                <LocationSelector value={tipoLocalidad} onChange={setTipoLocalidad} />
            </div>
            <div>
                {tipoLocalidad === 'paises' && <PaisesCrud />}
                {tipoLocalidad === 'provincias' && <ProvinciasCrud />}
                {tipoLocalidad === 'ciudades' && <CiudadCrud />}
            </div>
        </div>
    )
}
