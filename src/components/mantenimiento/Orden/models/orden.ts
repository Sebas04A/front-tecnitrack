import * as yup from 'yup'

export const orderValidationSchema = yup.object().shape({
    // Campos de solo lectura. No necesitan validaciones complejas ya que no son editables por el usuario.
    numeroOrden: yup.string().required('El número de orden es requerido'),
    fechaIngreso: yup.string().required('La fecha de ingreso es requerida'),
    registradoPor: yup.string().required('El nombre del registrador es requerido'),

    // Campos editables que requieren validación.
    inspeccionadoPor: yup.string().nullable(), // Permite que el valor sea nulo o un string vacío antes de ser seleccionado

    tallerBodegaDestino: yup
        .string()
        .required('Debe seleccionar un taller o bodega de destino')
        .nullable(),

    observacionesIngreso: yup
        .string()
        .max(500, 'Las observaciones no deben exceder los 500 caracteres')
        .nullable(), // Este campo es opcional, pero con un límite de caracteres
})
export type OrderFormData = yup.InferType<typeof orderValidationSchema>
