import { UseFormReturn, FieldValues } from 'react-hook-form'

export type tipoPersonaType = 'Natural' | 'Juridica' | ''

export interface FormProfileProps<T extends FieldValues = FieldValues> {
    form: UseFormReturn<T>
    tipoPersona: tipoPersonaType
    estaEditando: boolean
}
