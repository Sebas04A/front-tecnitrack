import * as yup from 'yup'
export const resetPasswordSchema = yup
    .object({
        password: yup
            .string()
            .required('La contraseña es obligatoria')
            .min(8, 'Debe tener al menos 8 caracteres')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                'La contraseña debe contener al menos una mayúscula, una minúscula, un número y un carácter especial'
            ),
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Las contraseñas deben coincidir')
            .required('Debe confirmar la contraseña'),
    })
    .required()

export type ResetPasswordFormData = yup.InferType<typeof resetPasswordSchema>
