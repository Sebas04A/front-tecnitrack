import * as yup from 'yup'

// export const perfilSchema = yup.object({
//     tipoPersona: yup
//         .string()
//         .oneOf(['Natural', 'Juridica'], 'Tipo de persona inválido')
//         .required('El tipo de persona es obligatorio'),
//     nombre: yup
//         .string()
//         .required('El nombre es obligatorio')
//         .min(2, 'Debe tener al menos 2 caracteres')
//         .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'El nombre solo puede contener letras'),

//     apellido: yup
//         .string()
//         .required('El apellido es obligatorio')
//         .min(2, 'Debe tener al menos 2 caracteres')
//         // no puede haber numeros
//         .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'El apellido solo puede contener letras'),

//     documento: yup
//         .string()
//         .oneOf(['Cédula de Ciudadanía', 'Pasaporte', 'RUC'], 'Tipo de documento inválido')
//         .required('El tipo de documento es obligatorio'),

//     numeroDocumento: yup
//         .string()
//         .required('El número de documento es obligatorio')
//         .min(5, 'Debe tener al menos 5 caracteres'),

//     pais: yup
//         .string()
//         .oneOf(['Ecuador', 'Colombia', 'Perú'], 'País inválido')
//         .required('El país es obligatorio'),

//     provincia: yup
//         .string()
//         .oneOf(['Pichincha', 'Guayas', 'Azuay'], 'Provincia inválida')
//         .required('La provincia es obligatoria'),

//     ciudad: yup
//         .string()
//         .oneOf(['Quito', 'Guayaquil', 'Cuenca'], 'Ciudad inválida')
//         .required('La ciudad es obligatoria'),

//     direccion: yup
//         .string()
//         .required('La dirección es obligatoria')
//         .min(5, 'La dirección debe tener al menos 5 caracteres'),

//     telefono: yup
//         .string()
//         .required('El teléfono es obligatorio')
//         .matches(/^[0-9+\-() ]{7,20}$/, 'Número de teléfono inválido'),

//     email: yup.string().required('El correo es obligatorio').email('Formato de correo inválido'),
// })

// export type PerfilData = yup.InferType<typeof perfilSchema>

export const personaJuridicaSchema = yup
    .object({
        RUC: yup
            .string()
            .required('El RUC es obligatorio')
            .matches(/^[0-9]{13}$/, 'El RUC debe tener 13 dígitos'),
        razonSocial: yup
            .string()
            .required('La razón social es obligatoria')
            .min(3, 'Debe tener al menos 3 caracteres')
            .matches(/^[A-Za-z0-9\s]+$/, 'La razón social solo puede contener letras y números')
            .max(80, 'La razón social no puede exceder los 80 caracteres'),

        nombreComercial: yup
            .string()
            // .required('El nombre comercial es obligatorio')
            .min(3, 'Debe tener al menos 3 caracteres')
            .matches(/^[A-Za-z0-9\s]+$/, 'El nombre comercial solo puede contener letras y números')
            .max(80, 'El nombre comercial no puede exceder los 80 caracteres'),
        telefonoEmpresa: yup
            .string()
            .required('El teléfono de la empresa es obligatorio')
            .matches(/^[0-9+\-() ]{10,15}$/, 'Número de teléfono inválido'),
        emailEmpresa: yup
            .string()
            .required('El correo de la empresa es obligatorio')
            .email('Formato de correo inválido')
            .matches(
                /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,50}$/,
                'Formato de correo inválido'
            ),
        telefonoSecundario: yup
            .string()
            .notRequired()
            .test(
                'is-valid-phone',
                'Número de teléfono inválido',
                value => !value || /^[0-9+\-() ]{10,15}$/.test(value)
            ),

        emailSecundario: yup
            .string()
            .notRequired()
            .test(
                'is-valid-email',
                'Formato de correo inválido',
                value => !value || /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,50}$/.test(value)
            ),

        numeroSucursal: yup
            .string()
            .notRequired()
            .test(
                'is-valid-if-present',
                'El número de sucursal debe ser alfanumérico de 1 a 15 caracteres',
                value => {
                    if (!value) return true // No validar si está vacío
                    return /^[A-Za-z0-9]{1,15}$/.test(value)
                }
            ),

        nombreSucursal: yup
            .string()
            .notRequired()
            .max(50, 'Máximo 15 caracteres')
            .test(
                'is-valid-if-present',
                'El nombre de la sucursal solo puede contener letras y números y al menos 3 caracteres',
                value => {
                    if (!value) return true
                    return /^[A-Za-z0-9\s]+$/.test(value) && value.length >= 3
                }
            ),
    })
    .test(
        'cross-field-required',
        'Si se completa uno de los campos, el otro también es obligatorio',
        function (values) {
            const numero = values.numeroSucursal
            const nombre = values.nombreSucursal

            const numeroTieneValor = numero && numero.trim() !== ''
            const nombreTieneValor = nombre && nombre.trim() !== ''

            // Ambos vacíos = válido
            if (!numeroTieneValor && !nombreTieneValor) return true

            // Ambos con valor = válido
            if (numeroTieneValor && nombreTieneValor) return true

            // Solo uno tiene valor = inválido
            return this.createError({
                path: !numeroTieneValor ? 'numeroSucursal' : 'nombreSucursal',
                message: 'Debe completar ambos campos si se llena uno',
            })
        }
    )

