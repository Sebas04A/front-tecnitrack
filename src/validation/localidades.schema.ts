import * as yup from 'yup'

// Coerciones útiles para selects ("true"/"false" -> boolean)
const toBool = (v: any) => (typeof v === 'string' ? v === 'true' : !!v)

export const paisSchema = yup.object({
    nombre: yup
        .string()
        .trim()
        .required('El nombre es obligatorio')
        .max(120, 'Máximo 120 caracteres'),
    codigoISO: yup
        .string()
        .transform(v => (typeof v === 'string' ? v.toUpperCase() : v))
        .matches(/^[A-Z]{2,3}$/i, 'Debe tener 2–3 letras')
        .required('El código ISO es obligatorio'),
    codigoTelefonico: yup
        .string()
        .trim()
        .matches(/^\+?\d{1,4}$/i, 'Use formato +NN o NNNN')
        .required('El código telefónico es obligatorio'),
    activo: yup.boolean().transform(toBool).required(),
})

export type PaisFormData = yup.InferType<typeof paisSchema> & { id?: number }

export const defaultPaisValues: PaisFormData = {
    nombre: '',
    codigoISO: '',
    codigoTelefonico: '',
    activo: true,
}

// --------------------------------------------- PROVINCIAS ------------------------------------------------

export const provinciaSchema = yup.object({
    nombre: yup
        .string()
        .trim()
        .required('El nombre es obligatorio')
        .max(120, 'Máximo 120 caracteres'),
    paisId: yup.number().required('El país es obligatorio'),
    activo: yup.boolean().transform(toBool).required(),
})

export type ProvinciaFormData = yup.InferType<typeof provinciaSchema>

export const defaultProvinciaValues: ProvinciaFormData = {
    nombre: '',
    paisId: 0,
    activo: true,
}
// -------------------------------------------CIUDADES ------------------------------------------------
export const ciudadSchema = yup.object({
    nombre: yup
        .string()
        .trim()
        .required('El nombre es obligatorio')
        .max(120, 'Máximo 120 caracteres'),
    provinciaId: yup.number().required('La provincia es obligatoria'),
    esCapital: yup.boolean().transform(toBool).required(),
    activo: yup.boolean().transform(toBool).required(),
})

export type CiudadFormData = yup.InferType<typeof ciudadSchema>

export const defaultCiudadValues: CiudadFormData = {
    nombre: '',
    provinciaId: 0,
    esCapital: false,
    activo: true,
}
