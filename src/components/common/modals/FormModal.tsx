// components/modals/FormModal.tsx

import React from 'react'
import BaseModal from './BaseModal'
import { BaseModalProps } from '../../../types/modal.types'
import GenericButton from '../../form/Controls/GenericButton'
import FormsButtons from '../../form/formsButtons'
import GenericForm from '../../form/GenericForm'

export interface FormModalProps extends BaseModalProps {
    // Props requeridas para el control y contenido

    // Props para las acciones del formulario
    error?: string
    onSubmit?: () => void
    onCancel?: () => void
    showButtons?: boolean
    submitText?: string
    cancelText?: string
    isSubmitting?: boolean
    disableSubmit?: boolean
    component?: React.ComponentType<any> // Componente personalizado para el contenido del formulario
    children?: React.ReactNode // Contenido del formulario como children
    props?: any // Props adicionales para el componente del formulario
}

const FormModal: React.FC<FormModalProps> = ({
    isOpen,
    onClose,
    title,
    children, // Recibimos el contenido del formulario aquí
    onSubmit,
    onCancel,
    showButtons = true,
    submitText = 'Guardar',
    cancelText = 'Cancelar',
    isSubmitting = false,
    disableSubmit = false,
    component,
    size,
    props,
}) => {
    console.warn('Renderizando FormModal:')
    const handleSubmit = () => {
        console.log('Submitting form...')
        // Aquí podrías agregar lógica adicional antes de llamar a onSubmit
        onSubmit?.()
    }
    const handleCancel = () => {
        onCancel?.() // Si tuvieras una prop onCancel
        onClose()
    }
    let ChildComponent

    if (children && component) {
        if (typeof children !== 'boolean') {
            console.warn('FormModal recibió tanto children como component. Usando component.')
            console.log('Children:', children)
            console.log('Component:', component)
            throw new Error(
                'FormModal no debe recibir tanto children como component. Usa uno u otro.'
            )
        }
    }
    if (!children && !component) {
        console.warn(
            'FormModal no recibió ni children ni component. No hay contenido para renderizar.'
        )
        throw new Error(
            'FormModal debe recibir children o component para renderizar el contenido del formulario.'
        )
    }
    if (component) {
        console.log('FormModal renderizando con component:', component)
        ChildComponent = component
    } else if (children) {
        console.log('FormModal renderizando con children:', children)
        ChildComponent = () => <>{children}</>
    } else {
        console.warn('FormModal no tiene children ni component. No hay nada que renderizar.')
        return null
    }
    return (
        <BaseModal isOpen={isOpen} onClose={handleCancel} title={title} size={size} noPadding>
            <div className='flex flex-col gap-6 p-4'>
                {/* <CatalogoForm /> */}
                {/* El contenido del formulario (pasado como children) se renderiza aquí */}
                {/* <div>{children}</div> */}
                <GenericForm error={props?.error}>
                    {ChildComponent && <ChildComponent {...props} />}
                </GenericForm>

                {/* Footer con acciones */}
            </div>
            {(onSubmit || onCancel) && showButtons && (
                <footer className='flex items-center justify-end gap-3 pt-2 border-t border-slate-200 dark:border-slate-700'>
                    <FormsButtons onCancelar={handleCancel} onGuardar={handleSubmit} />
                </footer>
            )}
        </BaseModal>
    )
}

export default FormModal
