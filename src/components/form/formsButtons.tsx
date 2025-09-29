import React from 'react'
import GenericButton from './Controls/GenericButton'

export default function FormsButtons({
    onCancelar,
    onGuardar,
}: {
    onCancelar?: () => void
    onGuardar?: () => void
}) {
    return (
        <div className='flex justify-end gap-2 '>
            {onCancelar && (
                <GenericButton
                    type='button'
                    text='Cancelar'
                    className='bg-background-auto hover:bg-background-accent-auto'
                    onClick={onCancelar}
                />
            )}
            <GenericButton
                type='submit'
                text='Guardar'
                // disabled={!activeForm.formState.isValid}
                onClick={onGuardar ?? (() => {})}
            />
        </div>
    )
}
