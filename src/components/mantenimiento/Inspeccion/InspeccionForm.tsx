import React, { useEffect } from 'react'
import GenericForm from '../../form/GenericForm'

import GenericTextInput from '../../form/Controls/GenericTextInput'

import ComponentesCrud from '../Equipo/InformacionEquipo/CrudComponentes/ComponentesCrud'
import { WindowProps } from '../MantenimientoIngreso'
import { getInspector } from './services/inspeccion'

export default function InspeccionForm({ handleClose, handleSave, readOnly, orden }: WindowProps) {
    console.warn('InspeccionForm render')
    console.log('N_ORDEN en InspeccionForm:', handleClose, handleSave, orden)

    // const [componentes, setComponentes] = React.useState<Componente[]>([])
    // const eliminarComponente = (i: number) => {
    //     setComponentes(componentes.filter((_, index) => index !== i))
    // }

    const [inspector, setInspector] = React.useState('Cargando...')
    useEffect(() => {
        getInspector(orden.id!).then(data => {
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

            <ComponentesCrud N_ORDEN={orden.id!} />
        </>
    )
}
