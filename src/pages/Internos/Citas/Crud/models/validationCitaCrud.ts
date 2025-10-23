import { citaSchema } from '../../../../../validation/cita.schema'
import * as yup from 'yup'
export const CitaCrudSchema = citaSchema.shape({
    usuario: yup.number().required('El usuario es obligatorio').min(1, 'Usuario inválido'),
    fechaHoraInicio: yup
        .string()
        .required('La fecha y hora de inicio es obligatoria')
        .test('is-date', 'Fecha y hora inválida', value => {
            return !isNaN(Date.parse(value))
        }),
})
export type CitaDataForm = yup.InferType<typeof CitaCrudSchema>
