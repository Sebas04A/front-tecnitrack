import * as yup from 'yup'
export const registerSchema = yup
    .object({
        // tipoCliente: yup.string().required('El tipo de cliente es obligatorio'),
        tipoIdentificacion: yup.string().required('El tipo de identificación es obligatorio'),
        numeroIdentificacion: yup.string().required('La identificación es obligatoria'),

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

export const registerNaturalSchema = registerSchema.concat(
    yup.object({
        nombres: yup.string().required('El nombre es obligatorio'),
        apellidos: yup.string().required('El apellido es obligatorio'),
    })
)
export type RegisterNaturalFormData = yup.InferType<typeof registerNaturalSchema>
export const registerEmpresaSchema = registerSchema.concat(
    yup.object({
        razonSocial: yup.string().required('La razón social es obligatoria'),
    })
)
export type RegisterEmpresaFormData = yup.InferType<typeof registerEmpresaSchema>
