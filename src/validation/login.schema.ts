// src/validation/login.schema.ts
import * as yup from 'yup'

export const loginSchema = yup
    .object({
        email: yup
            .string()
            .required('El email es obligatorio')
            .email('Formato de email inválido')
            .matches(
                /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                'El email debe tener un dominio válido (.com, .net, etc.)'
            ),
        password: yup
            .string()
            .required('La contraseña es obligatoria')
            .min(6, 'Debe tener al menos 6 caracteres'),
        // rememberMe: yup.boolean().required('Debe aceptar la opción de recordar sesión'),
    })
    .required()

export type LoginFormData = yup.InferType<typeof loginSchema>