// export type PerfilData = yup.InferType<typeof personaJuridicaSchema>
export type PerfilEmpresaData = yup.InferType<typeof personaJuridicaSchema>
export const personaNaturalSchema = yup.object({
    nombreCompleto: yup
        .string()
        .required('El nombre completo es obligatorio')
        .min(3, 'Debe tener al menos 3 caracteres')
        .max(50, 'No puede exceder los 50 caracteres')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'Solo puede contener letras'),
    apellidoCompleto: yup
        .string()
        .required('El apellido completo es obligatorio')
        .min(3, 'Debe tener al menos 3 caracteres')
        .max(50, 'No puede exceder los 50 caracteres')
        .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'Solo puede contener letras'),
    tipoDocumento: yup
        .string()
        .oneOf(['Cédula', 'Pasaporte'], 'Tipo de documento inválido')
        .required('El tipo de documento es obligatorio'),
    numeroDocumento: yup
        .string()
        .required('El número de documento es obligatorio')
        .min(5, 'Debe tener al menos 5 caracteres'),
})

export type PerfilPersonaNaturalData = yup.InferType<typeof personaNaturalSchema>

export const direccionSchema = yup.object({
    pais: yup
        .string()
        .oneOf(['Ecuador', 'Colombia', 'Perú', ''], 'País inválido')
        .required('El país es obligatorio'),
    provincia: yup
        .string()
        .oneOf(['Pichincha', 'Guayas', 'Azuay', ''], 'Provincia inválida')
        .required('La provincia es obligatoria'),
    ciudad: yup
        .string()
        .oneOf(['Quito', 'Guayaquil', 'Cuenca', ''], 'Ciudad inválida')
        .required('La ciudad es obligatoria'),
    direccion: yup
        .string()
        .required('La dirección es obligatoria')
        .min(5, 'La dirección debe tener al menos 5 caracteres')
        .max(80, 'No puede exceder los 80 caracteres'),
})
export type DireccionData = yup.InferType<typeof direccionSchema>

export const direccionesSchema = yup.object({
    direcciones: yup
        .array()
        .of(direccionSchema)
        .min(1, 'Debe haber al menos una dirección')
        .required(),
})
export type DireccionesData = yup.InferType<typeof direccionesSchema>

// Base schemas for individual contacts (required fields)
export const contactoPersonaSchema = yup.object({
    telefono: yup
        .string()
        .required('El teléfono es obligatorio')
        .matches(/^[0-9+\-() ]{7,20}$/, 'Número de teléfono inválido'),
    email: yup.string().required('El correo es obligatorio').email('Formato de correo inválido'),
})

export const contactoEmpresaSchema = contactoPersonaSchema.concat(
    yup.object({
        nombre: yup
            .string()
            .required('El nombre del contacto es obligatorio')
            .min(2, 'El nombre del contacto debe tener al menos 2 caracteres')
            .max(100, 'El nombre del contacto no puede exceder los 100 caracteres'),
    })
)

// Optional schemas for additional contacts (all fields optional)
export const contactoPersonaOptionalSchema = yup.object({
    telefono: yup
        .string()
        .optional()
        .matches(/^[0-9+\-() ]{7,20}$/, 'Número de teléfono inválido'),
    email: yup.string().optional().email('Formato de correo inválido'),
})

