// src/hooks/useModal.ts
import { useState } from 'react'

export const useModal = (initialState = false) => {
    const [isOpen, setIsOpen] = useState(initialState)

    const openModal = () => setIsOpen(true)
    const closeModal = () => {
        console.log('Modal cerrado', isOpen)
        setIsOpen(false)
    }

    return {
        isOpen,
        openModal,
        closeModal,
    }
}
