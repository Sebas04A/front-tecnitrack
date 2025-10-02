import * as yup from 'yup'
const isValidRucEc = (value?: string) => {
    const ruc = onlyDigits(value)
    if (!/^\d{13}$/.test(ruc)) return false

    const prov = parseInt(ruc.slice(0, 2), 10)
    if (!inRange(prov, 1, 24)) return false

    const d3 = parseInt(ruc[2], 10)
    if (d3 === 7 || d3 === 8) return false // no existen

    const mod11Check = (digits: number[], coef: number[]) => {
        const sum = digits.reduce((acc, d, i) => acc + d * coef[i], 0)
        let check = 11 - (sum % 11)
        if (check === 11 || check === 10) check = 0
        return check
    }

    if (d3 <= 5) {
        // Natural: primeros 10 = cédula válida + establecimiento 001–999
        if (!isValidCedulaEc(ruc.slice(0, 10))) return false
        return parseInt(ruc.slice(10, 13), 10) >= 1
    }

    if (d3 === 6) {
        // Público: verificador en posición 9 (índice 8)
        const coef = [3, 2, 7, 6, 5, 4, 3, 2]
        const digits = ruc.slice(0, 8).split('').map(Number)
        const check = mod11Check(digits, coef)
        if (check !== parseInt(ruc[8], 10)) return false
        // establecimiento 0001–9999 (usualmente 0001)
        return parseInt(ruc.slice(9, 13), 10) >= 1
    }

    if (d3 === 9) {
        // Privado: verificador en posición 10 (índice 9)
        const coef = [4, 3, 2, 7, 6, 5, 4, 3, 2]
        const digits = ruc.slice(0, 9).split('').map(Number)
        const check = mod11Check(digits, coef)
        if (check !== parseInt(ruc[9], 10)) return false
        // establecimiento 001–999
        return parseInt(ruc.slice(10, 13), 10) >= 1
    }

    return false
}

