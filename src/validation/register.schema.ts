import * as yup from 'yup'

const onlyDigits = (v?: string) => (v ?? '').replace(/\D/g, '')

const inRange = (n: number, min: number, max: number) => n >= min && n <= max
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
export const registerSchema = yup
    .object({
        // tipoCliente: yup.string().required('El tipo de cliente es obligatorio'),
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
                        return this.createError({
                            message: 'Pasaporte inválido (6–20 alfanuméricos)',
                        })
                    }
                    return true
                }

                return this.createError({ message: 'Tipo de documento inválido' })
            }),

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