export const contactoEmpresaOptionalSchema = contactoPersonaOptionalSchema.concat(
    yup.object({
        nombre: yup
            .string()
            .optional()
            .min(2, 'El nombre del contacto debe tener al menos 2 caracteres')
            .max(100, 'El nombre del contacto no puede exceder los 100 caracteres'),
    })
)

// // Base schemas for individual contacts (required fields)
// export const contactoPersonaSchema = yup.object({
//     telefono: yup
//         .string()
//         .required('El teléfono es obligatorio')
//         .matches(/^[0-9+\-() ]{7,20}$/, 'Número de teléfono inválido'),
//     email: yup
//         .string()
//         .required('El correo es obligatorio')
//         .matches(
//             /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//             'El correo debe contener @ y un dominio válido (ej: usuario@ejemplo.com)'
//         ),
// })

// export const contactoEmpresaSchema = contactoPersonaSchema.concat(
//     yup.object({
//         nombre: yup
//             .string()
//             .required('El nombre del contacto es obligatorio')
//             .min(2, 'El nombre del contacto debe tener al menos 2 caracteres')
//             .max(100, 'El nombre del contacto no puede exceder los 100 caracteres'),
//     })
// )

// Schema for flexible validation (allows empty fields for optional contacts)
const contactoPersonaFlexibleSchema = yup.object({
    telefono: yup.string().matches(/^[0-9+\-() ]{7,20}$/, 'Número de teléfono inválido'),
    email: yup
        .string()
        .matches(
            /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
            'El correo debe contener @ y un dominio válido (ej: usuario@ejemplo.com)'
        ),
})

const contactoEmpresaFlexibleSchema = contactoPersonaFlexibleSchema.concat(
    yup.object({
        nombre: yup
            .string()
            .min(2, 'El nombre del contacto debe tener al menos 2 caracteres')
            .max(100, 'El nombre del contacto no puede exceder los 100 caracteres'),
    })
)

// Custom validation for contacts array
const validateFirstRequiredRestOptional = (isEmpresa: boolean) => {
    return yup
        .array()
        .test(
            'first-required-rest-optional',
            'El primer contacto debe estar completo',
            function (contacts) {
                if (!contacts || contacts.length === 0) {
                    return this.createError({ message: 'Debe haber al menos un contacto' })
                }

                // Validate first contact as required
                try {
                    const firstContactSchema = isEmpresa
                        ? contactoEmpresaSchema
                        : contactoPersonaSchema
                    firstContactSchema.validateSync(contacts[0])
                } catch (error: any) {
                    return this.createError({
                        message: error.message,
                        path: `contactos[0].${error.path}`,
                    })
                }

                // Validate remaining contacts (optional but format-checked if filled)
                for (let i = 1; i < contacts.length; i++) {
                    const contact = contacts[i]
                    if (!contact) continue

                    // Check if contact has any meaningful data
                    const hasData = Object.values(contact).some(
                        value =>
                            value &&
                            value !== '' &&
                            typeof value === 'string' &&
                            value.trim() !== ''
                    )

                    if (hasData) {
                        try {
                            const flexibleSchema = isEmpresa
                                ? contactoEmpresaFlexibleSchema
                                : contactoPersonaFlexibleSchema
                            flexibleSchema.validateSync(contact)
                        } catch (error: any) {
                            return this.createError({
                                message: error.message,
                                path: `contactos[${i}].${error.path}`,
                            })
                        }
                    }
                }

                return true
            }
        )
}

// Updated main schemas
export const contactosPersonaSchema = yup.object({
    contactos: validateFirstRequiredRestOptional(false).required(),
})

export const contactosEmpresaSchema = yup.object({
    contactos: validateFirstRequiredRestOptional(true).required(),
})

// Types
export type ContactoPersonaData = yup.InferType<typeof contactoPersonaSchema>
export type ContactoEmpresaData = yup.InferType<typeof contactoEmpresaSchema>

export type ContactosPersonaData = yup.InferType<typeof contactosPersonaSchema>
export type ContactosEmpresaData = yup.InferType<typeof contactosEmpresaSchema>

export type ContactosData = ContactosPersonaData | ContactosEmpresaData
