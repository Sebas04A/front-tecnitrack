import * as yup from 'yup'

export const validacionComponentes = yup.object().shape({
    componente: yup.string().required('El componente es obligatorio'),
    condicion: yup.string().required('La condición es obligatoria'),
    severidad: yup.string().nullable().notRequired(),
    seguimiento: yup.boolean().nullable().notRequired(),
    observaciones: yup.string().nullable().notRequired(),
})

export type ComponenteFormData = yup.InferType<typeof validacionComponentes>
