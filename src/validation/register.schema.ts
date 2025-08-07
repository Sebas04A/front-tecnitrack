import * as yup from 'yup'
export const registerSchema = yup
    .object({
        email: yup.string().required('El email es obligatorio').email('Formato de email inválido'),
        password: yup
            .string()
            .required('La contraseña es obligatoria')
            .min(8, 'Debe tener al menos 8 caracteres')
            // al menos una mayúscula, una minúscula, un número y un carácter especial. sin ñ ni espacios
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
export type RegisterFormData = yup.InferType<typeof registerSchema>
