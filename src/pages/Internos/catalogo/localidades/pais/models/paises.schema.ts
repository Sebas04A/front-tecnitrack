import * as yup from 'yup'

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
