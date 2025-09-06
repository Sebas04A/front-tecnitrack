import * as yup from 'yup'

/** Regex reutilizables */
const PHONE_REGEX = /^[0-9+\-() ]{7,20}$/
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,50}$/

/** Contacto base Persona (Natural) requerido */

export const contactoBaseSchema = yup.object({
    telefono: yup
        .string()
        .required('El teléfono es obligatorio')
        .matches(PHONE_REGEX, 'Número de teléfono inválido'),
    email: yup
        .string()
        .required('El correo es obligatorio')
        .email('Formato de correo inválido')
        .matches(EMAIL_REGEX, 'Formato de correo inválido'),

    // principal: yup.boolean().default(false).required('Debe indicar si es el contacto principal'),
})
export const contactoPersonaSchema = contactoBaseSchema.concat(
    yup.object({
        tipoContacto: yup
            .string()
            // .oneOf(['Cliente', 'Proveedor', 'Otro'], 'Tipo de contacto inválido')
            .required('El tipo de contacto es obligatorio'),
        principal: yup
            .boolean()
            .default(false)
            .required('Debe indicar si es el contacto principal'),
    })
)

/** Contacto base Empresa (Juridica) requerido */
export const contactoEmpresaSchema = contactoBaseSchema.concat(
    yup.object({
        nombre: yup
            .string()
            .required('El nombre del contacto es obligatorio')
            .min(2, 'Debe tener al menos 2 caracteres')
            .max(100, 'No puede exceder los 100 caracteres'),
        cargo: yup
            .string()
            .required('El cargo del contacto es obligatorio')
            .min(2, 'Debe tener al menos 2 caracteres')
            .max(100, 'No puede exceder los 100 caracteres'),
    })
)

// Tipos derivados
export type ContactoClienteData = yup.InferType<typeof contactoPersonaSchema> & { id: number }
export type ContactoEmpresaData = yup.InferType<typeof contactoEmpresaSchema> & { id: number }
// export type ContactosPersonaData = yup.InferType<typeof contactosPersonaSchema>
// export type ContactosEmpresaData = yup.InferType<typeof contactosEmpresaSchema>
export type ContactoData = ContactoClienteData | ContactoEmpresaData
