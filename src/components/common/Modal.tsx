// src/components/common/Modal.tsx
import React, { useEffect, Fragment } from 'react'
import { createPortal } from 'react-dom'
import { FiX } from 'react-icons/fi'
import { Transition, TransitionChild } from '@headlessui/react'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
    title?: string
    buttonAcceptText?: string
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    buttonAcceptText,
    children,
}) => {
    // Cerrar el modal al presionar la tecla 'Escape'
    useEffect(() => {
        const handleEsc = (event: KeyboardEvent) => {
            if (event.key === 'Escape') {
                onClose()
            }
        }
        window.addEventListener('keydown', handleEsc)
        return () => window.removeEventListener('keydown', handleEsc)
    }, [onClose])

    // Usamos createPortal para renderizar el modal fuera del DOM principal,
    // lo que evita problemas de z-index y overflow.
    return createPortal(
        <Transition show={isOpen} as={Fragment}>
            <div aria-labelledby='modal-title' role='dialog' aria-modal='true'>
                <div
                    className='fixed inset-0 bg-black bg-opacity-40  z-10 w-screen overflow-y-auto flex items-center justify-center p-4'
                    onClick={() => onClose()}
                >
                    {/* Panel del Modal */}
                    <Transition.Child
                        as={Fragment}
                        enter='ease-out duration-300'
                        enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                        enterTo='opacity-100 translate-y-0 sm:scale-100'
                        leave='ease-in duration-200'
                        leaveFrom='opacity-100 translate-y-0 sm:scale-100'
                        leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
                    >
                        <div
                            className='bg-background-auto overflow-hidden rounded-2xl shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg'
                            // Evita que el clic dentro del modal lo cierre
                            onClick={e => e.stopPropagation()}
                        >
                            <div className='px-4 pt-5 pb-4 sm:p-6 sm:pb-4 lg:p-8'>
                                <div className='flex  items-start'>
                                    {title && (
                                        <h3
                                            className='text-xl font-semibold leading-6 text-primary'
                                            id='modal-title'
                                        >
                                            {title}
                                        </h3>
                                    )}
                                    <button
                                        type='button'
                                        className=' rounded-full text-muted hover:scale-110 transition-transform ml-auto'
                                        onClick={onClose}
                                    >
                                        <FiX size={24} />
                                    </button>
                                </div>
                                <div className='mt-4 sm:px-6 sm:p-4 flex items-center justify-center'>
                                    {children}
                                </div>
                                {buttonAcceptText && (
                                    <div className='mt-6 flex justify-center'>
                                        <button
                                            type='button'
                                            className='  rounded-md  bg-primary-auto px-4 py-2 text-sm font-medium  shadow-md hover:bg-primary-light focus:outline-none focus:ring-2 focus:ring-primary-dark focus:ring-offset-2'
                                            onClick={onClose}
                                        >
                                            {buttonAcceptText}
                                        </button>
                                    </div>
                                )}
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </div>
        </Transition>,
        document.body // El modal se renderizará en el body
    )
}
