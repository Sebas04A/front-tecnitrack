import * as yup from 'yup'
import { personaNaturalSchema } from '../../../../validation/perfil.schema'

export const usuarioInternoSchema = personaNaturalSchema.concat(
    yup.object({
        rol: yup
            .string()
            // .oneOf(['Empleado', 'Cliente'])
            .default('Empleado')
            .required('El rol es obligatorio'), // Se muestra arriba y no editable

        estado: yup.string().oneOf(['Activo', 'Inactivo']).default('Inactivo'),
        usuario: yup
            .string()
            .matches(/^[a-zA-Z0-9]*$/, 'El usuario debe ser alfanumérico')
            .max(30, 'Máximo 30 caracteres')
            .required('El usuario es obligatorio'),

        contraseña: yup.string().required('La contraseña es obligatoria'),
        // El flujo de "cambiar la contraseña en el primer login" se maneja en lógica del sistema, no en Yup
        telefono: yup.string().nullable(),

        email: yup.string().email('Correo no válido').nullable(),
    })
)
export type UsuarioInternoData = yup.InferType<typeof usuarioInternoSchema> & { id: number }
