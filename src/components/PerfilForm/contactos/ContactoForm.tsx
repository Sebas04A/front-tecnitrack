// import React from 'react'
// import GenericSection from '../../form/GenericSection'
// import GenericRowForm from '../../form/GenericRowForm'
// import GenericTextInput from '../../form/Controls/GenericTextInput'
// import { useForm, useFormContext } from 'react-hook-form'
// // import {
// //     ContactosData,
// //     contactosEmpresaSchema,
// //     contactosPersonaSchema,
// // } from '../../../validation/perfil.schema'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { FormProfileProps } from '../../../types/formsProfile'
// import { TIPO_PERSONA } from '../../../constants/perfil'
// import { contactoEmpresaSchema, contactoPersonaSchema } from '../../../validation/perfil.schema'
// import { ContactoData } from '../../../validation/contacto.schema'

// function ContactoUnico({
//     form,
//     tipoPersona,
//     estaEditando,
//     index,
// }: FormProfileProps & { index: number }) {
//     const {
//         register,
//         formState: { errors },
//     } = form

//     return (
//         <GenericRowForm>
//             {tipoPersona === 'Juridica' && (
//                 <GenericTextInput
//                     label='Nombre Contacto'
//                     name={`contactos.${index}.nombre`}
//                     type='text'
//                     register={register}
//                     errors={errors}
//                     isReadOnly={!estaEditando}
//                     className='min-w-[20ch] flex-[4_1_auto]'
//                 />
//             )}
//             <GenericTextInput
//                 label='Teléfono'
//                 name={`contactos.${index}.telefono`}
//                 type='text'
//                 register={register}
//                 errors={errors}
//                 isReadOnly={!estaEditando}
//                 className='min-w-[15ch] flex-[1_1_auto]'
//             />
//             <GenericTextInput
//                 label='Correo Electrónico'
//                 name={`contactos.${index}.email`}
//                 type='email'
//                 register={register}
//                 errors={errors}
//                 isReadOnly={!estaEditando || (tipoPersona === TIPO_PERSONA.NATURAL && index === 0)}
//                 className='min-w-[20ch] flex-[4_1_auto]'
//             />
//         </GenericRowForm>
//     )
// }

// export default function ContactoForm({
//     form,
//     tipoPersona,
//     estaEditando,
// }: FormProfileProps<ContactoData>) {
//     const {
//         register,
//         formState: { errors },
//     } = useForm({
//         mode: 'onChange',
//         resolver: yupResolver(
//             tipoPersona === 'Juridica' ? contactoEmpresaSchema : contactoPersonaSchema
//         ),
//     })

//     const nContactos = tipoPersona === 'Juridica' ? 2 : 3
//     return (
//         <>
//             {nContactos > 0 && (
//                 <GenericSection title='Contactos'>
//                     {Array.from({ length: nContactos }).map((_, index) => (
//                         <ContactoUnico
//                             key={index}
//                             form={form}
//                             tipoPersona={tipoPersona}
//                             estaEditando={estaEditando}
//                             index={index}
//                         />
//                     ))}
//                 </GenericSection>
//             )}
//         </>
//     )
// }
