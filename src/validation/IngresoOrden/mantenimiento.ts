import * as yup from 'yup'

export const mantenimientoValidationSchema = yup.object().shape({
    tipoMantenimiento: yup.string().required('El tipo de mantenimiento es obligatorio.'),
    prioridad: yup.string().required('La prioridad es obligatoria.'),
    descripcionProblema: yup.string().required('La descripción del problema es obligatoria.'),
    tecnico: yup.string().required('El técnico es obligatorio.').nullable(),
    estado: yup.string().required('La condición general es obligatoria.'),
    observaciones: yup.string().optional(),
})
export type MantenimientoFormType = yup.InferType<typeof mantenimientoValidationSchema>
