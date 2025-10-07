// components/modals/BaseModal.tsx

import React, { useEffect, useId, useRef } from 'react'
import { IoClose } from 'react-icons/io5'
import { motion, AnimatePresence } from 'framer-motion'
import FocusTrap from 'focus-trap-react'
import { BaseModalProps } from '../../../types/modal.types'

const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
}

const modalVariants = {
    hidden: { opacity: 0, scale: 0.9, y: 30 },
    visible: {
        opacity: 1,
        scale: 1,
        y: 0,
        transition: { type: 'spring' as const, damping: 20, stiffness: 200 },
    },
    exit: { opacity: 0, scale: 0.9, y: 30, transition: { duration: 0.2 } },
}

const BaseModal: React.FC<BaseModalProps> = ({
    isOpen,
    onClose,
    title,
    children,
    size = 'md',
    className = '',
    noPadding = false,
}) => {
    const titleId = useId()
    const panelRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            document.body.style.overflow = 'hidden'
            document.addEventListener('keydown', handleEsc)
        } else {
            document.body.style.overflow = 'unset'
        }
        return () => {
            document.body.style.overflow = 'unset'
            document.removeEventListener('keydown', handleEsc)
        }
    }, [isOpen, onClose])

    const sizeClasses: Record<typeof size, string> = {
        sm: 'max-w-md h-min',
        md: 'max-w-lg h-max',
        lg: 'max-w-2xl h-[70vh]',
        xl: 'max-w-4xl h-[70vh]',
        full: 'w-full h-[70vh]',
    }

    return (
        <AnimatePresence>
            {isOpen && (
                <FocusTrap
                    focusTrapOptions={{
                        initialFocus: false,
                        fallbackFocus: () => panelRef.current as HTMLElement,
                    }}
                >
                    <div
                        className='fixed inset-0 flex items-center justify-center z-50 p-4'
                        role='dialog'
                        aria-modal='true'
                        aria-labelledby={title ? titleId : undefined}
                    >
                        <motion.div
                            className='fixed inset-0 bg-slate-900/50 backdrop-blur-sm'
                            onClick={onClose}
                            variants={backdropVariants}
                            initial='hidden'
                            animate='visible'
                            exit='hidden'
                            transition={{ duration: 0.25, ease: 'easeInOut' }}
                        />

                        <motion.div
                            ref={panelRef}
                            tabIndex={-1}
                            className={`relative bg-white dark:bg-slate-800 rounded-xl shadow-2xl w-full  ${sizeClasses[size]} 
                 flex flex-col border border-slate-200/50 dark:border-slate-700/50 ${className}`}
                            variants={modalVariants}
                            initial='hidden'
                            animate='visible'
                            exit='exit'
                        >
                            {title && (
                                <header className='flex items-center justify-between px-6 py-4 border-b border-slate-200 dark:border-slate-700 flex-shrink-0'>
                                    <h2
                                        id={titleId}
                                        className='text-lg font-semibold  text-primary'
                                    >
                                        {title}
                                    </h2>
                                    <button
                                        onClick={onClose}
                                        className='p-1.5 rounded-full text-slate-500 hover:text-slate-800 hover:bg-slate-100 dark:hover:text-slate-100 dark:hover:bg-slate-700 transition-all duration-200'
                                        aria-label='Cerrar modal'
                                    >
                                        <IoClose size={20} />
                                    </button>
                                </header>
                            )}
                            <main
                                className={` overflow-y-auto flex-grow ${
                                    noPadding ? 'p-0' : 'p-6'
                                }`}
                            >
                                {children}
                            </main>
                        </motion.div>
                    </div>
                </FocusTrap>
            )}
        </AnimatePresence>
    )
}

export default BaseModal