export const personaJuridicaSchema = yup
    .object({
        RUC: yup
            .string()
            .required('El RUC es obligatorio')
            .matches(/^[0-9]{13}$/, 'El RUC debe tener 13 dígitos')
            .test('is-valid-ruc', 'El RUC es inválido', value => isValidRucEc(value)),
        razonSocial: yup
            .string()
            .required('La razón social es obligatoria')
            .min(3, 'Debe tener al menos 3 caracteres')
            .matches(
                /^[A-Za-z0-9.\s]+$/,
                'La razón social solo puede contener letras, números y puntos'
            )
            .max(80, 'La razón social no puede exceder los 80 caracteres'),

        nombreComercial: yup
            .string()
            // .required('El nombre comercial es obligatorio')
            .min(3, 'Debe tener al menos 3 caracteres')
            .matches(
                /^[A-Za-z0-9\s]+$/,
                'El nombre comercial solo puede contener letras y números '
            )
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
        nombreRepresentanteLegal: yup
            .string()
            .required('El nombre del representante legal es obligatorio')
            .min(3, 'Debe tener al menos 3 caracteres')
            .max(100, 'No puede exceder los 100 caracteres')
            .matches(
                /^[A-Za-z\s]+$/,
                'El nombre del representante legal solo puede contener letras y espacios'
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

export const personaJuridicaCrudSchema = personaJuridicaSchema.concat(
    yup.object({
        emailEmpresa: yup
            .string()
            .email('Formato de correo inválido')
            .required('El correo electrónico es obligatorio'),
    })
)

// export type PerfilData = yup.InferType<typeof personaJuridicaSchema>
export type PerfilEmpresaData = yup.InferType<typeof personaJuridicaSchema>
export type PerfilEmpresaCrudData = yup.InferType<typeof personaJuridicaCrudSchema>
/** Utils **/
const onlyDigits = (v?: string) => (v ?? '').replace(/\D/g, '')

const inRange = (n: number, min: number, max: number) => n >= min && n <= max

/** Cédula (10 dígitos, coeficientes módulo 10) **/
const isValidCedulaEc = (value?: string) => {
    const ced = onlyDigits(value)
    if (!/^\d{10}$/.test(ced)) return false

    const prov = parseInt(ced.slice(0, 2), 10)
    if (!inRange(prov, 1, 24)) return false

    const d3 = parseInt(ced[2], 10)
    if (d3 > 5) return false // 0–5: persona natural

    const coef = [2, 1, 2, 1, 2, 1, 2, 1, 2]
    const sum = coef.reduce((acc, c, i) => {
        let prod = c * parseInt(ced[i], 10)
        if (prod >= 10) prod -= 9
        return acc + prod
    }, 0)

    const check = (10 - (sum % 10)) % 10
    return check === parseInt(ced[9], 10)
}

/** Helpers ya existentes... (onlyDigits, inRange, isValidCedulaEc, isValidRucEc, PASSPORT_RE) **/

/** Nuevos helpers para fecha **/
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/
const isValidISODateInPast = (s?: string) => {
    if (!ISO_DATE_RE.test(s ?? '')) return false
    const [y, m, d] = (s as string).split('-').map(Number)
    const dt = new Date(Date.UTC(y, m - 1, d))
    // valida que sea una fecha real
    if (dt.getUTCFullYear() !== y || dt.getUTCMonth() !== m - 1 || dt.getUTCDate() !== d)
        return false

    // rango razonable: >= 1900-01-01 y <= hoy
    const today = new Date()
    const todayUTC = new Date(Date.UTC(today.getFullYear(), today.getMonth(), today.getDate()))
    const minUTC = new Date(Date.UTC(1900, 0, 1))
    return dt >= minUTC && dt <= todayUTC
}

export const personaNaturalSchema = yup.object({
    nombreCompleto: yup
        .string()
        .required('El nombre completo es obligatorio')
        .min(3, 'Debe tener al menos 3 caracteres')
        .max(50, 'No puede exceder los 50 caracteres'),
    // .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'Solo puede contener letras'),

    apellidoCompleto: yup
        .string()
        .required('El apellido completo es obligatorio')
        .min(3, 'Debe tener al menos 3 caracteres')
        .max(50, 'No puede exceder los 50 caracteres'),
    // .matches(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/, 'Solo puede contener letras'),

    genero: yup.string().nullable(),
    // .oneOf([...GENEROS], 'Género inválido')
    // .required('El género es obligatorio'),

    fechaNacimiento: yup
        .string()
        .nullable()
        // 2. Transforma los valores "vacíos" (como '' o espacios en blanco) a 'null'.
        //    Si el valor no está vacío, lo deja como está.
        .transform((value, originalValue) => {
            return originalValue.trim() === '' ? null : value
        })
        .test('fecha-formato', 'Use el formato YYYY-MM-DD', v =>
            ISO_DATE_RE.test(v ?? '2023-01-01')
        )
        .test('fecha-rango', 'Fecha inválida o en el futuro', v =>
            isValidISODateInPast(v || '1990-01-01')
        ),
    // .required('La fecha de nacimiento es obligatoria')
    // .test('mayor-de-18', 'Debe ser mayor de 18 años', v => getAge(v) >= 18) // ← activa si tu negocio lo requiere

    tipoIdentificacion: yup
        .string()
        // .oneOf(['Cédula de Ciudadanía', 'Pasaporte', 'RUC', ''], 'Tipo de documento inválido')
        .required('El tipo de documento es obligatorio'),

    numeroIdentificacion: yup
        .string()
        .required('El número de documento es obligatorio')
        .test('documento-ec', 'Documento inválido', function (value) {
            const tipo = (this.parent?.tipoIdentificacion ?? '') as string
            const v = value ?? ''

            if (tipo === 'Cédula de Ciudadanía') {
                if (!/^\d{10}$/.test(v.replace(/\D/g, ''))) {
                    return this.createError({ message: 'La cédula debe tener 10 dígitos' })
                }
                if (!isValidCedulaEc(v)) {
                    return this.createError({ message: 'Cédula ecuatoriana inválida' })
                }
                return true
            }

            if (tipo === 'RUC') {
                if (!/^\d{13}$/.test(v.replace(/\D/g, ''))) {
                    return this.createError({ message: 'El RUC debe tener 13 dígitos' })
                }
                if (!isValidRucEc(v)) {
                    return this.createError({ message: 'RUC ecuatoriano inválido' })
                }
                return true
            }

            if (tipo === 'Pasaporte') {
                if (!/^[A-Za-z0-9]{6,20}$/.test(v)) {
                    return this.createError({ message: 'Pasaporte inválido (6–20 alfanuméricos)' })
                }
                return true
            }

            return this.createError({ message: 'Tipo de documento inválido' })
        }),
})
export const personaNaturalCrudSchema = personaNaturalSchema.concat(
    yup.object({
        email: yup
            .string()
            .email('Formato de correo inválido')
            .required('El correo es obligatorio'),
    })
)
export type PerfilPersonaNaturalData = yup.InferType<typeof personaNaturalSchema> & {
    id?: number
    email?: string
}
export type PerfilPersonaNaturalCrudData = yup.InferType<typeof personaNaturalCrudSchema> & {
    id?: number
}

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
// const contactoPersonaFlexibleSchema = yup.object({
//     telefono: yup.string().matches(/^[0-9+\-() ]{7,20}$/, 'Número de teléfono inválido'),
//     email: yup
//         .string()
//         .matches(
//             /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
//             'El correo debe contener @ y un dominio válido (ej: usuario@ejemplo.com)'
//         ),
// })

// const contactoEmpresaFlexibleSchema = contactoPersonaFlexibleSchema.concat(
//     yup.object({
//         nombre: yup
//             .string()
//             .min(2, 'El nombre del contacto debe tener al menos 2 caracteres')
//             .max(100, 'El nombre del contacto no puede exceder los 100 caracteres'),
//     })
// )

// Custom validation for contacts array
// const validateFirstRequiredRestOptional = (isEmpresa: boolean) => {
//     return yup
//         .array()
//         .test(
//             'first-required-rest-optional',
//             'El primer contacto debe estar completo',
//             function (contacts) {
//                 if (!contacts || contacts.length === 0) {
//                     return this.createError({ message: 'Debe haber al menos un contacto' })
//                 }

//                 // Validate first contact as required
//                 try {
//                     const firstContactSchema = isEmpresa
//                         ? contactoEmpresaSchema
//                         : contactoPersonaSchema
//                     firstContactSchema.validateSync(contacts[0])
//                 } catch (error: any) {
//                     return this.createError({
//                         message: error.message,
//                         path: `contactos[0].${error.path}`,
//                     })
//                 }

//                 // Validate remaining contacts (optional but format-checked if filled)
//                 for (let i = 1; i < contacts.length; i++) {
//                     const contact = contacts[i]
//                     if (!contact) continue

//                     // Check if contact has any meaningful data
//                     const hasData = Object.values(contact).some(
//                         value =>
//                             value &&
//                             value !== '' &&
//                             typeof value === 'string' &&
//                             value.trim() !== ''
//                     )

//                     if (hasData) {
//                         try {
//                             const flexibleSchema = isEmpresa
//                                 ? contactoEmpresaFlexibleSchema
//                                 : contactoPersonaFlexibleSchema
//                             flexibleSchema.validateSync(contact)
//                         } catch (error: any) {
//                             return this.createError({
//                                 message: error.message,
//                                 path: `contactos[${i}].${error.path}`,
//                             })
//                         }
//                     }
//                 }

//                 return true
//             }
//         )
// }

// Updated main schemas
// export const contactosPersonaSchema = yup.object({
//     contactos: validateFirstRequiredRestOptional(false).required(),
// })

// export const contactosEmpresaSchema = yup.object({
//     contactos: validateFirstRequiredRestOptional(true).required(),
// })

// // Types
// export type ContactoPersonaData = yup.InferType<typeof contactoPersonaSchema>
// export type ContactoEmpresaData = yup.InferType<typeof contactoEmpresaSchema>

// export type ContactosPersonaData = yup.InferType<typeof contactosPersonaSchema>
// export type ContactosEmpresaData = yup.InferType<typeof contactosEmpresaSchema>

// export type ContactosData = ContactosPersonaData | ContactosEmpresaData
