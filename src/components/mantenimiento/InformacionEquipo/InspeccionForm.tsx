import React, { useEffect } from 'react'
import GenericForm from '../../form/GenericForm'

import GenericTextInput from '../../form/Controls/GenericTextInput'

import ComponentesCrud from './ComponentesCrud'
import { WindowProps } from '../MantenimientoIngreso'
import { getInspector } from '../../../services/ORDEN/mantenimiento'

interface Componente {
    id: number
    nombre: string
    condicion: string
    observaciones: string
    severidad: string
    seguimiento: boolean
}

export default function InspeccionForm({ handleClose, handleSave, N_ORDEN, orden }: WindowProps) {
    console.warn('InspeccionForm render')
    console.log('N_ORDEN en InspeccionForm:', N_ORDEN, handleClose, handleSave, orden)

    // const [componentes, setComponentes] = React.useState<Componente[]>([])
    // const eliminarComponente = (i: number) => {
    //     setComponentes(componentes.filter((_, index) => index !== i))
    // }

    const [inspector, setInspector] = React.useState('Cargando...')
    useEffect(() => {
        getInspector(orden.idOrden!).then(data => {
            setInspector(data?.inspectorAsignado ?? 'Sin Inspector')
        })
    }, [])
    return (
        <>
            <GenericForm
                // showButtons={true}
                // onSubmit={onSubmit}
                // onCancel={resetearValores}
                title='Inspección'
            >
                {/* <GenericRowForm> */}
                <GenericTextInput
                    label='Inspector'
                    // register={register}
                    name='inspector'
                    isReadOnly={true}
                    value={inspector}
                />
                {/* <GenericButton type='submit' text='Guardar' className='m-0 mt-auto' /> */}
                {/* </GenericRowForm> */}
            </GenericForm>
            <div className='mt-10'></div>

            <ComponentesCrud N_ORDEN={orden.idOrden!} />
        </>
    )
}
