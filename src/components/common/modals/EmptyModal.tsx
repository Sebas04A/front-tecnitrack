import React from 'react'
import { BaseModalProps } from '../../../types/modal.types'
import BaseModal from './BaseModal'

export default function EmptyModal({
    isOpen,
    onClose,
    title,
    size,
    className,
    children,
}: BaseModalProps) {
    return (
        <BaseModal
            isOpen={isOpen}
            onClose={onClose}
            title={title}
            size={size}
            className={className}
        >
            {children}
        </BaseModal>
    )
}
