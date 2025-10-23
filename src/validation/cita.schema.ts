import * as yup from 'yup'

export const TIPO_MANTENIMIENTO_VALUES = ['preventivo', 'correctivo'] as const
export type TipoMantenimiento = (typeof TIPO_MANTENIMIENTO_VALUES)[number]

export const citaSchema = yup
    .object({
        id: yup.number().nullable(),
        tipoMantenimiento: yup
            .string()
            // .oneOf(TIPO_MANTENIMIENTO_VALUES as unknown as string[], 'Seleccione una opción válida')
            .optional(),

        otro: yup.string().trim().max(50, 'Máximo 50 caracteres').optional(),

        descripcion: yup
            .string()
            .trim()
            .required('La descripción es obligatoria')
            .min(5, 'Debe tener al menos 5 caracteres')
            .max(500, 'Máximo 500 caracteres'),
    })
    .test(
        'tipo-o-otro',
        'Debe seleccionar un tipo de mantenimiento o completar "Otro"',
        function (values) {
            const tipo = values?.tipoMantenimiento
            const otro = values?.otro?.trim()

            const tieneTipo = !!tipo
            const tieneOtro = !!otro

            if (tieneTipo || tieneOtro) return true

            return this.createError({
                path: 'tipoMantenimiento',
                message: 'Seleccione un tipo o llene "Otro"',
            })
        }
    )

export type CitaData = yup.InferType<typeof citaSchema>



export const CitaClienteSchema = citaSchema.shape({
    fechaHoraInicio: yup
        .string()
        .required('La fecha y hora de inicio es obligatoria')
        .test('is-date', 'Fecha y hora inválida', value => {
            return !isNaN(Date.parse(value))
        }),
})
export type CitaClienteDataForm = yup.InferType<typeof CitaClienteSchema>
