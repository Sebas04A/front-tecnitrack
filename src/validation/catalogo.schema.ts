import * as yup from 'yup'

// Esquema de validación para el formulario de Catálogo basado en CatalogoDto
export const catalogoSchema = yup
    .object({
        id: yup.number().optional(),

        tipo: yup.string().optional(),

        valor: yup
            .string()
            .required('El valor es obligatorio')
            .min(1, 'Debe tener al menos 1 carácter')
            .max(80, 'No puede exceder los 80 caracteres'),

        descripcion: yup
            .string()
            .optional()
            .max(200, 'La descripción no puede exceder los 200 caracteres'),

        activo: yup.boolean().required().default(true),

        orden: yup
            .number()
            .typeError('El orden debe ser un número')
            .integer('El orden debe ser un número entero')
            .min(0, 'El orden no puede ser negativo')
            .max(999999, 'El orden no puede exceder 999999')
            .required('El orden es obligatorio'),
    })
    .required()

export type CatalogoFormData = yup.InferType<typeof catalogoSchema>
