import * as yup from 'yup'
export const direccionSchema = yup.object({
    pais: yup
        .number()
        // .oneOf(['Ecuador', 'Colombia', 'Perú', ''], 'País inválido')
        .required('El país es obligatorio'),
    provincia: yup
        .number()
        // .oneOf(['Pichincha', 'Guayas', 'Azuay', ''], 'Provincia inválida')
        .required('La provincia es obligatoria'),
    ciudad: yup
        .number()
        // .oneOf(['Quito', 'Guayaquil', 'Cuenca', ''], 'Ciudad inválida')
        .required('La ciudad es obligatoria'),
    codigoPostal: yup
        .string()
        .matches(/^\d{6}$/, 'El código postal debe tener 6 dígitos')
        .required('El código postal es obligatorio'),
    tipo: yup
        .string()
        // .oneOf(['Casa', 'Oficina', 'Otro', ''], 'Tipo de dirección inválido')
        .required('El tipo de dirección es obligatorio'),
    principal: yup.boolean().default(false),
    direccion: yup
        .string()
        .required('La dirección es obligatoria')
        .min(5, 'La dirección debe tener al menos 5 caracteres')
        .max(80, 'No puede exceder los 80 caracteres'),
})
export type DireccionData = yup.InferType<typeof direccionSchema> & {
    id?: number
    ciudadNombre?: string
    provinciaNombre?: string
    paisNombre?: string
}
