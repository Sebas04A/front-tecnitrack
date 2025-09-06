import React from 'react'
import GenericDate from '../../components/form/Controls/GenericDate'
import GenericSelect from '../../components/form/Controls/GenericSelect'
import { CrudContainer } from '../../components/crudGrid'
import CrudCitas from '../../components/crudGrid/cruds/Citas/CrudCitas'
import GenericButton from '../../components/form/Controls/GenericButton'

export default function Citas() {
    console.warn('Renderizando')
    // Guardamos como string para trabajar cómodo con <input type="datetime-local">

    return (
        <div className=' space-y-4'>
            <CrudCitas />
        </div>
    )
}
