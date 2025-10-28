// src/validation/login.schema.ts
import * as yup from 'yup'

export const loginSchema = yup
    .object({
        interno: yup.boolean().required(),

        email: yup
            .string()
            .when(['interno'], (vals: unknown[], schema: yup.StringSchema<string | undefined>) => {
                const interno = Boolean(vals?.[0])
                return interno
                    ? schema.notRequired() // si interno === true, no valida email
                    : schema
                          .required('El email es obligatorio')
                          .email('Formato de email inválido')
                          .matches(
                              /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                              'El email debe tener un dominio válido (.com, .net, etc.)'
                          )
            }),

        password: yup.string().required('La contraseña es obligatoria'),
    })
    .required()

export type LoginFormData = yup.InferType<typeof loginSchema>
