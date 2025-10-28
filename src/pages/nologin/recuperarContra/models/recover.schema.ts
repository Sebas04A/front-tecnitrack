import * as yup from 'yup'

export const forgotPasswordSchema = yup
    .object({
        email: yup.string().required('El email es obligatorio').email('Formato de email inválido'),
    })
    .required()

export type ForgotPasswordFormData = yup.InferType<typeof forgotPasswordSchema>
