// import React from 'react'
// import { Modal } from './Modal'
// import LoadingModal from './LoadingModal'
// import { FiCheckCircle, FiAlertTriangle } from 'react-icons/fi'

// export type SubmitStatus = 'loading' | 'success' | 'error'

// interface SubmitStatusModalProps {
//     status: SubmitStatus | null
//     onClose: () => void
//     onRetry?: () => void
//     successTitle?: string
//     successMessage?: string
//     errorTitle?: string
//     errorMessage?: string
//     loadingTitle?: string
//     loadingMessage?: string
// }

// const SubmitStatusModal: React.FC<SubmitStatusModalProps> = ({
//     status,
//     onClose,
//     onRetry,
//     successTitle = '¡Datos enviados!',
//     successMessage = 'Tu información se ha guardado correctamente.',
//     errorTitle = 'Ocurrió un error',
//     errorMessage = 'No pudimos completar el envío. Inténtalo nuevamente.',
//     loadingTitle = 'Enviando datos',
//     loadingMessage = 'Por favor, espera mientras procesamos tu información...',
// }) => {
//     if (status === 'loading') {
//         return <LoadingModal isOpen={isOpen} title={loadingTitle} message={loadingMessage} />
//     }

//     const isSuccess = status === 'success'

//     const icon = isSuccess ? (
//         <FiCheckCircle className='text-green-500' size={40} />
//     ) : (
//         <FiAlertTriangle className='text-red-500' size={40} />
//     )

//     const title = isSuccess ? successTitle : errorTitle
//     const message = isSuccess ? successMessage : errorMessage

//     const acceptText = isSuccess ? 'Cerrar' : 'Reintentar'
//     const cancelText = isSuccess ? undefined : 'Cancelar'
//     const onAccept = isSuccess ? onClose : onRetry
//     const onCancel = isSuccess ? undefined : onClose

//     return (
//         <Modal
//             isOpen={status !== null}
//             onClose={onClose}
//             onAccept={onAccept}
//             onCancel={onCancel}
//             acceptText={acceptText}
//             cancelText={cancelText}
//             title={title}
//         >
//             <div className='flex items-center gap-4'>
//                 <div>{icon}</div>
//                 <div className='text-sm text-muted max-w-md'>{message}</div>
//             </div>
//         </Modal>
//     )
// }

// export default SubmitStatusModal
